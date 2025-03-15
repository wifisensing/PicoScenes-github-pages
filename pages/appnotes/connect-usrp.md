---
title: Connecting NI USRP Devices
keywords: NI USRP, connection guide, setup
last_updated: Mar. 10, 2025
summary: "This document lists the recommended connection approach to various NI USRP models, including B2x0/N2x0/E3x0/N3x0/X3x0/X4x0."
permalink: connect-usrp
folder: appnotes
toc: true
doc_number: 2
---

## NI USRP B2x0

Ensure the B2x0 device is connected using a **USB 3.0 cable**. 

## NI USRP N210

The NI USRP N210 utilizes an **1GbE Ethernet** port for connectivity with the host computer. Simply use a standard Ethernet cable to connect the RJ45 ports of both the N210 and your host computer.

## NI USRP X3x0

The NI USRP X3x0 uses **dual SFP+ interfaces** for signal streaming, supporting up to **Dual-10GbE** connection. With this dual-10GbE connection, the X3x0 can transmit and receive I/Q streams from dual channels with up to 200 MSPS rate.

The following is our recommended solution based on our long-term practice, balancing performance, reliability, and low risk of equipment damage.

### Cable & Connector Solution for Dual-10GbE

**SFP+ DAC Cable** is our preferred choice. It features integrated SFP+ connectors on both ends, which enhances robustness and minimizes the risk of disconnection. It is both cost-effective and highly reliable.

Alternatives (not recommended):
    
1. **RJ45 Cable + Dual SFP+ to RJ45 Adapters**: This setup allows the use of standard Ethernet cables with SFP+ ports but tends to be more expensive. Additionally, improper use of RJ45 adapters can damage the SFP+ interfaces, and there is a higher risk of misplacing the adapters.

2. **Separate Optical Cable and SFP+ Optical Transceivers**: This option involves using individual optical cables and SFP+ optical transceivers at each end. It allows for significantly longer connection distances without compromising signal quality. However, it is more expensive and requires careful handling of the optical cables to avoid physical damage. There is also a risk of misplacing the adapters.

3. **SFP+ AOC Cable**: Similar to the DAC cable, the SFP+ AOC (Active Optical Cable) incorporates fiber optics, which makes it more costly and more prone to physical damage.

### 10GbE Ethernet NIC

We utilize the **Intel X710-DA4 Quad-Port 10GbE** Ethernet NIC. This NIC has been tested to simultaneously operate two USRP X310 devices (or a single X410 device), supporting four channels with a 200 MSPS rate (250 MSPS for the X410) for both transmission and reception. The system can achieve peak throughput rates of up to 1.9 GB/s for both sending and receiving data.

Don't forget to flash the `XG` firmware to USRP to enable dual-10GbE streaming.

### PCIe Interface?

We strongly advise **AGAINST** using the PCIe interface. The PCIe interface and its associated cables are prohibitively expensive. Additionally, this interface does not support multi-USRP combination.

## NI USRP E320

The E320 model utilizes a single **SFP+ interface** for signal streaming, supporting up to **10GbE** connection. This setup aligns with the connectivity approach used for the X310 model. For details, refer to the [NI USRP X310 section](#ni-usrp-x3x0).

## NI USRP N300/N310

The N300 and N310 models feature the same **dual SFP+ interfaces** as the X310 for signal streaming, supporting up to **Dual-10GbE** connections. For details, refer to the [NI USRP X310 section](#ni-usrp-x3x0).

## NI USRP N320/N321

The N320/N321 models feature **dual SFP+ interfaces** and **a QSFP+ interface**. For dual SFP+ interfaces, refer to the [NI USRP X310 section](#ni-usrp-x3x0). Regardless of the connection type used, it is necessary to flash the `XG` firmware to achieve dual-10GbE connections.

### QSFP+ Cable

Although the QSFP+ interface (literally qual-lane SFP+), supports 4x10GbE, the N320/321 models only utilize two lanes, making it equivalent to a dual-10GbE connection.

We use **QSFP+ to 4x SFP+ Breakout Cable** to connect N320/321 to the host multi-port 10GbE NIC.

## NI USRP X4xx

The X4xx series is equipped with **dual QSFP28 interfaces**, supporting up to **Dual-100GbE** connections. When paired with the `CG_400` firmware, the X410 supports simultaneous 500 MSPS Tx and Rx across four channels. When paired with the `CG_1600` firmware, the X440 supports up to 2GSPS Tx and Rx on a single channel. 

### Choose the Correct FPGA Image
Selecting the appropriate FPGA image is crucial for the X4x0 series, as this series does not maintain backward compatibility with high-performance FPGA images. Taking the X410 model as an example:

* The `X4_200` and `UC_200` firmware support a maximum channel sampling rate of 250 MSPS, which is half of the maximum 500 MSPS. However, they can work with the built-in Integer-N synthesizer, producing multiple baseband sampling rates such as 250, 125, 83.333, 62.5, 50, 25, and 12.5 MHz. 

* The high-performance `CG_400` firmware operates exclusively at frequencies of 491.52 or 500 MHz and does not support fractional sampling rates or decimation. Using this firmware indiscriminately for any application is extremely computationally intensive, leading to a very high packet loss rate or frequent buffer overflows.

For more details, refer to [FPGA Image Flavors](https://files.ettus.com/manual/page_usrp_x4xx.html#x4xx_updating_fpga_types).

### Connection Solution for `X4_200/X4_400/X4_1600` FPGA Images

These images downgrade QSFP28 Port 0 to a QSFP port, i.e., from 100GbE to 40GbE. We then use a **QSFP+ to 4x SFP+ Breakout Cable** to connect QSFP28 Port 0 to the **Intel X710-DA4 Quad-Port 10GbE** NIC.

### Connection Solution for `UC_200/CG_400/CG_1600` FPGA Images

These images all utilize a 100GbE connection. We use the **Mellanox/NVIDIA ConnectX-5 EX 100 GbE NIC (MCX516A-CDAT)**, a **Dual-100GbE NIC**, to connect the X410, utilizing two **QSFP28 DAC cables**.