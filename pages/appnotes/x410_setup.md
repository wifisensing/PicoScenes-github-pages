---
title: Getting Started with NI USRP X410
keywords: NI USRP X410, setup, initialization
last_updated: Mar. 7, 2025
summary: "This guide outlines the unboxing and initial configuration process for the NI USRP X410 device."
permalink: x410-get-started
folder: appnotes
toc: true
disable_heading_numbers: true
---

This document outlines the complete process from unboxing to high-performance application of the NI USRP X410 device, presented in several stages. Currently, the exploration of the X410 is ongoing, and this document is not yet comprehensive.

This document is structured into several key stages to guide you through setting up and utilizing the NI USRP X410 device effectively:

1. [Connect The Device to the Internet via the 1GbE Port](#connect-the-device-to-the-internet-via-the-1gbe-port)
2. [Upgrade X4x0 Filesystem](#upgrade-x4x0-filesystem)
3. [Initial Verification via the 1GbE Port](#initial-verification-via-the-1gbe-port)

We have just finished the first two sections, and subsequent sections are still under development. Please stay tuned.

## Connect The Device to the Internet via the 1GbE Port

The NI USRP X4x0 device features two QSFP28+ interfaces and a single 1GbE Ethernet interface. The 1GbE port, primarily used for device management, is configured to obtain its IP address via the **DHCP protocol**. An internet connection is also required for this port to facilitate hardware initialization and firmware updates. The typical approach is to use a router with internet connectivity; however, this adds extra hardware and cables. More importantly, users who are subject to network access restrictions may find that a router doesn't provide full internet access. Therefore, we recommend establishing a direct connection between the 1GbE port and a host computer which shares its full-access internet connection. Below, we provide connection solutions for Mac, Ubuntu, and Windows platforms:

### Key Steps for Mac:
1. Connect the X4x0's 1GbE interface directly to the Mac
2. Go to System Preferences, search 'Sharing', select "Internet Sharing" from the search results.
3. Choose the connection you want to share from the "*Share your connection from*" menu, usually your Wi-Fi network.
4. In the "*To computers using*" list below, choose the Ethernet port which the X4x0 is connected.
5. In a minute or less, the X410 acquires an IP address and access to the internet.
6. For users with limited internet access, install proxy software with LAN Sharing capabilities on the Mac.

### Key Steps for Ubuntu:
1. Connect the X4x0's 1GbE interface directly to the Ubuntu machine
2. Go to System Preferences > Network
3. Choose the Ethernet connection which connects the X4x0, and edit this connection.
4. Go to the IPv4 Settings tab, select "Shared to other computers", Click Save.
5. In a minute or less, the X410 acquires an IP address and access to the internet.
6. For users with limited internet access, install proxy software with LAN Sharing capabilities on the Ubuntu machine.

### Key Steps for Windows:
1. Connect the X4x0's 1GbE interface directly to the PC
2. Open Control Panel > Network and Sharing Center > Change adapter settings.
3. Right-click the connection you want to share (e.g., WiFi), and select "Properties".
4. Go to the Sharing tab, and check "Allow other network users to connect through this computer's Internet connection".
5. Select the Ethernet network connection used by the X4x0 from the dropdown menu under "Home networking connection".
6. Click OK to enable Internet Sharing.
7. The X410 acquires an IP address and access to the internet.
8. For users with limited internet access, install proxy software with LAN Sharing capabilities on the PC.

## Find Device

After setting up the network sharing as described above, the X4x0 device should have obtained an IP address. You can verify this by running the `uhd_find_devices` command on your host computer. This command should display the detected X4x0 device with its IP address.

{% include note.html content="The `uhd_find_devices` command is provided by the USRP Hardware Driver (UHD). For PicoScenes users, the UHD driver will be automatically installed during the PicoScenes installation process. For detailed installation instructions, please refer to the [Installation](installation.html#picoscenes-software-installation) section." %}

## Validate the Internet Connection

1. SSH into the device using its IP address with the following command (using 192.168.2.2 as an example):
   ```
   ssh root@192.168.2.2
   ```
   *The X4x0 device has no default SSH password*; simply press Enter when prompted to continue the login process.

2. Once connected via SSH, verify connectivity back to your host computer (192.168.2.1 as an example) by running:
   ```
   ping 192.168.2.1
   ```

3. Next, test internet connectivity by pinging an external domain:
   ```
   ping github.com
   ```

## Validate Connectivity (for Users with Restricted Internet Access)

If you have restricted internet access, the `ping github.com` command may fail. To enable internet access on the X4x0 device, follow these steps:

1. On your host computer, enable the **LAN Sharing** feature in your VPN/proxy software.

2. SSH into the X4x0 device using its IP address.

3. Specify the proxy for X4x0 device by running:
   ```bash
   export https_proxy=http://<PROXY_SHARING_IP_AND_PORT> http_proxy=http://<PROXY_SHARING_IP_AND_PORT> all_proxy=socks5://<PROXY_SHARING_IP_AND_PORT>
   ```
   Replace `<PROXY_SHARING_IP_AND_PORT>` with your VPN/proxy sharing port (e.g., 198.168.2.1:1234).

4. Since the `ping` command uses ICMP protocol (which isn't proxied), it will still fail. Instead, use `wget` to verify connectivity:
   ```bash
   wget --method=HEAD -S github.com
   ```
   This command checks if you can reach github.com by attempting to download just the page header.

## Upgrade X4x0 Filesystem 

1. SSH into the X4x0 device using its previously mentioned IP address.

2. Execute the command `usrp_update_fs -t master` to upgrade to the latest file system.

3. Reboot the system by issuing the `reboot` command.

4. SSH into the X4x0 device once more.

5. Execute `mender commit` to save the changes to the filesystem.

6. Reboot the system again using the `reboot` command.

## Flash FPGA Image

Before flashing the FPGA image, you need to determine which image to use based on your device connection method and signal measurement requirements. For detailed information, please refer to [NI USRP X4xx Series](connect-usrp#ni-usrp-x4xx-series). 

The following steps demonstrate how to flash the FPGA image, using the `X4_200` image as an example:

1. SSH into the X4x0 device as previously described.

2. Execute the following command:
    ```bash
    uhd_image_loader --args='type=x4xx,mgmt_addr=127.0.0.1,fpga=X4_200'
    ```
    This command flashes the device to use the 'x4_200' FPGA image.

3. Reboot the system using the `reboot` command.