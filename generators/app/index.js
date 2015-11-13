'use strict'
const yeoman = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = yeoman.generators.Base.extend({
  init: function() {
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('Reactapp') + ' generator!'
    ))
    this.appname = this.appname.replace(/\s/g, '-')
  },
  writing: {
    app: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
            appname: this.appname
        }
      )
      this.fs.copy(
          this.templatePath('webpack.config.js'),
          this.destinationPath('webpack.config.js')
      )
      this.fs.copy(
          this.templatePath('server.js'),
          this.destinationPath('server.js')
      )
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      )
      this.fs.copy(
        this.templatePath('.eslintrc'),
        this.destinationPath('.eslintrc')
      )
    }
  },

  install: function() {
    this.installDependencies()
  }
})
