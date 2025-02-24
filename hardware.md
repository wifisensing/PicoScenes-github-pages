Supported Hardware
==================

**Revised on Nov. 29, 2023**

In this page, we briefly compare the capabilities of the
PicoScenes-supported CSI hardware.

\[Exclusive for China mainland users\]:
PicoScenes团队很荣幸得到NI的认可与支持，获得NI
USRP授权销售资格(`collaboration-with-ni`{.interpreted-text
role="ref"})。您可以在这个页面查看我们的NI USRP销售方案，
`/ni`{.interpreted-text role="doc"}。

  -------------------------------------------------------------------------------------------------------------------
  Hardware      USRP-based SDR (X410 as    HackRF One                 AX210/AX200          QCA9300       IWL5300
  Model         example)                                                                                 
  ------------- -------------------------- -------------------------- -------------------- ------------- ------------
  Type          SDR                        SDR                        Wi-Fi NIC            Wi-Fi NIC     Wi-Fi NIC

  Connection    USB 3.0 or 1/10/100 GbE    USB 2.0                    M.2 2230             Mini PCI-E 1x Mini PCI-E
                                                                                                         1x

  Supported     802.11a/g/n/ac/ax/**be**   802.11a/g/n/ac/ax/**be**   802.11a/g/n/ac/ax    802.11n       802.11n
  Formats for                                                                                            
  CSI                                                                                                    
  Measurement                                                                                            

  Rx AGC        No, automatic by USRP B210 No                         Yes, only automatic  Yes, has      Yes, only
                                                                                           manual mode   automatic

  Available     **Arbitrary tunable in     **Arbitrary tunable in     AX200: 2.4/5 GHz     **Arbitrary   2.4/5 GHz
  Carrier       \[1, 7200\] MHz**          \[10, 7250\] MHz**         Bands, 470 MHz in    tunable in    Bands, 470
  Frequency                                                           total; **AX210**:    \[2.2-2.9\]   MHz in total
  Range (MHz)                                                         2.4/5/**6** GHz      and           
                                                                      bands (**\[5955,     \[4.4-6.1\]   
                                                                      7115\] MHz in 6GB)** GHz**         

  Available     **tunable in \[1, 400\],   **Arbitrary tunable in     20/40/80/**160**     **Arbitrary   20/40
  Bandwidths    scalable to 1600**[^1]     \[1, 20\]**                                     tunable in    
  (MHz)                                                                                    \[2.5, 80\]** 

  Maximal MIMO  4                          1                          2                    3             3
  Streams                                                                                                

  Maximal CSI   **1992x1x1, Scalable to    242x1x1                    **1992x2x2**         114x3x3       30x3x3
  dimension     1992x4x4 streams**                                                                       

  Number of CSI **Up to 39**[^2]           **Up to 39**               1                    **2, by       **2, by
  per packet                                                                               HT-rate Extra HT-rate
                                                                                           Spatial       Extra
                                                                                           Sounding      Spatial
                                                                                           (ESS)**       Sounding
                                                                                                         (ESS)**

  CSI           **YES**, all-format        **YES**, all-format        **YES**              No, only for  No, only for
  Measurement   (a/g/n/ac/ax/**be**),      (a/g/n/ac/ax/**be**), 20                        11n sounding  the special
  for the       all-CBW (20/40/80/160/320  MHz CBW,                                        frames        12:34:56
  Overheard     MHz), all-coding(LDPC/BCC) all-coding(LDPC/BCC)                                          address
  Frames in                                                                                              
  Monitor Mode                                                                                           

  Packet        **Yes**, all-format        **Yes**, all-format        **Yes**, all-format  Yes, a/g/n    Yes, a/g/n
  Injection     (a/g/n/ac/ax/**be**),      (a/g/n/ac/ax/**be**), ,    (a/g/n/ac/**ax**),                 
  Support       all-CBW (20/40/80/160/320  all-CBW (20/40/80/160/320  sub-320 CBW                        
                MHz), all-coding(LDPC/BCC) MHz), all-coding(LDPC/BCC) (20/40/80/160 MHz),                
                                                                      all-coding                         
                                                                      (LDPC/BCC)                         
  -------------------------------------------------------------------------------------------------------------------

  : CSI-Extractable Hardware Supported by The PicoScenes Platform

[^1]: PicoScenes supports multi-channel split and concatenation. By
    combining four 400-MSPS channels of USRP X410, we achieve 1.6 GHz
    bandwidth.

[^2]: 39 CSI measurements with HE-SU mode/ midamble CSI/ midamble
    periodicity = 10
