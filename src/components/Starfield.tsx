'use client';
import { useEffect, useRef } from 'react';

interface StarfieldProps {
  density?: number;
  goldStars?: number;
}

export default function Starfield({ density = 8000, goldStars = 8 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Array<{ x: number; y: number; r: number; op: number; speed: number; phase: number }> = [];
    let gold: Array<{ x: number; y: number; r: number; speed: number; phase: number }> = [];
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      stars = [];
      gold = [];
      const count = Math.floor((canvas.width * canvas.height) / density);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.3,
          op: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.018 + 0.003,
          phase: Math.random() * Math.PI * 2,
        });
      }
      for (let i = 0; i < goldStars; i++) {
        gold.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          r: Math.random() * 1.5 + 1.2,
          speed: Math.random() * 0.015 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;

      for (const s of stars) {
        const op = s.op * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${op})`;
        ctx.fill();
      }

      for (const s of gold) {
        const op = 0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase);
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
        grad.addColorStop(0, `rgba(201, 168, 100, ${op * 0.9})`);
        grad.addColorStop(0.3, `rgba(201, 168, 100, ${op * 0.3})`);
        grad.addColorStop(1, 'rgba(201, 168, 100, 0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 201, 136, ${op})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density, goldStars]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none' }}
    />
  );
}
