import React, { MouseEvent, useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineCap = "round";
    ctx.lineTo(this.x2, this.y2);
    ctx.closePath();
    ctx.stroke();
  }

  length() {
    return Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2);
  }
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scale = window.devicePixelRatio;
  const [lines, setLines] = useState<Line[]>([]);
  const [newLine, setNewLine] = useState<Line | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  function getMouseX(event: MouseEvent) {
    return event.clientX / scale;
  }
  function getMouseY(event: MouseEvent) {
    return event.clientY / scale;
  }

  function getContext() {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("canvas is null");
      return;
    }
    const newCtx = canvas.getContext("2d");
    newCtx?.scale(scale, scale);
    setCtx(newCtx);
  }

  function draw() {
    if (!ctx) {
      getContext();
    }
    if (!ctx) {
      console.log("unable to get context");
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    for (let line of lines) {
      line.draw(ctx);
    }
    if (newLine) {
      newLine.draw(ctx);
    }
    return;
  }
  function mouseDown(event: MouseEvent) {
    console.log("mouse down");
    const x = getMouseX(event);
    const y = getMouseY(event);
    setNewLine(new Line(x, y, x, y));
  }
  function mouseMove(event: MouseEvent) {
    console.log("mouse move");
    if (newLine) {
      const x = getMouseX(event);
      const y = getMouseY(event);
      setNewLine(new Line(newLine.x1, newLine.y1, x, y));
    }
  }
  function mouseUp() {
    console.log(newLine);
    if (newLine && newLine.length() > 15) {
      setLines([...lines, newLine]);
      console.log("lines", lines);
    }
    setNewLine(null);
  }

  useEffect(() => {
    draw();
  }, [newLine]);

  return (
    <canvas
      className="h-full w-full"
      ref={canvasRef}
      height={window.innerHeight * scale}
      width={window.innerWidth * scale}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
    ></canvas>
  );
}
