// components/GravityMouseEffect.jsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./GravityMouseEffect.module.css";

const GravityMouseEffect = () => {
  const canvasRef = useRef(null);
  const mouseVisualizerRef = useRef(null);
  const gravityFlashRef = useRef(null);

  // Configuration
  const CONFIG = {
    MAX_OBJECTS: 60,
    MAX_GRAVITY: 6.0,
    IDLE_THRESHOLD: 1.5,
    GRAVITY_INCREASE_RATE: 0.12,
    GRAVITY_DECREASE_RATE: 0.95,
    CREATE_ON_MOVE_CHANCE: 0.3, // Increased chance
    CREATE_ON_MOVE_MIN_SPEED: 2,
    VANISH_SPEED: 0.04,
    MOUSE_SMOOTHING: 0.18,
    PARTICLE_SPEED_MULTIPLIER: 1.4,
    ATTRACTION_STRENGTH: 0.6,
    CREATE_ON_IDLE_CHANCE: 0.04,
    VANISH_DISTANCE: 15, // Distance at which particles vanish
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const mouseVisualizer = mouseVisualizerRef.current;
    const gravityFlash = gravityFlashRef.current;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse state
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      smoothX: 0,
      smoothY: 0,
      lastMoveTime: Date.now(),
      idleStartTime: null,
      isIdle: false,
      idleTime: 0,
      gravity: 1.0,
      velocityX: 0,
      velocityY: 0,
      isMouseOverPage: true,
      hasFlashed: false,
      attractionPhase: 0,
      lastParticleCreateTime: 0,
    };

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x !== undefined ? x : Math.random() * canvas.width;
        this.y = y !== undefined ? y : Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedX =
          (Math.random() * 1 - 0.5) * CONFIG.PARTICLE_SPEED_MULTIPLIER;
        this.speedY =
          (Math.random() * 1 - 0.5) * CONFIG.PARTICLE_SPEED_MULTIPLIER;
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.6 + 0.3;
        this.isVanishing = false;
        this.vanishProgress = 0;
        this.attractionForce = 0;
        this.baseSpeed =
          (Math.random() * 0.01 + 0.006) * CONFIG.PARTICLE_SPEED_MULTIPLIER;
        this.orbitRadius = Math.random() * 60 + 30;
        this.orbitAngle = Math.random() * Math.PI * 2;
        this.orbitSpeed = Math.random() * 0.04 + 0.02;
        this.isOrbiting = false;
        this.creationTime = Date.now();
      }

      getRandomColor() {
        const colors = [
          "rgba(66, 220, 245, 0.85)",
          "rgba(245, 66, 152, 0.85)",
          "rgba(66, 245, 132, 0.85)",
          "rgba(245, 211, 66, 0.85)",
          "rgba(161, 66, 245, 0.85)",
          "rgba(66, 161, 245, 0.85)",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const dx = mouse.smoothX - this.x;
        const dy = mouse.smoothY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if particle should vanish when close to mouse
        if (distance < CONFIG.VANISH_DISTANCE && !this.isVanishing) {
          this.isVanishing = true;
        }

        // Natural floating
        this.speedX *= 0.96;
        this.speedY *= 0.96;

        // Organic movement
        const timeAlive = Date.now() - this.creationTime;
        this.speedX += Math.sin(timeAlive * 0.001 + this.x * 0.01) * 0.006;
        this.speedY += Math.cos(timeAlive * 0.001 + this.y * 0.01) * 0.006;

        // Different behavior based on attraction phase
        if (
          mouse.attractionPhase === 0 &&
          mouse.isIdle &&
          mouse.gravity > 1.2
        ) {
          // Phase 0: Normal orbiting around mouse
          if (!this.isOrbiting) {
            this.isOrbiting = true;
            this.orbitAngle = Math.atan2(dy, dx);
          }

          if (distance > this.orbitRadius * 1.5) {
            // Move toward orbit radius
            const targetX =
              mouse.smoothX + Math.cos(this.orbitAngle) * this.orbitRadius;
            const targetY =
              mouse.smoothY + Math.sin(this.orbitAngle) * this.orbitRadius;
            const tdx = targetX - this.x;
            const tdy = targetY - this.y;
            const tdist = Math.sqrt(tdx * tdx + tdy * tdy);

            if (tdist > 5) {
              const force =
                this.baseSpeed * Math.min(1, tdist / 80) * mouse.gravity * 0.4;
              this.speedX += (tdx / tdist) * force;
              this.speedY += (tdy / tdist) * force;
            }
          } else {
            // Continue orbiting
            this.orbitAngle += this.orbitSpeed * (mouse.gravity * 0.4);
            const targetX =
              mouse.smoothX + Math.cos(this.orbitAngle) * this.orbitRadius;
            const targetY =
              mouse.smoothY + Math.sin(this.orbitAngle) * this.orbitRadius;

            const orbitDx = targetX - this.x;
            const orbitDy = targetY - this.y;
            const orbitDist = Math.sqrt(orbitDx * orbitDx + orbitDy * orbitDy);

            if (orbitDist > 2) {
              this.speedX += (orbitDx / orbitDist) * 0.08;
              this.speedY += (orbitDy / orbitDist) * 0.08;
            }

            // Gradually reduce orbit radius as gravity increases
            this.orbitRadius = Math.max(15, 90 - (mouse.gravity - 1) * 12);
          }
        } else if (mouse.attractionPhase === 1) {
          // Phase 1: Strong attraction to mouse
          this.isOrbiting = false;
          this.attractionForce = Math.min(1, this.attractionForce + 0.04);

          if (distance > CONFIG.VANISH_DISTANCE * 0.7) {
            const gravityFactor = Math.min(1, (mouse.gravity - 1) / 3);
            const force =
              this.baseSpeed * this.attractionForce * gravityFactor * 1.0;
            this.speedX += (dx / distance) * force;
            this.speedY += (dy / distance) * force;
          }
        } else if (mouse.attractionPhase === 2) {
          // Phase 2: All particles strongly attracted
          this.isOrbiting = false;
          this.attractionForce = Math.min(1, this.attractionForce + 0.06);

          if (distance > CONFIG.VANISH_DISTANCE * 0.5) {
            const force = this.baseSpeed * this.attractionForce * 1.5;
            this.speedX += (dx / distance) * force;
            this.speedY += (dy / distance) * force;
          }
        }

        // Vanishing effect
        if (this.isVanishing) {
          this.vanishProgress += CONFIG.VANISH_SPEED;
          this.size *= 0.92;
          this.opacity *= 0.88;

          if (this.vanishProgress >= 1) {
            return false; // Remove particle
          }
        }

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Soft boundary with wrap-around
        const buffer = 25;
        if (this.x < -buffer) this.x = canvas.width + buffer;
        if (this.x > canvas.width + buffer) this.x = -buffer;
        if (this.y < -buffer) this.y = canvas.height + buffer;
        if (this.y > canvas.height + buffer) this.y = -buffer;

        return true;
      }

      draw() {
        if (this.opacity < 0.05) return;

        // Draw glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(
          "0.85",
          (this.opacity * 0.2).toString(),
        );
        ctx.fill();

        // Main particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace("0.85", this.opacity.toString());
        ctx.fill();

        // Inner highlight
        if (this.opacity > 0.4) {
          ctx.beginPath();
          ctx.arc(
            this.x - this.size * 0.1,
            this.y - this.size * 0.1,
            this.size * 0.5,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.7})`;
          ctx.fill();
        }
      }
    }

    // Particles array
    let particles = [];
    let animationId = null;
    let mouseMoveTimeout = null;
    let lastAllVanishTime = Date.now();
    let particleCreationCounter = 0;

    // Create particles
    const createParticles = (count, x, y) => {
      const now = Date.now();

      // Rate limiting: don't create too many particles at once
      if (now - mouse.lastParticleCreateTime < 50 && count > 3) return;

      for (let i = 0; i < count; i++) {
        if (particles.length < CONFIG.MAX_OBJECTS) {
          particles.push(new Particle(x, y));
        }
      }

      mouse.lastParticleCreateTime = now;
    };

    // Smooth mouse movement
    const smoothMouseMovement = () => {
      mouse.smoothX += (mouse.targetX - mouse.smoothX) * CONFIG.MOUSE_SMOOTHING;
      mouse.smoothY += (mouse.targetY - mouse.smoothY) * CONFIG.MOUSE_SMOOTHING;

      if (mouseVisualizer) {
        mouseVisualizer.style.left = mouse.smoothX + "px";
        mouseVisualizer.style.top = mouse.smoothY + "px";
      }
    };

    // Gravity flash effect
    const triggerGravityFlash = () => {
      if (!gravityFlash || mouse.hasFlashed) return;

      mouse.hasFlashed = true;
      gravityFlash.style.opacity = "0.8";
      gravityFlash.style.borderColor = "rgba(66, 220, 245, 0.8)";
      gravityFlash.style.boxShadow = "0 0 100px 50px rgba(66, 220, 245, 0.4)";

      setTimeout(() => {
        if (gravityFlash) {
          gravityFlash.style.opacity = "0";
        }
      }, 800);

      // Reset flash flag after delay
      setTimeout(() => {
        mouse.hasFlashed = false;
      }, 1500);
    };

    // Check if all particles are gone
    const checkAllVanished = () => {
      if (particles.length === 0) {
        triggerGravityFlash();
        lastAllVanishTime = Date.now();
        return true;
      }
      return false;
    };

    // Update attraction phases based on idle time and gravity
    const updateAttractionPhase = () => {
      if (!mouse.isIdle) {
        mouse.attractionPhase = 0;
        return;
      }

      if (mouse.gravity < 2.5) {
        mouse.attractionPhase = 0; // Normal orbiting
      } else if (mouse.gravity < 4.5) {
        mouse.attractionPhase = 1; // Strong attraction
      } else {
        mouse.attractionPhase = 2; // All particles strongly attracted
      }
    };

    // Handle mouse movement - FIXED PARTICLE CREATION
    const handleMouseMove = (e) => {
      if (!mouse.isMouseOverPage) return;

      const now = Date.now();
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      mouse.velocityX = mouse.targetX - mouse.x;
      mouse.velocityY = mouse.targetY - mouse.y;

      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;

      // Calculate movement speed
      const speed = Math.sqrt(
        mouse.velocityX * mouse.velocityX + mouse.velocityY * mouse.velocityY,
      );

      // Create particles on movement - FIXED LOGIC
      if (
        speed > CONFIG.CREATE_ON_MOVE_MIN_SPEED &&
        particles.length < CONFIG.MAX_OBJECTS
      ) {
        particleCreationCounter++;

        // Create particles more consistently
        if (particleCreationCounter % 2 === 0) {
          const createChance = Math.min(
            0.5,
            CONFIG.CREATE_ON_MOVE_CHANCE * (speed / 5),
          );

          if (Math.random() < createChance) {
            // Create particle slightly behind mouse for trail effect
            const offsetX = -mouse.velocityX * 0.4;
            const offsetY = -mouse.velocityY * 0.4;
            createParticles(1, mouse.x + offsetX, mouse.y + offsetY);
          }
        }
      }

      mouse.lastMoveTime = now;

      // Clear idle timeout
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }

      // Reset idle state
      if (mouse.isIdle) {
        mouse.isIdle = false;
        mouse.idleTime = 0;
        mouse.idleStartTime = null;
        mouse.attractionPhase = 0;
      }

      // Set idle detection timeout
      mouseMoveTimeout = setTimeout(() => {
        mouse.isIdle = true;
        mouse.idleStartTime = Date.now();
      }, CONFIG.IDLE_THRESHOLD * 1000);
    };

    // Handle mouse leave/enter
    const handleMouseEnter = () => {
      mouse.isMouseOverPage = true;
      if (mouseVisualizer) {
        mouseVisualizer.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      mouse.isMouseOverPage = false;
      if (mouseVisualizer) {
        mouseVisualizer.style.opacity = "0.2";
      }
    };

    // Animation loop
    const animate = () => {
      smoothMouseMovement();

      // Clear canvas with light fade
      ctx.fillStyle = "rgba(10, 14, 23, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update gravity when idle
      if (mouse.isIdle && mouse.idleStartTime && mouse.isMouseOverPage) {
        mouse.idleTime = (Date.now() - mouse.idleStartTime) / 1000;

        // Increase gravity
        if (mouse.gravity < CONFIG.MAX_GRAVITY) {
          mouse.gravity = Math.min(
            CONFIG.MAX_GRAVITY,
            1.0 + mouse.idleTime * CONFIG.GRAVITY_INCREASE_RATE,
          );
        }

        // Update attraction phase based on gravity
        updateAttractionPhase();

        // Update mouse visualizer
        if (mouseVisualizer) {
          const gravityRatio = (mouse.gravity - 1) / (CONFIG.MAX_GRAVITY - 1);
          const sizeIncrease = gravityRatio * 65;
          mouseVisualizer.style.width = `${32 + sizeIncrease}px`;
          mouseVisualizer.style.height = `${32 + sizeIncrease}px`;

          // Color changes based on attraction phase
          let color;
          if (mouse.attractionPhase === 0) {
            color = `rgba(52, 152, 219, ${0.6 + gravityRatio * 0.2})`; // Blue
          } else if (mouse.attractionPhase === 1) {
            color = `rgba(245, 152, 66, ${0.7 + gravityRatio * 0.2})`; // Orange
          } else {
            color = `rgba(245, 66, 66, ${0.8 + gravityRatio * 0.2})`; // Red
          }

          mouseVisualizer.style.backgroundColor = color;
          mouseVisualizer.style.boxShadow = `0 0 ${25 + gravityRatio * 40}px ${12 + gravityRatio * 25}px ${color.replace(")", ", 0.4)")}`;

          // Create particles occasionally when idle
          if (
            Math.random() < CONFIG.CREATE_ON_IDLE_CHANCE &&
            particles.length < CONFIG.MAX_OBJECTS &&
            mouse.attractionPhase < 2
          ) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 100;
            createParticles(
              1,
              mouse.smoothX + Math.cos(angle) * distance,
              mouse.smoothY + Math.sin(angle) * distance,
            );
          }
        }
      } else {
        // Decrease gravity when moving
        mouse.gravity = Math.max(
          1.0,
          mouse.gravity * CONFIG.GRAVITY_DECREASE_RATE,
        );
        mouse.attractionPhase = 0;

        // Update mouse visualizer
        if (mouseVisualizer && mouse.isMouseOverPage) {
          mouseVisualizer.style.width = "32px";
          mouseVisualizer.style.height = "32px";
          mouseVisualizer.style.backgroundColor = "rgba(52, 152, 219, 0.6)";
          mouseVisualizer.style.boxShadow =
            "0 0 25px 12px rgba(52, 152, 219, 0.3)";
        }
      }

      // Update and draw particles
      let vanishedThisFrame = false;
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        const isActive = particle.update();

        if (isActive) {
          particle.draw();
        } else {
          particles.splice(i, 1);
          vanishedThisFrame = true;
        }
      }

      // Draw attraction lines for strong attraction phases
      if (
        (mouse.attractionPhase === 1 || mouse.attractionPhase === 2) &&
        particles.length > 0
      ) {
        const lineCount = Math.min(20, Math.floor(particles.length * 0.4));

        for (let i = 0; i < lineCount; i++) {
          const idx = Math.floor(Math.random() * particles.length);
          const particle = particles[idx];

          const dx = mouse.smoothX - particle.x;
          const dy = mouse.smoothY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250 && particle.attractionForce > 0.1) {
            const lineOpacity = particle.attractionForce * 0.25;
            const lineWidth = particle.attractionForce * 2;

            ctx.strokeStyle =
              mouse.attractionPhase === 1
                ? `rgba(245, 152, 66, ${lineOpacity})`
                : `rgba(245, 66, 66, ${lineOpacity})`;

            ctx.lineWidth = lineWidth;
            ctx.beginPath();

            // Draw wavy/curved line for more natural look
            const midX = particle.x + dx * 0.3 + (Math.random() - 0.5) * 20;
            const midY = particle.y + dy * 0.3 + (Math.random() - 0.5) * 20;

            ctx.moveTo(particle.x, particle.y);
            ctx.quadraticCurveTo(midX, midY, mouse.smoothX, mouse.smoothY);
            ctx.stroke();
          }
        }
      }

      // Check if all particles vanished and flash if so
      if (vanishedThisFrame) {
        checkAllVanished();
      }

      // If all vanished and it's been a while, create new particles automatically
      if (particles.length === 0 && Date.now() - lastAllVanishTime > 1500) {
        createParticles(30);
      }

      // Maintain minimum particles when moving
      if (!mouse.isIdle && particles.length < 20 && Math.random() > 0.96) {
        createParticles(
          1,
          Math.random() * canvas.width,
          Math.random() * canvas.height,
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize with particles
    createParticles(40);

    // Event listeners
    const handleMouseMoveWrapper = (e) => handleMouseMove(e);
    document.addEventListener("mousemove", handleMouseMoveWrapper);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }
      document.removeEventListener("mousemove", handleMouseMoveWrapper);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <div className={styles.gravityFlash} ref={gravityFlashRef} />
      <div className={styles.mouseVisualizer} ref={mouseVisualizerRef} />
      <canvas ref={canvasRef} className={styles.gravityCanvas} />
    </>
  );
};

export default GravityMouseEffect;
