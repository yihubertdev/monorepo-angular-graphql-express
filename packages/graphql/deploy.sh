#!/bin/bash
echo "packing the dependencies"

cd ../frontend-shared/library/types

npm pack

SHARED_TYPES=$(find . -type f -name "*.tgz")

mv $SHARED_TYPES ../../../graphql/dependencies

cd ../../../graphql/dependencies

npm uninstall @types/sources-types

npm install $SHARED_TYPES --save-dev
