---
title: Troubleshooting & Support
autoNumbering: true
startNumber: 13
--- 

## Troubleshooting

The following shows some of the most frequently seen errors and their solutions for quick reference. For other issues that happened during the installation, upgrading or later usage, you may seek [technical support](#technical-support) by submitting a bug report to PicoScenes Issues Tracker.

### Errors during installation & daily update

- *Problem*: **Error during apt update, "Certificate verification failed: The certificate is NOT trusted. The certificate chain uses expired certificate. XXX.... The repository 'xxxx' does not have a Release file."**

  **Solution**: Re-install *ca-certificate* package by `sudo apt-get install --reinstall ca-certificates`.

- *Problem*: **Error during apt installation saying, "E: fail to fetch XXX, File has unexpected size (xxx != xxx). ..."**

  **Solution**: The possible reason is that the PicoScenes repository is updated, but your local apt cache is not synced. To fix this error, you should run `sudo apt update` to sync your local apt cache.

- *Problem*: **Current PicoScenes build is expired. You should upgrade PicoScenes to the latest version.**

  **Solution**: As PicoScenes is still under active development, we set a 60-day expiration for each PicoScenes build. If your current build is expired, follow [PicoScenes Installation & Upgrade](installation.md) to upgrade your PicoScenes software.

- *Problem*: apt system get deadlocked during PicoScenes upgrade

  **Solution**: [Issue #61 on GitHub](https://github.com/wifisensing/PicoScenes-Issue-Tracker/-/issues/61)

### Runtime errors

- *Problem*: **[Warning] Incompatible kernel version, current version: XXX, expected version: YYY.**

  **Solution**: This is because your system loads the incompatible kernel. Solution: reboot your computer and choose the expected kernel version YYY in grub menu.

  If your computer doesn't show the grub boot selection menu, you may refer to [https://askubuntu.com/questions/16042/how-to-get-to-the-grub-menu-at-boot-time/16049#16049](https://askubuntu.com/questions/16042/how-to-get-to-the-grub-menu-at-boot-time/16049#16049) to restore the menu.

- *Problem*: **PicoScenes requires your system clock to be synchronous with a global NTP server.**

  **Solution**: This error usually happens when you connect to an AP but it has no internet connection and with wrong clock/time setting. You may either switch to an internet-connected AP or configure the AP's clock/time setting manually.

- *Problem*: **Error during USRP B200 series installation, "Could not find the image 'usrp_b200_fw.hex' in the image directory /usr/share/uhd/images ...."**

  **Solution**: run `sudo /usr/lib/uhd/utils/uhd_images_downloader.py` to download **all** USRP images.

### MATLAB Toolbox errors

- *Problem*: libstdc++.so.6: version GLIBCXX_3.4.26 not found

  **Solution**: install `matlab-support` package as described in [Install PicoScenes MATLAB Toolbox Core](installation.md#install-picoscenes-matlab-toolbox-core).
  Thanks *Jinen Li* from Shenzhen University (SZU) for providing this bug fix!

## Technical Support

### PicoScenes Issues Tracker (PicoScenes官方交流问答)

We provide the official and public technical support via [PicoScenes Issues Tracker](https://github.com/wifisensing/PicoScenes-Issue-Tracker/issues). You may post software bugs, encountered problems and suggestions to the issue tracker. Once you post an issue, GitHub will notify us and we will reach it as soon as possible.

**对于中文用户**：如果您不想咬文嚼字用英语交流，没问题！ 您中文提问，我们中文回复：）

### PicoScenes微信群(PicoScenes WeChat group)

If WeChat is one of your favorite IM APPs, you may join the PicoScenes WeChat Group by contacting Zhiping Jiang "jiangzhiping" in WeChat. As the group has exceeded 200 people, you can only be invited to the group.
