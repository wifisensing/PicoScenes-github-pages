#!/bin/sh 

set -e

PicoScenes "-d debug;
            -i usrp192.168.40.2 --mode injector --freq 5815e6 --rate 50e6 --cbw 80 --code ldpc --format vht --tx-channel 0,1 --sts 2 --mcs 4 --txpower 15
            "