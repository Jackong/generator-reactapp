const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  init() {
    this.log(yosay(
      `Welcome to the impeccable ${chalk.red('Reactapp')} generator!`
    ));
    this.appname = this.appname.replace(/\s/g, '-');
  },
  writing: {
    app() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          appname: this.appname,
        }
      );
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'), {
          appname: this.appname,
        }
      );
      this.fs.copy(
        this.templatePath('server.js'),
        this.destinationPath('server.js')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('src/api'),
        this.destinationPath('src/api')
      );
      this.fs.copy(
        this.templatePath('src/js/constants'),
        this.destinationPath('src/js/constants')
      );
      this.fs.copy(
        this.templatePath('src/js/api'),
        this.destinationPath('src/js/api')
      );
      this.fs.copy(
        this.templatePath('src/templates'),
        this.destinationPath('src/templates')
      );
      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      );
      mkdirp.sync(this.destinationPath('src/js/components'));
      this.fs.copy(
        this.templatePath('src/js/index.js'),
        this.destinationPath('src/js/index.js')
      );
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
    },

    projectfiles() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },
  },

  install() {
    this.installDependencies();
  },
});
