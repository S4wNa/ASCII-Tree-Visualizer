import React, { useRef, useEffect } from "react";

function Matrix({ children }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*(){}[]|\\:;\"'<>,.?/~`+-=_";
    const fontSize = 14;
    let canvasWidth, canvasHeight, columns;
    function initCanvas() {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      columns = Math.floor(canvasWidth / fontSize);

      dropRef.current = [];
      for (let i = 0; i < columns; i++) {
        dropRef.current[i] = Math.floor(
          (Math.random() * canvasHeight) / fontSize
        );
      }
    }

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = fontSize + "px monospace";
      ctx.fillStyle = "#00ff00";

      const drops = dropRef.current;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const char = chars[Math.floor(Math.random() * chars.length)];

        ctx.fillText(char, x, y);
        drops[i]++;

        if (drops[i] * fontSize > canvasHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    }
    function animate() {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    }
    initCanvas();
    window.addEventListener("resize", initCanvas);
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", initCanvas);
    };
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ background: "#000", zIndex: -1 }}
      />
      <div className="relative z-10">{children}</div>
    </>
  );
}

export default Matrix;
