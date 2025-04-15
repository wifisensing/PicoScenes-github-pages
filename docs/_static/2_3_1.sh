#!/bin/sh 

set -e

PicoScenes "-d debug;
            -i usrp192.168.40.2 --mode logger --freq 5815e6 --rate 40e6 --rx-cbw 40 --rx-channel 0,1 --rx-ant TX/RX --rx-gain 15
            "