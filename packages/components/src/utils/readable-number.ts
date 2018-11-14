if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    let str = '' + this;
    count = +count;
    if (count !== count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count === Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length === 0 || count === 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    // tslint:disable-next-line:no-bitwise
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    const maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
       str += str;
       count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  };
}

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
      // tslint:disable-next-line:no-bitwise
      targetLength = targetLength >> 0; // truncate if number, or convert non-number to 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length >= targetLength) {
          return String(this);
      } else {
          targetLength = targetLength - this.length;
          if (targetLength > padString.length) {
              // append to original to ensure we are longer than needed
              padString += padString.repeat(targetLength / padString.length);
          }
          return padString.slice(0, targetLength) + String(this);
      }
  };
}

/**
 *  Convert long numbers to
 *  readizable numbers.
 *
 *  Ex: 1200 -> 1.2K
 */
export default function(value): string {
  const roundedNumber = Math.abs(Math.ceil(value * 100) / 100);

  if (roundedNumber >= 1000000000) {
    return `${(roundedNumber / 1000000000).toFixed(1)}G`.padStart(5);
  }
  if (roundedNumber >= 1000000) {
    return `${(roundedNumber / 1000000).toFixed(1)}M`.padStart(5);
  }
  if (roundedNumber >= 1000) {
    return `${(roundedNumber / 1000).toFixed(1)}K`.padStart(5);
  }

  const roundedStr = `${roundedNumber}`;

  // This seems backwards but it's an IE11 issue.
  // padStart(5) looks weird for 0 - 9, looks better with padStart(7)
  // 10 - 99 looks better with padStart(6)
  return roundedStr.padStart(5 + Math.abs(roundedStr.length - 3));
}
