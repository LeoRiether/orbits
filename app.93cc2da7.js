parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Tt2/":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var s=function(){function s(s,t){for(var i=0;i<t.length;i++){var e=t[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(s,e.key,e)}}return function(t,i,e){return i&&s(t.prototype,i),e&&s(t,e),t}}();function t(s,t){if(!(s instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function i(s,e,a,h){t(this,i),this.pos=s,this.vel=e,this.a={x:0,y:0},this.mass=a,this.color=h}return s(i,[{key:"applyForce",value:function(s){this.a.x+=s.x,this.a.y+=s.y}},{key:"update",value:function(s,t,i){this.static||(this.vel.x+=s*this.a.x/this.mass,this.vel.y+=s*this.a.y/this.mass,this.pos.x+=this.vel.x*s,this.pos.y+=this.vel.y*s,this.pos.x<-this.mass?this.pos.x=t+this.mass:this.pos.x>this.mass+t&&(this.pos.x=-this.mass),this.pos.y<-this.mass?this.pos.y=i+this.mass:this.pos.y>this.mass+i&&(this.pos.y=-this.mass),this.a.x=0,this.a.y=0)}},{key:"draw",value:function(s){s.fillStyle=this.color,s.beginPath(),s.arc(this.pos.x,this.pos.y,this.mass,0,2*Math.PI),s.fill(),s.closePath()}}]),i}();exports.default=i;
},{}],"Y/Oq":[function(require,module,exports) {
"use strict";function t(t,r){var e=t.x-r.x,x=t.x-r.y;return Math.sqrt(e*e+x*x)}function r(t,r){return{x:r.x-t.x,y:r.y-t.y}}function e(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function x(t){return{x:-t.x,y:-t.y}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.dist=t,exports.vdist=r,exports.abs=e,exports.op=x;
},{}],"A2T1":[function(require,module,exports) {
"use strict";var t=function(){function t(t,i){for(var s=0;s<i.length;s++){var e=i[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(i,s,e){return s&&t(i.prototype,s),e&&t(i,e),i}}(),i=require("./cbody"),s=a(i),e=require("./util"),h=o(e);function o(t){if(t&&t.__esModule)return t;var i={};if(null!=t)for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s]);return i.default=t,i}function a(t){return t&&t.__esModule?t:{default:t}}function n(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var r=1e3,d=function(){function i(){n(this,i),this.canvas=document.querySelector("#canvas"),this.canvas.width=this.width=document.documentElement.scrollWidth,this.canvas.height=this.height=document.documentElement.scrollHeight,this.c=this.canvas.getContext("2d"),this.c.font='12px "Source Code Pro", monospace',this.trail=!0,this.resetBodies(),this.mouse={x:0,y:0,vx:0,vy:0,time:performance.now()},this.canvas.addEventListener("click",this.click.bind(this)),this.canvas.addEventListener("mousemove",this.mousemove.bind(this)),this.canvas.addEventListener("touchmove",this.mousemove.bind(this)),this.canvas.addEventListener("touchend",this.click.bind(this)),document.addEventListener("keyup",this.keyup.bind(this)),this.quadratic=1,this.dt=.1,this.fps={timer:0,counter:0,current:0},this.time=performance.now(),this._loop=this.loop.bind(this),window.requestAnimationFrame(this._loop),this.gui=new dat.GUI,this.fps.gui=this.gui.add(this,"FPS"),this.trailGui=this.gui.add(this,"trail"),this.static=!1,this.staticGui=this.gui.add(this,"static").onChange(this.toggleStatic.bind(this)),this.gui.add(this,"resetBodies")}return t(i,[{key:"resetBodies",value:function(){this.bodies=[new s.default({x:this.width/2,y:this.height/2},{x:0,y:0},10,"white")],this.static=!1,this.staticGui&&this.staticGui.updateDisplay()}},{key:"loop",value:function(t){var i=(t-this.time)/1e3;this.time=t,this.c.fillStyle=this.trail?"rgba(0,0,0,.1)":"rgba(0,0,0,1)",this.c.fillRect(0,0,this.width,this.height),this.fps.timer+=i,this.fps.counter++,this.fps.timer>=1&&(this.fps.current=this.fps.counter,this.fps.counter=0,this.fps.timer=0,this.fps.gui.updateDisplay());for(var s=this.bodies.length,e=0;e<s;e++)if(this.bodies[e].dead)this.bodies.splice(e,1),e--,s--;else{this.bodies[e].update(i,this.width,this.height),this.bodies[e].draw(this.c);for(var o=e+1;o<s;o++)if(!this.bodies[o].dead){var a=h.vdist(this.bodies[e].pos,this.bodies[o].pos),n=h.abs(a),d=(this.quadratic?500*r:r)*this.bodies[e].mass*this.bodies[o].mass/Math.pow(n,this.quadratic+2),u={x:a.x*d,y:a.y*d};if(this.bodies[e].applyForce(u),this.bodies[o].applyForce(h.op(u)),n<this.bodies[e].mass+this.bodies[o].mass){var c=void 0,l=void 0;this.bodies[e].mass>this.bodies[o].mass?(c=this.bodies[e],l=this.bodies[o]):(c=this.bodies[o],l=this.bodies[e]),c.mass+=l.mass,l.dead=!0}}}window.requestAnimationFrame(this._loop)}},{key:"mousemove",value:function(t){var i=performance.now(),s=(i-this.mouse.time)/1e3;this.mouse.vx=(t.clientX-this.mouse.x)/s,this.mouse.vy=(t.clientY-this.mouse.y)/s,this.mouse.time=i,this.mouse.x=t.clientX,this.mouse.y=t.clientY}},{key:"click",value:function(t){var i=void 0;i=performance.now()-this.mouse.time>150?{x:0,y:0}:{x:this.mouse.vx,y:this.mouse.vy},this.bodies.push(new s.default({x:t.clientX,y:t.clientY},i,4,"hsl("+360*Math.random()+", 80%, 75%)"))}},{key:"toggleStatic",value:function(t){this.bodies[0].pos={x:this.width/2,y:this.height/2},this.bodies[0].vel={x:0,y:0},this.bodies[0].a={x:0,y:0},this.bodies[0].static=void 0!==t?t:!this.bodies[0].static,this.static=this.bodies[0].static}},{key:"keyup",value:function(t){"r"===t.key?this.resetBodies():"s"===t.key?(this.toggleStatic(),this.staticGui.updateDisplay()):"t"===t.key?(this.trail=!this.trail,this.trailGui.updateDisplay()):"q"===t.key&&(this.quadratic=1-this.quadratic)}},{key:"FPS",get:function(){return this.fps.current}}]),i}();window.app=new d;
},{"./cbody":"Tt2/","./util":"Y/Oq"}]},{},["A2T1"], null)
//# sourceMappingURL=/app.93cc2da7.map