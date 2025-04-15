#!/bin/bash

set -e

phyID=2

array_status

PicoScenes -d debug -i ${phyID} --mode logger