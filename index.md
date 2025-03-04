---
layout: default
title: Home
permalink: /
---

# PicoScenes: Enabling Modern Wi-Fi ISAC Research!

## News!

- **May 12, 2024** PicoScenes Radar mode now supports SISO, SIMO, MIMO and MIMO across multiple devices measurements, see [Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format](scenarios.md#623-wi-fi-radar-80211bf-mono-static-sensing-mode-with-80211agnacaxbe-frame-format).
- **Mar. 19, 2024** PicoScenes now provides a UDP forwarding/receiving utility! See [UDP-Forwarder Plugin & UDPRemoteLogger](utilities.md#91-udp-forwarder-plugin--udpremotelogger).
- **Mar. 19, 2024** PicoScenes now officially supports Ubuntu 22.04! See [PicoScenes Software Installation](installation.md#52-picoscenes-software-installation).
- **Mar. 12, 2024** We are pleased to announce that our research, "**Reshaping Wi-Fi ISAC with High-Coherence Hardware Capabilities**", has been accepted by **IEEE Communication Magazine (IF=11.2)**. For More information, please visit its online supplementary materials [Online supplementaries for "Reshaping Wi-Fi ISAC with High-Coherence Hardware Capabilities"](reshaping-wifi-isac.md).
- **Jan. 20, 2024** [Developing Your PicoScenes Plugins](plugin.md) page is completely rewritten. Thanks to Tian Teng for his brilliant work!
- **Dec. 26, 2023** Revise the [Selling NI USRP Devices (与NI合作销售USRP系列产品)](ni.md) page.
- **Dec. 20, 2023** Initiating the Ubuntu 22.04 (and soon 24.04) transition of PicoScenes system (client program and CI server).
- **Dec. 3, 2023** Add Radar and MIMO-Radar modes for SDR frontend, see [Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format.](scenarios.md#623-wi-fi-radar-80211bf-mono-static-sensing-mode-with-80211agnacaxbe-frame-format).
- **Dec. 2, 2023** Major update to license: all limitations for COTS NICS (6 GHz band, 11ax 80/160 MHz CBW packet injection and more) removed! More than 10 SDR-only limitations are removed (unlimited channel/bandwidth access, Wi-Fi 7 Tx and Rx, up to 320 MHz CBW and more). See [Features & License](features_pricing.md) for more details. (**Upgrade to latest version to validate**!)
- **Nov. 29, 2023** Add a new page [Selling NI USRP Devices (与NI合作销售USRP系列产品)](ni.md) describing how we collaborate with NI selling USRP hardware. This program is exclusively available in mainland China.
- **Nov. 28, 2023** Add a new page [Features & License](features_pricing.md) replacing the old PSLP page.
- **Nov. 20, 2023** page [CSI Measurement using PicoScenes](scenarios.md) is completely rewritten. Readability is significantly improved.
- **Nov. 18, 2023** Add docs for two experimental features: [Dual-Channel Spectrum Splitting and Stitching (Experimental)](scenarios.md#6264-dual-channel-spectrum-splitting-and-stitching-experimental) and [Multi-Thread Rx Decoding (Experimental)](scenarios.md#6265-multi-thread-rx-decoding-experimental).
- **Nov. 17, 2023** Add two quick reference pages: [Wi-Fi Channelization](channels.md) and [PicoScenes Presets](presets.md).
- **Nov. 16, 2023** Page revised [Supported Hardware](hardware.md), [PicoScenes Installation & Upgrade](installation.md), [CSI Measurement using PicoScenes](scenarios.md), and [Utility Programs and Bash Scripts](utilities.md).
- **Nov. 1, 2023** **PicoScenes adds Wi-Fi 7 (EHT-SU) support for SDR frontends.** PicoScenes is currently the only platform support Wi-Fi 7 based ISAC research. See our Wi-Fi 7 examples [Transmitting 802.11a/g/n/ac/ax/be protocol frames using SDR Devices](scenarios.md#622-transmitting-80211agnacaxbe-protocol-frames-using-sdr-devices).

## What is PicoScenes?

PicoScenes is a powerful middleware for modern Wi-Fi integrated sensing and communication (Wi-Fi ISAC) research that addresses two key barriers in the field: hardware limitations and software functionality.

### Hardware Side

PicoScenes is compatible with a wide range of CSI-extractable devices, including commercial off-the-shelf (COTS) Wi-Fi NICs and software-defined radio (SDR) devices. The supported COTS NIC models include Intel Wi-Fi 6E AX210 (**AX210**), Intel Wi-Fi 6 AX200 (**AX200**), Qualcomm Atheros AR9300 (**QCA9300**), and the legendary Intel Wireless Link 5300 (**IWL5300**). The supported SDR devices include the HackRF One and *all* models of **USRP** devices.

For COTS Wi-Fi NICs, PicoScenes provides many exclusive hardware features:

- With AX210/AX200 NIC, PicoScenes is the first and currently the only publicly available platform that enables **CSI extraction for 802.11ax-format** frames using commodity Wi-Fi hardware. It supports CSI extraction for **all Wi-Fi formats (802.11a/g/n/ac/ax)** and **up to 160 MHz bandwidth**. Additionally, PicoScenes enables **CSI measurement for all overheard frames in monitor mode**, utilizing the surrounding Wi-Fi devices as excitation signals for ISAC research & applications.

- With AX210 NIC, PicoScenes is the first and currently the only publicly available platform that enables packet injection and **CSI measurement in the Wi-Fi 6 GHz band** using the AX210 NIC. It unlocks **a total of 1.18 GHz** spectrum from 5945 MHz to 7125 MHz, providing researchers worldwide with continuous spectrum availability for Wi-Fi ISAC research. The AX210 NIC, as the next-generation of AX200, is the only Wi-Fi 6E NIC ready for Wi-Fi ISAC, marking the entrance of Wi-Fi ISAC into the Wi-Fi 6E era.

- With QCA9300 NIC, PicoScenes offers **arbitrary tuning for both carrier frequency and baseband sampling rate**, providing a total of **2.4 GHz-wide spectrum** availability and **2.5 to 80 MHz bandwidth**. It also includes **manual Rx gain control** ranging from 0 to 66 dB. The platform supports QCA9300 to IWL5300 CSI measurement, as well as Tx/Rx radio-chain control and transmission of **extra spatial sounding** LTFs (HT-ELTFs).

For SDR, PicoScenes is currently the *only* platform that can transform a SDR device into a SDR-based Wi-Fi NIC, *i.e.*, **transmitting/receiving Wi-Fi frames and measuring their CSI in real time just like a full-functional Wi-Fi NIC**. It has four major highlights: full protocol compliance, rich PHY-layer control, complete and all-stage PHY-layer information, and high performance.

- **Full Protocol Compliance up to Wi-Fi 7**: PicoScenes Wi-Fi baseband supports transmitting and receiving Wi-Fi frames in all formats, including 802.11a/g/n/ac/**ax/be**, and across all bandwidths (20/40/80/**160/320 MHz**). It also supports all coding schemes (LDPC and BCC), *all modulation and coding schemes (MCS 0 to 13)*, and *up to 4x4 MIMO*.

- **Rich PHY-Layer Control**: PicoScenes **grants users extensive control over the transmission and reception process**. Users can operate in non-standard carrier frequencies and bandwidths, manually specify carrier frequency offset (CFO), sampling frequency offset (SFO), symbol timing offset (STO), I/Q mismatching, resampling, and various OFDM encoding/decoding settings. PicoScenes is the first platform to provide *signal precoding/steering capabilities*, allowing users to implement beamforming, phased array, or arbitrary Tx equalization. For example, users can specify antenna positions and desired angles of departure (AoD) for phased array applications, and PicoScenes will calculate the steering matrix and apply it to the spatial mapping mechanism of 802.11n/ac/ax/be.

- **Complete and All-Stage PHY-Layer Information**: PicoScenes provides users with comprehensive information about the PHY layer. This includes not only the *raw I/Q streams* but also all the staged information produced during the OFDM demodulation process. This information includes CSI computed by L-LTF (*Legacy CSI*), CSI computed by HT/VHT/HE/EHT-LTF (*HT/VHT/HE/EHT-CSI*), *CFO/SFO estimation*, and low-level *per-packet baseband signals*.

- **High Performance**: PicoScenes is designed to support real-time Wi-Fi ISAC research with high performance. It can achieve up to 1 kHz CSI measurement at a 20 MHz bandwidth (single thread), support *multi-thread RX decoding*, and achieve packet injection rates of up to 4 kHz in real-time mode and up to 40 kHz in *signal-replay mode*. For timing-tolerant research, PicoScenes offers signal record and replay functionalities for both Tx and Rx I/Q streams, enabling users to capture signals and decode frames without packet loss. PicoScenes also provides a *Virtual SDR mode*, allowing users to generate, manipulate, and test Wi-Fi baseband signals without connecting to an actual SDR device.

### Software Side

PicoScenes is far beyond a simple CSI data logger but a versatile Wi-Fi ISAC research platform. As far as we know, It is the first and currently the only platform that supports **multi-NIC concurrent CSI measurement**, which significantly simplifies the array-based CSI measurement. Besides that, it also features the live CSI plot, various low-level controls, and **packet injection in all-format and all-bandwidth**, which promises a fixed-rate CSI measurement.

As a Wi-Fi ISAC research middleware, PicoScenes encapsulates the per-NIC low-level hardware controls into a set of unified APIs and exposes them to the upper-level plugin layer. Through the PicoScenes plugin mechanism, **complex and interactive CSI measurement tasks can be easily prototyped in a mission-focus manner**. We demonstrate this advantage by *EchoProbe*, a PicoScenes plugin, which provides *ms*-grade round-trip CSI measurement, large spectrum scanning and the most basic CSI data logging capabilities.

PicoScenes MATLAB Toolbox (PMT) is the MATLAB parsing routine for the *.csi* file generated by the PicoScenes. The parsing can be as easy as just **dragging the .csi files into MATLAB**. The fundamental data structure is in versioned-segment format, which guarantees forward compatibility across the future upgrade.

The PicoScenes software ecosystem (customized driver, platform, and plugins) is **built against the latest kernel, packaged in the Debian .deb format, and auto-updated via the easy** *apt upgrade* **command**. A fresh-new installation can be as short as 10 minutes. Setting up a CSI-measurement environment can never be such easy!

You may refer to [Features & License](features_pricing.md) to learn all the features of PicoScenes platform. We hope you enjoy the next ride of Wi-Fi ISAC research, supercharged by PicoScenes!

## Table of Contents

[1. Gallery](gallery.md)
  - [1.1. PicoScenes Driving USRP B210 and HackRF One to Inject 11AX Packets and Measuring CSI (1 & 2)](gallery.md#11-picoscenes-driving-usrp-b210-and-hackrf-one-to-inject-11ax-packets-and-measuring-csi-1--2-b210_hackrf)
  - [1.2. Live CSI measurement and plot using HackRF One](gallery.md#12-live-csi-measurement-and-plot-using-hackrf-one)
  - [1.3. AX210 NIC in STA mode measuring the 160-MHz bandwidth CSI and live-plotting](gallery.md#13-ax210-nic-in-sta-mode-measuring-the-160-mhz-bandwidth-csi-and-live-plotting)
  - [1.4. AX210 NIC in Monitor Mode measuring CSI for all overheard framed and live-plotting](gallery.md#14-ax210-nic-in-monitor-mode-measuring-csi-for-all-overheard-framed-and-live-plotting)
  - [1.5. AX210 NIC Measuring CSI in Monitor mode w/ 20/160-MHz BW Packet Injection from Another AX210](gallery.md#15-ax210-nic-measuring-csi-in-monitor-mode-w-20160-mhz-bw-packet-injection-from-another-ax210)
  - [1.6. AX210 NIC Measuring CSI in Monitor mode w/ 20/160-MHz BW Packet Injection from Another AX210](gallery.md#16-ax210-nic-measuring-csi-in-monitor-mode-w-20160-mhz-bw-packet-injection-from-another-ax210)
  - [1.7. CSI measurements over a large and continuous spectrum by QCA9300](gallery.md#17-csi-measurements-over-a-large-and-continuous-spectrum-by-qca9300)
  - [1.8. CSI measurements under tunable and wide baseband bandwidths](gallery.md#18-csi-measurements-under-tunable-and-wide-baseband-bandwidths)
  - [1.9. Large spectrum stitching using two QCA9300 NICs](gallery.md#19-large-spectrum-stitching-using-two-qca9300-nics)
  - [1.10. Large spectrum stitching using A USRP X310 and a QCA9300 NIC](gallery.md#110-large-spectrum-stitching-using-a-usrp-x310-and-a-qca9300-nic)
  - [1.11. Installation of PicoScenes MATLAB Toolbox and drag'n'drop style .csi file parsing](gallery.md#111-installation-of-picoscenes-matlab-toolbox-and-dragndrop-style-csi-file-parsing)
  - [1.12. 27-NIC Wi-Fi sensing array](gallery.md#112-27-nic-wi-fi-sensing-array)

[2. Users](users.md)

[3. Supported Hardware](hardware.md)
  - [3.1. Published Papers by PicoScenes Users](hardware.md#31-published-papers-by-picoscenes-users)
  - [3.2. Affiliations using PicoScenes](hardware.md#32-affiliations-using-picoscenes)

[4. Features & License](features_pricing.md)
  - [4.1. Features of The PicoScenes Platform](features_pricing.md#41-features-of-the-picoscenes-platform)
  - [4.2. Introducing PicoScenes Licensing Plan](features_pricing.md#42-introducing-picoscenes-licensing-plan)
  - [4.3. Pricing & Payment](features_pricing.md#43-pricing-payment)

[5. PicoScenes Installation & Upgrade](installation.md)
  - [5.1. Hardware Installation](installation.md#51-hardware-installation)
  - [5.2. PicoScenes Software Installation](installation.md#52-picoscenes-software-installation)
  - [5.3. Install PicoScenes MATLAB Toolbox Core](installation.md#53-install-picoscenes-matlab-toolbox-core)
  - [5.4. Installing PicoScenes Python Toolbox](installation.md#54-installing-picoscenes-python-toolbox)
  - [5.5. Upgrading PicoScenes Software](installation.md#55-upgrading-picoscenes-software)
  - [5.6. Uninstallation of The PicoScenes Ecosystem](installation.md#56-uninstallation-of-the-picoscenes-ecosystem)

[6. CSI Measurement using PicoScenes](scenarios.md)
  - [6.1. Before Getting Started: Some Fundamentals](scenarios.md#61-before-getting-started-some-fundamentals)
  - [6.2. ISAC Research using NI USRP or HackRF One SDR](scenarios.md#62-isac-research-using-ni-usrp-or-hackrf-one-sdr)
  - [6.3. CSI Measurement using AX210/AX200 NICs](scenarios.md#63-csi-measurement-using-ax210ax200-nics)
  - [6.4. CSI Measurement using QCA9300 and IWL5300 NICs](scenarios.md#64-csi-measurement-using-qca9300-and-iwl5300-nics)
  - [6.5. Interoperability among SDR and COTS NICs](scenarios.md#65-interoperability-among-sdr-and-cots-nics)

[7. Command Line Interface and Program Option Reference](parameters.md)
  - [7.1. PicoScenes Command Line Interface](parameters.md#71-picoscenes-command-line-interface)
  - [7.2. Program Options Hierarchy](parameters.md#72-program-options-hierarchy)
  - [7.3. Platform Startup Options (Bottom)](parameters.md#73-platform-startup-options-bottom)
  - [7.4. Platform Options](parameters.md#74-platform-options)
  - [7.5. Frontend Level Options](parameters.md#75-frontend-level-options)
  - [7.6. Per-Plugin Level Options (Top)](parameters.md#76-per-plugin-level-options-top)

[8. PicoScenes MATLAB Toolbox Core](matlab.md)
  - [8.1. Prerequisites](matlab.md#81-prerequisites)
  - [8.2. Obtain PicoScenes MATLAB Toolbox Core](matlab.md#82-obtain-picoscenes-matlab-toolbox-core)
  - [8.3. Install PMT-Core in MATLAB](matlab.md#83-install-pmt-core-in-matlab)
  - [8.4. Verify the installation](matlab.md#84-verify-the-installation)
  - [8.5. Usage](matlab.md#85-usage)

[9. Utility Programs and Bash Scripts](utilities.md)
  - [9.1. UDP-Forwarder Plugin & UDPRemoteLogger](utilities.md#91-udp-forwarder-plugin-udpremotelogger)
  - [9.2. Utility Scripts](utilities.md#92-utility-scripts)

[10. Developing Your PicoScenes Plugins](plugin.md)
  - [10.1. Prerequisites](plugin.md#101-prerequisites)
  - [10.2. Developing PicoScenes Plugins](plugin.md#102-developing-picoscenes-plugins)
  - [10.3. Debug PicoScenes plugins](plugin.md#103-debug-picoscenes-plugins)

[11. Development Status](status.md)

[12. Useful Resources](resources.md)
  - [12.1. The academic paper of PicoScenes](resources.md#121-the-academic-paper-of-picoscenes)
  - [12.2. Quick Reference](resources.md#122-quick-reference)
  - [12.3. Opensource repositories](resources.md#123-opensource-repositories)
  - [12.4. Other useful resources on Wi-Fi/RF/Smart Sensing](resources.md#124-other-useful-resources-on-wi-firfsmart-sensing)

[13. Troubleshooting & Support](troubleshooting.md)
  - [13.1. Troubleshooting](troubleshooting.md#131-troubleshooting)
  - [13.2. Technical Support](troubleshooting.md#132-technical-support)

[14. PicoScenes Software End User License Agreement](eula.md)

[15. Credits](credits.md)
  - [15.1. Development Team](credits.md#151-development-team)
  - [15.2. Open-source software](credits.md#152-open-source-software)

[16. Selling NI USRP Devices (与NI合作销售USRP系列产品)](ni.md)
  - [16.1. 从我们这里采购USRP设备的优势：放心、省钱、省事](ni.md#161-从我们这里采购usrp设备的优势放心省钱省事)
  - [16.2. 我们推荐的USRP型号](ni.md#162-我们推荐的usrp型号)
  - [16.3. 其它要考虑的因素](ni.md#163-其它要考虑的因素)
  - [16.4. 报价与支付方式](ni.md#164-报价与支付方式)
  - [16.5. 亲身经历：不要选择山寨USRP，会后悔](ni.md#165-亲身经历不要选择山寨usrp会后悔)
