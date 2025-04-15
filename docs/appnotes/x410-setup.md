---
title: Getting Started with NI USRP X4x0 Series
---

::: tip
Although this guide is specifically written for the X4x0 series, the procedures described here are fully compatible with all USRP devices using the MPM (Modular Peripheral Manager) architecture, including the E320 and N3xx series.
:::

## Document Structure

This document is structured into several key stages to guide you through setting up and utilizing the NI USRP X4x0 series device effectively:
1. [Connect The Device to the Internet via the 1GbE Port](#connect-the-device-to-the-internet-via-the-1gbe-port)
2. [Device Discovery](#device-discovery)
3. [Test Internet Connection](#test-internet-connection)
4. [Configure Proxy Settings](#configure-proxy-settings)
5. [Upgrade X4x0 Filesystem](#upgrade-x4x0-filesystem)
6. [Flash FPGA Image](#flash-fpga-image)
7. [Next Steps](#next-steps)

## Connect The Device to the Internet via the 1GbE Port

The NI USRP X4x0 device features two QSFP28+ interfaces and a single 1GbE Ethernet interface. The 1GbE port serves as the primary management interface, configured to obtain its IP address via the **DHCP protocol**. This port requires an internet connection for hardware initialization and firmware updates. While using a router with internet connectivity is a common approach, it adds unnecessary hardware and cables. More importantly, users with network access restrictions may find that a router doesn't provide full internet access. Therefore, we recommend establishing a direct connection between the 1GbE port and a host computer that shares its full-access internet connection. Below, we provide connection solutions for Mac, Ubuntu, and Windows platforms:

### Key Steps for Mac:
1. Connect the X4x0's 1GbE interface directly to your Mac using an Ethernet cable.
2. Open System Preferences and search for 'Sharing'.
3. Select "Internet Sharing" from the search results.
4. Choose your Wi-Fi network from the "*Share your connection from*" menu.
5. Select the Ethernet port connected to the X4x0 in the "*To computers using*" list.
6. Within a minute, the USRP should acquire an IP address and internet access.
7. For users with limited internet access, install proxy software with LAN Sharing capabilities on your Mac.

### Key Steps for Ubuntu:
1. Connect the X4x0's 1GbE interface directly to your Ubuntu machine using an Ethernet cable.
2. Open System Preferences and navigate to Network settings.
3. Select the Ethernet connection that connects to the X4x0.
4. Go to the IPv4 Settings tab and select "Shared to other computers".
5. Click Save to apply the changes.
6. Within a minute, the USRP should acquire an IP address and internet access.
7. For users with limited internet access, install proxy software with LAN Sharing capabilities on your Ubuntu machine.

### Key Steps for Windows:
1. Connect the X4x0's 1GbE interface directly to your PC using an Ethernet cable.
2. Open Control Panel and navigate to Network and Sharing Center > Change adapter settings.
3. Right-click your internet connection (e.g., WiFi) and select "Properties".
4. Go to the Sharing tab and check "Allow other network users to connect through this computer's Internet connection".
5. Select the Ethernet connection used by the X4x0 from the dropdown menu under "Home networking connection".
6. Click OK to enable Internet Sharing.
7. Within a minute, the USRP should acquire an IP address and internet access.
8. For users with limited internet access, install proxy software with LAN Sharing capabilities on your PC.

## Device Discovery

After setting up the network sharing as described above, the X4x0 device should have obtained an IP address. You can verify this by running the `uhd_find_devices` command on your host computer. This command should display the detected X4x0 device with its IP address.

::: info
The `uhd_find_devices` command is provided by the USRP Hardware Driver (UHD). For PicoScenes users, the UHD driver will be automatically installed during the PicoScenes installation process. For detailed installation instructions, please refer to the [Installation](../userManual/installation.md#picoscenes-software-installation) section.
:::

## Test Internet Connection

1. SSH into the device using its IP address (using 192.168.2.2 as an example):
   ```
   ssh root@192.168.2.2
   ```
   *Note: The X4x0 device has no default SSH password*; simply press Enter when prompted to continue the login process.

2. Once connected via SSH, verify connectivity to your host computer (192.168.2.1 as an example):
   ```
   ping 192.168.2.1
   ```

3. Test internet connectivity by pinging an external domain:
   ```
   ping github.com
   ```

## Configure Proxy Settings

If your network environment has restricted internet access, the `ping github.com` command may fail. To enable full internet access on the X4x0 device, follow these steps:

1. On your host computer, enable the **LAN Sharing** feature in your VPN/proxy software.

2. SSH into the X4x0 device using its IP address.

3. Configure the proxy settings by running:
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

1. SSH into the X4x0 device using its IP address.

2. Run the following command to upgrade to the latest file system:
   ```bash
   usrp_update_fs -t master
   ```

3. Reboot the system:
   ```bash
   reboot
   ```

4. After the reboot, SSH into the X4x0 device again.

5. Save the filesystem changes:
   ```bash
   mender commit
   ```

6. Reboot the system one final time:
   ```bash
   reboot
   ```

## Flash FPGA Image

Before flashing the FPGA image, you need to determine which image to use based on your device connection method and signal measurement requirements. For detailed information, please refer to [NI USRP X4xx Series](connect-usrp#ni-usrp-x4xx-series). 

The following steps demonstrate how to flash the FPGA image, using the `X4_200` image as an example:

1. SSH into the X4x0 device as previously described.

2. Run the following command to flash the FPGA image:
    ```bash
    uhd_image_loader --args='type=x4xx,mgmt_addr=127.0.0.1,fpga=X4_200'
    ```
    This command flashes the device to use the 'x4_200' FPGA image.

3. Reboot the system:
    ```bash
    reboot
    ```

## Next Steps

Congratulations! You have now completed the initial setup of your X4x0 device. For the next steps, you may want to:

1. Learn about dual QSFP28 port connections by referring to the [Connecting NI USRP Devices](connect-usrp) documentation.
2. Explore using PicoScenes to drive the X4x0 device for Wi-Fi ISAC research by checking out the [CSI Measurement using PicoScenes](scenarios) documentation. 