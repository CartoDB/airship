module.exports = {
  template: 'styleguide/template.html',
  title: 'Airship',
  skipComponentsWithoutExample: true,
  getExampleFilename(componentPath) {
    return componentPath.replace(/(.+)\/(.+).js$/, '/docs/components/$2.md');
  },
  sections: [
    {
      name: 'Introduction',
      content: './docs/introduction.md'
    },
    {
      name: 'Typography',
      content: './docs/typography.md',
      components: function() {
        return [
          './src/components/Typography/jumbo.js',
          './src/components/Typography/display.js',
          './src/components/Typography/title.js',
          './src/components/Typography/subheader.js',
          './src/components/Typography/text.js',
          './src/components/Typography/caption.js'
        ];
      },
      getExampleFilename(componentPath) {
        return componentPath.replace(
          /(.+)\/(.+).js$/,
          '/docs/components/$2.md'
        );
      }
    },
    {
      name: 'Components',
      content: './docs/components.md',
      components: function() {
        return ['./src/components/Grid/grid.js'];
      }
    }
  ]
};
