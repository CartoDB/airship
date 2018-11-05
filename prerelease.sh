#!/bin/bash

echo "Ready to publish Airship prerelease."
read -n1 -r -p "Press Ctrl+C to cancel, or any other key to continue." key

echo "Uploading to CDN..."

node scripts/release-s3 --verbose --prerelease
node scripts/invalidate-cache --verbose

echo "All done."
echo "CDN at https://cartodb-libs.global.ssl.fastly.net and https://libs.cartocdn.com/"
