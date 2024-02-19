class Column {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.queue = [];
    this.color = {
      r: 150,
      g: 150,
      b: 150,
    };
  }
  // function to move to swapped location
  moveTo(loc, yOffset = 1, frameCount = 20) {
    for (let i = 1; i < frameCount; i++) {
      const t = i / frameCount;
      const u = Math.sin(t * Math.PI);

      this.queue.push({
        x: lerp(this.x, loc.x, t),
        y: lerp(this.y, loc.y, t) + ((u * this.width) / 2) * yOffset,

        r: lerp(150, 255, u),
        g: lerp(150, 0, u),
        b: lerp(150, 0, u),
      });
    }
  }
  //jump methord
  jump(frameCount = 20) {
    for (let i = 1; i <= frameCount; i++) {
      const t = i / frameCount;
      const u = Math.sin(t * Math.PI);

      this.queue.push({
        x: this.x,
        y: this.y - u * this.width,

        r: lerp(150, 0, u),
        g: lerp(150, 0, u),
        b: lerp(150, 0, u),
      });
    }
  }
  //draw methord
  draw(ctx) {
    let changed = false;
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    const { r, g, b } = this.color;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    if (this.queue.length > 0) {
      const { x, y, r, g, b } = this.queue.shift();
      this.x = x;
      this.y = y;
      this.color = { r, b, g };
      changed = true;
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

const lerp = (a, b, t) => {
  return a + (b - a) * t;
};
