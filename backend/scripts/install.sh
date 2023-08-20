#!/usr/bin/env sh

# create local environment
python3 -m venv env

# use local environment
source env/bin/activate

# install dependencies
pip install -r requirements.txt