#!/bin/bash
# Author: Ratan Sunder Parai
# Email: contact@ratanparai.com

# exit if any command return non-zero status
set -e

# cd into the script folder
# check https://stackoverflow.com/questions/6393551/what-is-the-meaning-of-0-in-a-bash-script
cd "${0%/*}"

# pull changes from github
if [ "$1" != "-f" ]; then
  if git pull | grep "Already up to date."; then
    echo "NOTHING TO DEPLOY."
    exit 0
  fi
else
  git pull
fi

# build artifact
ember build --prod

# build docker image
docker build -t frontend .

# tag image for upload
docker tag frontend docker-registry-default.router.default.svc.cluster.local/ngfs-core-framework/frontend:latest

# push image to the registry console
docker push docker-registry-default.router.default.svc.cluster.local/ngfs-core-framework/frontend:latest

echo "IMAGES BUILD AND PUSHED SUCCESSFULL"
