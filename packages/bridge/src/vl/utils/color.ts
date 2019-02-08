export function rgbToHex(color: RGBColor) {
  return `#${_toHex(color.r)}${_toHex(color.g)}${_toHex(color.b)}${_toHex(color.a * 255)}`;
}

export function toHex(color: RGBColor | string) {
  if (typeof color === 'string') {
    return color;
  }

  return rgbToHex(color as RGBColor);
}

function _toHex(value: number) {
  if (isNaN(value) || value === undefined) {
    return '';
  }

  return value.toString(16).padStart(2, '0').toUpperCase();
}
