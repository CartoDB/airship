module.exports = async (page, scenario, vp) => {
  page.on('load', function () {
    page.evaluate(() => {
      document.fonts.ready.then(() => {
        setTimeout(() => {
          console.log('_READY');
        }, 750);
      });
    });
  });
};
