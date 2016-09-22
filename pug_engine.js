var BaseEngine = require("punch").TemplateEngines.Base;
var pug = require("pug");
var util = require("util");
var path = require("path");

function PugEngine (options) {
  BaseEngine.call(this, options);

  this.extension = PugEngine.extension;
  this.renderFunction = PugEngine.renderFunction;
}

util.inherits(PugEngine, BaseEngine);

PugEngine.extension = ".pug";
PugEngine.template_dir = null;
PugEngine.bundles = null;

PugEngine.setup = function (config) {
  PugEngine.template_dir = config.template_dir;
  PugEngine.bundles = config.bundles;
}

PugEngine.renderFunction = function (src, content, partials, helpers) {
  var locals = Object.assign({}, content, helpers.tag, helpers.block, {
    basedir: path.join(process.cwd(), PugEngine.template_dir)
  });
  return pug.render(src, locals);
}

module.exports = PugEngine;
