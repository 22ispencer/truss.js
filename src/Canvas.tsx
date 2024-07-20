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
function createLine(x1: number, y1: number, x2: number, y2: number) {
  return { x1, y1, x2, y2 };
}
function drawLine(line: Line, ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(line.x1, line.y1);
  ctx.lineCap = "round";
  ctx.lineTo(line.x2, line.y2);
  ctx.closePath();
  ctx.stroke();
}

interface CanvasProps {
  width: number;
  height: number;
}

export default function Canvas({
  width = window.innerWidth,
  height = window.innerHeight,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowScale = window.devicePixelRatio;
  const [lines, setLines] = useState<Line[]>([]);
  const [newLine, setNewLine] = useState<Line | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  function getMouseX(event: MouseEvent) {
    const offset = ctx?.canvas.getBoundingClientRect().left ?? 0;
    return (event.clientX - offset) / windowScale;
  }
  function getMouseY(event: MouseEvent) {
    const offset = ctx?.canvas.getBoundingClientRect().top ?? 0;
    return (event.clientY - offset) / windowScale;
  }

  function getContext() {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("canvas is null");
      return;
    }
    const newCtx = canvas.getContext("2d");
    newCtx?.scale(windowScale, windowScale);
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
      drawLine(line, ctx);
    }
    if (newLine) {
      drawLine(newLine, ctx);
    }
    return;
  }
  function mouseDown(event: MouseEvent) {
    console.log("mouse down");
    const x = getMouseX(event);
    const y = getMouseY(event);
    setNewLine(createLine(x, y, x, y));
  }
  function mouseMove(event: MouseEvent) {
    console.log("mouse move");
    if (newLine) {
      const x = getMouseX(event);
      const y = getMouseY(event);
      setNewLine(createLine(newLine.x1, newLine.y1, x, y));
    }
  }
  function mouseUp() {
    console.log(newLine);
    if (newLine) {
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
      height={height * windowScale}
      width={width * windowScale}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
    ></canvas>
  );
}
