#!/bin/bash
echo "packing the dependencies"

cd ../frontend-shared/library/types

npm pack

SHARED_TYPES=$(find . -type f -name "*.tgz")

mv $SHARED_TYPES ../../../frontend/dependencies

DIR="../../dist/sharedModule"
if [ -d "$DIR" ]; then
    rm -r ../../dist/sharedModule

    cd ../ui

    ng build --configuration development
else
    cd ../ui

    ng build --configuration development
fi

cd ../../dist/sharedModule

npm pack

SHARED_COMPONENTS=$(find . -type f -name "*.tgz")

mv $SHARED_COMPONENTS ../../../frontend/dependencies

cd ../../../frontend/dependencies

npm uninstall @types/sources-types

npm uninstall angular-shared-ui

npm install $SHARED_TYPES --save-dev

npm install $SHARED_COMPONENTS --save-dev

# ng build

# firebase deploy