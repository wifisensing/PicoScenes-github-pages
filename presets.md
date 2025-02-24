PicoScenes Presets
==================

We recommend users in most cases to use *preset-based Tx/Rx setting*. It
significantly shorten the command line options and avoid many mistakes.
In this page, we show and explain all presets provided by PicoScenes.

FrontEnd Mode Presets {#frontend_mode_presets}
---------------------

The naming of presets are intuitive:

-   [TX\_CBW]()\<BANDWIDTH\>\_[FORMAT]()\[LDPC\]: Transmit in
    \<BANDWIDTH\> channel bandwidth and \<FORMAT\> format (explicitly
    with LDPC coding)
-   [RX\_CBW]()\<BANDWIDTH\>: Receive in \<BANDWIDTH\> channel bandwidth
-   [TR\_CBW]()\<BANDWIDTH\>\_[FORMAT]()\[LDPC\]: Transmit and receive
    in \<BANDWIDTH\> channel bandwidth, transmit in \<FORMAT\> format
    (explicitly with LDPC coding)

Five supports formats are:

-   NONHT: 802.11 a/g format
-   HT: 802.11n format
-   VHT: 802.11ac format
-   HESU: 802.11ax (HE) Single User format
-   EHTSU: 802.11be (EHT) Single User format

  Preset Name                Direction   Equivalent Long Options
  -------------------------- ----------- --------------------------------------------------------------------------------------------------------------------------
  TX\_CBW\_160\_EHTSU        Tx          \--format ehtsu \--coding ldpc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160
  TX\_CBW\_160\_HESU         Tx          \--format hesu \--coding ldpc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160
  TX\_CBW\_160\_VHT          Tx          \--format vht \--coding bcc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160
  TX\_CBW\_160\_VHT\_LDPC    Tx          \--format vht \--coding ldpc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160
  TX\_CBW\_80\_EHTSU         Tx          \--format ehtsu \--coding ldpc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80
  TX\_CBW\_80\_HESU          Tx          \--format hesu \--coding ldpc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80
  TX\_CBW\_80\_VHT           Tx          \--format vht \--coding bcc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80
  TX\_CBW\_80\_VHT\_LDPC     Tx          \--format vht \--coding ldpc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80
  TX\_CBW\_40\_EHTSU         Tx          \--format ehtsu \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40
  TX\_CBW\_40\_HESU          Tx          \--format hesu \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40
  TX\_CBW\_40\_VHT           Tx          \--format vht \--coding bcc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40
  TX\_CBW\_40\_VHT\_LDPC     Tx          \--format vht \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40
  TX\_CBW\_40\_HT            Tx          \--format ht \--coding bcc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40
  TX\_CBW\_40\_HT\_LDPC      Tx          \--format ht \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40
  TX\_CBW\_20\_EHTSU         Tx          \--format ehtsu \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_EHTSU\_LDPC   Tx          \--format ehtsu \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_HESU          Tx          \--format hesu \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_HESU\_LDPC    Tx          \--format hesu \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_VHT           Tx          \--format vht \--coding bcc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_VHT\_LDPC     Tx          \--format vht \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_HT            Tx          \--format ht \--coding bcc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_HT\_LDPC      Tx          \--format ht \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
  TX\_CBW\_20\_NonHT         Tx          \--format nonht \--coding bcc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20
                                         
  RX\_CBW\_160               Rx          \--rate 200e6 \--rx-resample-ratio 0.8 \--rx-cbw 160
  RX\_CBW\_80                Rx          \--rate 100e6 \--rx-resample-ratio 0.8 \--rx-cbw 80
  RX\_CBW\_40                Rx          \--rate 40e6 \--rx-resample-ratio 1.0 \--rx-cbw 40
  RX\_CBW\_20                Rx          \--rate 20e6 \--rx-resample-ratio 1.0 \--rx-cbw 20
                                         
  TR\_CBW\_160\_EHTSU        Both        \--format ehtsu \--coding ldpc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160 \--rx-resample-ratio 0.8 \--rx-cbw 160
  TR\_CBW\_160\_HESU         Both        \--format hesu \--coding ldpc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160 \--rx-resample-ratio 0.8 \--rx-cbw 160
  TR\_CBW\_160\_VHT          Both        \--format vht \--coding bcc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160 \--rx-resample-ratio 0.8 \--rx-cbw 160
  TR\_CBW\_160\_VHT\_LDPC    Both        \--format vht \--coding ldpc \--rate 200e6 \--tx-resample-ratio 1.25 \--cbw 160 \--rx-resample-ratio 0.8 \--rx-cbw 160
  TR\_CBW\_80\_EHTSU         Both        \--format ehtsu \--coding ldpc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80 \--rx-resample-ratio 0.8 \--rx-cbw 80
  TR\_CBW\_80\_HESU          Both        \--format hesu \--coding ldpc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80 \--rx-resample-ratio 0.8 \--rx-cbw 80
  TR\_CBW\_80\_VHT           Both        \--format vht \--coding bcc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80 \--rx-resample-ratio 0.8 \--rx-cbw 80
  TR\_CBW\_80\_VHT\_LDPC     Both        \--format vht \--coding ldpc \--rate 100e6 \--tx-resample-ratio 1.25 \--cbw 80 \--rx-resample-ratio 0.8 \--rx-cbw 80
  TR\_CBW\_40\_EHTSU         Both        \--format ehtsu \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40 \--rx-resample-ratio 1.0 \--rx-cbw 40
  TR\_CBW\_40\_HESU          Both        \--format hesu \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40 \--rx-resample-ratio 1.0 \--rx-cbw 40
  TR\_CBW\_40\_VHT           Both        \--format vht \--coding bcc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40 \--rx-resample-ratio 1.0 \--rx-cbw 40
  TR\_CBW\_40\_VHT\_LDPC     Both        \--format vht \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40 \--rx-resample-ratio 1.0 \--rx-cbw 40
  TR\_CBW\_40\_HT            Both        \--format ht \--coding bcc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40 \--rx-resample-ratio 1.0 \--rx-cbw 40
  TR\_CBW\_40\_HT\_LDPC      Both        \--format ht \--coding ldpc \--rate 40e6 \--tx-resample-ratio 1.0 \--cbw 40 \--rx-resample-ratio 1.0 \--rx-cbw 40
  TR\_CBW\_20\_EHTSU\_LDPC   Both        \--format ehtsu \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_EHTSU         Both        \--format ehtsu \--coding bcc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_HESU          Both        \--format hesu \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_HESU\_LDPC    Both        \--format hesu \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_VHT           Both        \--format vht \--coding bcc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_VHT\_LDPC     Both        \--format vht \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_HT            Both        \--format ht \--coding bcc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_HT\_LDPC      Both        \--format ht \--coding ldpc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20
  TR\_CBW\_20\_NonHT         Both        \--format nonht \--coding bcc \--rate 20e6 \--tx-resample-ratio 1.0 \--cbw 20 \--rx-resample-ratio 1.0 \--rx-cbw 20

  : PicoScenes FrontEnd Presets

You can also run following command to query the full preset list:

> ``` {.bash}
> PicoScenes --list-presets
> ```
