import React, { useEffect, useRef } from 'react';
const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  // --- Animation logic ---
  useEffect(() => {
    const COLORS = [
      '#c084fc', // Bright Neon Violet
      '#a259ff', // Vibrant Violet
      '#6d28d9', // Deep Purple
      '#000014', // Deeper Black
    ];
    const NUM_WAVES = 4;
    const AMPLITUDES = [90, 70, 110, 60];
    const SPEEDS = [0.5, 0.3, 0.18, 0.12];
    const OFFSETS = [0, Math.PI / 2, Math.PI, Math.PI / 4];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function drawWaves(time) {
      ctx.clearRect(0, 0, width, height);
      // Black-violet gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, COLORS[3]); // black
      grad.addColorStop(0.3, COLORS[2]); // deep purple
      grad.addColorStop(0.65, COLORS[1]); // vibrant violet
      grad.addColorStop(1, COLORS[0]); // neon violet
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      // Draw animated flowing violet waves
      for (let i = 0; i < NUM_WAVES; i++) {
        ctx.save();
        ctx.globalAlpha = 0.28 + 0.15 * i;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 1.5) {
          const y =
            height / 2 +
            Math.sin(
              (x / width) * Math.PI * 2 * (1.1 + i * 0.18) +
                time * SPEEDS[i] +
                OFFSETS[i]
            ) * AMPLITUDES[i] * (0.7 + 0.3 * Math.sin(time * 0.2 + i));
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        // Use a gradient fill for each wave for more depth
        const waveGrad = ctx.createLinearGradient(0, height / 2, width, height);
        waveGrad.addColorStop(0, COLORS[i]);
        waveGrad.addColorStop(1, COLORS[(i + 1) % COLORS.length]);
        ctx.fillStyle = waveGrad;
        ctx.shadowColor = COLORS[i];
        ctx.shadowBlur = 64;
        ctx.fill();
        ctx.restore();
      }
    }

    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const time = (ts - start) / 600;
      drawWaves(time);
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      {/* Subtle glass overlay for depth */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,0,40,0.10)',
          backdropFilter: 'blur(10px) saturate(140%)',
          WebkitBackdropFilter: 'blur(10px) saturate(140%)',
          borderRadius: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
