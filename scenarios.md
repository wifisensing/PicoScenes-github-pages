# CSI Measurement using PicoScenes

**Revised on Dec. 3, 2023**

## Revisions

- Dec. 3, 2023: Added radar mode and MIMO radar mode, see [radar-mode](#radar-mode).

On this page, we will demonstrate the methods of CSI measurement and various low-level controls on different hardware frontends. You can jump to the topics of interest via the following links:

1. [Fundamentals](#fundamentals)
2. [CSI by SDR](#csi_by_sdr)
3. [AX200 Measurements](#ax200-measurements)
4. [CSI by 5300 and 9300](#csi-by-5300-and-9300)
5. [Interoperability](#interoperability)

Before we proceed, it is assumed that you have already installed the PicoScenes software and the supported hardware. See [installation](#installation) for hardware and software installation guides.

> **Hint:** 如果您不想费劲地看英文，请开启浏览器的翻译功能，省脑子。

## Before Getting Started: Some Fundamentals

Here we introduce two fundamentals: [Device Naming](#device_naming) and [Basic Facts of Wi-Fi Channelization](#fact-wifi-channels).

### Device Naming

In order to support multi-frontend operation, we devised a simple device naming protocol, which is elaborated in the following sections.

#### Device Naming for Commercial Wi-Fi NICs

PicoScenes provides a script named `array_status`, which lists all the **PCI-E based Wi-Fi NICs**. A sample output is as below:

![8 Wi-Fi NICs detected, and each has four IDs](/images/array_status.png)

In the `array_status` output, there are four IDs for each NIC: *PhyPath*, *PhyId*, *DevId*, and *MonId*. Their explanations are shown below. Among them, we strongly **recommend using PhyPath ID** in all scenarios.

| ID Type | Description |
|---------|-------------|
| **PhyId** | The *Physical ID* is assigned by the Linux mac80211 module at the system level, primarily used for low-level hardware control. The main drawback is that *Physical ID* may change upon each reboot. |
| **DevId** | The *Device ID* is also assigned by the Linux mac80211 module at the system level, mainly used for link-level Wi-Fi configuration. The main drawback is that *Device ID* may change upon each reboot. |
| **MonId** | The *Monitor interface ID* is created by the user for the attached monitor interface. The main drawback is that the monitor interface does not exist by default. |
| **PhyPath (Recommended)** | To address the issue of ID inconsistency, we introduce a new ID called *PhyPath*, listed in the first column of the `array_status` output. The main advantage of PhyPath is that **it remains consistent across reboots and even system reinstallations, because it is bound to the PCI-E connection hierarchy**. *PhyPath* is supported throughout the PicoScenes system, including the PicoScenes program, plugins, and bash scripts. |

#### Device Naming for SDR

Device naming for SDR devices has three subtypes: [Naming for USRP](#naming_for_usrp), [Device Naming for HackRF One](#device-naming-for-hackrf-one), and [Device Naming for Virtual SDR](#device-naming-for-virtual-sdr).

##### Device Naming for NI USRP

We devised a simple and scalable naming protocol for USRP devices. It has four forms:

- `usrp`: Used in case of only one USRP device connected to the computer. For example, if only one USRP device is connected to the computer, you can select this device with simply `usrp`.
- `usrp<IPADDRESS_or_RESOURCEID_or_SERIALID_or_DEVICENAME>`: Used in case of selecting one of multiple connected USRP devices. For example, to select a USRP X310 device (ip-addr=192.168.40.2, serial=DID1234, name=myX310, resourceId=RID4567) from multiple USRP devices connected, this device can be represented by any one of the four possible IDs: `usrp192.168.40.2`, `usrpDID1234`, `usrpmyX310` or `usrpRID4567`.
- `usrp<IPADDRESS_or_RESOURCEID_or_SERIALID_or_DEVICENAME>,[multiple <IPADDRESS_or_RESOURCEID_or_SERIALID_or_DEVICENAME>]`: Used in case of combining multiple USRPs devices. For example, the combination of two USRP X310 devices (with IP addresses of 192.168.40.2 and 192.168.41.2) can be represented by `usrp192.168.40.2,192.168.41.2`.
- `usrp<IPADDRESS0_IPADDRESS1>,[multiple <IPADDRESS0_IPADDRESS1>]`: Used in case of combining the two 10GbE connections of one or multiple USRP X310 devices. Assume you have two USRP X310 devices connected. The first USRP X310 device has two 10GbE connections with IP addresses of 192.168.30.2 and 192.168.40.2, and the second USRP X310 device has two 10GbE connections with IP addresses of 192.168.70.2 and 192.168.80.2. The combination of the two channels of the first X310 can be represented by `usrp192.168.30.2_192.168.40.2`. The combination of all four channels can be represented by `usrp192.168.30.2_192.168.40.2,192.168.70.2_192.168.80.2`. The combination of the first two and the last one can be represented by `usrp192.168.30.2_192.168.40.2,192.168.80.2`.

##### Device Naming for HackRF One

All HackRF One devices are named as `hackrf<Device_Number>`, e.g., `hackrf0` or `hackrf1`. The starting device number is `0`, and the device number is in the same order as the command `SoapySDRUtil --find="driver=hackrf"` lists.

##### Device Naming for Virtual SDR

The Virtual SDR device adopts the naming pattern of `virtualsdr<ANY_GIVEN_ID>`, e.g., `virtualsdr0`, `virtualsdr_astringId` or the simplest `virtualsdr`.

### Basic Facts of Wi-Fi Channelization

Many PicoScenes users are confused about how to correctly specify Wi-Fi channels for COTS NICs and SDR devices. We create a big table [channels](#channels) for reference.

## ISAC Research using NI USRP or HackRF One SDR

PicoScenes can drive SDR devices to transmit 802.11a/g/n/ac/ax/be format frames, receive frames, and measure the CSI data in real-time. In the following sections, we explore four major topics:

1. Receiving frames and measuring CSI by [SDR RX](#sdr_rx)
2. Transmitting Frames by [SDR TX](#sdr_tx)
3. Wi-Fi Radar mode by [radar-mode](#radar-mode)
4. Non-Standard Tx and Rx by [non-standard-tx-rx](#non-standard-tx-rx)
5. Concurrent multi-SDR operation by [multi-SDR-operation](#multi-SDR-operation)
6. Some advanced features by [experimental-features](#experimental-features)

### Listening to Wi-Fi Traffic and Measuring CSI for 802.11a/g/n/ac/ax/be-Format Frame

#### Listening to 20 MHz Bandwidth Channels

In the simplest form, if you want to listen to the Wi-Fi traffic of a 20 MHz bandwidth channel centered at 2412 MHz using an SDR device with the ID `SDR_ID` (see [naming-for-sdr](#naming-for-sdr) for `SDR_ID`), you can use the following command:

`PicoScenes "-d debug -i SDR_ID --mode logger --freq 2412 --plot"`

The command options, `"-d debug -i SDR_ID --freq 2412  --mode logger --plot"`, have the following interpretations:

- `-d debug`: Modifies the display level of the logging service to debug;
- `-i SDR_ID --mode logger`: Switches the device `SDR_ID` to CSI logger mode, see [naming-for-sdr](#naming-for-sdr) for `SDR_ID`;
- `--freq 2412`: Change the center frequency of device `SDR_ID` to 2412 MHz;
- `--plot`: Live-plots the CSI measurements.

> **Hint:** PicoScenes sets many Rx parameters by default, such as using the *RX_CBW_20* preset, using the Tx/Rx antenna port, using the normalized 0.65 Rx gain, etc. See [rx-gain-control](#rx-gain-control) for Rx Gain control.

#### Listening to 40/80/160/320 MHz Bandwidth Channels

In this case, if you want to listen to the Wi-Fi traffic on a 40 MHz bandwidth channel centered at 5190 MHz (or "5180 HT40+" or "5200 HT40-") using an SDR device with the ID `SDR_ID` (see [naming-for-sdr](#naming-for-sdr) for `SDR_ID`), you can use the following command:

`PicoScenes "-d debug -i SDR_ID --mode logger --freq 5190 --preset RX_CBW_40 --plot"`

The command options, `"-d debug -i SDR_ID --mode logger --freq 5190 --preset RX_CBW_40 --plot"`, have the following interpretations:

- `-d debug`: Modifies the display level of the logging service to debug;
- `-i SDR_ID --mode logger`: Switches the device `SDR_ID` to CSI logger mode;
- `--freq 5190`: Change the center frequency of device `SDR_ID` to 5190 MHz;
- `--preset RX_CBW_40`: Uses the Rx preset named `RX_CBW_40`, which boosts the Rx sampling rate to 40 MHz and tells the baseband to treat the received signals as being sampled with a 40 MHz rate.
- `--plot`: Live-plots the CSI measurements.

Similarly, if you want to listen to an 80 MHz bandwidth channel centered at 5210 MHz using an SDR device with the ID `SDR_ID`, you can use the following command:

`PicoScenes "-d debug -i SDR_ID --mode logger --freq 5210 --preset RX_CBW_80 --plot"`

Similarly, if you want to listen to a 160 MHz bandwidth channel centered at 5250 MHz using an SDR device with the ID `SDR_ID`, you can use the following command:

`PicoScenes "-d debug -i SDR_ID --mode logger --freq 5250 --preset RX_CBW_160 --plot"`

> **Hint:** You can refer to [presets](#presets) for a full list of presets.

> **Important:** Not all SDR devices support the 40/80/160 MHz sampling rate. For example, HackRF One with a maximum of 20 MHz sampling rate does not support 40 MHz or wider sampling rate. While the NI USRP X3x0 Series or other advanced models have a maximum of over 200 MHz sampling rate, supporting the 40/80/160 MHz bandwidth channels.

### Antenna Selection (Only for NI USRP Device)

NI USRP features two antenna ports for each RF channel, **TX/RX** and **RX2**. PicoScenes provides a pair of options for Tx/Rx antenna selection: `--tx-ant` and `--rx-ant`. For example, if you want to use the RX2 antenna port for signal receiving, you can add `--rx-ant` to the above command:

`PicoScenes "-d debug -i SDR_ID --mode logger --freq 5250 --preset RX_CBW_160 --rx-ant RX2 --plot"`

> **Important:** **PicoScenes uses the TX/RX port of each RF channel by default**.

### Rx Gain Control: Manual GC and AGC

Proper Rx gain, or Rx signal amplification level, is crucial for Rx decoding performance and CSI measurement quality. Depending on the distance and strength of the transmitted signal, you may need to adjust the Rx gain. PicoScenes provides two ways to specify the Rx gain: using the **absolute gain value** or the **normalized gain value**.

1. Specifying the absolute Rx gain: To set the Rx gain to a specific value, you can use the `--rx-gain` option followed by the desired gain value in dBm. For example:

   `PicoScenes "-d debug -i SDR_ID --mode logger --freq 2412 --plot --rx-gain 20"`

   In this command, `--rx-gain 20` specifies an absolute Rx gain of 20 dBm.

2. Specifying the normalized Rx gain: To set the Rx gain using a normalized value, you can use the `--rx-gain` option followed by the desired normalized gain value. For example:

   `PicoScenes "-d debug -i SDR_ID --mode logger --freq 2412 --plot --rx-gain 0.7"`

   The `--rx-gain 0.7` specifies a normalized Rx gain of 0.7, **equivalent to 0.7 of the hardware-supported maximum Rx gain**. 

   If the value specified to `--rx-gain` is greater than 1, the value is considered to be the absolute gain; otherwise, the normalized gain values.

   > **Hint:** PicoScenes sets `--rx-gain` to 0.65 by default.

3. Some SDR devices support automatic gain control (AGC), such as the NI USRP B210. To enable AGC, you can use the `--agc` option. For example:

   `PicoScenes "-d debug -i A_B210_SDR --mode logger --freq 2412 --plot --agc"`

   This command enables AGC for the SDR device with the ID A_B210_SDR.

### Multi-Channel Rx by Single NI USRP Device

PicoScenes supports *multi-channel Rx* and even *multi-USRP combined multi-channel Rx*. For example, the NI USRP B210, X310, and other advanced models have two or more independent RF channels. PicoScenes supports receiving dual/multi-channel signals and decoding MIMO frames.

1. Single USRP Device - Dual/Multi-Channel Rx. 

   For example, if you want to use an X310 or other multi-channel USRP devices to listen to Wi-Fi traffic on the 40 MHz channel centered at 5190 MHz (the *5180 HT40+* or *5200 HT40-* channel) with two Rx channels, you can use the following command:

   `PicoScenes "-d debug -i usrp --mode logger --freq 5190 --preset RX_CBW_40 --rxcm 3 --plot"`

   In this command, `--rxcm 3` specifies the *Rx chainmask* value of 3, indicating the use of the 1st and 2nd Rx antennas for Rx. The `--rxcm` option allows you to specify the antenna selection using a bitwise style: 1 for the 1st antenna, 2 for the 2nd antenna, 3 for the first 2 antennas, 4 for the 3rd antenna, 5 for the 1st and 3rd antennas, and so on.

   If you want to use an X310 or other multi-channel USRP devices to listen to Wi-Fi traffic on the 80 MHz channel centered at 5210 MHz with two Rx channels, you can use the following command:

   `PicoScenes "-d debug -i usrp --mode logger --freq 5210 --preset RX_CBW_80 --rxcm 3 --plot"`

2. Single USRP Device - Dual/Multi-Channel Rx with Dual 10GbE connections. 

   The previous option cannot support the dual-channel signal receiving and decoding for a 160 MHz channel, because the dual-channel 160 MHz-rate signal receiving requires up to 12.8Gbps Ethernet bandwidth which exceeds the limit of a single 10GbE connection. Therefore, you have to use the dual 10GbE connection to satisfy this bandwidth. Assuming the dual-10GbE connection is correctly set up with IP addresses of 192.168.30.2 and 192.168.40.2, you can use the following command to perform dual-channel receiving for a 160 MHz bandwidth channel centered at 5250 MHz:

   `PicoScenes "-d debug -i usrp192.168.30.2_192.168.40.2 --mode logger --freq 5250 --preset RX_CBW_160 --rxcm 3 --plot"`

   > **Hint:** You can follow the guides below to set up dual 10GbE connections for the X3x0 and N3x0 series.

   - X3x0 Series: [Using Dual 10 Gigabit Ethernet on the USRP X300/X310](https://kb.ettus.com/Using_Dual_10_Gigabit_Ethernet_on_the_USRP_X300/X310)
   - N3x0 Series: [USRP N300/N310/N320/N321 Getting Started Guide - Dual 10Gb Streaming](https://kb.ettus.com/USRP_N300/N310/N320/N321_Getting_Started_Guide#Dual_10Gb_Streaming_SFP_Ports_0.2F1)

### Multi-Channel Rx by Multiple NI USRP Devices

PicoScenes supports combining multiple NI USRP devices of the same model into a single, virtual device, providing a higher level of MIMO and larger cross-antenna phase coherency. Taking the NI USRP X310 as an example, if you have two X310 devices and each is equipped with a dual UBX-160 daughterboard, **we can achieve four-channel phase coherent Rx if they are properly combined and synchronized**.

#### Clock Synchronization across Multiple USRP Devices

We recommend two options to achieve clock synchronization across multiple USRP devices:

1. For all devices, by a central clock distribution module (**Recommended**). We recommend the 8-port [OctoClock-G](https://www.ettus.com/all-products/OctoClock-G/) or [OctoClock](https://www.ettus.com/all-products/octoclock/) to distribute clock signals for all NI USRP devices.

2. For NI USRP X3x0 model, By Ref clock export. X3x0 model has *PPS OUT* and *TRIG OUT* ports that can be directly fed into another X3x0 device, or fed into a clock distribution module.

#### Combining Multiple USRP devices

Assume you have two NI USRP X3x0 devices each equipped with two UBX-160 daughterboards, and with IP Addresses of 192.168.30.2 and 192.168.70.2, respectively. And also assume you have physically synchronized these two devices by either solution of [phase_sync_multiple_device](#phase_sync_multiple_device), you can achieve four-channel coherent Rx by the following command:

`PicoScenes "-d debug -i usrp192.168.30.2,192.168.70.2 --mode logger --freq 5190 --preset RX_CBW_40 --rx-channel 0,1,2,3 --clock-source external --plot"`

In this command, please pay special attention to the comma (`,`) in the option `-i usrp192.168.30.2,192.168.70.2`. It means to combine multiple USRP devices. You can refer to [naming_for_usrp](#naming_for_usrp) for the complete naming protocols for NI USRP devices. The option `--rx-channel` is equivalent to `--rxcm` introduced aforementioned, and `--rx-channel 0,1,2,3` is equivalent to `--rxcm 15` meaning to use all four RF channels for receiving. The option `--clock-source external` tells USRP to use external clock signals for the frequency generations for the LO and ADC/DAC pair.

> **Important:** The order of the IP addresses affects the order of the TX/RX channels! For example, the 0th and 3rd channels of the combined USRP `usrp192.168.40.2,192.168.41.2` refer to the first and the second channel of the devices with the IP addresses of 192.168.40.2 and 192.168.41.2, respectively.

#### Combining Multiple USRP Devices plus Dual-10GbE Connection

Assuming you have two NI USRP X3x0 devices each equipped with two UBX-160 daughterboards, and assume each X3x0 device is dual-10GbE connected with IP Addresses of 192.168.30.2 and 192.168.31.2 for the first and 192.168.70.2 and 192.168.71.2 for the second, respectively. And also assume you have physically synchronized these two devices by either solution of [phase_sync_multiple_device](#phase_sync_multiple_device), you can achieve four-channel coherent Rx for a 160 MHz Wi-Fi channel by the following command:

`PicoScenes "-d debug -i usrp192.168.30.2_192.168.31.2,192.168.70.2_192.168.71.2 --mode logger --freq 5250 --preset RX_CBW_160 --rx-channel 0,1,2,3 --clock-source external --plot"`

Please pay special attention to the comma (`,`) and underline (`_`) in the option `-i usrp192.168.30.2_192.168.31.2,192.168.70.2_192.168.71.2`. It means to use the dual 10GbE connection plus combining multiple USRP devices. You can refer to [naming_for_usrp](#naming_for_usrp) for the complete naming protocols for NI USRP devices.

### Transmitting 802.11a/g/n/ac/ax/be protocol frames using SDR Devices

#### Single-Device Tx with Rich Low-Level Controls

In the following examples, we demonstrate how to use PicoScenes to drive SDR devices to transmit Wi-Fi packets with gradually enriched low-level controls. We assume your SDR ID is `SDR_ID` and your SDR supports a sufficiently high sampling rate, like 200 MSPS or higher.

##### Transmitting 20 MHz bandwidth 802.11n Format Frames

If you just want to transmit some 802.11n rate, 20 MHz bandwidth frames at 5900 MHz channel for CSI measurement, you can use the following command:

`PicoScenes "-d debug -i SDR_ID --freq 5900 --mode injector --repeat 1e5 --delay 5e3"`

The new options `--mode injector --repeat 1e5 --delay 5e3` can be interpreted as:

- `--mode injector`: Ask the SDR to operate at packet injector mode;
- `--repeat 1e5`: Inject 10000 packets;
- `--delay 5e3`: The inter-frame delay is 5000 microseconds.

> **Hint:** PicoScenes uses 802.11n format for packet injection by default.

##### Transmitting 40/80/160/320 MHz bandwidth 802.11a/g/n/ac/ax/be Format Frames

You can use the powerful `--preset` options to specify bandwidth and format, like:

`PicoScenes "-d debug -i SDR_ID --freq 5900 --mode injector --preset TX_CBW_40 --repeat 1e5 --delay 5e3"`

This command transmits 802.11ac format frames with a 40 MHz bandwidth at 5900 MHz. The `--preset TX_CBW_40` option specifies the transmission preset for 40 MHz bandwidth.

> **Important:** Ensure your SDR device supports the desired bandwidth and format before attempting transmission.
