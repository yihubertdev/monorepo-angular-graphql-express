#!/bin/bash
echo "packing the dependencies"

cd ../frontend-shared/library/types

SHARED_TYPES=$(find . -type f -name "*.tgz")

rm $SHARED_TYPES

npm pack

cp $SHARED_TYPES ../../../frontend/dependencies

cp $SHARED_TYPES ../ui/dependencies
echo "finish file copy"
DIR="../../dist/sharedModule"
if [ -d "$DIR" ]; then
    rm -r ../../dist/sharedModule
else
    echo "old build package cleared, continue"
fi

cd ../ui/dependencies

npm uninstall @types/sources-types
npm install $SHARED_TYPES --save-dev

ng build --configuration development

cd ../../../dist/sharedModule

npm pack

SHARED_COMPONENTS=$(find . -type f -name "*.tgz")

mv $SHARED_COMPONENTS ../../../frontend/dependencies

cd ../../../frontend/dependencies

npm uninstall @types/sources-types

npm uninstall angular-shared-ui

npm install $SHARED_TYPES --save-dev

npm install $SHARED_COMPONENTS --save-dev

ng build

firebase deploy