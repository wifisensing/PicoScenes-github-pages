#!/bin/bash

set -e

phyID=2

array_prepare_for_picoscenes ${phyID} "2412 HT20"

PicoScenes -d debug -i ${phyID} --mode injector --repeat 1000 --delay 5000 -q