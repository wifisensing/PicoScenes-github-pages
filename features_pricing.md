Features & License
==================

**Revised on Dec. 4, 2023**

PicoScenes is a feature-rich, powerful, and user-friendly middleware for
Wi-Fi ISAC research. This page outlines the notable features of
PicoScenes and provides links to their usage and explanations.

To ensure the sustainable development of the PicoScenes platform, we
have implemented a licensing mechanism for these features. **The
majority of features are available free of charge**, while a license fee
is required for certain advanced features, *only for SDR frontends*.

In the sections below, we cover three main topics:

-   `feature-list`{.interpreted-text role="ref"}
-   `introducing_pslp`{.interpreted-text role="ref"}
-   `pricing`{.interpreted-text role="ref"}

::: {.hint}
::: {.title}
Hint
:::

如果您不想费劲地看英文，请开启浏览器的翻译功能，省脑子。
:::

Features of The PicoScenes Platform {#feature-list}
-----------------------------------

We categorize the distinctive features of the PicoScenes platform into
three tables: `license-platform-features`{.interpreted-text role="ref"},
`license-hardware-features`{.interpreted-text role="ref"}, and
`license-data-access`{.interpreted-text role="ref"}. In these tables, we
also list the availability of each feature for free users (in the *Free*
columns) and Pro users (in the *Pro* columns). A detailed comparison
between the Free and Pro licenses can be found in
`introducing_pslp`{.interpreted-text role="ref"} and
`pricing`{.interpreted-text role="ref"}.

### Platform Features {#license-platform-features}

  ------------------------------------------------------------------------------------------------
  Feature            Description                                                 Free      Pro
  ------------------ ----------------------------------------------------------- --------- -------
  Rich Hardware      PicoScenes supports COTS NICs (AX210/AX200, QCA9300, and    **✓**     **✓**
  Support            IWL5300) and SDR Devices (NI USRP Series and Hack RF One).            
                     See `/hardware`{.interpreted-text role="doc"}.                        

  Hardware           Frame transmission and CSI measurement among heterogeneous  **✓**     **✓**
  Interoperability   hardware. See `interoperability`{.interpreted-text                    
                     role="ref"}.                                                          

  Easy Installation  Out-of-box experience. Easy installation on Ubuntu 22.04 in **✓**     **✓**
                     less than 10 mins. No kernel or driver compilations. Debian           
                     *apt* based upgrading. See                                            
                     `/installation`{.interpreted-text role="doc"}.                        

  PicoScenes MATLAB  Parsing the .csi files in MATLAB via Drag\'n\'Drop. See     **✓**     **✓**
  Toolbox            `/matlab`{.interpreted-text role="doc"}.                              

  Plugins            Allowing users to implement their own ISAC measurement      **✓**     **✓**
  Development        protocols, like round-trip CSI measurements or spectrum               
                     scanning. See `/plugin`{.interpreted-text role="doc"}                 

  Best in class      <https://ps.zpj.io>                                         **✓**     **✓**
  Documentation                                                                            

  Public Technical   Public and searchable assistance at                         **✓**     **✓**
  Support            <https://github.com/wifisensing/PicoScenes-Issue-Tracker>             

  Very Timely and    **Very timely assistance on WeChat or other IM Apps, only             **✓**
  Personal Technical for Pro users**,                                                      
  Support on IM                                                                            
  ------------------------------------------------------------------------------------------------

### Hardware Features {#license-hardware-features}

We categorize the technical features based on the underlying hardware:
`license_sdr`{.interpreted-text role="ref"},
`license_ax200`{.interpreted-text role="ref"},
`license_qca9300`{.interpreted-text role="ref"}.

### Support for SDR: NI USRP Hardware and HackRF One {#license_sdr}

One of the major highlights of the PicoScenes platform is its built-in
high-performance software baseband implementation of the 802.11 PHY,
which *supports the 802.11a/g/n/ac/ax/be protocols, 4096-QAM, up to 320
MHz CBW, and LDPC codecs*. Developed in C++, it leverages the
multi-threading, BLAS library, and AVX2 instruction set for accelerated
processing.

  Feature                                                                 Description                                                                                                                                                                                                                                                                                                                           Free                                Pro
  ----------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------- -------
  SDR Hardware Support                                                    Supporting *all models* of NI USRP SDR devices and the HackRF One. See `csi_by_sdr`{.interpreted-text role="ref"}                                                                                                                                                                                                                     **✓**                               **✓**
  Transmit 11a/g/n/ac/ax/be-Format Frames with 20/40/80/160/320 MHz CBW   SDR-based *Packet Injection* supporting up to 320 MHz CBW and Wi-Fi 7 format. See `sdr-tx-40-or-higher-cbw`{.interpreted-text role="ref"}                                                                                                                                                                                             **✓** (Up to 2x2 MIMO)              **✓**
  Receiving and Measuring CSI for 20/40/80/160/320 MHz CBW Frames         *Fully Passive Sensing* with Wi-Fi 7 format and up to 320 MHz CBW. See `sdr-rx-40-or-higher-cbw`{.interpreted-text role="ref"}                                                                                                                                                                                                        **✓** (Up to 2x2 MIMO)              **✓**
  Rx Multi-Thread Decoding                                                Scaling-up Rx decoding performance. See `parallel-decoding`{.interpreted-text role="ref"}                                                                                                                                                                                                                                             **✓**                               **✓**
  Tx/Rx Gain Control                                                      Manual Tx/Rx gain control, and Rx AGC. See `tx-gain-control`{.interpreted-text role="ref"} and `rx-gain-control`{.interpreted-text role="ref"}                                                                                                                                                                                        **✓**                               **✓**
  Tx Chain Specification                                                  Multi-(RF) Channel and MIMO Transmission up to 4x4. See `multi-channel-tx`{.interpreted-text role="ref"}                                                                                                                                                                                                                              **✓** (Up to 2 channels)            **✓**
  Rx Chain Specification                                                  Multi-(RF) Channel Reception up to 4x4 MIMO. See `multi-channel-rx-single`{.interpreted-text role="ref"} and `multi-channel-rx-multi`{.interpreted-text role="ref"}                                                                                                                                                                   **✓** Up to 2 channels)             **✓**
  Antenna Selection                                                       Tx/Rx antenna specification. See `antenna_selection`{.interpreted-text role="ref"}                                                                                                                                                                                                                                                    **✓**                               **✓**
  Operating in Non-Standard Channel (Carrier Frequency)                   Operating at any hardware-supported frequency range, *e.g.*, in \[1 - 7.200\] MHz range by the NI USRP X410. See `non-standard-tx-rx`{.interpreted-text role="ref"}.                                                                                                                                                                  **✓**                               **✓**
  Operating with Non-Standard Bandwidth (Sampling Rate)                   Operating with any hardware-supported sampling rate. *e.g.*. up to 400 MHz sampling rate by the NI USRP X410. See `non-standard-tx-rx`{.interpreted-text role="ref"}.                                                                                                                                                                 **✓**                               **✓**
  Record and Replay Tx/Rx Baseband Signals                                Record Tx and Rx baseband signals, and replay them during offline analysis. See `signal-recording-replay`{.interpreted-text role="ref"}                                                                                                                                                                                               **✓** (Only Rx Record and Replay)   **✓**
  Tx/Rx Resampling                                                        Realizing arbitrary bandwidth Tx/Rx on USPRs with fixed master clock rate, *e.g.*, achieving 320 MHz CBW with 400 MHz fix-rate NI USRP X410. See `non-standard-tx-rx-fixed-master-clock`{.interpreted-text role="ref"}.                                                                                                               **✓**                               **✓**
  Support External Clock Source                                           Realizing Multi-USRP clock/phase synchronization. *e.g.*, MIMO Tx/Rx and phased array. See `phase_sync_multiple_device`{.interpreted-text role="ref"}                                                                                                                                                                                                                     **✓**
  Multi-USRP Combination                                                  Combining multiple USRP devices into a virtual and larger USRP with more synchronized channels, *e.g.*, achieving up to 8x8 MIMO using four NI USRP X310. See `multi-channel-rx-single`{.interpreted-text role="ref"}, `multi-channel-rx-multi`{.interpreted-text role="ref"}, and `multi-channel-tx`{.interpreted-text role="ref"}   **✓** (Up to 2 devices)             **✓**
  Multi-Channel Splitting and Stitching                                   Combining two half-rate sampling channels into a full-rate channel, *e.g.*, achieving up to 400 MHz bandwidth with a single NI USRP X310 (200 MHz rate max.). See `dual-split-merge`{.interpreted-text role="ref"}                                                                                                                    **✓**                               **✓**
  Multiple CSI Measurement per Frame                                      Supporting up to 39 CSI measurements from a single frame. See `multi-csi-measurement`{.interpreted-text role="ref"}.                                                                                                                                                                                                                  **✓**                               **✓**
  Channel Impairment Simulation                                           Simulating CFO, SFO, I/Q Imbalance and their combinations at Tx or Rx end. See `channel-impairment-simulation`{.interpreted-text role="ref"}                                                                                                                                                                                          **✓**                               **✓**
  Wi-Fi Radar Mode                                                        The *self-Tx-self-Rx* radar model is highly suitable for Wi-Fi sensing research. See `radar-mode`{.interpreted-text role="ref"}                                                                                                                                                                                                       **✓**                               **✓**
  Interoperability                                                        Interoperability with COTS NICs, AX210/AX200, QCA9300, IWL5300 and all other Wi-Fi NICs. See `interoperability`{.interpreted-text role="ref"}                                                                                                                                                                                         **✓**                               **✓**

### COTS NIC: AX210 and AX200 {#license_ax200}

PicoScenes is the exclusive platform that supports the packet injection
(Tx), receiving, and CSI measurement on Intel AX210/AX200 NIC. All
features below are free of charge.

  Feature                                                          Description                                                                                                                                                                                                          Free    Pro
  ---------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------- -------
  6 GHz Band Access (**AX210 Only**)                               Accessing the full 6 GHz band channels (5955 to 7115 MHz) *around the globe*. See `ax200-measurements`{.interpreted-text role="ref"} and `/channels`{.interpreted-text role="doc"}.                                  **✓**   **✓**
  CSI Measurement with Associated AP                               Measuring CSI from the associated AP. See `ax200-wifi-ap`{.interpreted-text role="ref"}                                                                                                                              **✓**   **✓**
  CSI Measurement in Monitor Mode (**Passive Sensing**)            Supporting measuring CSI for all overheard frames (11a/g/n/ac/ax format) in monitor mode with up to 160 MHz CBW. See `ax200-monitor`{.interpreted-text role="ref"}                                                   **✓**   **✓**
  Transmit 11a/g/n/ac/ax-Format Frames with 20/40/80/160 MHz CBW   Supporting *Packet Injection* with 11a/g/n/ac/ax format and up to 160 MHz CBW. See `ax200-monitor-injection`{.interpreted-text role="ref"} and `ax200-monitor-injection-mcs-antenna`{.interpreted-text role="ref"}   **✓**   **✓**
  Runtime Specifying Channel and Bandwidth                         Specifying channel, CBW, Tx/Rx chainmasks in runtime by commands or APIs. See `live-channel-bw-changing`{.interpreted-text role="ref"}.                                                                              **✓**   **✓**

### COTS NIC: QCA9300 and IWL5300 {#license_qca9300}

PicoScenes supports the legendary QCA9300 and IWL5300 NICs and
exclusively unlocks several low-level controls for QCA9300. See
`picoscenes_paper`{.interpreted-text role="ref"} for more details. All
features below are free of charge.

  Feature                                                   Description                                                                                                                                                                               Free    Pro
  --------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------- -------
  CSI Measurement by "Monitor mode + Packet Injection"      Packet Injection in 11a/g/n/ac/ax format with 20/40 MHz Channel bandwidth (CBW) with Extra Spatial Sounding (ESS). See `packet-injection-qcq9300-iwl5300`{.interpreted-text role="ref"}   **✓**   **✓**
  Accessing Non-Standard Channel and Bandwidth by QCA9300   QCA9300 supports operating in \[2.2-2.9, 4.4-6.1\] GHz spectrum and \[2.5-80\] MHz bandwidth. See `qca9300_non-standard`{.interpreted-text role="ref"}                                    **✓**   **✓**
  Manual Rx Gain Control by QCA9300                         Disabling AGC and specifying a fixed \[0-60\] dBm Rx Gain. See `qca9300_non-standard`{.interpreted-text role="ref"}                                                                       **✓**   **✓**
  Tx/Rx chain specification                                 Specify Tx and Rx chainmasks in runtime, see `tx-rx-chainmask-qca9300-iwl5300`{.interpreted-text role="ref"}                                                                              **✓**   **✓**

### Data & API Access {#license-data-access}

  Feature                    Description                                                                                                                              Free    Pro
  -------------------------- ---------------------------------------------------------------------------------------------------------------------------------------- ------- -------
  Complete baseband signal   **SDR Only**. Return the per-packet complete multi-channel baseband signals. See `cell-structure-matlab`{.interpreted-text role="ref"}   **✓**   **✓**
  Multi-CSI-per-Frame        **SDR Only**. Return multiple CSI measurements (if available). See `multi-csi-measurement`{.interpreted-text role="ref"}.                **✓**   **✓**

Introducing PicoScenes Licensing Plan {#introducing_pslp}
-------------------------------------

PicoScenes Licensing Plan (PSLP) has two tiers: Free License and Pro
License. Their differences are:

-   **Free License (PSLP-FL)**: PSLP-FL is free of charge but comes with
    limited access to advanced features.

-   

    **Pro License (PSLP-PRO)**: PSLP-PRO users pay a license fee and gain full access to all PicoScenes features along with timely technical support. It has two subtypes:

    :   -   **Transferable License (PSLP-PRO-TL)**: It allows users to
            activate and use the license on a single computer. Users can
            conveniently transfer the license between computers as
            needed, providing flexibility for multi-device usage
            scenarios.
        -   **Device-Bound License (PSLP-PRO-DBL)**: This option **ties
            a untransferable Pro license to a newly-bought NI USRP
            device.** Compared to PSLP-PRO-TL, PSLP-PRO-DBL users can
            enjoy immediate and full access to the licensed features
            without explicit activation and online validation. This
            model is suitable for researches on newly-bought NI USRP
            hardware, offering faster program start, and long-term
            offline operation. This option is exclusively available in
            mainland China, as discussed in
            `collaboration-with-ni`{.interpreted-text role="ref"}.

  PSLP Option                  Pros                                                                                                                                                                                                                                                                          Cons
  ---------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------
  PSLP-FL                      \- Nice documentation on usage at [ps.zpj.io](https://ps.zpj.io) - Installation and upgrade via Debian *apt* facility - Support running self-made PicoScenes plugin - Public technical support via [Issue Tracker](https://github.com/wifisensing/PicoScenes-Issue-Tracker)   \- Limited/No advanced features - Online validation (frequent)
  PSLP-PRO-TL                  \- *All Pro features* in `feature-list`{.interpreted-text role="ref"} - *Timely technical support on IM* - Transferable to other computers                                                                                                                                    \- Online validation (less frequent)
  PSLP-PRO-DBL (Coming Soon)   \- *All Pro features* in `feature-list`{.interpreted-text role="ref"} - *Timely technical support on IM* - **Discounted bundle pricing** - Out-of-box experience - Faster program start - Long-term offline operating                                                         \- Device bound, not transferable - *Available only in China mainland*

  : Comparisons of PSLP Options

::: {.note}
::: {.title}
Note
:::

PSLP-PUL v0.8.1 is converted to PSLP-PRO-TL in v1.0 automatically.
:::

### 与NI中国合作赠送 PSLP-PRO-DBL许可证 (Gifting PSLP-PRO-DBL Licenses in Collaboration with NI China) {#collaboration-with-ni}

PicoScenes平台非常荣幸地得到 [NI](https://www.ni.com)
(美国国家仪器)公司(中国)的认可与支持，NI公司认为"**PicoScenes平台填补了NI公司在Wi-Fi
ISAC领域的不足**"。

为支持更多用户基于PicoScenes平台及NI USRP系列产品进行Wi-Fi/5G/6G
ISAC领域的研究与应用，NI公司(中国)与PicoScenes平台达成合作：对每台从PicoScenes合作公司售出的USRP系列SDR设备(独立机器或"母板+子板"套件)，\**免费赠送一份PSLP-PRO-DBL许可证*\*。作为回报，NI公司(中国)将资助PicoScenes平台、提供多型号USRP设备供PicoScenes平台研发及测试，并提供技术支持。感谢NI公司对PicoScenes平台的认可支持❤️❤️❤️！

The PicoScenes platform is honored to receive recognition and support
from National Instruments ([NI](https://www.ni.com)). NI acknowledges
that \"**the PicoScenes platform has addressed the gaps in NI\'s
offering in the Wi-Fi ISAC domain.**\"

To support more users in the Wi-Fi/5G/6G ISAC field for research and
applications using the PicoScenes platform and NI USRP series products,
NI (China) has entered into a collaboration with the PicoScenes team:
**a PSLP-PRO-DBL license will be provided free of charge** for each USRP
Series SDR device sold by PicoScenes\' partner store (independent
machine or \"motherboard + daughterboard\" kit). In return, NI (China)
will fund the PicoScenes platform, provide USRP devices for PicoScenes
platform development and testing, and offer technical support. We
sincerely appreciate NI\'s recognition and support for the PicoScenes
platform ❤️❤️❤️!

Pricing & Payment {#pricing}
-----------------

-   **PSLP-PRO-TL**:
    -   For Chinese users(中国区用户):
        **一次性付费8688元人民币得到2个永久PSLP-PRO-TL许可证**。我们捆绑2个许可证一起销售，是因为常用的\"(Tx)
        Packet Injection + (Rx) CSI Measurement in Monitor
        Mode\"模式需要两台机器配合使用。请在我们的合作店铺购买:
        [PicoScenes软件Pro可转移许可证(PSLP-PRO-TL)](https://item.taobao.com/item.htm?id=752046582148)。
    -   For English-speaking users outside mainland China: **One-time
        payment of 1500 USD for 2 PSLP-PRO-TL licenses**. We bundle 2
        PSLP-PRO-TL licenses together for sale because the commonly used
        ISAC scenario \'(Tx) Packet Injection + (Rx) CSI Measurement in
        Monitor Mode\' requires two independent machines. Compared to
        8688 RMB (roughly 1200 USD) for Chinese users, the additional
        \$300 USD is for currency exchange processing fee and technical
        support in English. **Payment channel still establishing
        \.....**
-   **PSLP-PRO-DBL**: 我们在这个页面单独说明USRP采购及相关问题：
    `/ni`{.interpreted-text role="doc"}
