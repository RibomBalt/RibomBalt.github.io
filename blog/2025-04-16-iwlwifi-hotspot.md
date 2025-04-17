---
title: Linux下使用Intel无线网卡同时连接网络和建立热点
authors: RibomBalt
tags: 
    - Linux
    - Hardware
    - Wifi
---

## TL;DR;

- 最近的Intel无线网卡内置了LAR（Location Awareness Regulatory，位置感知管控）功能，通过主动探测周围信道设置Wifi的地区码，以规避雷达等设施，遵守所在地区的无线信道法律规定。
- 然而，LAR功能在很多情况下不能正常工作，无法正确设置地区码，而默认值00是最严格的限制，在5GHz信号段没有任何一个信道可以建立热点通信。
- 2019年的Linux 5.5前，intel网卡驱动`iwlwifi`存在一个选项`lar_disable`可以禁用LAR功能，然而有报道表明这个选项会导致固件崩溃，因此在5.5版本被移除。尽管可以通过内核补丁把选项重新打入，本人测试并未成功开启热点。
- 本文使用了另一个补丁，似乎直接绕过了LAR设置的信道标志，可以实现在LAR设置不正确的情况下能够在特定5GHz信道发射，从而能够同时连接和建立无线热点。

{/* truncate */}

## 背景

由于实在受不了笔记本的Win10天天催我更新，我最终给笔记本装了Linux双系统。经过一系列调研后，最终选择了Arch衍生的Manjaro发行版，配合KDE桌面。

然而一段时间使用后，我发现Linux KDE上的网络管理面板中，只要连接了5GHz Wi-fi，创建热点的按钮就会消失。而对于相同的网卡，使用Windows启动时，可以建立5GHz热点。

根据Arch Linux wiki上关于[软件无线接入点](https://wiki.archlinux.org/title/Software_access_point)的讨论，有几个关键点：

- 原理上建立热点分为两步：提供Wifi连接层，转发网络包。
  - 前者通过`hostapd`实现，与KDE默认管理网络的`NetworkManager`可能有一定冲突，[这个问答](https://unix.stackexchange.com/a/584952/600864)进行了一些解释。
  - 后者通过`dnsmasq`、`iptables`实现，需要提供主动的DHCP和DNS服务。
- 上述建立热点功能在Arch系包管理中由`linux-wifi-hostspot`提供，这个包还提供了一个`create_ap`shell脚本，和`wihotspot` GUI。
  - 不言自明，`create_ap`是基于`hostapd`的，与`NetworkManager`有一定冲突。
  - 据说前者2015年左右停止维护；而后者仍在维护（主要关注GUI），但和KDE自带的网络管理是两套系统。
- Intel网卡因为LAR位置感知管控（以及一些固件驱动BUG）的原因，难以在Linux下建立5GHz热点。这个后面会详细介绍。

## 设备信息、诊断

我的设备基本信息：

- 设备：联想小新Air14-2020 Intel款
- 网卡：Intel Wireless AC 9560
- OS: Manjaro (Linux 6.12.21) 与Windows 11双系统。
- 桌面系统：KDE Plasma 6 (X11)
  - KDE内置的网络管理插件是`plasma-nm`，基于`NetworkManager`

通过`iw list`工具可以获得更多信息。
```sh
$ iw list | grep -A 5 valid
	valid interface combinations:
				* #{ managed } <= 1, #{ P2P-client, P2P-GO } <= 1, #{ P2P-device } <= 1,
				total <= 3, #channels <= 2
				* #{ managed } <= 1, #{ AP, P2P-client, P2P-GO } <= 1, #{ P2P-device } <= 1,
				total <= 3, #channels <= 1
	HT Capability overrides:
```
注意这里的`AP`表示热点模式。
说明9560网卡可以在两种模式下工作：双频STA+P2P，或者单频STA+P2P+AP。其中后者是我们关心的情况，可以先连接外部wifi再提供热点，并且占用同一信道。

```sh
$ iw list | grep -A 15 Freq
		Frequencies:
				* 2412.0 MHz [1] (22.0 dBm)
				* 2417.0 MHz [2] (22.0 dBm)
				* 2422.0 MHz [3] (22.0 dBm)
				* 2427.0 MHz [4] (22.0 dBm)
				* 2432.0 MHz [5] (22.0 dBm)
				* 2437.0 MHz [6] (22.0 dBm)
				* 2442.0 MHz [7] (22.0 dBm)
				* 2447.0 MHz [8] (22.0 dBm)
				* 2452.0 MHz [9] (22.0 dBm)
				* 2457.0 MHz [10] (22.0 dBm)
				* 2462.0 MHz [11] (22.0 dBm)
				* 2467.0 MHz [12] (22.0 dBm)
				* 2472.0 MHz [13] (22.0 dBm)
				* 2484.0 MHz [14] (disabled)
Band 2:
--
		Frequencies:
            * 5180 MHz [36] (22.0 dBm) (no IR)
            * 5200 MHz [40] (22.0 dBm) (no IR)
            * 5220 MHz [44] (22.0 dBm) (no IR)
            * 5240 MHz [48] (22.0 dBm) (no IR)
            * 5260 MHz [52] (22.0 dBm) (no IR, radar detection)
            * 5280 MHz [56] (22.0 dBm) (no IR, radar detection)
            * 5300 MHz [60] (22.0 dBm) (no IR, radar detection)
            * 5320 MHz [64] (22.0 dBm) (no IR, radar detection)
            * 5340 MHz [68] (disabled)
            * 5360 MHz [72] (disabled)
            * 5380 MHz [76] (disabled)
            * 5400 MHz [80] (disabled)
            * 5420 MHz [84] (disabled)
            * 5440 MHz [88] (disabled)
            * 5460 MHz [92] (disabled)

```
这些表示9560网卡目前可以发射的频段。前一部分结果是2.4GHz，后一部分是5GHz波段。在打补丁之前，所有5GHz波段都标注了`(no IR)`，表明这个波段无法进行主动发射，也就无法建立热点。

为什么会无法发射呢？这并非因为网卡物理上不支持，而是为了规避各国规定的禁止发射的波段（见[wikipedia: List of WLAN channels](https://en.wikipedia.org/wiki/List_of_WLAN_channels)）。

为了（给一般网卡）提供地区码设置选项，Arch系需要安装`wireless-regdb`（即debian系的crda包），包含了WLAN允许波段的数据库。Wifi的地区码可以通过`iw reg get`查看，并可以通过`iw reg set [code]`进行设置。
```sh
$ iw reg get
global
country CN: DFS-FCC
        (2400 - 2483 @ 40), (N/A, 20), (N/A)
        (5150 - 5250 @ 80), (N/A, 23), (N/A), NO-OUTDOOR, AUTO-BW
        (5250 - 5350 @ 80), (N/A, 20), (0 ms), NO-OUTDOOR, DFS, AUTO-BW
        (5725 - 5850 @ 80), (N/A, 33), (N/A)
        (57240 - 59400 @ 2160), (N/A, 28), (N/A)
        (59400 - 63720 @ 2160), (N/A, 44), (N/A)
        (63720 - 65880 @ 2160), (N/A, 28), (N/A)

phy#0 (self-managed)
country 00: DFS-UNSET
        (2402 - 2437 @ 40), (6, 22), (N/A), AUTO-BW, NO-HT40MINUS, NO-80MHZ, NO-160MHZ
        (2422 - 2462 @ 40), (6, 22), (N/A), AUTO-BW, NO-80MHZ, NO-160MHZ
        (2447 - 2482 @ 40), (6, 22), (N/A), AUTO-BW, NO-HT40PLUS, NO-80MHZ, NO-160MHZ
        (5170 - 5190 @ 80), (6, 22), (N/A), NO-OUTDOOR, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5190 - 5210 @ 80), (6, 22), (N/A), NO-OUTDOOR, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5210 - 5230 @ 80), (6, 22), (N/A), NO-OUTDOOR, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5230 - 5250 @ 80), (6, 22), (N/A), NO-OUTDOOR, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5250 - 5270 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5270 - 5290 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5290 - 5310 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5310 - 5330 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5490 - 5510 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5510 - 5530 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5530 - 5550 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5550 - 5570 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5570 - 5590 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5590 - 5610 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5610 - 5630 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5630 - 5650 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5650 - 5670 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5670 - 5690 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5690 - 5710 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5710 - 5730 @ 80), (6, 22), (0 ms), DFS, AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5735 - 5755 @ 80), (6, 22), (N/A), AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5755 - 5775 @ 80), (6, 22), (N/A), AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5775 - 5795 @ 80), (6, 22), (N/A), AUTO-BW, NO-HT40MINUS, NO-160MHZ, NO-320MHZ
        (5795 - 5815 @ 80), (6, 22), (N/A), AUTO-BW, NO-HT40PLUS, NO-160MHZ, NO-320MHZ
        (5815 - 5835 @ 20), (6, 22), (N/A), AUTO-BW, NO-HT40MINUS, NO-HT40PLUS, NO-80MHZ, NO-160MHZ, NO-320MHZ
```
可以发现intel网卡设备`phy0`的地区设置为00（DFS-UNSET）。

但当我们尝试使用`iw reg set CN`时，网卡的地区设置没有发生任何变化！这是因为这个设备上面标记了`self-managed`，表明这个设备的地区码由自己管理（也就是LAR机制），不能被用户设置。一般来说，操作系统可以通过驱动设置网卡的地区码，但是Intel采用了一套LAR位置感知管控机制，会主动探测周围的无线信号，确定目前处于哪个地区。

然而网卡地区返回00，说明LAR并没有正确设置地区码，这也是很多人遇到过的BUG。当LAR出错时，会回到默认的00设置，这个设置几乎是各国禁止波段的交集，在5GHz波段没有任何一个波段是允许`IR`（no initiating radiation），也就无法建立热点。值得一提的是，这个问题很早应该就被提出了，但intel一直没有去修（曾经看到intel的forum被喷了十几楼，现在找不到了）

## `lar_disable`

在早期Linux Kernel中，Intel Wifi驱动`iwlwifi`存在一个内核选项`lar_disable`，可以禁用LAR功能。可以通过这个设置启动这一功能（重启生效）。

```sh
# /etc/modprobe.d/iwlwifi.conf
options lar_disable=1
```

然而在Linux 5.5之后，由于这个选项经常导致固件crash，Linux驱动开发组决定[直接移除这个选项](https://bugzilla.kernel.org/show_bug.cgi?id=205695#c6)……这种踢皮球的态度显然不能让intel网卡用户满意，于是又被喷了十几楼……

在AUR（Archlinux User Repository）中，有一个包`iwlwifi-lar-disable-dkms`，可以把`lar_disable`选项加回来。

首先简单解释什么是dkms：DKMS表示[动态内核模组支持](https://wiki.archlinux.org/title/Dynamic_Kernel_Module_Support)，可以通过pacman包管理工具把一些不属于原始内核源码的模组打进去，这类包每次安装和卸载时都需要重新编译内核模块。

具体到`iwlwifi-lar-disable-dkms`这个包，其`PKGBUILD`表明了安装过程：首先拉下内核源码，验证checksum后，应用补丁，编译成包，再通过`dkms`相关命令打到内核中去。

这个包直接打进我的系统是无法安装成功的。我检查了一下`make.log`，发现主要是因为内核版本的问题。这个包最新的commit内核版本未`6.13.2`，我回退到了上一个版本`6.12.4`，此时编译的报错只剩一个，应该是某个函数声明减少了一个传入参数，把这个部分patch掉就可以成功编译，表现为安装耗时大幅变长，重启后可以生效。

> 这里也简单说一下如何patch的。把AUR的git仓库clone下来后，checkout到对应版本，第一次编译使用`makepkg -si`，会自动下载安装依赖并安装。如果安装失败，报错中会展示编译时`make.log`的地址，用于debug。
> 之后如果需要进一步修改源码，可以直接修改`src`目录下的内容，然后使用`makepkg -ei`。具体可以看[archlinux wiki: Patch Package](https://wiki.archlinux.org/title/Patching_packages)
> 另外，dkms打入系统似乎需要在包管理工具中安装特定版本的`linux-headers`。可以看[manjaro forum的介绍](https://forum.manjaro.org/t/root-tip-how-to-kernel-headers-dkms/93840)。

很不幸的，即使启用了`lar_disable`选项，也无法设置地区码。`dmesg`中出现了新的log：`Conflict between TLV & NVM regarding enabling LAR`，看起来一部分选项要求内核启用LAR一部分要求禁用，产生了矛盾。

值得一提的是，我也尝试了另一个固件`cfg80211`的内核选项`options cfg80211 ieee80211_regdom=CN`，没有成功，推测这个功能和`iw reg set CN`等效。

## 修改自己的内核补丁
在继续调研的过程中，我发现了[这个问答贴](https://askubuntu.com/questions/1484841/ubuntu22-cant-create-5g-hotspot?newreg=a7f7c006bbc74615af1feceecf4cdc9a)，和我设备情况相似，但声称使用了另一个补丁，并且成功了：

```patch
diff --git a/drivers/net/wireless/intel/iwlwifi/iwl-nvm-parse.c b/drivers/net/wireless/intel/iwlwifi/iwl-nvm-parse.c
index 149857f..f45c0cb 100644
--- a/drivers/net/wireless/intel/iwlwifi/iwl-nvm-parse.c
+++ b/drivers/net/wireless/intel/iwlwifi/iwl-nvm-parse.c
@@ -380,6 +380,8 @@ static int iwl_init_channel_map(struct device *dev, const struct iwl_cfg *cfg,
                        ch_flags =
                                __le16_to_cpup((const __le16 *)nvm_ch_flags + ch_idx);
 
+               ch_flags |= NVM_CHANNEL_IBSS;
+               ch_flags |= NVM_CHANNEL_ACTIVE;
 
                if (band == NL80211_BAND_5GHZ &&
                    !data->sku_cap_band_52ghz_enable)
@@ -1601,6 +1603,8 @@ iwl_parse_nvm_mcc_info(struct device *dev, const struct iwl_cfg *cfg,
                band = iwl_nl80211_band_from_channel_idx(ch_idx);
                center_freq = ieee80211_channel_to_frequency(nvm_chan[ch_idx],
                                                             band);
+               ch_flags |= NVM_CHANNEL_IBSS;
+               ch_flags |= NVM_CHANNEL_ACTIVE;
                new_rule = false;
 
                if (!(ch_flags & NVM_CHANNEL_VALID)) {

```

这个补丁从功能来看，似乎在某一步直接给信道的标志位设置了可以发射，绕过了地区检测。

## 使用体验

`iw list | grep -A 15 Freq`可以发现5GHz波段已经不再有`no-IR`标志（即使是radar detection的波段）。需要小心，不能使用这些雷达波段。

```sh
Frequencies:
	* 5180.0 MHz [36] (22.0 dBm)
	* 5200.0 MHz [40] (22.0 dBm)
	* 5220.0 MHz [44] (22.0 dBm)
	* 5240.0 MHz [48] (22.0 dBm)
	* 5260.0 MHz [52] (22.0 dBm) (radar detection)
	* 5280.0 MHz [56] (22.0 dBm) (radar detection)
	* 5300.0 MHz [60] (22.0 dBm) (radar detection)
	* 5320.0 MHz [64] (22.0 dBm) (radar detection)
	* 5340.0 MHz [68] (disabled)
	* 5360.0 MHz [72] (disabled)
	* 5380.0 MHz [76] (disabled)
	* 5400.0 MHz [80] (disabled)
	* 5420.0 MHz [84] (disabled)
	* 5440.0 MHz [88] (disabled)
	* 5460.0 MHz [92] (disabled)
```

当然`iw reg get`结果仍然保持不变，不过似乎不会生效了。

无法在`NetworkManager`中直接添加热点，这是因为我们的网卡最多只能支持一个`managed`设备，然而可以使用`wihotspot`，直接建立热点，它会自动新建一个`Network Interface`，标记为`__ap`模式，设置`NetworkManager`对这个设备`unmanaged`。底层原理讨论见[讨论3](https://wiki.archlinux.org/title/Talk:Software_access_point)。理论上在命令行中用`iw dev add`和`create_ap`也是可以的，但我目前还没有成功过。

目前使用还算正常，似乎没遇到网络模块crash的情况。偶尔会在`dmesg`中看到`iwlwifi`相关的额外报错，可能这是不稳定的表现吧。