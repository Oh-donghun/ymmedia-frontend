'use client';
import { useEffect, useRef } from 'react';

export default function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; life: number; decay: number; drift: number;
    }> = [];
    let raf = 0;

    const spawn = () => {
      particles.push({
        x: W / 2 + (Math.random() - 0.5) * 16,
        y: H - 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.6 + 0.5),
        r: Math.random() * 14 + 8,
        life: 1,
        decay: Math.random() * 0.004 + 0.002,
        drift: (Math.random() - 0.5) * 0.02,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      if (particles.length < 60 && Math.random() < 0.4) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vx += p.drift; p.vy *= 0.995;
        p.r += 0.3; p.life -= p.decay;

        if (p.life <= 0 || p.y < 30) {
          particles.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const op = p.life * 0.18;
        grad.addColorStop(0, `rgba(245, 240, 232, ${op})`);
        grad.addColorStop(0.4, `rgba(201, 168, 100, ${op * 0.5})`);
        grad.addColorStop(1, 'rgba(245, 240, 232, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={380}
      style={{
        position: 'absolute',
        top: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 320,
        height: 380,
        zIndex: 5,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  );
}
