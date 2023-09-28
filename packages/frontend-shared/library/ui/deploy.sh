#!/bin/bash
echo "packing the dependencies"

cd ../types

npm pack

SHARED_TYPES=$(find . -type f -name "*.tgz")

mv $SHARED_TYPES ../ui/dependencies

cd ../ui/dependencies

npm uninstall @types/sources-types

npm install $SHARED_TYPES --save-dev

DIR="../../dist/sharedModule"
if [ -d "$DIR" ]; then
    rm -r ../../dist/sharedModule
else
  ###  Control will jump here if $DIR does NOT exists ###
  echo "all cleared, continue"
fi

ng build --watch --configuration development