#!/bin/sh 

set -e

array_prepare_for_picoscenes "3 4" "2412 HT20"

PicoScenes "-d debug;
            -i 4 --mode responder;
            -i 3 --mode initiator --repeat 1000 --delay 5000;
            -q;"