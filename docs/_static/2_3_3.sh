#!/bin/sh 

set -e

PicoScenes "-d debug;
            -i usrp192.168.41.2 --mode logger --freq 5815e6 --rate 200e6 --rx-resample-ratio 0.8 --cbw 160 --code ldpc --rx-channel 0,1 --rx-gain 15;
            -i usrp192.168.40.2 --mode injector --freq 5815e6 --rate 200e6 --tx-resample-ratio 1.25 --cbw 160 --code ldpc --format vht --tx-channel 0,1 --sts 2 --mcs 1 --txpower 15 --repeat 1000 --delay 5e3;
            -q
            "