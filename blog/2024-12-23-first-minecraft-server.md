---
title: 首次自建MC服务器笔记
authors: RibomBalt
tags: 
    - Linux
    - Minecraft
    - Game
---
# 自建MC服务器笔记

## 需求

起因只是同课题组一起毕业的四五个小伙伴想一起约着开一个MC服玩玩。

不过我们偏好的平台不太统一，有电脑端有手机端，大部分人没有国际版正版，但我又想用自己的皮肤（所以尽可能不用网易版）。刚好手头有校园网环境内的云服务器。

经过一系列调研之后，最终选择Minecraft Java服务端 + Geyser（间歇泉）的方式，PC用户用Java端直连服务器，手机用户用携带版通过Geyser转发连接服务器。由于目前版本Geyser已经不支持外置登录，我们最终采用了关闭在线验证，离线登录+白名单的方式，虽然不够理想但是校园网+使用人数少，也不是不能接受。

主要流程可以参考[Sakura Frp平台给出的教程](https://doc.natfrp.com/offtopic/mc-geyser.html)。但是毕竟平台不同，流程多少有些差别。
<!-- truncate -->
## 基础配置

### 云服务器

配置如下：

- Ubuntu 22.04 LTS (x86_64)
- 虚拟CPU 4个，内存4GB，存储40GB SSD，另有100GB HDD作为临时备份用

作为服务器来说，内存略小，如果能扩到8GB会比较好。

服务器SSH设置略。一般在线服务还建议配置一个non-sudo用户专门运行。

### Java环境安装

可以用官方软件源的openjdk 21
```
sudo apt install openjdk-21-jdk-headless
```

> headless 表示无图形界面

### Minecraft Java服务端

首先建议先通读一遍[服务器核心相关的科普](https://doc.natfrp.com/offtopic/mc-java-server.html#prepar-core)。

按照服务器能否支持插件或Mod，排列组合可以分为四类服务器核心。我们需要一定程度的定制性（可折腾），所以排除原版服务器。而定制化最高的Mod+插件服（比如CatServer）最复杂，坑也多，所以排除在外。最终是打算插件/Mod服二选一。

考虑到服务器性能羸弱，加上我们目前对Mod兴趣不大，我们最终还是用了插件服务器中的Paper。PaperMC在性能上有一些激进的优化（代价是优化掉了一些原版特性），一些服务器常用（扩展命令、皮肤）可以直接借助插件实现，比较适合我们的场景。

Minecraft版本方面，我们最终使用了最新的1.21.4。这点可能有点欠考虑，因为Paper核心本身还处于dev build，不够稳定，而且大部分插件的兼容性还没到这个版本。不过，我发现插件对版本的需求没有Mod那么严格，往往好几个大版本前的插件现在还能用（也可能我用的插件修改程度比较浅）。

可以直接从官网下载[PaperMC的JAR包](https://papermc.io/downloads/paper)。

下载后，用以下指令启动服务器

```
java -Xms2G -Xmx2G -jar paper.jar --nogui
```

- 其中`-Xms`后面的是Java的启动内存，`-Xmx`是最大内存。
- 建议在tmux中运行，保证SSH退出后服务器仍在后台运行。
- 可以启动命令写成一个名为`launch.sh`的shell脚本，然后`chmod +x launch.sh`赋予执行权限。

第一次运行时必然会报错退出，需要同意EULA规约，即把`eula.txt`中设置改为`true`。

与此同时，可以在`server.properties`中改一些配置：

```conf
# 离线模式
online-mode=false 
# motd影响搜出服务器时显示的名称
motd=xxxx
# 应群友要求关闭了友伤
pvp=false
# 给大伙上上强度.jpg
difficulty=hard
# 同服最大玩家数量，稍微留了点余量方便开小号
max-players=8
```

为了保证关闭云服务器SSH后服务端还在后台运行，我是把`launch.sh`跑在tmux里的。

### Geyser - 连通基岩版和Java版
[Geyser](https://geysermc.org/)（间歇泉）是一个知名的基岩版/Java版互通代理，它可以让基岩版用户加入Java服务器。

Geyser既可以作为Mod安装也可以作为插件安装。我们这里就直接参考了[paper + self-hosted 安装教程](https://geysermc.org/wiki/geyser/setup/?host=self&platform=paper-spigot)，直接把jar包下载到`plugins`文件夹，然后重新启动服务器，几乎不用改什么，就直接能用了（我们是默认端口）。

## 插件安装 / 非必须配置
### 指令/权限插件：EssentialsX + LuckPerms + Vault
这几个主要是为了`sethome`, `tpa`等常用服务器指令，可以在各自官网安装最新版（Vault最新版1.7.3虽然官网标称只支持到1.17，但最新版确实可以装上，没遇到什么问题）。

接下来需要手动为用户们添加执行特定指令的权限。权限系统比较复杂，我暂时没完全搞清楚，就参考了[这篇博客](https://www.cnblogs.com/zhaojiedi1992/p/mc_plugins_ess.html)的配置，添加了两个新的组对应普通用户和VIP，并分别赋予权限（顺便VIP组我这里没有，需要我自己添加组别）。我没有找到批量执行指令的方式，所以我是在op控制台里一条一条输入的。

### 皮肤插件：SkinsRestorer
[这个插件](https://skinsrestorer.net/docs)是为了离线登录里支持皮肤。

不过这个插件确实不太省心，需要两处额外配置：

- 第一次运行时会有warning，需要同意一个君子协定（大致意思是不能对【服务器玩家用自己的皮肤】收费），需要在`plugins/SkinsRestorer/config.yml`中找到`perSkinPermissionsConsent`一行，改成`'I will follow the rules'`。
- 这个插件可以用任何格式正确的外部图片作为皮肤，但是配置有一个`restricSkinUrls`选项，限制用户只能用特定域名下的图片。为了使用皮肤站的皮肤，需要添加对应皮肤站的域名（比如添加了`https://littleskin.cn`才能用littleskin的皮肤）

之后大家就可以用`/skin set <url>`设置自己皮肤了。

### 白名单

毕竟我们是离线登录，还是怕路人进来搞破坏，所以做了白名单机制。

需要在`server.properties`把`white-list`改为`true`，然后在op控制台中输入：`/whitelist add 用户名`就可以加白名单了，加好后需要`/whitelist reload`热更新，或者重启服务器。

白名单配置是写到`whitelist.json`文件的，包含用户名和UUID信息。

## 日常维护

### 服务端备份

目前看来需要备份的只有几个`world`文件夹和`plugins`文件夹。这个我就自己写了一个shell然后`crontab -e`加入定时执行。

包含了一个向tmux的特定窗口输入指令的snippets，以方便同时向服务器通知，是从stackoverflow抄来的。

`sync.sh`把需要备份的文件转移到备份的文件夹中，可以传入一个参数，控制备份到哪个文件夹。

发现偶尔有死了回档的需求，所以我跑了两个cron，一个10min一次，一个1h一次。之后视情况还可能再加入更密集的cron，或者引入rotational机制。

```bash
#!/bin/bash

# select save target (default latest)
if [[ -z $1 ]]; then
{
    save_target=latest;
}
else 
{
    save_target=$1
}
fi;
echo "save to $save_target"

# variables
BACKUP_TARGET=/home/minecraft/backup/minecraft_paper/${save_target}
SERVER_PATH=/home/minecraft/minecraft_paper
DIR_TO_BACKUP=(world world_nether world_the_end plugins)
FILE_TO_BACKUP=(whitelist.json server.properties usercache.json permissions.yml bukkit.yml spigot.yml commands.yml help.yml ops.json version_history.json banned-ips.json banned-players.json sync.sh startup.sh launch.sh)
MINECRAFT_TMUX_WINDOW=minecraft

execute_command () {
    tmux send-keys -t $MINECRAFT_TMUX_WINDOW "$1" C-m
}

# 
execute_command "say §o服务端备份启动 ($save_target) $(date)§r"

mkdir -p $BACKUP_TARGET

execute_command "save-all"
execute_command "save-off"

for target in ${DIR_TO_BACKUP[@]}; 
do {
    echo new target dir: $target;
    rsync --delete -avz "$SERVER_PATH/$target/" "$BACKUP_TARGET/$target";
}
done;

for target in ${FILE_TO_BACKUP[@]}; 
do {
    echo new target file: $target;
    rsync --delete -avz "$SERVER_PATH/$target" "$BACKUP_TARGET/$target";
}
done;

date >"$BACKUP_TARGET/backup_date.txt"

execute_command "save-on"
execute_command "save-all"

execute_command "say §o服务端备份结束 $(date)§r"
```

`rotate_save.sh`可以把之前备份出来的文件打包压缩存储到别的地方，并可以rotate几个版本（每天凌晨运行）
（未来这部分打算SFTP远程存储的，只是存储服务器还没有，后面再说，目前是挂在nginx下面然后手动下载备份）
```bash
#!/bin/bash

BACKUP_TARGET=/home/minecraft/backup/minecraft_paper/latest
ROTATE_LOCATION=/var/www/html/minecraft_backup/minecraft_paper
MAX_ROTATE=4

mkdir -p $ROTATE_LOCATION

for save_i in $(seq $(($MAX_ROTATE - 1)) -1 1); 
do {
    if [[ -f "$ROTATE_LOCATION/backup.tar.gz.${save_i}" ]];
    then {
        mv "$ROTATE_LOCATION/backup.tar.gz.${save_i}" "$ROTATE_LOCATION/backup.tar.gz.$(($save_i + 1))"
    }
    fi;
}
done;

if [[ -f "$ROTATE_LOCATION/backup.tar.gz" ]];
then {
    mv "$ROTATE_LOCATION/backup.tar.gz" "$ROTATE_LOCATION/backup.tar.gz.1"
}
fi;

tar cvzf "$ROTATE_LOCATION/backup.tar.gz" "$BACKUP_TARGET"
```

### 状态监控

2024-12-25发生了一次OOM事件，服务器无响应，SSH响应速度极慢，等oom_killer发力之后才恢复正常。事后诊断是因为java启动参数配置错误（当时只给了`-Xms`没给`-Xmx`）。

因此打算进行一定程度的CPU/内存/存储监控，所以装了`sar`，不过暂时没搞懂如何自动生成报告。

另外也考虑过是否启用supervisord自动重启，目前想法是暂时不用。因为我本人也是玩家，应该能随时监控状态；另外如果真的是OOM导致的无响应，supervisord也跑不起来。

此外，earlyoom在小内存机器会导致相当多的内存浪费，也会导致服务端被提前kill掉，增加不稳定因素。考虑到服务器暂时不跑别的服务，我还是打算相信`-Xmx`的控制内存的能力。

另外，我使用的`Paper 1.21`客户端内置`Spark`状态检测插件，可以查看游戏内CPU/内存占用情况。以下命令可以获取接下来10min的服务器状态并生成一份在线报告。

```
/spark profiler start --timeout 600
```

### 发送消息推送
用`say`命令可以全服通告，`tell`命令可以对单人私信。

如何发送格式化消息（[原帖](https://www.reddit.com/r/Minecraft/comments/r8xic/strikethrough_underline_and_italics_in_multiplayer/)）

> And how exactly do you make this formatting happen?
> EDIT to summarize the answers in various comments:
> On the server console, press Alt-6 to enter §, followed by one of these letters:
> 
> - l - bold
> - m - strikethrough
> - n - underline
> - o - italic
> - r - reset formatting

### 自动重启
考虑到服务器存在崩溃的可能，为了快速恢复状态，加了一个简单的快速重启脚本

> 其实就是之前启动脚本外面套了一层启动tmux的脚本，有一定通用性

```sh
#!/bin/bash
MINECRAFT_TMUX_WINDOW=minecraft

cd /home/minecraft/minecraft_paper
tmux new-session -d -t minecraft
tmux rename-window -t minecraft:0 minecraft

execute_command () {
    tmux send-keys -t $MINECRAFT_TMUX_WINDOW "$1" C-m
}

execute_command "./launch.sh"
```

之后写一个`/etc/systemd/system/minecraft_server.service`文件，把tmux + server启动脚本添加为服务

```sh
[Unit]
Description=Minecraft Server (Paper)
After=network.target

[Service]
Type=forking
ExecStart=/home/minecraft/minecraft_paper/startup.sh
User=minecraft
Group=minecraft

[Install]
WantedBy=multi-user.target
```

完成后，`sudo systemctl daemon-reload`，重载服务列表，再`sudo systemctl enable minecraft_server.service`设置为开机自启即可。（如果目前服务端还没有启动，可以加上`--now`同时启动服务）

之后看服务状态，发现是running:

```sh
$ sudo systemctl status minecraft_server.service
● minecraft_server.service - Minecraft Server (Paper)
     Loaded: loaded (/etc/systemd/system/minecraft_server.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2024-12-25 14:31:01 CST; 22h ago
    Process: 880 ExecStart=/home/minecraft/minecraft_paper/startup.sh (code=exited, status=0/SUCCESS)
   Main PID: 933 (tmux: server)
      Tasks: 109 (limit: 4641)
     Memory: 2.8G
        CPU: 3h 54min 9.656s
     CGroup: /system.slice/minecraft_server.service
             ├─ 933 tmux new-session -d -t minecraft
             ├─ 952 -bash
             ├─1856 /bin/bash ./launch.sh
             └─1857 java -Xms2G -Xmx2G -jar paper.jar --nogui

Dec 25 14:31:00 ribom-server systemd[1]: Starting Minecraft Server (Paper)...
Dec 25 14:31:01 ribom-server startup.sh[958]: can't find window: 1
Dec 25 14:31:01 ribom-server systemd[1]: Started Minecraft Server (Paper).
```

看起来这个`shell`脚本进程最终被子进程`tmux`创建进程替换。虽然没有完全理解为什么，但是这样不影响正常使用。

目前可以实现云服务控制台软重启后，minecraft server自动上线。

如果需要并非机器重启时服务进程杀死后server自动重启，还可以在上面服务里加上`Restart=always`，我后面视情况考虑要不要添加。