#!/bin/bash
set -x
url=$(date) docker-compose up -d
code --install-extension eamodio.gitlens