#!/bin/bash
echo "packing the dependencies"

cd ../frontend-shared/library/types

npm pack

GCC_VERSION=$(find . -type f -name "*.tgz")

mv $GCC_VERSION ../../../frontend/dependencies

cd ../../../frontend/dependencies

npm uninstall @types/sources-types --legacy-peer-deps

npm install $GCC_VERSION --save-dev --legacy-peer-deps

ng build

firebase deploy