import CBody from "./cbody"
import * as _ from "./util"

//-- Some constants --//
let G = 1000; // Yay! Made up values!

class System {
  constructor() {
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

  resetBodies() {
    this.bodies = [
      new CBody(
        { x: this.width/2.0, y: this.height/2.0 },
        { x:0, y:0 },
        10,
        'white'
      )
    ];
  }

  loop(time) {
    //-- Update timer stuff --//
    let dt = (time - this.time)/1000.0;  
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
    let blen = this.bodies.length;  // Slight optimizations! Hurray!
    for (let i = 0; i < blen; i++) {
      // Remove the 'dead' body (damn) and continue the loop like nothing happened
      if (this.bodies[i].dead) { this.bodies.splice(i, 1); i--; blen--; continue; }
      
      // Update 'em & draw 'em
      this.bodies[i].update(dt, this.width, this.height);
      this.bodies[i].draw(this.c);
      
      // Interactions between bodies
      for (let j = i+1; j < blen; j++) {
        if (this.bodies[j].dead) { continue; }

        // Calculate distance. Both vectorial and scalar
        let d = _.vdist(this.bodies[i].pos, this.bodies[j].pos);
        let dabs = _.abs(d);
        
        // Gravitational force
        let Fabs = ((this.quadratic ? 500*G : G) * this.bodies[i].mass * this.bodies[j].mass) / Math.pow(dabs, this.quadratic+2);
        let F = { x: d.x*Fabs, y: d.y*Fabs };
        this.bodies[i].applyForce(F);
        this.bodies[j].applyForce(_.op(F));
        
        // Collision
        if (dabs < this.bodies[i].mass + this.bodies[j].mass) {
          // Choose which body is the bigger and which is the smaller one
          let big, small;
          if (this.bodies[i].mass > this.bodies[j].mass) { big = this.bodies[i]; small = this.bodies[j]; }
          else { big = this.bodies[j]; small = this.bodies[i]; }
          
          // The big one 'absorbs' the small's mass, whilst the small one dies a horrible death
          big.mass += small.mass;
          small.dead = true;
        }
      }
    }

    window.requestAnimationFrame(this._loop);
  }

  mousemove(e) {
    let now = performance.now();
    let dt = (now - this.mouse.time) / 1000.0;

    this.mouse.vx = (e.clientX - this.mouse.x) / dt;
    this.mouse.vy = (e.clientY - this.mouse.y) / dt;

    this.mouse.time = now;
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  click(e) {
    let v;
    if (performance.now() - this.mouse.time > 150) { // More than 150 ms have passed since the last mousemove
      v = { x: 0, y: 0 };
    } else {
      v = { x: this.mouse.vx, y: this.mouse.vy };
    }

    this.bodies.push(new CBody(
      { x: e.clientX, y: e.clientY },
      v, 
      4,
      `hsl(${Math.random()*360}, 80%, 75%)`
    ));
  }

  keyup(e) {
    if (e.key === 'r') {
      this.resetBodies();
    } else if (e.key === 's') {
      this.bodies[0].pos = { x: this.width/2.0, y: this.height/2.0 };
      this.bodies[0].vel = { x: 0, y: 0 };
      this.bodies[0].a = { x: 0, y: 0 };
      this.bodies[0].static = !this.bodies[0].static;
    } else if (e.key === 't') {
      this.trail = !this.trail; 
    } else if (e.key === 'q') {
      this.quadratic = 1 - this.quadratic;
    }
  }

}

window.app = new System();

