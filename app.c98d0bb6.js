// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"cbody.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stands for "Celestial Body"...
 */

var CBody = function () {
  function CBody(pos, vel, mass, color) {
    _classCallCheck(this, CBody);

    this.pos = pos;
    this.vel = vel;
    this.a = { x: 0, y: 0 };
    this.mass = mass; // Mass == Radius
    this.color = color;
  }

  _createClass(CBody, [{
    key: "applyForce",
    value: function applyForce(F) {
      this.a.x += F.x;
      this.a.y += F.y;
    }
  }, {
    key: "update",
    value: function update(dt, w, h) {
      if (this.static) return;

      this.vel.x += dt * this.a.x / this.mass;
      this.vel.y += dt * this.a.y / this.mass;

      this.pos.x += this.vel.x * dt;
      this.pos.y += this.vel.y * dt;

      if (this.pos.x < -this.mass) this.pos.x = w + this.mass;else if (this.pos.x > this.mass + w) this.pos.x = -this.mass;
      if (this.pos.y < -this.mass) this.pos.y = h + this.mass;else if (this.pos.y > this.mass + h) this.pos.y = -this.mass;

      this.a.x = 0;this.a.y = 0;
    }
  }, {
    key: "draw",
    value: function draw(c) {
      c.fillStyle = this.color;
      c.beginPath();
      c.arc(this.pos.x, this.pos.y, this.mass, 0, 2.0 * Math.PI);
      c.fill();
      c.closePath();
    }
  }]);

  return CBody;
}();

exports.default = CBody;
},{}],"util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dist = dist;
exports.vdist = vdist;
exports.abs = abs;
exports.op = op;
function dist(a, b) {
  var dx = a.x - b.x;
  var dy = a.x - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function vdist(a, b) {
  return { x: b.x - a.x, y: b.y - a.y };
}

function abs(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function op(v) {
  return { x: -v.x, y: -v.y };
}
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cbody = require("./cbody");

var _cbody2 = _interopRequireDefault(_cbody);

var _util = require("./util");

var _ = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-- Some constants --//
var G = 1000; // Yay! Made up values!

var System = function () {
  function System() {
    _classCallCheck(this, System);

    //-- Canvas stuff --//
    this.canvas = document.querySelector('#canvas');
    this.canvas.width = this.width = document.documentElement.scrollWidth;
    this.canvas.height = this.height = document.documentElement.scrollHeight;
    this.c = this.canvas.getContext('2d');
    this.c.font = '12px "Source Code Pro", monospace';
    this.trail = true;

    // Start with a single body in the middle
    this.resetBodies();

    //-- Initialize mouse stuff --//
    this.mouse = {
      x: 0, y: 0,
      vx: 0, vy: 0,
      time: performance.now()
    };
    document.addEventListener('click', this.click.bind(this));
    document.addEventListener('mousemove', this.mousemove.bind(this));

    //-- Keyup... --//
    document.addEventListener('keyup', this.keyup.bind(this));

    //-- Physics --//
    this.quadratic = 1;

    //-- Starting loop --//
    this.dt = .1;
    this.fps = { timer: 0, counter: 0, current: 0 };
    this.time = performance.now();
    this._loop = this.loop.bind(this);
    window.requestAnimationFrame(this._loop);
  }

  _createClass(System, [{
    key: "resetBodies",
    value: function resetBodies() {
      this.bodies = [new _cbody2.default({ x: this.width / 2.0, y: this.height / 2.0 }, { x: 0, y: 0 }, 10, 'white')];
    }
  }, {
    key: "loop",
    value: function loop(time) {
      //-- Update timer stuff --//
      var dt = (time - this.time) / 1000.0;
      this.time = time;

      // Clear screen
      // this.c.fillStyle = this.trail ? '#0b1c3810' : '#0b1c38';
      this.c.fillStyle = this.trail ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,1)';
      this.c.fillRect(0, 0, this.width, this.height);

      // Show FPS (updated each second)
      this.fps.timer += dt;
      this.fps.counter++;
      if (this.fps.timer >= 1.0) {
        this.fps.current = this.fps.counter;
        this.fps.counter = 0;
        this.fps.timer = 0;
      }
      this.c.fillStyle = 'white';
      this.c.fillText(this.fps.current + ' FPS', 25, 25);

      //-- Update & Draw all celestial bodies --//
      var blen = this.bodies.length; // Slight optimizations! Hurray!
      for (var i = 0; i < blen; i++) {
        // Remove the 'dead' body (damn) and continue the loop like nothing happened
        if (this.bodies[i].dead) {
          this.bodies.splice(i, 1);i--;blen--;continue;
        }

        // Update 'em & draw 'em
        this.bodies[i].update(dt, this.width, this.height);
        this.bodies[i].draw(this.c);

        // Interactions between bodies
        for (var j = i + 1; j < blen; j++) {
          if (this.bodies[j].dead) {
            continue;
          }

          // Calculate distance. Both vectorial and scalar
          var d = _.vdist(this.bodies[i].pos, this.bodies[j].pos);
          var dabs = _.abs(d);

          // Gravitational force
          var Fabs = (this.quadratic ? 500 * G : G) * this.bodies[i].mass * this.bodies[j].mass / Math.pow(dabs, this.quadratic + 2);
          var F = { x: d.x * Fabs, y: d.y * Fabs };
          this.bodies[i].applyForce(F);
          this.bodies[j].applyForce(_.op(F));

          // Collision
          if (dabs < this.bodies[i].mass + this.bodies[j].mass) {
            // Choose which body is the bigger and which is the smaller one
            var big = void 0,
                small = void 0;
            if (this.bodies[i].mass > this.bodies[j].mass) {
              big = this.bodies[i];small = this.bodies[j];
            } else {
              big = this.bodies[j];small = this.bodies[i];
            }

            // The big one 'absorbs' the small's mass, whilst the small one dies a horrible death
            big.mass += small.mass;
            small.dead = true;
          }
        }
      }

      window.requestAnimationFrame(this._loop);
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      var now = performance.now();
      var dt = (now - this.mouse.time) / 1000.0;

      this.mouse.vx = (e.clientX - this.mouse.x) / dt;
      this.mouse.vy = (e.clientY - this.mouse.y) / dt;

      this.mouse.time = now;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }
  }, {
    key: "click",
    value: function click(e) {
      var v = void 0;
      if (performance.now() - this.mouse.time > 150) {
        // More than 150 ms have passed since the last mousemove
        v = { x: 0, y: 0 };
      } else {
        v = { x: this.mouse.vx, y: this.mouse.vy };
      }

      this.bodies.push(new _cbody2.default({ x: e.clientX, y: e.clientY }, v, 4, "hsl(" + Math.random() * 360 + ", 80%, 75%)"));
    }
  }, {
    key: "keyup",
    value: function keyup(e) {
      if (e.key === 'r') {
        this.resetBodies();
      } else if (e.key === 's') {
        this.bodies[0].pos = { x: this.width / 2.0, y: this.height / 2.0 };
        this.bodies[0].vel = { x: 0, y: 0 };
        this.bodies[0].a = { x: 0, y: 0 };
        this.bodies[0].static = !this.bodies[0].static;
      } else if (e.key === 't') {
        this.trail = !this.trail;
      } else if (e.key === 'q') {
        this.quadratic = 1 - this.quadratic;
      }
    }
  }]);

  return System;
}();

window.app = new System();
},{"./cbody":"cbody.js","./util":"util.js"}],"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '34907' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c98d0bb6.map