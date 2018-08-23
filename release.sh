#!/bin/bash

npm update

ICONS_VERSION=$(node --eval "console.log(require('./packages/icons/package.json').version);")
STYLES_VERSION=$(node --eval "console.log(require('./packages/styles/package.json').version);")
COMPONENTS_VERSION=$(node --eval "console.log(require('./packages/components/package.json').version);")

npm lint && npm test:components && npm test:styles

echo "Ready to publish Airship"
echo "Components v$COMPONENTS_VERSION"
echo "Icons v$COMPONENTS_VERSION"
echo "Styles v$COMPONENTS_VERSION"
echo "Are the version numbers bumped?"
read -n1 -r -p "Press Ctrl+C to cancel, or any other key to continue." key

npm build

echo "Uploading to CDN..."

node scripts/release-s3 --dry --verbose
nose scripts/invalidate-cache --dry --verbose

echo "All done."
echo "CDN at https://cartodb-libs.global.ssl.fastly.net and https://libs.cartocdn.com/"
