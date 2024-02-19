function lerp(a, b, t) {
  return a + (b - a) * t;
}

class Column {
  
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.queue = [];
  }
  moveTo(loc, frameCount = 20) {
    for (let i = 1; i < frameCount; i++) {
      const t = i / frameCount;
      this.queue.push({
        x: lerp(this.x, loc.x, t),
        y: lerp(this.y, loc.y, t),
      });
    }
  }
  draw(ctx) {
    let changed=false;
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    ctx.fillStyle = "rgb(150,150,150)";
    if (this.queue.length > 0) {
      const { x, y } = this.queue.shift();
      this.x = x;
      this.y = y;
      changed=true;
    }

    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left, this.y);
    ctx.ellipse(
      this.x,
      this.y,
      this.width / 2,
      this.width / 4,
      0,
      Math.PI,
      Math.PI * 2,
      true
    );
    ctx.lineTo(right, top);
    ctx.ellipse(
      this.x,
      top,
      this.width / 2,
      this.width / 4,
      0,
      0,
      Math.PI * 2,
      true
    );
    ctx.fill();
    ctx.stroke();
    return changed;
  }
}
