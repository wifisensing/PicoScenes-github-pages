---
title: Useful Resources 
autoNumbering: true
startNumber: 12
---

## The academic paper of PicoScenes

Zhiping Jiang, Tom H. Luan, Xincheng Ren, Dongtao Lv, Han Hao, Jing Wang, Kun Zhao, Wei Xi, Yueshen Xu, Rui Li, [Eliminating the Barriers: Demystifying Wi-Fi Baseband Design and Introducing the PicoScenes Wi-Fi Sensing Platform, in IEEE Internet of Things Journal (IEEE IOT-J)](https://doi.org/10.1109/JIOT.2021.3104666).

This paper introduces PicoScenes and also reports very extensive performance evaluations of PicoScenes. Many of the results are state of the art.

> **Important**: If PicoScenes software (including the main program, bash scripts, PicoScenes MATLAB Toolbox and any PicoScenes plugins regardless of the ownership) is used by any form in your academic research, **you should cite the above work**. This citation requirement is also included in the PicoScenes Software EULA.

## Quick Reference

- Wi-Fi Channelization Table: [channels](channels.md)
- Frontend Presets List: [presets](presets.md)
- Device Naming Protocol: [device_naming](scenarios.md#device-naming)

## Opensource repositories

- PicoScenes projects group: [https://github.com/wifisensing](https://github.com/wifisensing). The following are some of the open source sub-projects.
  - [PicoScenes MATLAB Toolbox Core](https://github.com/wifisensing/PicoScenes-MATLAB-Toolbox-Core): the official PicoScenes MATLAB Toolbox (PMT) that parse the PicoScenes .csi file.
  - [PicoScenes Python Toolbox](https://github.com/wifisensing/PicoScenes-Python-Toolbox): the official PicoScenes Python Toolbox (PPT) that parse the PicoScenes .csi file in Python. This project is contributed by Tian Teng.
  - [RXS-Parsing-Core](https://github.com/wifisensing/RXS-Parsing-Core): the core CSI data parsing routine and the related utility code. This project is shared among the PicoScenes main program, PicoScenes MATLAB Toolbox and PicoScenes Python Toolbox via git submodule.
  - [PicoScenes Plugin Development Kit (PS-PDK)](https://github.com/wifisensing/PicoScenes-PDK): the source repositories of three PicoScenes plugins, namely the Demo Plugin, UDP Forwarder and EchoProbe. We name it PS-PDK, because most PicoScenes plugins are developed based on this repo.
  - [PicoScenes Manual](https://github.com/wifisensing/PicoScenes-Manual): the reStructuredText source code of this documentation.

## Other useful resources on Wi-Fi/RF/Smart Sensing

- [IoT Book](https://iot-book.github.io) by Jiliang Wang, Tsinghua University (A full Chinese book). 王老师的这本IoT Book覆盖了智能感知相关的众多研究方向的最新进展及上手宝典，是入门智能感知相关研究不可多得的教材。
