#!/bin/bash

set -e

phyID=2

array_prepare_for_picoscenes ${phyID} "5200 HT20"

PicoScenes -d debug -i ${phyID} --mode logger --freq 4200e6 --rate 20e6