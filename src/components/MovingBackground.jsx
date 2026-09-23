import { useEffect, useRef, useState } from "react";

export default function MovingBackground() {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState("cosmic"); // cosmic, fire, thunder, verdant

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, active: false };
    const sparkTrails = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Add colorful cursor spark trails
      if (sparkTrails.length < 35) {
        sparkTrails.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3.5 + 1.5,
          life: 1,
          hue: (Date.now() / 8 + Math.random() * 40) % 360,
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Glowing Multicolored Energy Orbs
    class EnergyOrb {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 3 + 1.2;
        this.speedY = -(Math.random() * 0.7 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.8;
        // Multicolored rich hues: Red, Cyan, Yellow, Violet, Green, Pink
        const palette = [0, 45, 145, 185, 270, 320];
        this.hue = palette[Math.floor(Math.random() * palette.length)];
        this.alpha = Math.random() * 0.6 + 0.3;
        this.maxAlpha = this.alpha;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.03 + Math.random() * 0.03;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulse += this.pulseSpeed;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            this.x -= (dx / dist) * force * 2;
            this.y -= (dy / dist) * force * 2;
          }
        }

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        const currentAlpha = Math.max(0.15, this.maxAlpha * (0.65 + 0.35 * Math.sin(this.pulse)));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 95%, 65%, ${currentAlpha})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, ${currentAlpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Floating Translucent Pokéballs & Greatballs
    class FloatingBall {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 70;
        this.radius = Math.random() * 26 + 18;
        this.speedY = -(Math.random() * 0.4 + 0.15);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.012;
        this.opacity = Math.random() * 0.12 + 0.05;
        this.type = Math.random() > 0.4 ? "poke" : "great"; // red or blue/cyan
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

        // Outer glow circle
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 1.8})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Top half with glowing gradient
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, Math.PI, 0);
        ctx.closePath();
        ctx.fillStyle =
          this.type === "poke"
            ? `rgba(239, 68, 68, ${this.opacity * 1.2})`
            : `rgba(6, 182, 212, ${this.opacity * 1.2})`;
        ctx.fill();

        // Center seam line
        ctx.beginPath();
        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.stroke();

        // Center button outer
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 15, 30, ${this.opacity * 2.5})`;
        ctx.fill();
        ctx.stroke();

        // Center button inner LED
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.13, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 3})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffffff";
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      }
    }

    const orbCount = Math.min(80, Math.floor((width * height) / 14000));
    const ballCount = Math.min(12, Math.floor(width / 130));

    const orbs = Array.from({ length: orbCount }, () => new EnergyOrb());
    const balls = Array.from({ length: ballCount }, () => new FloatingBall());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating Pokeballs
      for (const b of balls) {
        b.update();
        b.draw();
      }

      // Render glowing energy orbs
      for (const o of orbs) {
        o.update();
        o.draw();
      }

      // Render interactive mouse spark trails
      for (let i = sparkTrails.length - 1; i >= 0; i--) {
        const s = sparkTrails[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.025;

        if (s.life <= 0) {
          sparkTrails.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, 70%, ${s.life * 0.8})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 70%, ${s.life})`;
        ctx.fill();
        ctx.shadowBlur = 0;
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
    <div className={`moving-background-container theme-${theme}`} aria-hidden="true">
      <div className="ambient-gradient-mesh" />
      <canvas ref={canvasRef} className="moving-background-canvas" />

      {/* Floating Theme Switcher Badge */}
      <div className="bg-theme-control" aria-label="Change Background Theme" style={{ pointerEvents: "auto" }}>
        <button
          type="button"
          className={`theme-dot ${theme === "cosmic" ? "active" : ""}`}
          onClick={() => setTheme("cosmic")}
          title="Cosmic Aurora"
        >
          🌌
        </button>
        <button
          type="button"
          className={`theme-dot ${theme === "fire" ? "active" : ""}`}
          onClick={() => setTheme("fire")}
          title="Blazing Inferno"
        >
          🔥
        </button>
        <button
          type="button"
          className={`theme-dot ${theme === "thunder" ? "active" : ""}`}
          onClick={() => setTheme("thunder")}
          title="Electric Voltage"
        >
          ⚡
        </button>
        <button
          type="button"
          className={`theme-dot ${theme === "verdant" ? "active" : ""}`}
          onClick={() => setTheme("verdant")}
          title="Verdant Wilds"
        >
          🌿
        </button>
      </div>
    </div>
  );
}
