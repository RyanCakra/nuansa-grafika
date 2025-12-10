import React, { useEffect, useRef } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

class Particle {
  constructor(width, height) {
    this.reset(width, height);
  }

  reset(width, height) {
    this.x = rand(0, width);
    this.y = rand(0, height);

    this.size = rand(1, 3); // small particle
    this.opacity = 0;

    this.life = rand(3000, 7000);
    this.birth = performance.now();

    // random movement velocity
    this.vx = rand(-0.25, 0.25);
    this.vy = rand(-0.25, 0.25);
  }

  update(width, height) {
    const age = performance.now() - this.birth;

    // Fade logic
    const fade = this.life * 0.25;
    if (age < fade) {
      this.opacity = age / fade;
    } else if (age > this.life - fade) {
      this.opacity = (this.life - age) / fade;
    } else {
      this.opacity = 1;
    }

    // Movement
    this.x += this.vx;
    this.y += this.vy;

    // bounce lightly at edges
    if (this.x <= 0 || this.x >= width) this.vx *= -1;
    if (this.y <= 0 || this.y >= height) this.vy *= -1;

    if (age > this.life) this.reset(width, height);
  }
}

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 15; // small but alive particles
    let particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(width, height));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(width, height);

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = 'rgb(251, 191, 36)'; // amber-400
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(width, height));
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
