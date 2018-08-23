const secrets = require('../secrets.json');
const fastly = require('fastly')(secrets.FASTLY_API_KEY);

const DRY_RUN = process.argv.some(e => e === '--dry');
const VERBOSE = process.argv.some(e => e === '--verbose');

function log(what) {
  if (!VERBOSE) return;

  console.log(what);
}


if (!DRY_RUN) {
  fastly.purgeAll(secrets.FASTLY_CARTODB_SERVICE, function (err, obj) {
    if (err) {
      console.err('Failed to invalidate fastly cache', err);
      return;
    }
  
    log(`Cache invalidated: ${obj}`);
  });
}
