#!/bin/bash
echo "packing the dependencies"

cd ../type-source

SHARED_TYPES=$(find . -type f -name "*.tgz")

rm $SHARED_TYPES

npm run build

npm pack

cp $SHARED_TYPES ../frontend/dependencies

cd ../frontend/dependencies

npm uninstall type-source
npm install $SHARED_TYPES --save-dev

# cp $SHARED_TYPES ../ui/dependencies
# echo "finish file copy"
# DIR="../../dist/sharedModule"
# if [ -d "$DIR" ]; then
#     rm -r ../../dist/sharedModule
# else
#     echo "old build package cleared, continue"
# fi

# cd ../ui/dependencies

# npm uninstall @types/sources-types
# npm install $SHARED_TYPES --save-dev

# npx ng build --configuration development

# cd ../../../dist/sharedModule

# npm pack

# SHARED_COMPONENTS=$(find . -type f -name "*.tgz")

# mv $SHARED_COMPONENTS ../../../frontend/dependencies

# cd ../../../frontend/dependencies

# npm uninstall @types/sources-types

# npm uninstall angular-shared-ui

# npm install $SHARED_TYPES --save-dev

# npm install $SHARED_COMPONENTS --save-dev

# ng build

# firebase deploy