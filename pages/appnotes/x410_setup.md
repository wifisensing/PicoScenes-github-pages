---
title: Getting Started with NI USRP X410
keywords: NI USRP X410, setup, initialization
last_updated: Mar. 5, 2025
summary: "This guide outlines the unboxing and initial configuration process for the NI USRP X410 device."
sidebar: appnotes_sidebar
permalink: x410-get-started.html
folder: appnotes
---

## Connect The Device to the Internet via the 1GbE Port

The NI USRP X4x0 is equipped with two QSFP28+ interfaces and one 1GbE Ethernet interface. The 1GbE interface is used for firmware updates, upgrades, and remote control of the built-in Linux system. Unlike the traditional N2x0/X3x0 series devices that use static IP addresses, the 1GbE interface on the X4x0 is configured to automatically acquire an IP address using the **DHCP protocol**. This requires a device that provides DHCP services, typically a router, to allocate an IP address. Additionally, the initialization, upgrading, or resetting of the X4x0 requires an internet connection, meaning the router must have internet access. A significant challenge arises during the initialization, upgrading, or resetting processes due to the dependency on accessing GitHub, which can be problematic for users in networks with restricted access. Below are two recommended networking solutions for the X4x0:

#### **Solution 1: Router with Internet Access (Straightforward yet Inconvinient)**

- **Key Steps**:
  1. Ensure the router is connected to the internet.
  2. Connect the X4x0's 1GbE interface to the router via a LAN port.
  3. The router automatically provides the X4x0 with an IP address and internet access.
  4. Connect another computer to the same LAN with the USRP driver (UHD) installed. Run the `uhd_find_devices` command to locate the X4x0 devices.
  5. *For users with limited internet access*, additional VPN/proxy setup is necessary:
    - Option 1 (Hard): Configure the router to have full internet access
    - Option 2 (**Easy**): Install proxy software on the host computer and enable LAN Sharing.

This solution is straightforward but inconvinent due the additional router.

#### **Solution 2: Direct PC Connection + Internet Sharing (Convinient yet Less Reliable)**

If a router is not available, you can set up the X4x0 using the **Internet Sharing** feature directly from your Mac/PC.

- **Key Steps**:
  1. Enable the **Internet Sharing** feature on the Mac/PC.
  2. Connect the X4x0's 1GbE interface directly to the Mac/PC using an Ethernet cable.
  3. Designate the port connected to the X4x0 on the Mac/PC to provide internet sharing (e.g., `USB 10/100/1000 LAN`).
  4. Install the USRP driver (UHD), and run the `uhd_find_devices` command to locate the X4x0 devices.
  5. The X410 acquires an IP address and access to the internet.
  6. *For users with limited internet access*, install a proxy software with LAN Sharing capabilities on the Mac/PC.

This solution is more convinent, however, less reliable than dedicated hardware router.

### Validate Connectivity

#### Validate the LAN Connection

1. Ensure the host computer is connected to the same LAN and has the USRP driver (UHD) installed. Execute the `uhd_find_devices` command to locate the X4x0 devices.

2. Optionally, you can further test the connectivity using the `ping` command, for example, `ping 192.168.2.2`.

#### Validate the Internet Connection

1. SSH into the device using its IP address with the following command:
   ```
   ssh root@192.168.2.2  # <-- 192.168.2.2 is the IP address of the X4x0
   ```
   *The X4x0 does not have ssh password by default*; simply press Enter to proceed through the login process.

2. Within the SSH session, test the backward connectivity to the host computer by `ping 192.168.2.1`.

3. Still within the SSH session, test the internet connectivity to github.com by `ping github.com`.

### Validate Connectivity (for Users with Limited Internet Access)

For users with limited internet access, the `ping github.com` command might fail. Follow these steps to configure a network proxy on the X4x0 device to obtain full internet access:

1. Enable the **LAN Sharing** feature of the VPN/proxy software on the host computer.

2. SSH into the X4x0 device using its IP address like the above.

3. Execute the following script:
   ```bash
   export https_proxy=http://<PROXY_SHARING_IP_PORT> http_proxy=http://<PROXY_SHARING_IP_PORT> all_proxy=socks5://<PROXY_SHARING_IP_PORT>
   ```
   Replace `<PROXY_SHARING_IP_PORT>` with the IP/Port of your VPN/Proxy sharing port, e.g., 198.168.2.1:1234.

4. The `ping` command, which relies on the ICMP protocol and is not proxied by the above script, is expected to fail. Use alternative methods such as `wget` or `curl` to verify connectivity. For instance, check connectivity to github.com with the `wget` command:
   ```bash
   wget --method=HEAD -S github.com
   ```
    This command will attempt to download the page from github.com but will only fetch the header part to confirm connectivity.

## Upgrade X4x0 Filesystem 

1. SSH into the X4x0 device using its previously mentioned IP address.

2. Execute the command `usrp_update_fs -t master` to upgrade to the latest file system.

3. Reboot the system by issuing the `reboot` command.

4. SSH into the X4x0 device once more.

5. Execute `mender commit` to save the changes to the filesystem.

6. Reboot the system again using the `reboot` command.

## Initial Verification via the 1GbE Port

After completing the steps above, the X4x0 is preliminarily ready for use. To verify, utilize PicoScenes to measure CSI through the 1GbE connection.

  *Note: PicoScenes does not currently support the X440 model; therefore, the X410 model is used as an example in this section.*

### Flash the 'x4_200' FPGA Image

To properly receive Wi-Fi signals through the 1GbE interface, it is necessary to flash the 'x4_200' FPGA image. Follow these steps to flash the 'x4_200' FPGA image:

1. SSH into the X4x0 device as previously described.

2. Execute the following command:
    ```bash
    uhd_image_loader --args='type=x4xx,mgmt_addr=127.0.0.1,fpga=X4_200'
    ```
    This command flashes the device to use the 'x4_200' FPGA image.

3. Reboot the system using the `reboot` command.

### Run UHD Commands

   ```bash
   uhd_find_devices
   ```
   This command verifies if the USRP device is detected by the host system.

   ```bash
   uhd_usrp_probe
   ```
   This command initiates a communication session with the USRP to ensure there are no errors in connectivity or configuration.

   ```bash
   uhd_fft --args="addr=192.168.10.2" --freq 2412e6 --rate 20e6
   ```
This command configures the USRP to receive signals at 2412 MHz with a sample rate of 20 MHz, and displays the spectrum.

### Run PicoScenes

After flashing the FPGA image, execute the following command on the host computer to start PicoScenes in debug mode, logging CSI data at 2.412 GHz and plotting the results:

```bash
PicoScenes '-d debug -i usrp --mode logger --freq 2412 --plot'
```
You can tune '2412' to other **control frequency** of the BSSID spatially nearby, and PicoScenes should display CSI 
measurement plots.
