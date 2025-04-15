---
title: Supported Hardware
autoNumbering: true
startNumber: 3
---

 Exclusive for China mainland users: PicoScenes团队很荣幸得到NI的认可与支持，获得NI USRP授权销售资格([与NI中国合作赠送 PSLP-PRO-DBL许可证 (Gifting PSLP-PRO-DBL Licenses in Collaboration with NI China)](features_pricing.md#与ni中国合作赠送-pslp-pro-dbl许可证-gifting-pslp-pro-dbl-licenses-in-collaboration-with-ni-china))。您可以在这个页面查看我们的NI USRP销售方案，[Selling NI USRP Devices (与NI合作销售USRP系列产品)](ni.md)。

**CSI-Extractable Hardware Supported by The PicoScenes Platform**

| Hardware Model | USRP-based SDR (X410 as example) | HackRF One | AX210/AX200 | QCA9300 | IWL5300 |
|---------------|----------------------------------|------------|-------------|----------|----------|
| Type | SDR | SDR | Wi-Fi NIC | Wi-Fi NIC | Wi-Fi NIC |
| Connection | USB 3.0 or 1/10/100 GbE | USB 2.0 | M.2 2230 | Mini PCI-E 1x | Mini PCI-E 1x |
| Supported Formats for CSI Measurement | 802.11a/g/n/ac/ax/**be** | 802.11a/g/n/ac/ax/**be** | 802.11a/g/n/ac/ax | 802.11n | 802.11n |
| Rx AGC | No, automatic by USRP B210 | No | Yes, only automatic | Yes, has manual mode | Yes, only automatic |
| Available Carrier Frequency Range (MHz) | **Arbitrary tunable in [1, 7200] MHz** | **Arbitrary tunable in [10, 7250] MHz** | AX200: 2.4/5 GHz Bands, 470 MHz in total; **AX210**: 2.4/5/**6** GHz bands (**[5955, 7115] MHz in 6GB)** | **Arbitrary tunable in [2.2-2.9] and [4.4-6.1] GHz** | 2.4/5 GHz Bands, 470 MHz in total |
| Available Bandwidths (MHz) | **tunable in [1, 400], scalable to 1600** <sup><a href="#note1">[1]</a></sup> | **Arbitrary tunable in [1, 20]** | 20/40/80/**160** | **Arbitrary tunable in [2.5, 80]** | 20/40 |
| Maximal MIMO Streams | 4 | 1 | 2 | 3 | 3 |
| Maximal CSI dimension | **1992x1x1, Scalable to 1992x4x4 streams** | 242x1x1 | **1992x2x2** | 114x3x3 | 30x3x3 |
| Number of CSI per packet | **Up to 39** <sup><a href="#note2">[2]</a></sup> | **Up to 39** <sup><a href="#note2">[2]</a></sup> | 1 | **2, by HT-rate Extra Spatial Sounding (ESS)** | **2, by HT-rate Extra Spatial Sounding (ESS)** |
| CSI Measurement for the Overheard Frames in Monitor Mode | **YES**, all-format (a/g/n/ac/ax/**be**), all-CBW (20/40/80/160/320 MHz), all-coding(LDPC/BCC) | **YES**, all-format (a/g/n/ac/ax/**be**), 20 MHz CBW, all-coding(LDPC/BCC) | **YES** | No, only for 11n sounding frames | No, only for the special 12:34:56 address |
| Packet Injection Support | **Yes**, all-format (a/g/n/ac/ax/**be**), all-CBW (20/40/80/160/320 MHz), all-coding(LDPC/BCC) | **Yes**, all-format (a/g/n/ac/ax/**be**), all-CBW (20/40/80/160/320 MHz), all-coding(LDPC/BCC) | **Yes**, all-format (a/g/n/ac/**ax**), sub-320 CBW (20/40/80/160 MHz), all-coding (LDPC/BCC) | Yes, a/g/n | Yes, a/g/n |

<a name="note1"></a>[1]: PicoScenes supports multi-channel split and concatenation. By combining four 400-MSPS channels of USRP X410, we achieve 1.6 GHz bandwidth.
<a name="note2"></a>[2]: 39 CSI measurements with HE-SU mode/ midamble CSI/ midamble periodicity = 10