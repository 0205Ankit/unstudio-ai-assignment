"use client";
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { useDragContext } from "@/app/(context)/drag-context-provider";
import { addImage, canvasShapes } from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatName } from "@/lib/utils";
import { Input } from "../ui/input";
import RecordScreenButton from "./recordScreenButton";

const Canvas = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const canvasContainerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { dragData, setDragItem } = useDragContext();
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (canvasContainerRef.current) {
      const container = canvasContainerRef.current;

      const c = new fabric.Canvas("canvas", {
        height: container.clientHeight - 55,
        width: container.clientWidth,
        backgroundColor: "black",
      });

      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = "#2BEBC8";
      fabric.Object.prototype.cornerStyle = "rect";
      fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
      fabric.Object.prototype.cornerSize = 6;

      setCanvas(c);

      return () => {
        c.dispose();
      };
    }
  }, []);

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      if (dragData && canvas) {
        addImage(dragData, canvas);
      }
    };

    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer?.addEventListener("dragover", handleDragOver);
    canvasContainer?.addEventListener("drop", handleDrop);

    return () => {
      canvasContainer?.removeEventListener("dragover", handleDragOver);
      canvasContainer?.removeEventListener("drop", handleDrop);
    };
  }, [canvas, dragData, setDragItem]);

  const shapeButtonHandler = (item: {
    shape: string;
    handler: (canvas?: fabric.Canvas, text?: string) => void;
  }) => {
    if (item.shape === "text") {
      item.handler(canvas, textValue);
      setTextValue("");
    } else {
      item.handler(canvas);
    }
  };

  return (
    <>
      <div ref={canvasContainerRef} id="canvas-container" className="w-1/2">
        <div className="mb-3 flex items-center gap-2">
          {canvasShapes.map((item) => (
            <React.Fragment key={item.shape}>
              {item.shape === "text" && (
                <Input
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                />
              )}
              <TooltipProvider key={item.shape}>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger>
                    <div
                      className="rounded-md border p-2"
                      onClick={() => shapeButtonHandler(item)}
                    >
                      <span className="text-slate-500">{item.icon}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{formatName({ name: item.shape })}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </React.Fragment>
          ))}
          <RecordScreenButton />
        </div>
        <canvas ref={canvasRef} id="canvas" />
      </div>
    </>
  );
};

export default Canvas;
