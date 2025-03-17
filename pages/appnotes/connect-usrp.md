---
title: Connecting NI USRP Devices
keywords: USRP, connection guide, SFP+, 10GbE, 100GbE, firmware
last_updated: Mar. 15, 2025
summary: "This guide provides the bandwidth estimation for signal streaming and details the connection methods for various NI USRP models, including B2x0/N2x0/E3x0/N3x0/X3x0/X4x0."
permalink: connect-usrp
folder: appnotes
toc: true
disable_heading_numbers: true
---


## Prelogue: How Much Transfer Bandwidth Needed for Signal Streaming

Understanding the bandwidth required for transmitting I/Q signals is crucial for comprehending why USRP devices continually upgrade their network interfaces, as well as understanding why *mismatched connections can trigger various transmission issues*.

Here is the equation, which calculates the **total bandwidth requirement for transmitting I/Q signals**:

$$B = F_S \times N_{ch} \times b_{WT}$$

Where:
- $B$ is the total bandwidth required (bits/s)
- $F_S$ is the sampling rate (number of I/Q samples/s)
- $N_{ch}$ is the number of channels (This is hardware channel. Don't confuse with the *Wi-Fi channels*.)
- $b_{WT}$ is the bits per I/Q sample. $b_{WT}$ can be two values:
  - 32-bit: Most USRPs use 16-bit I/Q transfer format, i.e., 2 bytes for I and 2 bytes for Q;
  - 16-bit: N2x0 also supports 8-bit I/Q transfer format, however, this degrades the signal quality.

For example:
- The N2x0's master clock rate (MCR) is 100 MHz, however, sampling at 100 MHz sampling rate requires: $B = 100\text{M} \times 1 \times 32 = 3.2 \text{ Gbps}$, which is far beyond the capacity of a 1GbE connection.
- The X3x0's MCR is 200 MHz, thus sampling the two channels at 200 MHz requires: $B = 200\text{M} \times 2 \times 32 = 12.8 \text{ Gbps}$. This is beyond the capacity of a single 10GbE connection, which is why the X3x0 adopts dual-SFP+ for dual-10GbE connections.
- The X410's maximum MCR is 500 MHz (with `CG_400` FPGA image). The maximum bandwidth requirement for sampling 4 channels would be: $B = 500\text{M} \times 4 \times 32 = 64 \text{ Gbps}$. This massive bandwidth requirement explains why the X410 utilizes high-speed 100GbE connections to handle the data throughput.
- In contrast, the HackRF One has a maximum sampling rate of 20 MHz and uses 8-bit I/Q transfer format (16 bits per sample): $B = 20\text{M} \times 1 \times 16 = 320 \text{ Mbps}$. This bandwidth requirement is well within the capacity of USB 2.0 (480 Mbps), which explains why HackRF One can operate effectively with a USB 2.0 connection.

## NI USRP B2x0

Ensure the B2x0 device is connected using a **USB 3.0 cable**. It is important to note that USB 3.0 cables can be identified by their *blue-colored "tongue"* and the presence of *five additional contacts inside the connector* compared to USB 2.0.

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/usb3.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">USB 3.0 cable for connecting NI USRP B2x0 devices</p>
</div>

{% include note.html content="The USB 3.0 connection significantly limits the B2x0's maximum sampling rate, specifically to 28 MHz sampling rate for two channels, or 56 MHz for a single channel. To fully utilize the performance of the AD9361 frontend, consider the [NI USRP E320](#ni-usrp-e320), which avoids this limitation with a 10GbE connection." %}


## NI USRP N2x0

The NI USRP N2x0 utilizes a **1GbE Ethernet** port for connectivity with the host computer. Simply use a Cat 6 Ethernet cable to connect the RJ45 ports of both the N2x0 and your host computer.

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/cat6-cable.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">Cat 6 Ethernet Cable for connecting NI USRP N2x0 devices</p>
</div>

{% include note.html content="As described in [Bandwidth Computation](#prelogue-how-much-transfer-bandwidth-needed-for-signal-streaming), the 1GbE connection significantly limits the N2x0's maximum sampling rate, specifically to 25 MHz with 16-bit wire-transfer format, or 50 MHz with 8-bit format." %}


## NI USRP X3x0 series (X300/X310)

The NI USRP X3x0 uses **dual-SFP+ interfaces** for signal streaming, supporting up to **dual-10GbE** connection with `XG` firmware. With this dual-10GbE connection, the X3x0 can transmit and receive I/Q streams from dual channels with up to 200 MSPS rate.

The following is our recommended solution based on our long-term practice, balancing performance, reliability, and low risk of physical damage.

### Cable & Connector for 10GbE Connection

**SFP+ DAC Cable** is our preferred choice. It features integrated SFP+ connectors on both ends, which enhances robustness and minimizes the risk of disconnection. It is both cost-effective and highly reliable.


<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/sfp+dac-cable.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">SFP+ DAC cable is recommended for connecting NI USRP X3x0 devices</p>
</div>


Alternatives (not recommended):
    
1. **RJ45 Cable + Dual SFP+ to RJ45 Adapters**: This setup allows the use of standard Ethernet cables with SFP+ ports but tends to be more expensive. Additionally, improper use of RJ45 adapters can damage the SFP+ interfaces, and there is a higher risk of misplacing the adapters.

2. **Separate Optical Cable and SFP+ Optical Transceivers**: This option involves using individual optical cables and SFP+ optical transceivers at each end. It allows for significantly longer connection distances without compromising signal quality. However, it is more expensive and requires careful handling of the optical cables to avoid physical damage. There is also a risk of misplacing the adapters.

3. **SFP+ AOC Cable**: Similar to the DAC cable, the SFP+ AOC (Active Optical Cable) incorporates fiber optics, which makes it more costly and more prone to physical damage.

### 10GbE NIC Solution

#### For Desktop Computer

For desktop computer, we utilize the **Intel X710-DA4 Quad-Port 10GbE** Ethernet NIC. This NIC has been tested to simultaneously operate two USRP X3x0 devices (or a single X410 device), supporting four channels with a 200 MSPS rate (250 MSPS for the X410) for both transmission and reception. The system can achieve peak throughput rates of up to 1.9 GB/s for both sending and receiving data.

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/x710-nic.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">Intel X710-DA4 Quad-Port 10GbE NIC for desktop computers</p>
</div>

#### For Laptop **with** Thunderbolt 3+ Port - Single 10GbE

For laptop equipped with Thunderbolt 3+ port, we utilize the **QNAP QNA-T310G1S Thunderbolt 3 to 10GbE SFP+** NIC. This NIC has been tested to operate one USRP X3x0 device (or a single X410 device), supporting one channel with a 200 MSPS rate (250 MSPS for the X410) for both transmission and reception. The system can achieve peak throughput rates of up to 480 MB/s for both sending and receiving data.

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/QNA-T310G1S.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">QNAP QNA-T310G1S adapter for Thunderbolt 3+ laptops</p>
</div>

{% include warning.html content="We have tested that you CANNOT achieve dual-10GbE streaming by just using two seperate adapters." %}

#### For Laptop **with** Thunderbolt 3+ Port - Dual 10GbE 

The **Sonnet Twin10G SFP28 Thunderbolt Adapter** is a possible solution. This adapter provides two SFP+ ports through a single Thunderbolt connection, potentially enabling the operation of a dual-channel USRP X3x0 device at full capacity.

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/twin10g.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">Sonnet Twin10G SFP28 Thunderbolt Adapter for dual 10GbE connections</p>
</div>

{% include note.html content="We have not tested this solution ourselves. If you have successfully achieved dual-10GbE streaming using this device, please let us know and we will update this page." %}

#### For Laptop **without** Thunderbolt 3+ Port

For laptops without Thunderbolt 3+ ports, an **M.2-to-10GbE adapter** is maybe the last available solution. However, this approach has serious limitations:

1. **M.2 Slot Usage**: Requires one M.2 slot, typically used for SSD storage
2. **Physical Risk**: Cannot properly close the laptop's back panel, risking physical damage

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/m2-to-10gbe.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">M.2-to-10GbE adapter - use with caution</p>
</div>

{% include warning.html content="We have not tested this solution ourselves. For serious USRP-based R&D, we strongly recommend using either a desktop computer or a laptop with Thunderbolt 3+ port. If you have successfully achieved 10GbE streaming with this solution, please let us know all the details and we will update this page." %}

### Can 1GbE Work? Yes, But Not Recommended

Using a **1GbE connection severely limits the performance** of the X3x0 series, and it is only recommended for initial hardware unboxing and connectivity testing phases.

### PCIe Interface? NO!

The NI USRP X3x0 also has a PCIe port for signal streaming. We strongly advise **AGAINST** using it. **This interface does NOT support multi-USRP combination**. Additionally, the special PCIe cable and host-side card are prohibitively expensive.

## NI USRP E320

The E320 model utilizes a single **SFP+ interface** for signal streaming, supporting up to **10GbE** connection. This setup aligns with the connectivity approach used for the X3x0 model. For details, refer to the [NI USRP X3x0 section](#ni-usrp-x3x0-series-x300x310).

## NI USRP N300/N310

The N300 and N310 models feature the same **dual-SFP+ interfaces** as the X3x0 for signal streaming, supporting up to **dual-10GbE** connections. For details, refer to the [NI USRP X3x0 section](#ni-usrp-x3x0-series-x300x310).

## NI USRP N320/N321

The N320/N321 models feature **dual-SFP+ interfaces** and **a QSFP+ interface**. For dual-SFP+ interfaces, refer to the [NI USRP X3x0 section](#ni-usrp-x3x0-series-x300x310). Regardless of the connection type used, it is necessary to flash the `XG` firmware to achieve 10GbE connections.

### QSFP+ Cable

Although the QSFP+ interface (literally quad-lane SFP+) supports 4x10GbE, the N320/321 models only utilize two lanes, making it equivalent to a dual-10GbE connection.

We use a **QSFP+ to 4x SFP+ Breakout Cable** to connect N320/321 to the [host-side Intel X710 NIC](#for-desktop-computer).

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/qsfp+breakout.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">QSFP+ to 4x SFP+ Breakout Cable for connecting N320/321</p>
</div>

## NI USRP X4xx Series (X410/X440)

The X4xx series is equipped with **dual QSFP28 interfaces**, supporting up to **dual-100GbE** connections. When paired with the `CG_400` firmware, the X410 supports simultaneous 500 MSPS Tx and Rx across four channels. When paired with the `CG_1600` firmware, the X440 supports up to 2GSPS Tx and Rx on a single channel. 

### Host-Side Network Solutions

We provide two proven solutions for connecting X4xx devices, each suited for different performance requirements.

#### Solution 1: Dual-100GbE Connection (Recommended)

Our recommended solution utilizes the **Mellanox/NVIDIA ConnectX-5 EX (MCX516A-CDAT)** network card. This dual-port QSFP28 card supports both 40GbE and 100GbE modes through its PCIe Gen4 x16 interface, offering maximum performance and future-proofing capabilities.

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/mcx516a.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">Mellanox/NVIDIA ConnectX-5 EX dual-port 100GbE NIC</p>
</div>

For connectivity, we recommend using **QSFP28 DAC (Direct Attach Copper) cables**. The number of cables needed depends on your FPGA image: the standard performance images use one cable, while the high-performance images require both ports for maximum throughput.

{% include note.html content="Solution 1 is recommended for high-performance applications but is exclusive to X4xx devices." %}

<div style="text-align: center; margin: 20px 0;">
  <img src="images/usrp/qsfp28+.png" style="max-height: 180px">
  <p style="font-style: italic; margin-top: 10px;">QSFP28 DAC cable for 100GbE connections</p>
</div>

#### Solution 2: Quad-10GbE Connection

We reuse the [**Intel X710-DA4 Quad-Port 10GbE** NIC](#for-desktop-computer) for this solution. This approach is particularly valuable for labs working with multiple USRP generations, as the same NIC can be used with X3x0 and N3x0 devices. The connection requires a [**QSFP+ to 4x SFP+ breakout cable**](#qsfp-cable), which connects the USRP's QSFP28 Port 0 (operating in 40GbE mode) to the NIC's four SFP+ ports.

{% include note.html content="Solution 2 is limited to 250 MSPS per channel but offers compatibility with X3x0 and N3xx devices." %}

### FPGA Image Considerations

The choice of FPGA image determines both the device's capabilities and its network requirements:

The standard performance images (`UC_200` and `X4_200`) support sampling rates up to 250 MSPS per channel. These images include Digital Up/Down Conversion (DUC/DDC), enabling multiple baseband sampling rates: 250, 125, 83.333, 62.5, 50, 25, and 12.5 MHz. Note that `UC_200` works exclusively with Solution 1, while `X4_200` only works with Solution 2.

The high-performance images (`CG_400` and `CG_1600`) require Solution 1's dual-100GbE connectivity. The `CG_400` enables 500 MSPS operation across four channels on the X410, while the `CG_1600` supports up to 2GSPS on a single channel of the X440. These images bypass the DUC/DDC to achieve maximum throughput, operating only at their nominal sampling rates.

{% include warning.html content="High-performance images are extremely computationally intensive. Use them only when sampling rates above 250 MSPS are required." %}

