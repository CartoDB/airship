export default function rgbToHex(rgbColorArray) {
  return `#${rgbColorArray[0].toString(16).padStart(2, '0')}${rgbColorArray[1]
    .toString(16)
    .padStart(2, '0')}${rgbColorArray[2].toString(16).padStart(2, '0')}`;
}
