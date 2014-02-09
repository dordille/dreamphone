(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("views/boys", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"places\"><div class=\"movies\"><div class=\"boys\"><div class=\"boy\"><div class=\"name\">Spencer</div><a href=\"\" class=\"phone\"></a></div><div class=\"boy\"><div class=\"name\">Dan</div></div><div class=\"boy\"><div class=\"name\">Gary</div></div><div class=\"boy\"><div class=\"name\">Jamal</div></div></div></div><div class=\"snackshop\"><div class=\"boys\"><div class=\"boy\"><div class=\"name\">Phil</div></div><div class=\"boy\"><div class=\"name\">Bruce</div></div><div class=\"boy\"><div class=\"name\">James</div></div><div class=\"boy\"><div class=\"name\">Tyler</div></div></div></div><div class=\"park\"><div class=\"boys\"><div class=\"boy\"><div class=\"name\">Mark</div></div><div class=\"boy\"><div class=\"name\">Steve</div></div><div class=\"boy\"><div class=\"name\">Jason</div></div><div class=\"boy\"><div class=\"name\">John</div></div></div></div><div class=\"gym\"><div class=\"boys\"><div class=\"boy\"><div class=\"name\">Scott</div></div><div class=\"boy\"><div class=\"name\">Matt</div></div><div class=\"boy\"><div class=\"name\">Carlos</div></div><div class=\"boy\"><div class=\"name\">Bob</div></div></div></div><div class=\"beach\"><div class=\"boys\"><div class=\"boy\"><div class=\"name\">Paul</div></div><div class=\"boy\"><div class=\"name\">Mike</div></div><div class=\"boy\"><div class=\"name\">Wayne</div></div><div class=\"boy\"><div class=\"name\">Tony</div></div></div></div><div class=\"all\"><div class=\"boys\"><div class=\"boy\"><div class=\"name\">Dale</div></div><div class=\"boy\"><div class=\"name\">Alan</div></div><div class=\"boy\"><div class=\"name\">Dave</div></div><div class=\"boy\"><div class=\"name\">George</div></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map