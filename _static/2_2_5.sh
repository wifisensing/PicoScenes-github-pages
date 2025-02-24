#!/bin/sh

set -e

array_prepare_for_picoscenes "3 4" "2412 HT20"

PicoScenes "-d debug;
            -i 4 --freq 2412e6 --mode responder;
            -i 3 --freq 2412e6 --mode initiator --repeat 100 --delay 5000 --cf 2412e6:5e6:2484e6;
            -q;"