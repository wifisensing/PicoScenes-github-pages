#!/bin/sh

set -e

array_prepare_for_picoscenes "3 4" "2412 HT20"


PicoScenes "-d debug;
            -i 4 --mode logger --freq 2412e6 --rate 20e6; // this command line format support comments. Comments start with //
            -i 3 --mode injector --repeat 1000 --delay 50000 --freq 2412e6 --rate 20e6; // NIC <3> in injector mode, injects 1000 packets with 5000us interval
            -q; // -q is a shortcut for --quit"