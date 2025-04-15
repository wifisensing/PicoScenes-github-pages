---
title: Utility Programs and Bash Scripts   
autoNumbering: true
startNumber: 9 
---

## UDP-Forwarder Plugin & UDPRemoteLogger

The UDP-Forwarder plugin can forward the received PicoScenes Rx frame to a remote computer via UDP. The UDPRemoteLogger program can listen to UDP and save the PicoScenes Rx frames to a .csi file on another machine. Their usage is straightforward.

The following command forwards the received frames to a remote machine with IP/port 192.168.10.10:50000.

```bash
PicoScenes "-d debug -i usrp --mode logger --freq 5190 --forward-to 192.168.10.10:50000"
```

The following command receives PicoScenes Rx frames from port 50000 and save to a .csi file.

```bash
UDPRemoteLogger --port 50000
```

::: tip
UDP-Forwarder and UDPRemoteLogger are fully open-sourced at [https://github.com/wifisensing/PicoScenes-PDK](https://github.com/wifisensing/PicoScenes-PDK).
:::

## Utility Scripts

Besides the `PicoScenes` main program, we also provide several handy bash scripts.

1. **switch5300Firmware**: switch between the normal and CSI-measurement firmware for IWL5300 NIC

    CSI measurement on IWL5300 is powered by a special CSI measurement firmware, which cannot connect to the encryption-protected Wi-Fi network. To restore the regular connection, you have to switch to the ordinary firmware. This script does the firmware switch. It has three modes:

    - Running `switch5300Firmware` without argument will perform the auto-switching between the ordinary firmware and the CSI firmware.

        ```bash
        csi@csi-System:~$ switch5300Firmware 
        Current iwlwifi firmware is CSI measurement version,
        Switching to plain ordinary measurement version...
        Reloading iwlwifi module ...

        csi@csi-System:~$ switch5300Firmware # auto-switch to CSI firmware
        Current iwlwifi firmware is plain ordinary version,
        Switching to CSI measurement version...
        Reloading iwlwifi module ...
        ```

    - Run `switch5300Firmware csi` to force switch to the CSI firmware

        ```bash
        csi@csi-System:~$ switch5300Firmware csi
        Switching to CSI measurement version...
        Reloading iwlwifi module ...
        ```

    - Run `switch5300Firmware ordinary` to force switch to the ordinary firmware

        ```bash
        csi@csi-System:~$ switch5300Firmware ordinary
        Switching to plain ordinary measurement version...
        Reloading iwlwifi module ...
        ```

2. **array_status**: list all PCI-E connected Wi-Fi NICs

    As discussed in [Device Naming](scenarios.md#device-naming), PicoScenes uses an ID system to refer to the specific Wi-Fi NICs. `array_status` shows the PhyPath, DevId, PhyId, [MonId], Device MAC address (changeable), Hardware MAC address (unchangeable), Carrier Frequency, Bandwidth, and Model description for each NIC. The default parameter is all, which lists all NICs. The following is a sample output:

    ```console
    csi@csi-System:~$ array_status
    Device Status of Wi-Fi NIC array "all":
    PhyPath DEV PHY [MON] DEV_MacAddr [MON_MacAddr] [CF] [BW] ProductName
    3 wlp3s0 phy5 00:21:6a:2a:8f:82 Ultimate N WiFi Link 5300 
    4 wlp4s0 phy1 00:16:ea:12:34:56 AR93xx Wireless Network Adapter 
    7 wlp7s0 phy6 00:16:ea:12:34:56 Wi-Fi 6 AX200 
    ```

3. **array_prepare_for_picoscenes**: Put the NIC into monitor mode, get them unmanaged by Network-Manager, and more ...

    The most convenient CSI measurement mode for QCA9300 and IWL5300 is the packet injection-monitor mode. Some preparation needs to be done to put NICs in the CSI measurement mode, and `array_prepare_for_picoscenes` is the shortcut for the preparation. The following sample command prepares the NICs with PhyPath `3` and `4` for CSI measurement.

    ```console
    csi@csi-System:~$ array_prepare_for_picoscenes "3 4" "5200 HT20"
    Change CPU frequency governor to performance ...
    CPU frequency governor has been set to performance for 10 core(s).
    Un-managing NICs from Network-Manager ...
    Unlocking RF-Kill...
    Disabling power management...
    Disconnecting Wi-Fi...
    Stopping monitor interfaces...
    Changing MAC address...
    Skip setting the mac address (00:16:ea:12:34:56) for Intel 5300 NIC (wlp3s0)...
    Adding monitor interfaces...
    Adding a monitor interface for phy1 (phy1), named phy1mon ...
    Adding a monitor interface for phy13 (phy13), named phy13mon ...
    Changing working frequency to 5200 HT20 ...
    Preparation is done.
    ----------------------
    Device Status of Wi-Fi NIC array "all":
    PhyPath DEV PHY [MON] DEV_MacAddr [MON_MacAddr] [CF] [BW] ProductName
    3 wlp3s0 phy13 phy13mon 00:21:6a:2a:8f:82 00:21:6a:2a:8f:82 5200 20 Ultimate N WiFi Link 5300 
    4 wlp4s0 phy1 phy1mon 00:16:ea:12:34:56 00:0e:8e:59:8a:b7 5200 20 AR93xx Wireless Network Adapter 
    7 wlp7s0 phy14 44:af:28:57:6c:9b Wi-Fi 6 AX200 
    ----------------------
    ```

    You may run `array_prepare_for_picoscenes -h` for help.

4. **RestoreNetwork**: Restore ordinary Wi-Fi connection

    Run `RestoreNetwork` to remove all monitor interfaces, and restore the managed state of NICs from the system Network-Manager.    
