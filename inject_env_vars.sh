#!/usr/bin/env bash
# Write the secret from Cloudflare into a Jekyll data file
mkdir -p _data
echo "wsSecret: \"$ICWEBSVC_SECRET\"" >> _data/env_vars.yml