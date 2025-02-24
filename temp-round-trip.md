You may download and run the complete takeaway bash script for this
scenario at `2_2_3 <_static/2_2_3.sh>`{.interpreted-text
role="download"}

Two QCA9300/IWL5300 NICs performs round trip CSI measurement (Difficulty Level: Easy)
=====================================================================================

::: {.note}
::: {.title}
Note
:::

To simplify the description, in the following scenarios, we assume both
(or multiple) devices are all connected to one single PC, and we use the
long-string style command interface to control PicoScenes and hardware.
Users should refer to `dual_nics_on_one_machine`{.interpreted-text
role="ref"} to understand the long string command style.
:::

In this experiment, two NICS will perform the round-trip CSI
measurement. The exact protocol is as below:

1.  Prepare both NICs to the same channel and channel mode.
2.  NIC A injects packets in 802.11n format;
3.  NIC B receives the packet and measure the CSI;
4.  NIC B replied to NIC A in 802.11n format and *optionally* package
    the measured CSI as payload;
5.  NIC A receives the reply from NIC B and measure the CSI. Until now,
    a round-trip CSI measurement finishes.
6.  Optionally, if NIC B packages B\'s measured CSI as payload, then NIC
    A obtains the CSI measurements from both directions immediately.

Despite a pretty simple protocol, the above CSI measurement protocol
cannot be realized by the previous CSI tools because they don\'t
integrate the packet injection control, not to mention the difference
between QCA9300/IWL5300.

PicoScenes realizes the above round-trip CSI measurement via EchoProbe
plugin. Besides the simple *injector* and *logger* modes used in the
above scenarios, EchoProbe also provides *initiator* and *responder*
modes, which are dedicated for round-trip CSI measurement. The following
bash script realizes the measurement:

``` {.bash}
#!/bin/sh -e 

array_prepare_for_picoscenes "3 4" "2412 HT20"

PicoScenes "-d debug;
            -i 4 --mode responder;
            -i 3 --mode initiator --repeat 1000 --delay 5000;
            -q"
```

The above command puts NIC `4` into responder mode and let NIC `3`,
initiate and repeat the round-trip CSI measurement for 1000 times with a
5000us interval. Compared to the last scenario, the only difference is
the mode. NIC `4` works in responder mode, and NIC 3 works in initiator
mode. The internal logics of both modes are as follows.

-   Responder mode: besides the basic CSI logging functionality,
    *responder* mode checks the frame content, and immediately reply the
    frame if it is a [EchoProbe ProbeRequest]{.title-ref} frame;
-   Initiator mode: besides the basic frame injection functionality,
    *initiator* mode uses an internal [timeout and
    re-transmission]{.title-ref} mechanism to realize the round-trip CSI
    measurement.

You may download and run the complete takeaway bash script for this
scenario at `2_2_4 <_static/2_2_4.sh>`{.interpreted-text
role="download"}

Two QCA9300/IWL5300 NICs perform the round trip CSI measurement while scanning large spectrum (Difficulty Level: Medium) {#dual_nics_scan}
========================================================================================================================

In the experiment, both NICs will perform continuous CSI measurements
over a large spectrum. PicoScenes (or EchoProbe plugin) leverages the
bi-directional communication ability of *Initiator* and *Responder*
modes to synchronize the frequency hopping. The following command
performs the continuous CSI measurement over the entire 2.4 GHz band
with a 5 MHz step. And in each carrier frequency, 100 round-trip
measurements are performed.

``` {.bash}
#!/bin/sh -e 

array_prepare_for_picoscenes "3 4" "2412 HT20"

PicoScenes "-d debug;
            -i 4 --freq 2412e6 --mode responder;
            -i 3 --freq 2412e6 --mode initiator --repeat 100 --delay 5000 --cf 2412e6:5e6:2484e6;
            -q"
```

The above command adds two new options, `--freq` and `--cf`. `--freq`,
as the name implies, specifies the current NIC\'s working carrier
frequency. It supports the scientific notion; thus, `--freq 2412e6`
means to tune the NIC\'s carrier frequency to 2412 MHz. `--cf` specify
the range and step for spectrum scanning. It adopts the MATLAB-style
[begin:step:end]{.title-ref} format to specify the starting frequency,
frequency interval per step and ending frequency.
`--cf 2412e6:5e6:2484e6` in the above command indicates to scan the
spectrum from 2412 MHz to 2484 MHz with a 5 MHz step. It is worth noting
that `--freq` is not internally related to `--cf`. It just specifies the
initial working frequency.

::: {.note}
::: {.title}
Note
:::

IWL5300 doesn\'t support the arbitrary tuning for carrier frequency;
therefore, it only supports the standardized channel frequencies.
:::

::: {.warning}
::: {.title}
Warning
:::

The spectrum scanning is based on round-trip communication, not
pre-scheduled. If the round-trip measurement fails due to excessive
retransmission, the spectrum scanning will fail.
:::

You may download and run the complete takeaway bash script for this
scenario at `2_2_5 <_static/2_2_5.sh>`{.interpreted-text
role="download"}

Two QCA9300 NICs scan both the spectrum and bandwidth (Difficulty Level: Medium)
================================================================================

This experiment add just two new options to the above scenario. See
`dual_nics_scan`{.interpreted-text role="ref"} first. The following the
bash script that scans both the carrier frequency and bandwidth. The
carrier frequency is the [inner loop]{.title-ref} and bandwidth is the
[outer loop]{.title-ref}.

``` {.bash}
#!/bin/sh -e 

array_prepare_for_picoscenes "3 4" "2412 HT20"

PicoScenes "-d debug;
            -i 4 --freq 2412e6 --rate 20e6 --mode responder;
            -i 3 --freq 2412e6 --rate 20e6 --mode initiator --repeat 100 --delay 5000 --cf 2412e6:5e6:2484e6 --sf 20e6:5e6:40e6;
            -q"
```

The two new options are `--rate` and `--sf`. `--rate` specifies the
initial bandwidth; it is not related to `--sf` option. `--sf` specifies
the bandwidth scanning range and has the same MATLAB-like style.

You may download and run the complete takeaway bash script for this
scenario at `2_2_6 <_static/2_2_6.sh>`{.interpreted-text
role="download"}

Two QCA9300 NICs scan both the spectrum and bandwidth w/ advanced measurement settings (Difficulty Level: Medium Plus)
======================================================================================================================

The following script is based on the last scenario
`dual_nics_scan`{.interpreted-text role="ref"}, but adds a few more
options to demonstrate the advanced measurement settings.

``` {.bash}
#!/bin/sh -e 

array_prepare_for_picoscenes "3 4" "5200 HT40-" # Don't miss the quotation marks for the channel specification!

PicoScenes "-d debug;
            -i 4 --freq 2412e6 --rate 20e6 --mode responder --rxcm 3 --cbw 40 --sts 2 --txcm 5 -ess 1 --txpower 15 --coding ldpc;
            -i 3 --freq 2412e6 --rate 20e6 --mode initiator --repeat 100 --delay 5000 --cf 2412e6:5e6:2484e6 --sf 20e6:5e6:40e6 --cbw 20 --sts 2 --mcs 0 --gi 400 --txcm 3 --ack-mcs 3  --ack-type header;
            -q"
```

The above commands demonstrates the mostly used Tx/Rx options, namely
`--cbw`, `--sts`, `--mcs`, `--txcm`, `--rxcm`,
`` --gi`, ``\--ess`,`\--txpower`,`\--coding`, and two EchoProbe ACK options`\--ack-mcs`and`\--ack-type`.`\--cbw`indicates to transmit the frame in HT40 format.`\--sts`and`\--mcs`` specify the number of space-time stream (:math:`N_{STS}`) and MCS. ``\--txcm`and`\--rxcm`are the Tx/Rx chain mask,`\--txcm
5`means using the 1st and 3rd antennas for transmission, and`\--rxcm
3`means using the 1st and 2nd antenna for receiving.`\--gi
400`enables the Short Guard Interval (400ns) for HT-data potion.`\--ess
1`means adding one extra spatial sounding HT-LTF. Adding the two conventional spatial stream (`\--sts
2`) and one extra spatial stream, the transmitted packet has three HT-LTF, thus, three CSI measurement.`\--txpower
15`specifies the transmission power to be 15 dBm. Last,`\--coding
ldpc`specifies the NIC baseband to encode the packet using low-density parity-check (LDPC) coding scheme.  EchoProbe plugin also introduces several options to control the transmission of reply frames.`\--ack-mcs
3`tells the responder to use MCS=3 if the responder doesn't specify MCS explicitly. There are also`\--ack-sts`,`\--ack-gi`and`\--ack-cbw`options.`\--ack-type
header`` tells the responder not to reply the full CSI but only a header. Users may refer to :doc:`parameters` for more detailed explanations.   .. important:: PicoScenes uses the 802.11ac/ax style MCS/STS definition which decouples :math:`N_{STS}` ( ``\--sts`) and per-stream MCS (`\--mcs`` ). For example, MCS=9 in 802.11n version is represented by two terms in 802.11ac/ax: :math:`N_{STS}=2` ( ``\--sts
2`) and MCS=1 (`\--mcs 1\`\`).

You may download and run the complete takeaway bash script for this
scenario at `2_2_7 <_static/2_2_7.sh>`{.interpreted-text
role="download"}
