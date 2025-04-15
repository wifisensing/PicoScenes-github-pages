# "PicoScenes: Enabling Modern Wi-Fi ISAC Research!"

## News!

- **May 12, 2024** PicoScenes Radar mode now supports SISO, SIMO, MIMO and MIMO across multiple devices measurements, see [Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format](./userManual/scenarios.md#wi-fi-radar-802-11bf-mono-static-sensing-mode-with-802-11a-g-n-ac-ax-be-frame-format).
- **Mar. 19, 2024** PicoScenes now provides a UDP forwarding/receiving utility! See [UDP-Forwarder Plugin & UDPRemoteLogger](./userManual/utilities.md#udp-forwarder-plugin-udpremotelogger).
- **Mar. 19, 2024** PicoScenes now officially supports Ubuntu 22.04! See [PicoScenes Software Installation](./userManual/installation.md#picoscenes-software-installation).
- **Mar. 12, 2024** We are pleased to announce that our research, "**Reshaping Wi-Fi ISAC with High-Coherence Hardware Capabilities**", has been accepted by **IEEE Communication Magazine (IF=11.2)**. For More information, please visit its online supplementary materials [Online supplementaries for "Reshaping Wi-Fi ISAC with High-Coherence Hardware Capabilities"](./userManual/reshaping-wifi-isac.md).
- **Jan. 20, 2024** [Developing Your PicoScenes Plugins](./userManual/plugin.md) page is completely rewritten. Thanks to Tian Teng for his brilliant work!
- **Dec. 26, 2023** Revise the [Selling NI USRP Devices (与NI合作销售USRP系列产品)](./userManual/ni.md) page.
- **Dec. 20, 2023** Initiating the Ubuntu 22.04 (and soon 24.04) transition of PicoScenes system (client program and CI server).
- **Dec. 3, 2023** Add Radar and MIMO-Radar modes for SDR frontend, see [Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format.](./userManual/scenarios.md#wi-fi-radar-802-11bf-mono-static-sensing-mode-with-802-11a-g-n-ac-ax-be-frame-format).
- **Dec. 2, 2023** Major update to license: all limitations for COTS NICS (6 GHz band, 11ax 80/160 MHz CBW packet injection and more) removed! More than 10 SDR-only limitations are removed (unlimited channel/bandwidth access, Wi-Fi 7 Tx and Rx, up to 320 MHz CBW and more). See [Features & License](./userManual/features_pricing.md) for more details. (**Upgrade to latest version to validate**!)
- **Nov. 29, 2023** Add a new page [Selling NI USRP Devices (与NI合作销售USRP系列产品)](./userManual/ni.md) describing how we collaborate with NI selling USRP hardware. This program is exclusively available in mainland China.
- **Nov. 28, 2023** Add a new page [Features & License](./userManual/features_pricing.md) replacing the old PSLP page.
- **Nov. 20, 2023** page [CSI Measurement using PicoScenes](./userManual/scenarios.md) is completely rewritten. Readability is significantly improved.
- **Nov. 18, 2023** Add docs for two experimental features: [Dual-Channel Spectrum Splitting and Stitching (Experimental)](./userManual/scenarios.md#dual-channel-spectrum-splitting-and-stitching-experimental) and [Multi-Thread Rx Decoding (Experimental)](./userManual/scenarios.md#multi-thread-rx-decoding-experimental).
- **Nov. 17, 2023** Add two quick reference pages: [Wi-Fi Channelization](./userManual/channels.md) and [PicoScenes Presets](./userManual/presets.md).
- **Nov. 16, 2023** Page revised [Supported Hardware](./userManual/hardware.md), [PicoScenes Installation & Upgrade](./userManual/installation.md), [CSI Measurement using PicoScenes](./userManual/scenarios.md), and [Utility Programs and Bash Scripts](./userManual/utilities.md).
- **Nov. 1, 2023** **PicoScenes adds Wi-Fi 7 (EHT-SU) support for SDR frontends.** PicoScenes is currently the only platform support Wi-Fi 7 based ISAC research. See our Wi-Fi 7 examples [Transmitting 802.11a/g/n/ac/ax/be protocol frames using SDR Devices](./userManual/scenarios.md#transmitting-802-11a-g-n-ac-ax-be-protocol-frames-using-sdr-devices).

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

You may refer to [Features & License](./userManual/features_pricing.md) to learn all the features of PicoScenes platform. We hope you enjoy the next ride of Wi-Fi ISAC research, supercharged by PicoScenes!