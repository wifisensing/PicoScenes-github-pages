#!/bin/sh 

set -e

PicoScenes "-d debug;
            -i usrp192.168.42.2,192.168.43.2 --mode logger --freq 5815e6 --rate 20e6 --cbw 20 --rx-channel 0,1,2,3 --rx-gain 15;
            -i usrp192.168.40.2,192.168.41.2 --mode injector --freq 5815e6 --rate 20e6 --cbw 20 --format vht --tx-channel 0,1,2,3 --sts 4 --mcs 1 --txpower 15 --repeat 1000 --delay 5e3;
            -q
            "