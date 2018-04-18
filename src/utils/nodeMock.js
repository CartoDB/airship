export default function(element) {
  if (element.type === 'input') {
    return {
      focus() {},
    };
  }

  return {
    getBoundingClientRect() {
      return {
        bottom: 100,
        height: 100,
        left: 100,
        right: 100,
        top: 100,
        width: 100,
        x: 100,
        y: 100,
      };
    },
  };
}
