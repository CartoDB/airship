// This has been moved to components because I need the paths to dynamically create SVGs using JSX
// and Typescript does not let you import files from outside the project root.
// TODO: Since we're using lerna, we could move it back here, define icons as a dependency to component and
// lerna would symlink them locally.
module.exports = require('../../components/src/resources/icon-paths.json');
