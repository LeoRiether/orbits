export function dist(a, b) {
  let dx = a.x-b.x;
  let dy = a.x-b.y;
  return Math.sqrt(dx*dx + dy*dy);
}

export function vdist(a, b) {
  return { x: b.x-a.x, y: b.y-a.y };
}

export function abs(v) {
  return Math.sqrt(v.x*v.x + v.y*v.y);
}

export function op(v) {
  return { x: -v.x, y: -v.y };
}