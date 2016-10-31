const yeoman = require('yeoman-generator');
const plural = require('plural');

module.exports = yeoman.Base.extend({
  initializing() {
    this.argument('name', {
      type: String,
      required: true,
      description: 'Your feature name:',
    });
  },
  prompting() {
    return this.prompt([
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select modules:',
        choices: [
          'container',
          'component',
          'style',
          'api',
          'store',
          'action',
          'reducer',
          'schema',
          'saga',
          'selector',
        ],
      },
    ]).then((answers) => {
      this.modules = answers.modules;
    });
  },

  writing() {
    this.className = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.plural = plural(this.name);
    this.upper = this.name.toUpperCase();

    this.modules.forEach(module => {
      const suffix = module === 'style' ? 'css' : 'js';
      this.fs.copyTpl(
        this.templatePath(`${module}.${suffix}`),
        this.destinationPath(`src/${plural(module)}/${this.name}.${suffix}`),
        this
      );
    });
  },
});
