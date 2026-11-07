import React, { useEffect, useRef } from 'react';

interface Star {
  relX: number;
  relY: number;
  radius: number;
  baseAlpha: number;
  twinkle: number;
}

export const SparkleStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate calm fixed stars
    const STAR_COUNT = Math.min(280, Math.max(160, Math.floor((width * height) / 4500)));
    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        relX: Math.random(),
        relY: Math.random(),
        radius: 0.6 + Math.random() * 0.75, // 0.6px to 1.35px
        baseAlpha: 0.15 + Math.random() * 0.25, // Calm resting alpha 0.15 - 0.40
        twinkle: 0,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointer = (clientX: number, clientY: number) => {
      const TRIGGER_RADIUS = 90;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const sx = s.relX * width;
        const sy = s.relY * height;
        const dx = clientX - sx;
        const dy = clientY - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < TRIGGER_RADIUS) {
          const power = Math.pow(1 - dist / TRIGGER_RADIUS, 1.8);
          if (power > s.twinkle) {
            s.twinkle = Math.min(1, power);
          }
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (s.twinkle > 0.005) {
          s.twinkle *= 0.94; // Smoothly settles back
        } else {
          s.twinkle = 0;
        }

        const alpha = Math.min(0.95, s.baseAlpha + s.twinkle * (0.85 - s.baseAlpha));
        const sx = s.relX * width;
        const sy = s.relY * height;

        ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, s.radius + s.twinkle * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Subtle micro-sparkle cross only when twinkling brightly
        if (s.twinkle > 0.45 && s.radius > 0.9) {
          ctx.strokeStyle = `rgba(241, 245, 249, ${(s.twinkle * 0.7).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          const crossLen = 2 + s.twinkle * 2.5;

          ctx.beginPath();
          ctx.moveTo(sx - crossLen, sy);
          ctx.lineTo(sx + crossLen, sy);
          ctx.moveTo(sx, sy - crossLen);
          ctx.lineTo(sx, sy + crossLen);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: '#000000' }}
      aria-hidden="true"
    />
  );
};
