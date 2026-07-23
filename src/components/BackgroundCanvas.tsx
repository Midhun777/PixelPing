import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  isDark: boolean;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for gravitational cursor attraction
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Space Color Palette
    const colors = isDark
      ? ['#818CF8', '#38BDF8', '#34D399', '#F43F5E', '#A78BFA', '#FBBF24']
      : ['#6366F1', '#0EA5E9', '#10B981', '#F43F5E', '#8B5CF6', '#F59E0B'];

    // Generate Cosmic Stardust Particles
    const particleCount = Math.min(Math.floor((width * height) / 10000), 120);
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      };
    });

    // Shooting star setup
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      alpha: 0,
      active: false,
    };

    const triggerShootingStar = () => {
      if (shootingStar.active) return;
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 12 + 10,
        angle: Math.PI / 4, // 45 degree angle trajectory
        alpha: 1,
        active: true,
      };
    };

    let time = 0;
    let shootingStarTimer = 0;

    const render = () => {
      time += 0.008;
      shootingStarTimer++;

      if (shootingStarTimer > 350 && Math.random() < 0.03) {
        triggerShootingStar();
        shootingStarTimer = 0;
      }

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Space Nebula Orbs
      const neb1X = width * 0.25 + Math.sin(time * 0.5) * 60;
      const neb1Y = height * 0.3 + Math.cos(time * 0.4) * 50;
      const neb1 = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, width * 0.35);
      neb1.addColorStop(0, isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)');
      neb1.addColorStop(1, 'transparent');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      const neb2X = width * 0.75 + Math.cos(time * 0.6) * 70;
      const neb2Y = height * 0.7 + Math.sin(time * 0.5) * 60;
      const neb2 = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, width * 0.38);
      neb2.addColorStop(0, isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.06)');
      neb2.addColorStop(1, 'transparent');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // 2. Gravitational Mouse Glow Orb
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        mouseGlow.addColorStop(0, isDark ? 'rgba(129, 140, 248, 0.25)' : 'rgba(99, 102, 241, 0.15)');
        mouseGlow.addColorStop(0.5, isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(56, 189, 248, 0.05)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Render Particles & Gravitational Cursor Attraction Physics
      const pullRadius = 220; // Radius within which cursor attracts particles

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base drifting movement
        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary wrap-around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Calculate Gravitational Pull towards Mouse Cursor
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < pullRadius) {
            const force = (1 - dist / pullRadius) * 1.5; // Stronger attraction closer to cursor
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 2.2;
            p.y += Math.sin(angle) * force * 2.2;

            // Draw glowing constellation connection lines to mouse
            if (dist < 130) {
              const lineAlpha = (1 - dist / 130) * 0.4;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth = 0.8;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }

        // Particle Twinkle Pulse
        const currentAlpha = Math.max(0.1, Math.min(1, p.alpha + Math.sin(time * 10 * p.pulseSpeed) * 0.25));

        // Render Particle Star
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Inter-particle constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            const lineAlpha = (1 - dist / 80) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(99, 102, 241, 0.15)';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // 4. Render Shooting Star Streak
      if (shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;

        if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        } else {
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

          const starGrad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            tailX,
            tailY
          );
          starGrad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
          starGrad.addColorStop(0.3, `rgba(129, 140, 248, ${shootingStar.alpha * 0.8})`);
          starGrad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = starGrad;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
};
