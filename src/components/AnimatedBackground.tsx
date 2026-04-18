import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface AnimatedBackgroundProps {
  opacity?: number;
  subtle?: boolean;
}

export const AnimatedBackground = ({
  opacity = 1,
  subtle = false,
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create nodes
    const nodeCount = subtle ? 8 : 15;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (subtle ? 0.2 : 0.5),
        vy: (Math.random() - 0.5) * (subtle ? 0.2 : 0.5),
        radius: subtle ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 2,
      });
    }

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      opacity: number,
    ) => {
      const lineOpacity = subtle ? opacity * 0.3 : opacity;
      ctx.strokeStyle = `rgba(0, 255, 255, ${lineOpacity})`;
      ctx.lineWidth = subtle ? 0.5 : 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const drawNode = (x: number, y: number, radius: number) => {
      const nodeOpacity = subtle ? 0.4 : 1;
      ctx.fillStyle = `rgba(0, 255, 255, ${nodeOpacity})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Glow effect
      ctx.strokeStyle = `rgba(0, 255, 255, ${subtle ? 0.2 : 0.5})`;
      ctx.lineWidth = subtle ? 0.8 : 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius + (subtle ? 2 : 4), 0, Math.PI * 2);
      ctx.stroke();
    };

    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x - node.radius < 0 || node.x + node.radius > canvas.width) {
          node.vx *= -1;
          node.x = Math.max(
            node.radius,
            Math.min(canvas.width - node.radius, node.x),
          );
        }
        if (node.y - node.radius < 0 || node.y + node.radius > canvas.height) {
          node.vy *= -1;
          node.y = Math.max(
            node.radius,
            Math.min(canvas.height - node.radius, node.y),
          );
        }

        // Draw connections to nearby nodes
        nodes.forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.6;
            drawLine(node.x, node.y, otherNode.x, otherNode.y, opacity);
          }
        });

        // Draw node
        drawNode(node.x, node.y, node.radius);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ opacity, zIndex: 0 }}
    />
  );
};
