module.exports = async (page, scenario, vp) => {
  page.evaluate(() => {
    window.addEventListener('load', () => {
      document.fonts.ready.then(() => {
        console.log('backstopjs_ready');
      })
    });
    if (document.readyState == 'complete') {
      document.fonts.ready.then(() => {
        console.log('backstopjs_ready');
      })
    }
  });
};
