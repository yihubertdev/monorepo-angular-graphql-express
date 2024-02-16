#!/bin/bash
echo "packing the dependencies"

cd ../types

npm run build

npm pack

SHARED_TYPES=$(find . -type f -name "*.tgz")

mv $SHARED_TYPES ../graphql/dependencies

cd ../graphql/dependencies

npm uninstall @types/sources

npm install $SHARED_TYPES --save-dev
