#!/bin/bash

ICONS_VERSION=$(node --eval "console.log(require('./packages/icons/package.json').version);")
STYLES_VERSION=$(node --eval "console.log(require('./packages/styles/package.json').version);")
COMPONENTS_VERSION=$(node --eval "console.log(require('./packages/components/package.json').version);")

echo "Ready to publish Airship"
echo "Components v$COMPONENTS_VERSION"
echo "Icons v$COMPONENTS_VERSION"
echo "Styles v$COMPONENTS_VERSION"
echo "Are the version numbers bumped?"
read -n1 -r -p "Press Ctrl+C to cancel, or any other key to continue." key

echo "Uploading to CDN..."

node scripts/release-s3 --verbose
node scripts/invalidate-cache --verbose

echo "All done."
echo "CDN at https://cartodb-libs.global.ssl.fastly.net and https://libs.cartocdn.com/"
