#!/usr/bin/env sh

# remove __pycache__
find . -type d -name __pycache__ -exec rm -r {} +
