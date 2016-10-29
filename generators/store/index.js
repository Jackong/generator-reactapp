const yeoman = require('yeoman-generator');
const plural = require('plural');

module.exports = yeoman.Base.extend({
  initializing() {
    this.argument('name', {
      type: String,
      required: true,
      description: 'Your store name:',
    });
  },
  prompting() {
    this.className = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.plural = plural(this.name);
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('store.js'),
      this.destinationPath(`src/stores/${this.name}.js`),
      this
    );
  },
});
