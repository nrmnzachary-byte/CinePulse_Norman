import { useEffect, useRef } from "react";

export default function MovingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle types: Glowing Orbs, Stardust, and Floating Pokeball Silhouettes
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 2.5 + 1;
        this.speedY = -(Math.random() * 0.6 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.hue = [340, 200, 260, 45, 160][Math.floor(Math.random() * 5)];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.maxAlpha = this.alpha;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulse += this.pulseSpeed;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        const currentAlpha = Math.max(0.1, this.maxAlpha * (0.7 + 0.3 * Math.sin(this.pulse)));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${currentAlpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, ${currentAlpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Floating translucent Pokeballs
    class PokeballFloat {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 60;
        this.radius = Math.random() * 28 + 18;
        this.speedY = -(Math.random() * 0.35 + 0.15);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.008;
        this.opacity = Math.random() * 0.09 + 0.03;
      }

      update() {
        this.y += this.speedY;
        this.rotation += this.rotSpeed;

        if (this.y < -this.radius * 2) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineWidth = 2.5;

        // Outer circle
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 1.8})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Top semi-circle tint
        ctx.fillStyle = `rgba(239, 68, 68, ${this.opacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, Math.PI, 0);
        ctx.closePath();
        ctx.fill();

        // Center line
        ctx.beginPath();
        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.stroke();

        // Outer button
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${this.opacity * 2})`;
        ctx.fill();
        ctx.stroke();

        // Inner button
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 2.2})`;
        ctx.fill();

        ctx.restore();
      }
    }

    const particleCount = Math.min(65, Math.floor((width * height) / 16000));
    const pokeballCount = Math.min(10, Math.floor(width / 150));

    const particles = Array.from({ length: particleCount }, () => new Particle());
    const pokeballs = Array.from({ length: pokeballCount }, () => new PokeballFloat());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint floating Pokeballs
      for (const ball of pokeballs) {
        ball.update();
        ball.draw();
      }

      // Draw stardust energy particles
      for (const p of particles) {
        p.update();
        p.draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="moving-background-container" aria-hidden="true">
      <div className="ambient-gradient-mesh" />
      <canvas ref={canvasRef} className="moving-background-canvas" />
    </div>
  );
}
