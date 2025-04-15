---
title: Wi-Fi Channelization
---

Many PicoScenes users are confused about how to correctly set channels for `array_prepare_for_picoscenes` and `PicoScenes` commands. On this page, we provide some examples, then we present a full Wi-Fi channel table for reference.

## Examples of Specifiying Channel for COTS NICs

Some example commands for *array_prepare_for_picoscenes* are:

1. If you want to set NIC <NIC_ID> to a 20 MHz bandwidth channel, for example 2412 MHz, run the following command in terminal:

```bash
array_prepare_for_picoscenes NIC_ID "2412 HT20" #<- Don't miss the quotation mark (")
```

2. If you want to set NIC <NIC_ID> to a 40 MHz bandwidth channel, for example the 5180 MHz channel centered at 5190 MHz, run the following command in terminal:

```bash
array_prepare_for_picoscenes NIC_ID "5180 HT40+" #<- Don't miss the quotation mark (")
```

3. If you want to set NIC <NIC_ID> to a 80 MHz bandwidth channel, for example the 5180 MHz channel centered at 5210 MHz, run the following command in terminal:

```bash
array_prepare_for_picoscenes NIC_ID "5180 80 5210" #<- Don't miss the quotation mark (")
```

4. If you want to set NIC <NIC_ID> to a 160 MHz bandwidth channel, for example the 5180 MHz channel centered at 5250 MHz, run the following command in terminal:

```bash
array_prepare_for_picoscenes NIC_ID "5180 160 5250" #<- Don't miss the quotation mark (")
```

> **Note**: See [naming_for_nics] for <NIC_ID>.

## Examples of Specifiying Channel for SDR

1. If you want to user SDR <SDR_ID> to receive frames at a 20 MHz bandwidth channel, for example 2412 MHz:

```bash
PicoScenes "-d debug -i SDR_ID --freq 2412 -preset RX_CBW_20 --mode logger"
```

2. If you want to user SDR <SDR_ID> to receive frames at a 40 MHz bandwidth channel, for example the 5180 MHz channel centered at 5190 MHz:

```bash
PicoScenes "-d debug -i SDR_ID --freq 5190 -preset RX_CBW_40 --mode logger"
```

3. If you want to user SDR <SDR_ID> to receive frames at a 80 MHz bandwidth channel, for example the 5180 MHz channel centered at 5210 MHz:

```bash
PicoScenes "-d debug -i SDR_ID --freq 5210 -preset RX_CBW_80 --mode logger"
```

4. If you want to user SDR <SDR_ID> to receive frames at a 160 MHz bandwidth channel, for example the 5180 MHz channel centered at 5250 MHz:

```bash
PicoScenes "-d debug -i SDR_ID --freq 5250 -preset RX_CBW_160 --mode logger"
```

> **Note**: See [naming_for_usrp] for <SDR_ID>.

## The Big Wi-Fi Channelization Table

The following *Wi-Fi Channelization* table has 9 columns. Their meanings are:

- #: The channel number
- Primary 20 MHz Channel: The center frequency of a 20 MHz bandwidth Wi-Fi channel.
- Center Freq. of 40 MHz Channel: The center frequency of a 40 MHz bandwidth Wi-Fi channel. Wi-Fi 40 MHz bandwidth channel are realized by combining two adjacent 20 MHz channels, thus, the center frequencies of 40 MHz channels are the middles of two 20 MHz channels. One thing worth noting is that the 40 MHz channels are allocated to be non-overlapping, therefore, each 20 MHz channel only belongs to one 40 MHz channel.
- Center Freq. of 80 MHz Channel: The center frequency of a 80 MHz bandwidth Wi-Fi channel. Like 40 MHz bandwidth channel, 80 MHz are realized by combining two adjacent 40 MHz channels, thus, the center frequencies of 80 MHz channels are the middles of two 40 MHz channels. One thing worth noting is that the 80 MHz channels are allocated to be non-overlapping, therefore, each 20 MHz channel only belongs to one 80 MHz channel.
- Center Freq. of 160 MHz Channel: The center frequency of a 160 MHz bandwidth Wi-Fi channel. Like 40 MHz bandwidth channel, 160 MHz are realized by combining two adjacent 80 MHz channels, thus, the center frequencies of 160 MHz channels are the middles of two 80 MHz channels. One thing worth noting is that the 80 MHz channels are allocated to be non-overlapping, therefore, each 20 MHz channel only belongs to one 160 MHz channel.
- Channel String of 20 MHz Channel: The channel string used to denote this 20 MHz channel, used for Linux *iw* and PicoScenes *array_prepare_for_picoscenes* commands.
- Channel String of 40 MHz Channel: The channel string used to denote this 40 MHz channel, used for Linux *iw* and PicoScenes *array_prepare_for_picoscenes* commands. The "HT40+" means that the extension channel is towards the higher frequency, while "HT40-" means that the extension channel is towards the lower frequency.
- Channel String of 80 MHz Channel: The channel string used to denote this 80 MHz channel, used for Linux *iw* and PicoScenes *array_prepare_for_picoscenes* commands. The three numbers are primary channel freq., channel bandwidth, and center channel freq.
- Channel String of 160 MHz Channel: The channel string used to denote this 160 MHz channel, used for Linux *iw* and PicoScenes *array_prepare_for_picoscenes* commands. The three numbers are primary channel freq., channel bandwidth, and center channel freq.

| # | Primary 20 MHz Channel (MHz) | Center Freq. of 40 MHz Channel (MHz) | Center Freq. of 80 MHz Channel (MHz) | Center Freq. of 160 MHz Channel (MHz) | Channel String of 20 MHz Channel | Channel String of 40 MHz Channel | Channel String of 80 MHz Channel | Channel String of 160 MHz Channel |
|---|------------------------------|--------------------------------------|--------------------------------------|---------------------------------------|----------------------------------|----------------------------------|----------------------------------|-----------------------------------|
| 1 | 2412 | N/A | N/A | N/A | "2412 HT20" | N/A | N/A | N/A |
| 2 | 2417 | N/A | N/A | N/A | "2417 HT20" | N/A | N/A | N/A |
| 3 | 2422 | N/A | N/A | N/A | "2422 HT20" | N/A | N/A | N/A |
| 4 | 2427 | N/A | N/A | N/A | "2427 HT20" | N/A | N/A | N/A |
| 5 | 2432 | N/A | N/A | N/A | "2432 HT20" | N/A | N/A | N/A |
| 6 | 2437 | N/A | N/A | N/A | "2437 HT20" | N/A | N/A | N/A |
| 7 | 2442 | N/A | N/A | N/A | "2442 HT20" | N/A | N/A | N/A |
| 8 | 2447 | N/A | N/A | N/A | "2447 HT20" | N/A | N/A | N/A |
| 9 | 2452 | N/A | N/A | N/A | "2452 HT20" | N/A | N/A | N/A |
| 10 | 2457 | N/A | N/A | N/A | "2457 HT20" | N/A | N/A | N/A |
| 11 | 2462 | N/A | N/A | N/A | "2462 HT20" | N/A | N/A | N/A |
| 12 | 2467 | N/A | N/A | N/A | "2467 HT20" | N/A | N/A | N/A |
| 13 | 2472 | N/A | N/A | N/A | "2472 HT20" | N/A | N/A | N/A |
| 36 | 5180 | 5190 | 5210 | 5250 | "5180 HT20" | "5180 HT40+" | "5180 80 5210" | "5180 160 5250" |
| 40 | 5200 | 5190 | 5210 | 5250 | "5200 HT20" | "5200 HT40-" | "5200 80 5210" | "5200 160 5250" |
| 44 | 5220 | 5230 | 5210 | 5250 | "5220 HT20" | "5220 HT40+" | "5220 80 5210" | "5220 160 5250" |
| 48 | 5240 | 5230 | 5210 | 5250 | "5240 HT20" | "5240 HT40-" | "5240 80 5210" | "5240 160 5250" |
| 52 | 5260 | 5270 | 5290 | 5250 | "5260 HT20" | "5260 HT40+" | "5260 80 5290" | "5260 160 5250" |
| 56 | 5280 | 5270 | 5290 | 5250 | "5280 HT20" | "5280 HT40-" | "5280 80 5290" | "5280 160 5250" |
| 60 | 5300 | 5310 | 5290 | 5250 | "5300 HT20" | "5300 HT40+" | "5300 80 5290" | "5300 160 5250" |
| 64 | 5320 | 5310 | 5290 | 5250 | "5320 HT20" | "5320 HT40-" | "5320 80 5290" | "5320 160 5250" |
| 100 | 5500 | 5510 | 5530 | 5570 | "5500 HT20" | "5500 HT40-" | "5500 80 5530" | "5500 160 5570" |
| 104 | 5520 | 5510 | 5530 | 5570 | "5520 HT20" | "5520 HT40+" | "5520 80 5530" | "5520 160 5570" |
| 108 | 5540 | 5550 | 5530 | 5570 | "5540 HT20" | "5540 HT40-" | "5540 80 5530" | "5540 160 5570" |
| 112 | 5560 | 5550 | 5530 | 5570 | "5560 HT20" | "5560 HT40+" | "5560 80 5530" | "5560 160 5570" |
| 116 | 5580 | 5590 | 5610 | 5570 | "5580 HT20" | "5580 HT40-" | "5580 80 5610" | "5580 160 5570" |
| 120 | 5600 | 5590 | 5610 | 5570 | "5600 HT20" | "5600 HT40+" | "5600 80 5610" | "5600 160 5570" |
| 124 | 5620 | 5630 | 5610 | 5570 | "5620 HT20" | "5620 HT40-" | "5620 80 5610" | "5620 160 5570" |
| 128 | 5640 | 5630 | 5610 | 5570 | "5640 HT20" | "5640 HT40+" | "5640 80 5610" | "5640 160 5570" |
| 132 | 5660 | 5670 | 5690 | N/A | "5660 HT20" | "5660 HT40-" | "5660 80 5690" | N/A |
| 136 | 5680 | 5670 | 5690 | N/A | "5680 HT20" | "5680 HT40+" | "5680 80 5690" | N/A |
| 140 | 5700 | 5710 | 5690 | N/A | "5700 HT20" | "5700 HT40-" | "5700 80 5690" | N/A |
| 144 | 5720 | 5710 | 5690 | N/A | "5720 HT20" | "5720 HT40+" | "5720 80 5690" | N/A |
| 149 | 5745 | 5755 | 5775 | N/A | "5745 HT20" | "5745 HT40+" | "5745 80 5775" | N/A |
| 153 | 5765 | 5775 | 5775 | N/A | "5765 HT20" | "5765 HT40-" | "5765 80 5775" | N/A |
| 157 | 5785 | 5795 | 5775 | N/A | "5785 HT20" | "5785 HT40+" | "5785 80 5775" | N/A |
| 161 | 5805 | 5795 | 5775 | N/A | "5805 HT20" | "5805 HT40-" | "5805 80 5775" | N/A |
| 165 | 5825 | N/A | N/A | N/A | "5825 HT20" | N/A | N/A | N/A |
| 1 | 5955 | 5965 | 5985 | 6025 | "5955 HT20" | "5955 HT40+" | "5955 80 5985" | "5955 160 6025" |
| 5 | 5975 | 5965 | 5985 | 6025 | "5975 HT20" | "5975 HT40-" | "5975 80 5985" | "5975 160 6025" |
| 9 | 5995 | 6005 | 5985 | 6025 | "5995 HT20" | "5995 HT40+" | "5995 80 5985" | "5995 160 6025" |
| 13 | 6015 | 6005 | 5985 | 6025 | "6015 HT20" | "6015 HT40-" | "6015 80 5985" | "6015 160 6025" |
| 17 | 6035 | 6045 | 6065 | 6025 | "6035 HT20" | "6035 HT40+" | "6035 80 6065" | "6035 160 6025" |
| 21 | 6055 | 6045 | 6065 | 6025 | "6055 HT20" | "6055 HT40-" | "6055 80 6065" | "6055 160 6025" |
| 25 | 6075 | 6085 | 6065 | 6025 | "6075 HT20" | "6075 HT40+" | "6075 80 6065" | "6075 160 6025" |
| 29 | 6095 | 6085 | 6065 | 6025 | "6095 HT20" | "6095 HT40-" | "6095 80 6065" | "6095 160 6025" |
| 33 | 6115 | 6125 | 6145 | 6185 | "6115 HT20" | "6115 HT40+" | "6115 80 6145" | "6115 160 6185" |
| 37 | 6135 | 6125 | 6145 | 6185 | "6135 HT20" | "6135 HT40-" | "6135 80 6145" | "6135 160 6185" |
| 41 | 6155 | 6165 | 6145 | 6185 | "6155 HT20" | "6155 HT40+" | "6155 80 6145" | "6155 160 6185" |
| 45 | 6175 | 6165 | 6145 | 6185 | "6175 HT20" | "6175 HT40-" | "6175 80 6145" | "6175 160 6185" |
| 49 | 6195 | 6205 | 6225 | 6185 | "6195 HT20" | "6195 HT40+" | "6195 80 6225" | "6195 160 6185" |
| 53 | 6215 | 6205 | 6225 | 6185 | "6215 HT20" | "6215 HT40-" | "6215 80 6225" | "6215 160 6185" |
| 57 | 6235 | 6245 | 6225 | 6185 | "6235 HT20" | "6235 HT40+" | "6235 80 6225" | "6235 160 6185" |
| 61 | 6255 | 6245 | 6225 | 6185 | "6255 HT20" | "6255 HT40-" | "6255 80 6225" | "6255 160 6185" |
| 65 | 6275 | 6285 | 6305 | 6345 | "6275 HT20" | "6275 HT40+" | "6275 80 6305" | "6275 160 6345" |
| 69 | 6295 | 6485 | 6305 | 6345 | "6295 HT20" | "6295 HT40-" | "6295 80 6305" | "6295 160 6345" |
| 73 | 6315 | 6325 | 6305 | 6345 | "6315 HT20" | "6315 HT40+" | "6315 80 6305" | "6315 160 6345" |
| 77 | 6335 | 6325 | 6305 | 6345 | "6335 HT20" | "6335 HT40-" | "6335 80 6305" | "6335 160 6345" |
| 81 | 6355 | 6365 | 6385 | 6345 | "6355 HT20" | "6355 HT40+" | "6355 80 6385" | "6355 160 6345" |
| 85 | 6375 | 6365 | 6385 | 6345 | "6375 HT20" | "6375 HT40-" | "6375 80 6385" | "6375 160 6345" |
| 89 | 6395 | 6405 | 6385 | 6345 | "6395 HT20" | "6395 HT40+" | "6395 80 6385" | "6395 160 6345" |
| 93 | 6415 | 6405 | 6385 | 6345 | "6415 HT20" | "6415 HT40-" | "6415 80 6385" | "6415 160 6345" |
| 97 | 6435 | 6445 | 6465 | 6505 | "6435 HT20" | "6435 HT40+" | "6435 80 6465" | "6435 160 6505" |
| 101 | 6455 | 6445 | 6465 | 6505 | "6455 HT20" | "6455 HT40-" | "6455 80 6465" | "6455 160 6505" |
| 105 | 6475 | 6485 | 6465 | 6505 | "6475 HT20" | "6475 HT40+" | "6475 80 6465" | "6475 160 6505" |
| 109 | 6495 | 6485 | 6465 | 6505 | "6495 HT20" | "6495 HT40-" | "6495 80 6465" | "6495 160 6505" |
| 113 | 6515 | 6525 | 6545 | 6505 | "6515 HT20" | "6515 HT40+" | "6515 80 6545" | "6515 160 6505" |
| 117 | 6535 | 6525 | 6545 | 6505 | "6535 HT20" | "6535 HT40-" | "6535 80 6545" | "6535 160 6505" |
| 121 | 6555 | 6565 | 6545 | 6505 | "6555 HT20" | "6555 HT40+" | "6555 80 6545" | "6555 160 6505" |
| 125 | 6575 | 6565 | 6545 | 6505 | "6575 HT20" | "6575 HT40-" | "6575 80 6545" | "6575 160 6505" |
| 129 | 6595 | 6605 | 6625 | 6665 | "6595 HT20" | "6595 HT40+" | "6595 80 6625" | "6595 160 6665" |
| 133 | 6615 | 6606 | 6625 | 6665 | "6615 HT20" | "6615 HT40-" | "6615 80 6625" | "6615 160 6665" |
| 137 | 6635 | 6645 | 6625 | 6665 | "6635 HT20" | "6635 HT40+" | "6635 80 6625" | "6635 160 6665" |
| 141 | 6655 | 6645 | 6625 | 6665 | "6655 HT20" | "6655 HT40-" | "6655 80 6625" | "6655 160 6665" |
| 145 | 6675 | 6685 | 6705 | 6665 | "6675 HT20" | "6675 HT40+" | "6675 80 6705" | "6675 160 6665" |
| 149 | 6695 | 6685 | 6705 | 6665 | "6695 HT20" | "6695 HT40-" | "6695 80 6705" | "6695 160 6665" |
| 153 | 6715 | 6725 | 6705 | 6665 | "6715 HT20" | "6715 HT40+" | "6715 80 6705" | "6715 160 6665" |
| 157 | 6735 | 6725 | 6705 | 6665 | "6735 HT20" | "6735 HT40-" | "6735 80 6705" | "6735 160 6665" |
| 161 | 6755 | 6765 | 6785 | 6825 | "6755 HT20" | "6755 HT40+" | "6755 80 6785" | "6755 160 6825" |
| 165 | 6775 | 6765 | 6785 | 6825 | "6775 HT20" | "6775 HT40-" | "6775 80 6785" | "6775 160 6825" |
| 169 | 6795 | 6805 | 6785 | 6825 | "6795 HT20" | "6795 HT40+" | "6795 80 6785" | "6795 160 6825" |
| 173 | 6815 | 6805 | 6785 | 6825 | "6815 HT20" | "6815 HT40-" | "6815 80 6785" | "6815 160 6825" |
| 177 | 6835 | 6845 | 6865 | 6825 | "6835 HT20" | "6835 HT40+" | "6835 80 6865" | "6835 160 6825" |
| 181 | 6855 | 6845 | 6865 | 6825 | "6855 HT20" | "6855 HT40-" | "6855 80 6865" | "6855 160 6825" |
| 185 | 6875 | 6885 | 6865 | 6825 | "6875 HT20" | "6875 HT40+" | "6875 80 6865" | "6875 160 6825" |
| 189 | 6895 | 6885 | 6865 | 6825 | "6895 HT20" | "6895 HT40-" | "6895 80 6865" | "6895 160 6825" |
| 193 | 6915 | 6925 | 6945 | 6985 | "6915 HT20" | "6915 HT40+" | "6915 80 6945" | "6915 160 6985" |
| 197 | 6935 | 6925 | 6945 | 6985 | "6935 HT20" | "6935 HT40-" | "6935 80 6945" | "6935 160 6985" |
| 201 | 6955 | 6965 | 6945 | 6985 | "6955 HT20" | "6955 HT40+" | "6955 80 6945" | "6955 160 6985" |
| 205 | 6975 | 6965 | 6945 | 6985 | "6975 HT20" | "6975 HT40-" | "6975 80 6945" | "6975 160 6985" |
| 209 | 6995 | 7005 | 7025 | 6985 | "6995 HT20" | "6995 HT40+" | "6995 80 7025" | "6995 160 6985" |
| 213 | 7015 | 7005 | 7025 | 6985 | "7015 HT20" | "7015 HT40-" | "7015 80 7025" | "7015 160 6985" |
| 217 | 7035 | 7045 | 7025 | 6985 | "7035 HT20" | "7035 HT40+" | "7035 80 7025" | "7035 160 6985" |
| 221 | 7055 | 7045 | 7025 | 6985 | "7055 HT20" | "7055 HT40-" | "7055 80 7025" | "7055 160 6985" |
| 225 | 7075 | 7085 | N/A | N/A | "7075 HT20" | "7075 HT40+" | N/A | N/A |
| 229 | 7095 | 7085 | N/A | N/A | "7095 HT20" | "7095 HT40-" | N/A | N/A |
| 233 | 7115 | N/A | N/A | N/A | "7115 HT20" | N/A | N/A | N/A |