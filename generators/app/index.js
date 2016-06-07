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
  prompting() {
    const done = this.async();
    const prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'React',
        value: 'useReact',
        checked: true,
      }],
    }];

    this.prompt(prompts, function (answers) {
      const features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      this.useReact = hasFeature('useReact');

      done();
    }.bind(this));
  },
  writing: {
    app() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          appname: this.appname,
          useReact: this.useReact,
        }
      );
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'), {
          appname: this.appname,
          useReact: this.useReact,
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
      if (this.useReact) {
        this.fs.copy(
          this.templatePath('src'),
          this.destinationPath('src')
        );
        mkdirp.sync(this.destinationPath('src/js/components'));
      } else {
        this.fs.copy(
          this.templatePath('src/js/api'),
          this.destinationPath('src/js/api')
        );
        this.fs.copy(
          this.templatePath('src/templates'),
          this.destinationPath('src/templates')
        );
      }
      this.fs.copyTpl(
        this.templatePath('src/js/index.js'),
        this.destinationPath('src/js/index.js'),
        {
          useReact: this.useReact,
        }
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
