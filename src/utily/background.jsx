import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

// Destructure common Math utilities
const { cos, sin, PI } = Math;
const TAU = 2 * PI;
const rand = (max) => Math.random() * max;
const randIn = (min, max) => Math.random() * (max - min) + min;
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;
const fadeInOut = (t, m) => {
  let hm = 0.5 * m;
  return t < hm ? t / hm : 1 - (t - hm) / hm;
};

// Custom Float32Array extension to mirror original code behavior
Float32Array.prototype.get = function (i, n) {
  return this.slice(i, i + n);
};

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const bufferCanvas = document.createElement("canvas");
    const buffer = bufferCanvas.getContext("2d");

    const particleCount = 2000;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const noiseSteps = 6;

    let center = [0, 0];
    let spawnRadius = rand(150) + 150;
    let tick = 0;
    let noise3D = createNoise3D();
    let particleProps = new Float32Array(particlePropsLength);
    let animationFrameId;

    function resize() {
      bufferCanvas.width = window.innerWidth;
      bufferCanvas.height = window.innerHeight;
      buffer.drawImage(ctx.canvas, 0, 0);

      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      ctx.drawImage(bufferCanvas, 0, 0);

      center[0] = 0.5 * window.innerWidth;
      center[1] = 0.5 * window.innerHeight;
      spawnRadius = rand(150) + 150;
    }

    function initParticle(i) {
      let rd = rand(spawnRadius);
      let rt = rand(TAU);
      let cx = cos(rt);
      let sy = sin(rt);
      let x = center[0] + cx * rd;
      let y = center[1] + sy * rd;
      let rv = randIn(0.1, 1);
      let s = randIn(1, 8);
      let vx = rv * cx * 0.1;
      let vy = rv * sy * 0.1;
      let w = randIn(0.1, 2);
      let h = randIn(160, 260);
      let l = 0;
      let ttl = randIn(50, 200);

      particleProps.set([x, y, vx, vy, s, h, w, l, ttl], i);
    }

    function drawParticle(i) {
      let [x, y, vx, vy, s, h, w, l, ttl] = particleProps.get(
        i,
        particlePropCount,
      );

      let n = noise3D(x * 0.0025, y * 0.0025, tick * 0.0005) * TAU * noiseSteps;
      vx = lerp(vx, cos(n), 0.05);
      vy = lerp(vy, sin(n), 0.05);
      let dx = x + vx * s;
      let dy = y + vy * s;
      let dl = fadeInOut(l, ttl);
      let c = `hsla(${h},50%,60%,${dl})`;

      l++;

      buffer.save();
      buffer.lineWidth = dl * w + 1;
      buffer.strokeStyle = c;
      buffer.beginPath();
      buffer.moveTo(x, y);
      buffer.lineTo(dx, dy);
      buffer.stroke();
      buffer.closePath();
      buffer.restore();

      particleProps.set([dx, dy, vx, vy, s, h, w, l, ttl], i);

      const checkBounds =
        dx > bufferCanvas.width || dx < 0 || dy > bufferCanvas.height || dy < 0;
      if (checkBounds || l > ttl) initParticle(i);
    }

    function draw() {
      tick++;
      buffer.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);

      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        drawParticle(i);
      }

      ctx.save();
      ctx.filter = "blur(8px)";
      ctx.globalCompositeOperation = "lighten";
      ctx.drawImage(bufferCanvas, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(bufferCanvas, 0, 0);
      ctx.restore();

      animationFrameId = window.requestAnimationFrame(draw);
    }

    // Initialize layout and properties
    resize();
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "black",
      }}
    />
  );
}
