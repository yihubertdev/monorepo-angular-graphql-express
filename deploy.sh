#!/bin/bash
echo "packing the dependencies"

yarn workspace type-sources pack

cd ../packages/type-sources

SHARED_TYPES=$(find . -type f -name "*.tgz")

cp $SHARED_TYPES ../frontend/dependencies ../graphql/dependencies ../express/dependencies

cd ../../

yarn install
