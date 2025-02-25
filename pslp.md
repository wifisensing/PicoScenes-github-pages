# PicoScenes License Plan (PSLP)

The PicoScenes License Plan (PSLP) plays a vital role in supporting the long-term development of the PicoScenes system. The current (November 2023) PSLP version is v1.0.

In this page, we introduce PSLP in the following aspects:

- [Introducing PSLP](#introducing-pslp)
- [PSLP License Details](#pslp-license-details)
- [Pricing & Payment](#pricing--payment)

## Introducing PSLP

PSLP v1.0 offers two license options:

- **Free (PSLP-FL)**: PSLP-FL is free of charge but comes with limited access to advanced features.
- **Pro (PSLP-PRO)**: PSLP-PRO users pay a minimal license fee and gain full access to all PicoScenes features along with timely technical support. It has two subtypes:
  - **Transferable License (PSLP-PRO-TL)**: It allows users to activate and use the license on a single computer. Users can conveniently transfer the license between computers as needed, providing flexibility for multi-device usage scenarios.
  - **Device-Bound License (PSLP-PRO-DBL)**: *This option is only available in mainland China*. **This option binds a Pro to a newly-bought NI USRP device from our partner store.** Compared to PSLP-PRO-TL, users of PSLP-PRO-DBL gain immediate and full access to the licensed features without explicit activation and online validation. This model is suitable for researches on newly-bought NI USRP hardware, offering faster program start, and long-term offline operation. *We offer discounted bundle pricing for this option*.

### Comparisons of PSLP Options

| PSLP Option     | Pros                                                                                                                                                                                                 | Cons                                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| **PSLP-FL**     | - Nice documentation on usage at [ps.zpj.io](https://ps.zpj.io) <br> - Installation and upgrade via Debian *apt* facility <br> - Support running self-made PicoScenes plugin <br> - Public technical support via [Issue Tracker](https://github.com/wifisensing/PicoScenes-Issue-Tracker) | - Limited/No advanced features <br> - Online validation (frequent)                     |
| **PSLP-PRO-TL** | - *All Pro features* in [PSLP License Details](#pslp-license-details) <br> - *Timely technical support on IM* <br> - Transferable to other computers                                                                                     | - Online validation (less frequent)                                                    |
| **PSLP-PRO-DBL**| - *All Pro features* in [PSLP License Details](#pslp-license-details) <br> - *Timely technical support on IM* <br> - **Discounted bundle pricing** <br> - Out-of-box experience <br> - Faster program start <br> - Long-term offline operating | - Device bound, not transferable <br> - Only for NI USRP SDR devices <br> - *Available only in China mainland* |

> **Note:** PSLP-PUL v0.8.1 is converted to PSLP-PRO-TL in v1.0 automatically.

## Details of PSLP v1.0

We divide the PSLP into four aspects: [Technical Support](#technical-support), [Hardware Features](#hardware-features), [API and Data Access](#api-and-data-access), and [Platform Features](#platform-features).

### Technical Support

| Feature                                | Description                                                                                     | Free | Pro |
|----------------------------------------|-------------------------------------------------------------------------------------------------|------|-----|
| Good documentation                     | [https://ps.zpj.io](https://ps.zpj.io)                                                          | **✓** | **✓** |
| Issue tracker-based technical support  | [https://github.com/wifisensing/PicoScenes-Issue-Tracker](https://github.com/wifisensing/PicoScenes-Issue-Tracker) | **✓** | **✓** |
| Very timely technical support via IM   | Providing quick technical support on WeChat or other IM                                         |      | **✓** |

### Hardware Features

Different hardware has different PSLP feature lists: [SDR](#sdr-ni-usrp-hardware-and-hackrf-one), [AX210/AX200](#ax210ax200), [QCA9300 and IWL5300](#qca9300-and-iwl5300).

#### SDR (NI USRP Hardware and HackRF One)

| Feature                                           | Description                                                                                     | Free | Pro |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------|------|-----|
| SDR Hardware Support                              | NI USRP and HackRF One. See [csi_by_sdr](#)                                                     | **✓** | **✓** |
| Transmit 11a/g/n/ac/ax/be-Format Frames with 20 MHz CBW | See [sdr-tx-20-cbw](#)                                                                          | **✓** (Up to 2x2 MIMO) | **✓** |
| Transmit 11a/g/n/ac/ax/be-Format Frames with 40/80/160/320 MHz CBW | Support up to Wi-Fi 7 and 320 MHz CBW. See [sdr-tx-40-or-higher-cbw](#)                         |      | **✓** |
| Receiving and Measuring CSI for 20 MHz CBW Frames | See [sdr-rx-20-cbw](#)                                                                          | **✓** (Up to 2x2 MIMO) | **✓** |
| Receiving and Measuring CSI for 40/80/160/320 MHz CBW Frames | Support up to Wi-Fi 7 and 320 MHz CBW. See [sdr-rx-40-or-higher-cbw](#)                         |      | **✓** |
| Rx Multi-Thread Decoding                          | Improve Rx decoding performance significantly. See [parallel-decoding](#)                       | **✓** (Up to 2) | **✓** |
| Tx/Rx Gain Control                                | Manual Tx/Rx gain control, and Rx AGC. See [tx-gain-control](#) and [rx-gain-control](#)        | **✓** | **✓** |
| Tx Chain Specification                            | Multi-(RF) Channel and MIMO Transmission. See [multi-channel-tx](#)                             | **✓** (Up to 2 channels) | **✓** |
| Rx Chain Specification                            | Multi-(RF) Channel Reception. See [multi-channel-rx-single](#) and [multi-channel-rx-multi](#) | **✓** (Up to 2 channels) | **✓** |
| Antenna Selection                                 | See [antenna_selection](#)                                                                      | **✓** | **✓** |
| Operating in Non-Standard Channel (Carrier Frequency) | Operating at any hardware-supported frequency. See [non-standard-tx-rx](#)                      | **✓** ([2.3-2.6] GHz) | **✓** |
| Operating with Non-Standard Bandwidth (Sampling Rate) | Operating with any hardware-supported sampling rate. See [non-standard-tx-rx](#)                | **✓** (Only 10 and 30 MHz) | **✓** |
| Record and Replay Tx/Rx Baseband Signals          | Record Tx/Rx baseband signals, and replay them during offline analysis. See [signal-recording-replay](#) |      | **✓** |
| Tx/Rx Resampling                                  | Realizing arbitrary bandwidth Tx/Rx on USPRs with fixed master clock rate. See [non-standard-tx-rx-fixed-master-clock](#) | **✓** (Only 1.0 and 1.25) | **✓** |
| Support External Clock Source                     | Achieving cross-device clock/phase synchronization. See [phase_sync_multiple_device](#)         | **✓** | **✓** |
| Multi-USRP Combination                            | Combining multiple USRP devices into a virtual and larger USRP with more synchronized channels. See [multi-channel-rx-single](#), [multi-channel-rx-multi](#), and [multi-channel-tx](#) |      | **✓** |
| Multi-Channel Splitting and Stitching             | Want to sampling a 400 MHz channel by a dual-channel 200 MHz max USRP X3x0/N3x0? See [dual-split-merge](#) |      | **✓** |
| Multiple CSI Measurement per Frame                | Supporting up to 39 CSI measurements from a single frame. See [multi-csi-measurement](#)        |      | **✓** |
| Channel Impairment Simulation (CFO, SFO, I/Q Imbalance) | Simulating CFO, SFO, I/Q Imbalance and their combinations at Tx or Rx end. See [channel-impairment-simulation](#) |      | **✓** |
| Interoperability with Old QCA9300 and IWL5300     | See [interoperability](#)                                                                       | **✓** | **✓** |

#### AX210/AX200

| Feature                                           | Description                                                                                     | Free | Pro |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------|------|-----|
| 6 GHz Band Access (**AX210 Only**)                | Accessing the 6 GHz band channels around the globe (5955 to 7115 MHz in range, 20 MHz each). See [ax200-measurements](#) and [channels](#). | **✓** ([5955-6415] MHz) | **✓** |
| CSI Measurement with Associated AP                | See [ax200-wifi-ap](#)                                                                          | **✓** | **✓** |
| CSI Measurement in Monitor Mode (**Passive Sensing**) | See [ax200-monitor](#)                                                                          | **✓** | **✓** |
| CSI Measurement in Monitor Mode with Packet Injection | See [ax200-monitor-injection](#)                                                                | **✓** | **✓** |
| Transmit 11a/g/n/ac/ax-Format Frames with 20/40 MHz CBW | See [ax200-monitor-injection](#) and [ax200-monitor-injection-mcs-antenna](#)                   | **✓** | **✓** |
| Transmit 11a/g/n/ac/ax-Format Frames with 80/160 MHz CBW | See [ax200-monitor-injection](#) and [ax200-monitor-injection-mcs-antenna](#)                   | **✓** (Transmission rate ≤ 50pkts) | **✓** |
| Change channel and bandwidth in real-time         | Direct channel/CBW changing via API or command options. See [live-channel-bw-changing](#).      | **✓** | **✓** |

#### QCA9300 And IWL5300

| Feature                                           | Description                                                                                     | Free | Pro |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------|------|-----|
| CSI Measurement by "Monitor mode + Packet Injection" | Packet Injection in 11a/g/n/ac/ax format with 20/40 MHz Channel bandwidth (CBW) with Extra Spatial Sounding (ESS). See [packet-injection-qcq9300-iwl5300](#) | **✓** | **✓** |
| Accessing Non-Standard Channel and Bandwidth by QCA9300 | See [qca9300_non-standard](#)                                                                   | ✓Limited, [2.3-2.6] GHz only | **✓** |
| Manual Rx Gain Control by QCA9300                 | See [qca9300_non-standard](#)                                                                   | **✓** (Limited, [0-22] dBm only) | **✓** |
| Tx/Rx chain specification                         | Specify Tx and Rx chainmasks in runtime, see [tx-rx-chainmask-qca9300-iwl5300](#)               | **✓** | **✓** |
| Change channel and bandwidth in real-time         | Specifying channel/CBW changing in runtime, see [live-channel-bw-changing-qca9300-iwl5300](#).  | **✓** | **✓** |

### API And Data Access (Mainly for SDR)

| Feature                                           | Description                                                                                     | Free | Pro |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------|------|-----|
| L-LTF based CSI (Legacy-CSI)                      | **SDR Only**. Return the L-LTF based CSI estimation (Legacy CSI). See [cell-structure-matlab](#). |      | **✓** |
| Complete baseband signal                          | **SDR Only**. Return the complete multi-channel baseband signals. See [cell-structure-matlab](#) | **✓** | **✓** |
| Nanosecond level Tx and Rx clock                  | **AX210/AX200 and SDR Only**. The raw clock count from the 320 MHz baseband clock.              |      | **✓** |

### Platform Features

| Feature                                           | Description                                                                                     | Free | Pro |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------|------|-----|
| Debian apt-based installation, upgrade and uninstallation | Fresh new installation can be as short as 10 minutes.                                           | **✓** | **✓** |
| PicoScenes MATLAB Toolbox                         | Parsing the .csi file in MATLAB; auto-upgradable                                                | **✓** | **✓** |
| Using and Developing PicoScenes Plugins           | PicoScenes Plugin Development Kit is open sourced                                               | **✓** | **✓** |
| Concurrent Multi-process of PicoScenes            | Multi-Process may be easier for certain complex control                                         |      | **✓** |
| Multiple COTS NICs or SDR Devices                 | Support Multi-NIC/USRP hybrid frontend array                                                    | **✓** (limited, 2 device max) | **✓** |

## Pricing & Payment

> **Note:** Please stay tuned.
