/**
 * Stands for "Celestial Body"...
 */

export default class CBody {
  constructor(pos, vel, mass, color) {
    this.pos = pos;
    this.vel = vel;
    this.a = { x: 0, y: 0 };
    this.mass = mass;  // Mass == Radius
    this.color = color;
  }

  applyForce(F) {
    this.a.x += F.x;
    this.a.y += F.y;
  }

  update(dt, w, h) {
    if (this.static) return;

    this.vel.x += dt * this.a.x / this.mass;
    this.vel.y += dt * this.a.y / this.mass;

    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;

         if (this.pos.x < -this.mass)  this.pos.x = w + this.mass;
    else if (this.pos.x > this.mass+w) this.pos.x = -this.mass;
         if (this.pos.y < -this.mass)  this.pos.y = h + this.mass;
    else if (this.pos.y > this.mass+h) this.pos.y = -this.mass;

    this.a.x = 0; this.a.y = 0;
  }

  draw(c) {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.mass, 0, 2.0*Math.PI);
    c.fill();
    c.closePath();
  }
}