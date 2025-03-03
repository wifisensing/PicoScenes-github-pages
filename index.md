---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

---

# PicoScenes: Enabling Modern Wi-Fi ISAC Research!

## News!

- **May 12, 2024** PicoScenes Radar mode now supports SISO, SIMO, MIMO and MIMO across multiple devices measurements, see [Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format](/scenarios/#wi_fi_radar_80211bf_mono_static_sensing_mode_with_80211agnacaxbe_frame_format).
- **Mar. 19, 2024** PicoScenes now provides a UDP forwarding/receiving utility! See [UDP-Forwarder Plugin & UDPRemoteLogger](utilities#udp_forwarder_plugin_and_udpremotelogger).
- **Mar. 19, 2024** PicoScenes now officially supports Ubuntu 22.04! See [PicoScenes Software Installation](/installation/#picoscenes_software_installation).
- **Mar. 12, 2024** We are pleased to announce that our research, "**Reshaping Wi-Fi ISAC with High-Coherence Hardware Capabilities**", has been accepted by **IEEE Communication Magazine (IF=11.2)**. For More information, please visit its online supplementary materials [Online supplementaries for "Reshaping Wi-Fi ISAC with High-Coherence Hardware Capabilities"](/reshaping-wifi-isac/).
- **Jan. 20, 2024** [Developing Your PicoScenes Plugins](/plugin/) page is completely rewritten. Thanks to Tian Teng for his brilliant work!
- **Dec. 26, 2023** Revise the [Selling NI USRP Devices (与NI合作销售USRP系列产品)](/ni/) page.
- **Dec. 20, 2023** Initiating the Ubuntu 22.04 (and soon 24.04) transition of PicoScenes system (client program and CI server).
- **Dec. 3, 2023** Add Radar and MIMO-Radar modes for SDR frontend, see [Wi-Fi Radar (802.11bf Mono-Static Sensing Mode) with 802.11a/g/n/ac/ax/be Frame Format.](scenarios#wi_fi_radar_80211bf_mono_static_sensing_mode_with_80211agnacaxbe_frame_format).
- **Dec. 2, 2023** Major update to license: all limitations for COTS NICS (6 GHz band, 11ax 80/160 MHz CBW packet injection and more) removed! More than 10 SDR-only limitations are removed (unlimited channel/bandwidth access, Wi-Fi 7 Tx and Rx, up to 320 MHz CBW and more). See [Features & License](features_pricing) for more details. (**Upgrade to latest version to validate**!)
- **Nov. 29, 2023** Add a new page [Selling NI USRP Devices (与NI合作销售USRP系列产品)](/ni/) describing how we collaborate with NI selling USRP hardware. This program is exclusively available in mainland China.
- **Nov. 28, 2023** Add a new page [Features & License](/features_pricing/) replacing the old PSLP page.
- **Nov. 20, 2023** page [CSI Measurement using PicoScenes](/scenarios/) is completely rewritten. Readability is significantly improved.
- **Nov. 18, 2023** Add docs for two experimental features: [Dual-Channel Spectrum Splitting and Stitching (Experimental)](/scenarios/#dual_channel_spectrum_splitting_and_stitching_experimental) and [Multi-Thread Rx Decoding (Experimental)](/scenarios/#multi_thread_rx_decoding_experimental).
- **Nov. 17, 2023** Add two quick reference pages: [Wi-Fi Channelization](/channels/) and [PicoScenes Presets](/presets/).
- **Nov. 16, 2023** Page revised [Supported Hardware](/hardware/), [PicoScenes Installation & Upgrade](/installation/), [CSI Measurement using PicoScenes](/scenarios/), and [Utility Programs and Bash Scripts](/utilities/).
- **Nov. 1, 2023** **PicoScenes adds Wi-Fi 7 (EHT-SU) support for SDR frontends.** PicoScenes is currently the only platform support Wi-Fi 7 based ISAC research. See our Wi-Fi 7 examples [Transmitting 802.11a/g/n/ac/ax/be protocol frames using SDR Devices](/scenarios/#isac_research_using_ni_usrp_or_hackrf_one_sdr).

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

You may refer to [Features & License](features_pricing) to learn all the features of PicoScenes platform. We hope you enjoy the next ride of Wi-Fi ISAC research, supercharged by PicoScenes!

## Table of Contents

[1. Gallery](/gallery/)
  - [1.1. PicoScenes Driving USRP B210 and HackRF One to Inject 11AX Packets and Measuring CSI (1 & 2)](/gallery/#b210_hackrf)
  - [1.2. Live CSI measurement and plot using HackRF One](/gallery/#hackrf_live)
  - [1.3. AX210 NIC in STA mode measuring the 160-MHz bandwidth CSI and live-plotting](/gallery/#ax210_160)
  - [1.4. AX210 NIC in Monitor Mode measuring CSI for all overheard framed and live-plotting](/gallery/#ax210_monitor)
  - [1.5. AX210 NIC Measuring CSI in Monitor mode w/ 20/160-MHz BW Packet Injection from Another AX210](/gallery/#ax210_another_210)
  - [1.6. AX210 NIC Measuring CSI in Monitor mode w/ Round-trip CSI and Frequency Hopping](/gallery/#ax210_ax210)
  - [1.7. CSI measurements over a large and continuous spectrum by QCA9300](/gallery/#scan_9300)
  - [1.8. CSI measurements under tunable and wide baseband bandwidths](/gallery/#qca9300_tune_bw)
  - [1.9. Large spectrum stitching using two QCA9300 NICs](/gallery/#stitching_9300)
  - [1.10. Large spectrum stitching using A USRP X310 and a QCA9300 NIC](/gallery/#stitching_x310_9300)
  - [1.11. Installation of PicoScenes MATLAB Toolbox and drag'n'drop style .csi file parsing](/gallery/#dragndrop)
  - [1.12. 27-NIC Wi-Fi sensing array](/gallery/#nic_array)

[2. Users](/users/)
  - [2.1. Published Papers by PicoScenes Users](users#published_papers_by_picoscenes_users)
  - [2.2. Affiliations using PicoScenes](users#affiliations_using_picoscenes)

[3. Supported Hardware](/hardware/)

[4. Features & License](/features_pricing/)
  - [4.1. Features of The PicoScenes Platform](features_pricing#features_of_the_picoscenes_platform)
  - [4.2. Introducing PicoScenes Licensing Plan](features_pricing#introducing_picoscenes_licensing_plan)
  - [4.3. Pricing & Payment](features_pricing#pricing_payment)

[5. PicoScenes Installation & Upgrade](/installation/)
  - [5.1. Hardware Installation](installation#hardware_installation)
  - [5.2. PicoScenes Software Installation](installation#picoscenes_software_installation)
  - [5.3. Install PicoScenes MATLAB Toolbox Core](installation#install_picoscenes_matlab_toolbox_core)
  - [5.4. Installing PicoScenes Python Toolbox](installation#installing_picoscenes_python_toolbox)
  - [5.5. Upgrading PicoScenes Software](installation#upgrading_picoscenes_software)
  - [5.6. Uninstallation of The PicoScenes Ecosystem](installation#uninstallation_of_the_picoscenes_ecosystem)  

[6. CSI Measurement using PicoScenes](/scenarios/)
  - [6.1. Before Getting Started: Some Fundamentals](scenarios#before_getting_started_some_fundamentals)
  - [6.2. ISAC Research using NI USRP or HackRF One SDR](scenarios#isac_research_using_ni_usrp_or_hackrf_one_sdr)
  - [6.3. CSI Measurement using AX210/AX200 NICs](scenarios#csi_measurement_using_ax210ax200_nics)
  - [6.4. CSI Measurement using QCA9300 and IWL5300 NICs](scenarios#csi_measurement_using_qca9300_and_iwl5300_nics)
  - [6.5. Interoperability among SDR and COTS NICs](scenarios#interoperability_among_sdr_and_cots_nics)


[7. Command Line Interface and Program Option Reference](/parameters/)
  - [7.1. PicoScenes Command Line Interface](parameters#picoscenes_command_line_interface)
  - [7.2. Program Options Hierarchy](parameters#program_options_hierarchy)
  - [7.3. Platform Startup Options (Bottom)](parameters#platform_startup_options_bottom)
  - [7.4. Platform Options](parameters#platform_options)
  - [7.5. Frontend Level Options](parameters#frontend_level_options)
  - [7.6. Per-Plugin Level Options (Top)](parameters#per_plugin_level_options_top)

[8. PicoScenes MATLAB Toolbox Core](/matlab/)
  - [8.1. Prerequisites](matlab#prerequisites)
  - [8.2. Obtain PicoScenes MATLAB Toolbox Core](matlab#obtain_picoscenes_matlab_toolbox_core)
  - [8.3. Install PMT-Core in MATLAB](matlab#install_pmt_core_in_matlab)
  - [8.4. Verify the installation](matlab#verify_the_installation)
  - [8.5. Usage](matlab#usage)

[9. Utility Programs and Bash Scripts](/utilities/)
  - [9.1. UDP-Forwarder Plugin & UDPRemoteLogger](utilities#udp_forwarder_plugin_and_udpremotelogger)
  - [9.2. Utility Scripts](utilities#utility_scripts)

[10. Developing Your PicoScenes Plugins](/plugin/)
  - [10.1. Prerequisites](plugin#prerequisites)
  - [10.2. Developing PicoScenes Plugins](plugin#developing_picoscenes_plugins)
  - [10.3. Debug PicoScenes plugins](plugin#debug_picoscenes_plugins)

[11. Development Status](/status/)

[12. Useful Resources](/resources/)
  - [12.1. The academic paper of PicoScenes](resources#the_academic_paper_of_picoscenes)
  - [12.2. Quick Reference](resources#quick_reference)
  - [12.3. Opensource repositories](resources#opensource_repositories)
  - [12.4. Other useful resources on Wi-Fi/RF/Smart Sensing](resources#other_useful_resources_on_wi_fi_rf_smart_sensing)

[13. Troubleshooting & Support](/troubleshooting/)
  - [13.1. Troubleshooting](troubleshooting#troubleshooting)
  - [13.2. Technical Support](troubleshooting#technical_support)

[14. PicoScenes Software End User License Agreement](/eula/)

[15. Credits](/credits/)
  - [15.1. Development Team](credits#development_team)
  - [15.2. Open-source software](credits#open_source_software)

[16. Selling NI USRP Devices (与NI合作销售USRP系列产品)](/ni/)
  - [16.1. 从我们这里采购USRP设备的优势：放心、省钱、省事](ni#advantages_of_choosing_us)
  - [16.2. 我们推荐的USRP型号](ni#recommended_models)
  - [16.3. 其它要考虑的因素](ni#other_things_to_consider)
  - [16.4. 报价与支付方式](ni#pricing_and_payment_methods)
  - [16.5. 亲身经历：不要选择山寨USRP，会后悔](ni#personal_experience_do_not_choose_fake_usrp_you_will_regret_it)