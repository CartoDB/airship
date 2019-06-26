module.exports = async (page, scenario, vp) => {
  page.on('load', function () {
    page.evaluate(() => {
      document.fonts.ready.then(() => {
        console.log('_READY');
      });
    });
  });
};
