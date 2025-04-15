---
title: Selling NI USRP Devices
autoNumbering: true
startNumber: 16
---

## 从我们这里采购USRP设备的优势：放心、省钱、省事

NI USRP系列产品属于卖方市场，性能高端但价格昂贵。由于NI对销售网络有很强的控制，各授权经销商的报价几乎完全一致。各授权经销商主要通过客户网络、集成以及技术服务等方面进行差异化竞争，而非价格竞争。选择从PicoScenes团队采购USRP系列产品可以享受以下三个好处：**放心、省钱、省事**。具体来说：

1. **保证NI官方渠道、100%正品**：我们珍视NI对PicoScenes的认可与支持，因此我们保证向NI的客户提供全新、完好的正品USRP产品;
2. **免费赠送PSLP-PRO-DBL许可证**：该许可证包含了PicoScenes的完整功能，开箱即用，无需在线验证;
3. **提供NI原厂1年质保+延保服务(可选、推荐)**：NI原厂提供为期一年的免费维修保修服务，不限次数，不区分人为因素。此外，NI原厂还提供最长4年的超值延保服务;
4. **无额外渠道溢价**: 我们不会在信息不对称的情况下追求过高的利润。我们所有的NI USRP产品都以官方指导价销售，没有额外的渠道溢价。

## 我们推荐的USRP型号

NI USRP有许多型号，我们基于自己团队的长期使用经验和Wi-Fi ISAC研究的需求，优先推荐并销售以下NI USRP产品。当然，作为NI授权经销商，*我们也销售其它其他型号*。

### NI USRP B210

[USRP B210](https://www.ettus.com/all-products/ub210-kit/) 是NI USRP系列的入门神器，它功能丰富，非常适合新用户。它提供两对Tx/Rx通道，支持70-6000 MHz频谱以及最大61.44/30.72MHz采样（单/双通道）。它采用AD9361前端，支持2x2 MIMO，支持Radar mode，提供细粒度的采样频率指定、自动I/Q校正(*无需手动校正!*)、自带AGC，支持外接时钟同步，采用USB 3.0连接和供电，可支持笔记本电脑作为上位机在外场直接工作。它能够满足在最大40 MHz CBW下进行各种精细的Wi-Fi/5G/6G ISAC研究的需求。

USRP B210原厂仅以祼板销售，[B210 NI原厂外壳](https://www.ettus.com/all-products/usrp-b200-enclosure/) 单独售卖，并且很贵(1500元)，但还是推荐用户购买，原因如下：

1. 长期的USRP使用经验告诉我们，**USRP非常脆弱，如果不使用外壳，极容易损坏**。
2. NI原厂外壳在拍摄论文照片时更加直观和美观。

### NI USRP X310母板搭配双UBX-160子板

[NI USRP X310母板](https://www.ettus.com/all-products/X310-KIT/) 搭配两块 [UBX-160子板](https://www.ettus.com/all-products/ubx160/)，可以实现10-6000 MHz范围内最大双通道200 MHz采样能力，支持Radar mode，时钟同步方面，它支持输出时钟信号也支持输入外部时钟信号，支持USRP多设备组合功能，可实现多机、多通道条件下的时钟同步。它提供双口10 GbE连接能力，可通过10 GbE以太网网卡连接台式电脑或通过10GbE-to-Thunderbolt3转换器连接带有Thunderbolt3接口的笔记本电脑，可满足Wi-Fi 160 MHz CBW下多种收发和测量任务。

### NI USRP-2974

[NI USRP-2974](https://www.ni.com/zh-cn/shop/model/usrp-2974.html) 这个型号是NI品牌预组装的产品，它的实质是：NI USRP X310母板 + 两块UBX-160子板 + GPSDO（GPS驯服时钟）+ 一台4核心2GHz主频i7(6822EQ)小主机。相比上述X310+Dual UBX-160方案，在保留双10 GbE连接的基础上，由于机器内置了一台中等性能的小主机，该型号具备开箱即用的能力。

### NI USRP X310母板搭配双TwinRx子板

[NI USRP X310母板](https://www.ettus.com/all-products/X310-KIT/) 搭配两块 [TwinRx子板](https://www.ettus.com/all-products/twinrx/)，可以实现10-6000 MHz范围内最大4通道100 MHz Rx采样能力。请注意，TwinRx子板仅具备Rx，不提供Tx（所以称为TwinRx）。时钟同步方面，它支持输出时钟信号也支持输入外部时钟信号，支持USRP多设备组合功能，可实现多机、多通道条件下的时钟同步。它提供双口10 GbE连接能力，可通过10 GbE以太网网卡连接台式电脑或通过10GbE-to-Thunderbolt3转换器连接带有Thunderbolt3接口的笔记本电脑，可满足Wi-Fi 80 MHz CBW下多种收发和测量任务。

NI有一个更有性价比的开箱即4x4 MIMO Tx/Rx的硬件，是 [NI USRP N310](https://www.ettus.com/all-products/usrp-n310/)，它相比NI USRP X310母板搭配双TwinRx子板的方案更便宜，还支持4通道Tx，但是 **我们不推荐Wi-Fi ISAC用户采购NI USRP N310**。原因在于，NI USRP N310的master clock仅有122.88, 125, 153.6 MSPS/s这三种，这几个频率与Wi-Fi的 20/40/80/160 MHz带宽均不匹配。为了在Wi-Fi的带宽工作，NI USRP N310始终需要基带重采样，性能损失严重，故不推荐。

### NI USRP N320/N321

[NI USRP N320](https://www.ettus.com/all-products/usrp-n320/) 的总体性能略高于X310或USRP-2974平台，它可实现3-6000 MHz范围，最大双通道250 MHz采样，支持Radar mode，时钟同步方面，它支持输出时钟信号也支持输入外部时钟信号，支持USRP多设备组合功能，可实现多机、多通道条件下的时钟同步。它提供双口10GbE连接能力，可通过10 GbE以太网网卡连接台式电脑或通过10 GbE-to-Thunderbolt 3转换器连接带有Thunderbolt3接口的笔记本电脑，可满足Wi-Fi 160 MHz CBW下多种收发和测量任务。

N320的主要特色是，多台N320可以与 [NI USRP N321](https://www.ettus.com/all-products/usrp-n321/) 搭配使用，实现载波相位级同步。PicoScenes提供了Tx Precoding API，支持基于N321/N320组合的Wi-Fi beamforming/phased array相关研究。

### NI USRP X410

[NI USRP X410](https://www.ettus.com/all-products/usrp-x410/) 是USRP系统目前性能最强的设备，它可在1-7200 MHz范围，最大4通道400 MHz采样([Listening to 40/80/160/320 MHz Bandwidth Channels](scenarios.md#listening-to-4080160320-mhz-bandwidth-channels), [Transmitting 40/80/160/320 MHz bandwidth 802.11a/g/n/ac/ax/be Format Frames](scenarios.md#transmitting-4080160320-mhz-bandwidth-80211agnacaxbe-format-frames))。为支持最大1.6 GSPS的基带信号传输，X410配备了100 GbE连接。时钟同步方面，它内置GPSDO，也支持输出时钟信号也支持输入外部时钟信号([Clock Synchronization across Multiple USRP Devices](scenarios.md#clock-synchronization-across-multiple-usrp-devices))，支持USRP多设备组合功能([Combining Multiple USRP devices](scenarios.md#combining-multiple-usrp-devices))，支持Radar mode([Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format](scenarios.md#wi-fi-radar-802-11bf-mono-static-sensing-mode-with-802-11a-g-n-ac-ax-be-frame-format))，可实现多机、多通道条件下的时钟同步。

### NI OctoClock-G

[NI OctoClock-G](https://www.ettus.com/all-products/OctoClock-G/) 是一台非常好用的时钟分配单元。它内置一块GPSDO（GPS驯服时钟），在GPS接入时，可提供 <1 ppb水平的频率精度；并支持将此时钟分配给最多8个设备。它也提供了开关，可以在内置的GPSDO和外置时钟源切换。

## 其它要考虑的因素

### 我需要买几台设备？

您在确定设备采购台数时，可考虑以下因素：

1. Radar Mode([Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format](scenarios.md#wi-fi-radar-802-11bf-mono-static-sensing-mode-with-802-11a-g-n-ac-ax-be-frame-format))是对USRP新用户非常友好的模式，仅需要一台NI USRP B210就可以进行感知研究；
2. 为了构成基于USRP的Tx-Rx链路，请考虑采购2台；当然，如果您预备有限，也可以使用一台USRP和商用Wi-Fi网卡进行Wi-Fi ISAC研究；
3. 初次采购时，请考虑是否需要OctoClock-G时钟，用于时钟同步、相位对齐等操作（Radar Mode收发链路自同步，无需采购时钟！）；
4. NI USRP系列每年两次调（涨）价，并且幅度不低，每次在5-10%左右。所以如果经费允许，可考虑增加采购量；

### 您需要对货期有预估

NI USRP系列完全由NI在马来西亚或匈牙利的工厂按订单生产，从生产、寄出、清关最终交付您手上，大约需要4-6周时间（一般来说4周概率高）。如果您有一些关键的项目时间节点，请提前规划。

### 强烈推荐您采购NI原厂延保服务

根据我们的使用经验以及来自NI的反馈，USRP系列设备确实非常容易损坏，尤其是对于新手用户。NI原厂为正品设备自出库之日起提供1年原厂质保，该质保为不区分人为因素、不限次数的免费维修服务。**但是，一旦过保，单次维护费用则是设备售价的30%**！例如一台X310套装12万元左右，不论如何轻微的损坏，单次维修费用都高达3.6万元左右，属实极为昂贵。这对广大科研用户会有两个突出的问题：

1. 维修价格昂贵，经费不易申请；
2. 有经费也想维修，但因申报书中没有预算维修费，因无法报销而无法维修；

NI原厂提供 **随硬件一次性购买** 的USRP延保服务：该延保服务随设备一并采购，**每延长一年质保仅额外支付售价的5%，最多延长4年。** 例如，X310套装售价12万元左右，如果您想延长4年质保（总共5年），则额外支付2.4万元，总计14.4万元。延保期间，保修政策不变，这意味着两点优势：

1. 以20%的费用，获得5年内不限次数、不区别人为因素的维修服务；这相比单次维修30%的维修费，**堪称良心**
2. 质保+延保期间，无需担心高昂的维修费以及报销等问题。

## 报价与支付方式

### USRP产品的厂商指导价 v.s 我们的报价规则 

- 厂商指导价：USRP产品相对小众，NI推荐各授权经销商以"询价"方式接触用户。该模式对大部分用户并不友好，因为用户并不知道NI的产品指导价，所以用户处于信息明显不对称的劣势位置，或者说——韭菜。但实际上，**USRP的厂商指导价一直是公开透明的**，公式很简单： NI或Ettus官网的美元或人民币价格 * 1.13（税）+ [NI对Ettus产品根据型号额外加的费用大约1000~10000元] = 厂商指导价。例如 USRP B210型号，[Ettus官网售价2101美元](https://www.ettus.com/all-products/ub210-kit/)（23年11月），按以上公式算得17979元，接近厂商指导价格（23年11月）；再例如NI USRP-2974型号，[NI官网售价169495元人民币](https://www.ni.com/zh-cn/shop/model/usrp-2974.html)（23年11月），按以上公式算得191529元人民币，即接近厂商指导价格（23年11月）。

- 我们的报价：我们遵守NI的规则，不公开准确的厂商指导价格。但为了兑现"不追求过分利润"的承诺，同时消除询价过程的沟通成本，我们统一 *对厂商指导价格百位四舍五入*，作为我们这里的一口价报价。

### 我们的报价（2024年5月）

| 型号 | 报价（元）| 延保1年 | 延保2年 | 延保3年 | 延保4年 |
|------|-----------|---------|---------|---------|---------|
| B210 | 19000 | 19950 | 20900 | 21850 | 22800 |
| X310 + Dual UBX-160 | 122000 | 128100 | 134200 | 140300 | 146400 |
| NI USRP-2974 | 204000 | 214200 | 224400 | 234600 | 244800 |
| X310 + Dual TwinRx | 168000 | 176400 | 184800 | 193200 | 201600 |
| N320 | 175000 | 183750 | 192500 | 201250 | 210000 |
| N321 | 197000 | 206850 | 216700 | 226550 | 236400 |
| X410 | 260000 | 273000 | 286000 | 299000 | 312000 |
| OctoClock-G | 31000 | 32550 | 34100 | 35650 | 37200 |
| 其它型号USRP请询价 | N/A | N/A | N/A | N/A | N/A |
| NI USRP B210 原厂外壳 | 1500 | N/A | N/A | N/A | N/A |

### 支付方式

请加微信咨询购买: jiangzhiping；我们支持学校或机构通过采购合同方式购买，可开具电子发票，支持对公转账。

## 亲身经历：不要选择山寨USRP，会后悔

由于早期Ettus品牌产品（如NI USRP N2x0/B2x0/X3x0系列及配套子板）开源了完全的原理图，国内涌现出一些山寨USRP产品，价格覆盖NI正品的30%到80%。这些厂商均声称"100%复刻NI原厂设计，不会有任何差异"。我们团队此前也采购过不同厂商的山寨B210，价格分别为正品的30%和70%，虽然采购时的确是便宜了不少，但 **无一例外地让人感到极为后悔，不仅采购了电子垃圾，还受到了客服和技术支持的轻视，更耽误了科研进展**。我们的遭遇向大家介绍一下：

- **无法同步时钟**：从厂商A处采购的山寨B210无法外接时钟。
- **时钟噪声大**：从厂商B处采购的山寨B210能够外接时钟，但时钟噪声明显比NI正品B210大。
- **Rx信噪比明显比正品差**：从厂商A和B处采购的山寨B210（确定不同生产商）均出现了同样的问题，时间久了才发现这个问题，而且无法退货。Rx信噪比的下降对射频研究来说非常致命。具体来说，无论是Channel A还是B，山寨产品的Rx信噪比明显比NI正品B210差很多。NI正品B210在30 dBm的Rx增益下可以完好地接收信号，而山寨产品则需要额外增加15-20 dBm的增益。即使勉强接收到信号，山寨产品的Rx端解调的误码率（EVM）也比正品差大约8 dB左右。
- **傲慢的客服和技术支持**：客观地说，我们的团队已经算是非常了解USRP的用户了，但仍然遭遇鄙视... 很难想象新手用户的遭遇。
