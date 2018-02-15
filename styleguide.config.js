module.exports = {
  skipComponentsWithoutExample: true,
  template: 'styleguide/template.html',
  title: 'Airship',
  sections: [
    {
      name: 'Introduction',
      content: './docs/introduction.md'
    },
    {
      name: 'Components',
      content: './docs/components.md',
      components: './src/components/**/*.js'
    }
  ]
};
