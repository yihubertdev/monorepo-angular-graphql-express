#!/bin/bash
echo "packing the dependencies"

cd ../frontend-shared/library/types

npm pack

SHARED_TYPES=$(find . -type f -name "*.tgz")

mv $SHARED_TYPES ../../../frontend/dependencies

cd ../../../frontend/dependencies

npm uninstall @types/sources-types --legacy-peer-deps

npm install $SHARED_TYPES --save-dev --legacy-peer-deps

cd ../ui

npm pack

SHARED_COMPONENTS=$(find . -type f -name "*.tgz")

mv $SHARED_COMPONENTS ../../../frontend/dependencies

# ng build

# firebase deploy