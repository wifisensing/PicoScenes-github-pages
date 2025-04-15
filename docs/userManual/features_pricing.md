---
title: Features & License
autoNumbering: true
startNumber: 4
---

PicoScenes is a feature-rich, powerful, and user-friendly middleware for Wi-Fi ISAC research. This page outlines the notable features of PicoScenes and provides links to their usage and explanations.

To ensure the sustainable development of the PicoScenes platform, we have implemented a licensing mechanism for these features. **The majority of features are available free of charge**, while a license fee is required for certain advanced features, *only for SDR frontends*.

In the sections below, we cover three main topics:

- [Features of The PicoScenes Platform](#features-of-the-picoscenes-platform)
- [Introducing PicoScenes Licensing Plan](#introducing-picoscenes-licensing-plan)
- [Pricing & Payment](#pricing--payment)

> 如果您不想费劲地看英文，请开启浏览器的翻译功能，省脑子。

## Features of The PicoScenes Platform

We categorize the distinctive features of the PicoScenes platform into three tables: [Platform Features](#platform-features), [Hardware Features](#hardware-features), and [Data & API Access](#data--api-access). In these tables, we also list the availability of each feature for free users (in the *Free* columns) and Pro users (in the *Pro* columns). A detailed comparison between the Free and Pro licenses can be found in [Introducing PicoScenes Licensing Plan](#introducing-picoscenes-licensing-plan) and [Pricing & Payment](#pricing--payment).

### Platform Features

| Feature | Description | Free | Pro |
|---------|-------------|------|-----|
| Rich Hardware Support | PicoScenes supports COTS NICs (AX210/AX200, QCA9300, and IWL5300) and SDR Devices (NI USRP Series and Hack RF One). See [Supported Hardware](hardware.md) | **✓** | **✓** |
| Hardware Interoperability | Frame transmission and CSI measurement among heterogeneous hardware. See [Interoperability among SDR and COTS NICs](scenarios.md#interoperability-among-sdr-and-cots-nics). | **✓** | **✓** |
| Easy Installation | Out-of-box experience. Easy installation on Ubuntu 22.04 in less than 10 mins. No kernel or driver compilations. Debian *apt* based upgrading. See [PicoScenes Installation & Upgrade](installation.md). | **✓** | **✓** |
| PicoScenes MATLAB Toolbox | Parsing the .csi files in MATLAB via Drag'n'Drop. See [PicoScenes MATLAB Toolbox Core](matlab.md). | **✓** | **✓** |
| Plugins Development | Allowing users to implement their own ISAC measurement protocols, like round-trip CSI measurements or spectrum scanning. See [Developing Your PicoScenes Plugins](plugin.md) | **✓** | **✓** |
| Best in class Documentation | https://ps.zpj.io | **✓** | **✓** |
| Public Technical Support | Public and searchable assistance at https://github.com/wifisensing/PicoScenes-Issue-Tracker | **✓** | **✓** |
| Very Timely and Personal Technical Support on IM | **Very timely assistance on WeChat or other IM Apps, only for Pro users** | | **✓** |

### Hardware Features

We categorize the technical features based on the underlying hardware: [Support for SDR: NI USRP Hardware and HackRF One](#sdr-support-ni-usrp-hardware-and-hackrf-one), [COTS NIC: AX210 and AX200](#cots-nic-ax210-and-ax200), [COTS NIC: QCA9300 and IWL5300](#cots-nic-qca9300-and-iwl5300).

### SDR Support: NI USRP Hardware and HackRF One

One of the major highlights of the PicoScenes platform is its built-in high-performance software baseband implementation of the 802.11 PHY, which *supports the 802.11a/g/n/ac/ax/be protocols, 4096-QAM, up to 320 MHz CBW, and LDPC codecs*. Developed in C++, it leverages the multi-threading, BLAS library, and AVX2 instruction set for accelerated processing.

| Feature | Description | Free | Pro |
|---------|-------------|------|-----|
| SDR Hardware Support | Supporting *all models* of NI USRP SDR devices and the HackRF One. See [ISAC Research using NI USRP or HackRF One SDR](scenarios.md#isac-research-using-ni-usrp-or-hackrf-one-sdr) | **✓** | **✓** |
| Transmit 11a/g/n/ac/ax/be-Format Frames | SDR-based *Packet Injection* supporting up to 320 MHz CBW and Wi-Fi 7 format. See [Transmitting 40/80/160/320 MHz bandwidth 802.11a/g/n/ac/ax/be Format Frames](scenarios.md#transmitting-4080160320-mhz-bandwidth-80211agnacaxbe-format-frames) | **✓** (Up to 2x2 MIMO) | **✓** |
| Receiving and Measuring CSI | *Fully Passive Sensing* with Wi-Fi 7 format and up to 320 MHz CBW. See [Listening to 40/80/160/320 MHz Bandwidth Channels](scenarios.md#listening-to-4080160320-mhz-bandwidth-channels) | **✓** (Up to 2x2 MIMO) | **✓** |
| Rx Multi-Thread Decoding | Scaling-up Rx decoding performance. See [Multi-Thread Rx Decoding (Experimental)](scenarios.md#multi-thread-rx-decoding-experimental) | **✓** | **✓** |
| Tx/Rx Gain Control | Manual Tx/Rx gain control, and Rx AGC. See [Tx Gain Control](scenarios.md#tx-gain-control) and [Rx Gain Control: Manual GC and AGC](scenarios.md#rx-gain-control-manual-gc-and-agc) | **✓** | **✓** |
| Tx Chain Specification | Multi-(RF) Channel and MIMO Transmission up to 4x4. See [Multi-Channel (RF Chain) and MIMO Tx with NI USRP Devices](scenarios.md#multi-channel-rf-chain-and-mimo-tx-with-ni-usrp-devices) | **✓** (Up to 2 channels) | **✓** |
| Rx Chain Specification | Multi-(RF) Channel Reception up to 4x4 MIMO. See [Multi-Channel Rx by Single NI USRP Device](scenarios.md#multi-channel-rx-by-single-ni-usrp-device) and [Multi-Channel Rx by Multiple NI USRP Devices](scenarios.md#multi-channel-rx-by-multiple-ni-usrp-devices) | **✓** (Up to 2 channels) | **✓** |
| Antenna Selection | Tx/Rx antenna specification. See [Antenna Selection (Only for NI USRP Device)](scenarios.md#antenna-selection-only-for-ni-usrp-device) | **✓** | **✓** |
| Operating in Non-Standard Channel | Operating at any hardware-supported frequency range. See [Transmission, Reception, and CSI Measurement with Non-Standard Channel and Bandwidth](scenarios.md#transmission-reception-and-csi-measurement-with-non-standard-channel-and-bandwidth). | **✓** | **✓** |
| Operating with Non-Standard Bandwidth | Operating with any hardware-supported sampling rate. See [Transmission, Reception, and CSI Measurement with Non-Standard Channel and Bandwidth](scenarios.md#transmission-reception-and-csi-measurement-with-non-standard-channel-and-bandwidth).| **✓** | **✓** |
| Record and Replay Tx/Rx Baseband Signals | Record Tx and Rx baseband signals, and replay them during offline analysis. See [Signal Recording and Replaying (Both Tx and Rx Ends)](scenarios.md#signal-recording-and-replaying-both-tx-and-rx-ends) | **✓** (Only Rx Record and Replay) | **✓** |
| Tx/Rx Resampling | Realizing arbitrary bandwidth Tx/Rx on USPRs with fixed master clock rate, e.g., achieving 320 MHz CBW with 400 MHz fix-rate NI USRP X410. See [Non-Standard Tx/Rx with NI USRP N2x0/X3x0/N3x0 Series](scenarios.md#non-standard-txrx-with-ni-usrp-n2x0x3x0n3x0-series). | **✓** | **✓** |
| Support External Clock Source | Realizing Multi-USRP clock/phase synchronization. See [Clock Synchronization across Multiple USRP Devices](scenarios.md#clock-synchronization-across-multiple-usrp-devices) | | **✓** |
| Multi-USRP Combination | Combining multiple USRP devices into a virtual and larger USRP with more synchronized channels, e.g., achieving up to 8x8 MIMO using four NI USRP X310. See [Multi-Channel Rx by Single NI USRP Device](scenarios.md#multi-channel-rx-by-single-ni-usrp-device), [Multi-Channel Rx by Multiple NI USRP Devices](scenarios.md#multi-channel-rx-by-multiple-ni-usrp-devices), and [Multi-Channel (RF Chain) and MIMO Tx with NI USRP Devices](scenarios.md#multi-channel-rf-chain-and-mimo-tx-with-ni-usrp-devices) | **✓** (Up to 2 devices) | **✓** |
| Multi-Channel Splitting and Stitching | Combining two half-rate sampling channels into a full-rate channel, e.g., achieving up to 400 MHz bandwidth with a single NI USRP X310 (200 MHz rate max.). See [Dual-Channel Spectrum Splitting and Stitching (Experimental)](scenarios.md#dual-channel-spectrum-splitting-and-stitching-experimental) | **✓** | **✓** |
| Multiple CSI Measurement per Frame | Supporting up to 39 CSI measurements from a single frame. See [Multiple CSI Measurements per Frame](scenarios.md#multiple-csi-measurements-per-frame). | **✓** | **✓** |
| Channel Impairment Simulation | Simulating CFO, SFO, I/Q Imbalance and their combinations at Tx or Rx end. See [Channel Impairment Simulation](scenarios.md#channel-impairment-simulation) | **✓** | **✓** |
| Wi-Fi Radar Mode | The *self-Tx-self-Rx* radar model for Wi-Fi sensing research. See [Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format](scenarios.md#wi-fi-radar-802-11bf-mono-static-sensing-mode-with-802-11a-g-n-ac-ax-be-frame-format) | **✓** | **✓** |
| Interoperability | Interoperability with COTS NICs, AX210/AX200, QCA9300, IWL5300 and all other Wi-Fi NICs. See [Interoperability among SDR and COTS NICs](scenarios.md#interoperability-among-sdr-and-cots-nics). | **✓** | **✓** |

### COTS NIC: AX210 and AX200

PicoScenes is the exclusive platform that supports the packet injection (Tx), receiving, and CSI measurement on Intel AX210/AX200 NIC. All features below are free of charge.

| Feature | Description | Free | Pro |
|---------|-------------|------|-----|
| 6 GHz Band Access (**AX210 Only**) | Accessing the full 6 GHz band channels (5955 to 7115 MHz) around the globe. See [CSI Measurement using AX210/AX200 NICs](scenarios.md#csi-measurement-using-ax210ax200-nics) and [Wi-Fi Channelization](channels.md). | **✓** | **✓** |
| CSI Measurement with Associated AP | Measuring CSI from the associated AP. See [CSI Measurement from Associated Wi-Fi AP](scenarios.md#csi-measurement-from-associated-wi-fi-ap) | **✓** | **✓** |
| CSI Measurement in Monitor Mode | Supporting measuring CSI for all overheard frames (11a/g/n/ac/ax format) in monitor mode with up to 160 MHz CBW. See [Fully-Passive CSI Measurement in Monitor Mode](scenarios.md#fully-passive-csi-measurement-in-monitor-mode) | **✓** | **✓** |
| Transmit 11a/g/n/ac/ax-Format Frames | Supporting Packet Injection with 11a/g/n/ac/ax format and up to 160 MHz CBW. See [Packet Injection-Based CSI Measurement (Tx with 802.11a/g/n/ac/ax Format and 20/40/80/160 MHz CBW)](scenarios.md#packet-injection-based-csi-measurement-tx-with-80211agnacax-format-and-204080160-mhz-cbw) and [Packet Injection with MCS Setting and Antenna Selection](scenarios.md#packet-injection-with-mcs-setting-and-antenna-selection) | **✓** | **✓** |
| Runtime Specifying Channel and Bandwidth | Specifying channel, CBW, Tx/Rx chainmasks in runtime by commands or APIs. See [Specifying Channel and Bandwidth in Real-time](scenarios.md#specifying-channel-and-bandwidth-in-real-time). | **✓** | **✓** |

### COTS NIC: QCA9300 and IWL5300

PicoScenes supports the legendary QCA9300 and IWL5300 NICs and exclusively unlocks several low-level controls for QCA9300. All features below are free of charge.

| Feature | Description | Free | Pro |
|---------|-------------|------|-----|
| CSI Measurement by "Monitor mode + Packet Injection" | Packet Injection in 11a/g/n/ac/ax format with 20/40 MHz Channel bandwidth (CBW) with Extra Spatial Sounding (ESS). See [Packet Injection based CSI Measurement](scenarios.md#packet-injection-based-csi-measurement) | **✓** | **✓** |
| Accessing Non-Standard Channel and Bandwidth | QCA9300 supports operating in [2.2-2.9, 4.4-6.1] GHz spectrum and [2.5-80] MHz bandwidth. See [QCA9300 Operating with Non-Standard Channel, Bandwidth, and Manual Rx Gain](scenarios.md#qca9300-operating-with-non-standard-channel-bandwidth-and-manual-rx-gain) | **✓** | **✓** |
| Manual Rx Gain Control | Disabling AGC and specifying a fixed [0-60] dBm Rx Gain. See [QCA9300 Operating with Non-Standard Channel, Bandwidth, and Manual Rx Gain](scenarios.md#qca9300-operating-with-non-standard-channel-bandwidth-and-manual-rx-gain) | **✓** | **✓** |
| Tx/Rx chain specification | Specify Tx and Rx chainmasks in runtime, see [Specifying Tx and Rx Chains](scenarios.md#specifying-tx-and-rx-chains) | **✓** | **✓** |

### Data & API Access

| Feature | Description | Free | Pro |
|---------|-------------|------|-----|
| Complete baseband signal | **SDR Only**. Return the per-packet complete multi-channel baseband signals. See [Data structures of the Raw Parsing](matlab.md#data-structures-of-the-raw-parsing) | **✓** | **✓** |
| Multi-CSI-per-Frame | **SDR Only**. Return multiple CSI measurements (if available). See [Multiple CSI Measurements per Frame](scenarios.md#multiple-csi-measurements-per-frame). | **✓** | **✓** |

## Introducing PicoScenes Licensing Plan

PicoScenes Licensing Plan (PSLP) has two tiers: Free License and Pro License. Their differences are:

- **Free License (PSLP-FL)**: PSLP-FL is free of charge but comes with limited access to advanced features.
- **Pro License (PSLP-PRO)**: PSLP-PRO users pay a license fee and gain full access to all PicoScenes features along with timely technical support. It has two subtypes:
    - **Transferable License (PSLP-PRO-TL)**: It allows users to activate and use the license on a single computer. Users can conveniently transfer the license between computers as needed, providing flexibility for multi-device usage scenarios.
    - **Device-Bound License (PSLP-PRO-DBL)**: This option **ties a untransferable Pro license to a newly-bought NI USRP device.** Compared to PSLP-PRO-TL, PSLP-PRO-DBL users can enjoy immediate and full access to the licensed features without explicit activation and online validation. This model is suitable for researches on newly-bought NI USRP hardware, offering faster program start, and long-term offline operation. This option is exclusively available in mainland China, as discussed in [与NI中国合作赠送 PSLP-PRO-DBL许可证 (Gifting PSLP-PRO-DBL Licenses in Collaboration with NI China)](#与ni中国合作赠送-pslp-pro-dbl许可证-gifting-pslp-pro-dbl-licenses-in-collaboration-with-ni-china).

| PSLP Option | Pros | Cons |
|-------------|------|------|
| PSLP-FL | - Nice documentation on usage at [ps.zpj.io](https://ps.zpj.io)<br>- Installation and upgrade via Debian *apt* facility<br>- Support running self-made PicoScenes plugin<br>- Public technical support via [Issue Tracker](https://github.com/wifisensing/PicoScenes-Issue-Tracker) | - Limited/No advanced features<br>- Online validation (frequent) |
| PSLP-PRO-TL | - *All Pro features* in [Features of The PicoScenes Platform](#features-of-the-picoscenes-platform)<br>- *Timely technical support on IM*<br>- Transferable to other computers | - Online validation (less frequent) |
| PSLP-PRO-DBL (Coming Soon) | - *All Pro features* in [Features of The PicoScenes Platform](#features-of-the-picoscenes-platform)<br>- *Timely technical support on IM*<br>- **Discounted bundle pricing**<br>- Out-of-box experience<br>- Faster program start<br>- Long-term offline operating | - Device bound, not transferable<br>- *Available only in China mainland* |

> Note: PSLP-PUL v0.8.1 is converted to PSLP-PRO-TL in v1.0 automatically.

### 与NI中国合作赠送 PSLP-PRO-DBL许可证 (Gifting PSLP-PRO-DBL Licenses in Collaboration with NI China)

PicoScenes平台非常荣幸地得到 [NI](https://www.ni.com) (美国国家仪器)公司(中国)的认可与支持，NI公司认为"**PicoScenes平台填补了NI公司在Wi-Fi ISAC领域的不足**"。
    
为支持更多用户基于PicoScenes平台及NI USRP系列产品进行Wi-Fi/5G/6G ISAC领域的研究与应用，NI公司(中国)与PicoScenes平台达成合作：对每台从PicoScenes合作公司售出的USRP系列SDR设备(独立机器或"母板+子板"套件)，**免费赠送一份PSLP-PRO-DBL许可证**。作为回报，NI公司(中国)将资助PicoScenes平台、提供多型号USRP设备供PicoScenes平台研发及测试，并提供技术支持。感谢NI公司对PicoScenes平台的认可支持❤️❤️❤️！ 

The PicoScenes platform is honored to receive recognition and support from National Instruments ([NI](https://www.ni.com)). NI acknowledges that "**the PicoScenes platform has addressed the gaps in NI's offering in the Wi-Fi ISAC domain.**" 
    
To support more users in the Wi-Fi/5G/6G ISAC field for research and applications using the PicoScenes platform and NI USRP series products, NI (China) has entered into a collaboration with the PicoScenes team: **a PSLP-PRO-DBL license will be provided free of charge** for each USRP Series SDR device sold by PicoScenes' partner store (independent machine or "motherboard + daughterboard" kit). In return, NI (China) will fund the PicoScenes platform, provide USRP devices for PicoScenes platform development and testing, and offer technical support. We sincerely appreciate NI's recognition and support for the PicoScenes platform ❤️❤️❤️!

## Pricing & Payment

- **PSLP-PRO-TL**: 

  - For Chinese users(中国区用户): **一次性付费8688元人民币得到2个永久PSLP-PRO-TL许可证**。我们捆绑2个许可证一起销售，是因为常用的"(Tx) Packet Injection + (Rx) CSI Measurement in Monitor Mode"模式需要两台机器配合使用。请在我们的合作店铺购买: [PicoScenes软件Pro可转移许可证(PSLP-PRO-TL)](https://item.taobao.com/item.htm?id=752046582148)。
  - For English-speaking users outside mainland China: **One-time payment of 1500 USD for 2 PSLP-PRO-TL licenses**. We bundle 2 PSLP-PRO-TL licenses together for sale because the commonly used ISAC scenario '(Tx) Packet Injection + (Rx) CSI Measurement in Monitor Mode' requires two independent machines. Compared to 8688 RMB (roughly 1200 USD) for Chinese users, the additional $300 USD is for currency exchange processing fee and technical support in English. **Payment channel still establishing .....**

- **PSLP-PRO-DBL**: 我们在这个页面单独说明USRP采购及相关问题： [Selling NI USRP Devices (与NI合作销售USRP系列产品)](ni.md)
