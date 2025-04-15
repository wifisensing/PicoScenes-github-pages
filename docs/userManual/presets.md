---
title: Open Source Software Licenses
---

# PicoScenes Presets

We recommend users in most cases to use *preset-based Tx/Rx setting*. It significantly shorten the command line options and avoid many mistakes. In this page, we show and explain all presets provided by PicoScenes.

## FrontEnd Mode Presets

The naming of presets are intuitive:

- ```TX_CBW_<BANDWIDTH>_FORMAT_[LDPC]```: Transmit in ```<BANDWIDTH>``` channel bandwidth and ```<FORMAT>``` format (explicitly with LDPC coding)
- ```RX_CBW_<BANDWIDTH>```: Receive in ```<BANDWIDTH>``` channel bandwidth  
- ```TR_CBW_<BANDWIDTH>_FORMAT_[LDPC]```: Transmit and receive in ```<BANDWIDTH>``` channel bandwidth, transmit in ```<FORMAT>``` format (explicitly with LDPC coding)

Five supports formats are:

- NONHT: 802.11 a/g format
- HT: 802.11n format  
- VHT: 802.11ac format
- HESU: 802.11ax (HE) Single User format
- EHTSU: 802.11be (EHT) Single User format

| Preset Name | Direction | Equivalent Long Options |
|-------------|-----------|------------------------|
| TX_CBW_160_EHTSU | Tx | --format ehtsu --coding ldpc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 |
| TX_CBW_160_HESU | Tx | --format hesu --coding ldpc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 |
| TX_CBW_160_VHT | Tx | --format vht --coding bcc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 |
| TX_CBW_160_VHT_LDPC | Tx | --format vht --coding ldpc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 |
| TX_CBW_80_EHTSU | Tx | --format ehtsu --coding ldpc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 |
| TX_CBW_80_HESU | Tx | --format hesu --coding ldpc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 |
| TX_CBW_80_VHT | Tx | --format vht --coding bcc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 |
| TX_CBW_80_VHT_LDPC | Tx | --format vht --coding ldpc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 |
| TX_CBW_40_EHTSU | Tx | --format ehtsu --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 |
| TX_CBW_40_HESU | Tx | --format hesu --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 |
| TX_CBW_40_VHT | Tx | --format vht --coding bcc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 |
| TX_CBW_40_VHT_LDPC | Tx | --format vht --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 |
| TX_CBW_40_HT | Tx | --format ht --coding bcc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 |
| TX_CBW_40_HT_LDPC | Tx | --format ht --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 |
| TX_CBW_20_EHTSU | Tx | --format ehtsu --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_EHTSU_LDPC | Tx | --format ehtsu --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_HESU | Tx | --format hesu --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_HESU_LDPC | Tx | --format hesu --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_VHT | Tx | --format vht --coding bcc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_VHT_LDPC | Tx | --format vht --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_HT | Tx | --format ht --coding bcc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_HT_LDPC | Tx | --format ht --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| TX_CBW_20_NonHT | Tx | --format nonht --coding bcc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 |
| | | |
| RX_CBW_160 | Rx | --rate 200e6 --rx-resample-ratio 0.8 --rx-cbw 160 |
| RX_CBW_80 | Rx | --rate 100e6 --rx-resample-ratio 0.8 --rx-cbw 80 |
| RX_CBW_40 | Rx | --rate 40e6 --rx-resample-ratio 1.0 --rx-cbw 40 |
| RX_CBW_20 | Rx | --rate 20e6 --rx-resample-ratio 1.0 --rx-cbw 20 |
| | | |
| TR_CBW_160_EHTSU | Both | --format ehtsu --coding ldpc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 --rx-resample-ratio 0.8 --rx-cbw 160 |
| TR_CBW_160_HESU | Both | --format hesu --coding ldpc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 --rx-resample-ratio 0.8 --rx-cbw 160 |
| TR_CBW_160_VHT | Both | --format vht --coding bcc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 --rx-resample-ratio 0.8 --rx-cbw 160 |
| TR_CBW_160_VHT_LDPC | Both | --format vht --coding ldpc --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 --rx-resample-ratio 0.8 --rx-cbw 160 |
| TR_CBW_80_EHTSU | Both | --format ehtsu --coding ldpc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 --rx-resample-ratio 0.8 --rx-cbw 80 |
| TR_CBW_80_HESU | Both | --format hesu --coding ldpc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 --rx-resample-ratio 0.8 --rx-cbw 80 |
| TR_CBW_80_VHT | Both | --format vht --coding bcc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 --rx-resample-ratio 0.8 --rx-cbw 80 |
| TR_CBW_80_VHT_LDPC | Both | --format vht --coding ldpc --rate 100e6 --tx-resample-ratio 1.25 --cbw 80 --rx-resample-ratio 0.8 --rx-cbw 80 |
| TR_CBW_40_EHTSU | Both | --format ehtsu --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 --rx-resample-ratio 1.0 --rx-cbw 40 |
| TR_CBW_40_HESU | Both | --format hesu --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 --rx-resample-ratio 1.0 --rx-cbw 40 |
| TR_CBW_40_VHT | Both | --format vht --coding bcc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 --rx-resample-ratio 1.0 --rx-cbw 40 |
| TR_CBW_40_VHT_LDPC | Both | --format vht --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 --rx-resample-ratio 1.0 --rx-cbw 40 |
| TR_CBW_40_HT | Both | --format ht --coding bcc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 --rx-resample-ratio 1.0 --rx-cbw 40 |
| TR_CBW_40_HT_LDPC | Both | --format ht --coding ldpc --rate 40e6 --tx-resample-ratio 1.0 --cbw 40 --rx-resample-ratio 1.0 --rx-cbw 40 |
| TR_CBW_20_EHTSU_LDPC | Both | --format ehtsu --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_EHTSU | Both | --format ehtsu --coding bcc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_HESU | Both | --format hesu --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_HESU_LDPC | Both | --format hesu --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_VHT | Both | --format vht --coding bcc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_VHT_LDPC | Both | --format vht --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_HT | Both | --format ht --coding bcc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_HT_LDPC | Both | --format ht --coding ldpc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |
| TR_CBW_20_NonHT | Both | --format nonht --coding bcc --rate 20e6 --tx-resample-ratio 1.0 --cbw 20 --rx-resample-ratio 1.0 --rx-cbw 20 |

You can also run following command to query the full preset list:

```bash
PicoScenes --list-presets
```
