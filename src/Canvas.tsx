import React, { MouseEvent, useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface CanvasElements {
  points: Point[];
  lines: Line[];
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);

  function draw(x?: number, y?: number) {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("canvas is null");
      return;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();

    ctx.fillStyle = "#000";
    if (startPoint && x && y) {
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.stroke();
    }
    ctx.stroke();
  }
  function mouseDown(event: MouseEvent<HTMLCanvasElement>) {
    setStartPoint({ x: event.clientX, y: event.clientY });
  }
  function drag(event: MouseEvent<HTMLCanvasElement>) {
    isDragging && draw(event.clientX, event.clientY);
  }

  useEffect(() => draw());

  return (
    <canvas
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={drag}
    ></canvas>
  );
}
