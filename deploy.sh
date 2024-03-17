#!/bin/bash
echo "packing the dependencies"

sudo rm -r ./node_modules
sudo rm -r ./packages/backend/node_modules
sudo rm -r ./packages/frontend/node_modules
sudo rm yarn.lock
yarn cache clean

yarn workspace type-sources pack

cd ./packages/type-sources

SHARED_TYPES=$(find . -type f -name "*.tgz")

cp $SHARED_TYPES ../frontend/dependencies
cp $SHARED_TYPES ../backend/dependencies
