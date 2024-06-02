import { fabric } from "fabric";
import { deleteItemControl } from "./deleteItemConfig";
import { LuMinus, LuRectangleHorizontal, LuCircle } from "react-icons/lu";
import { type ReactNode } from "react";
import { BiText } from "react-icons/bi";

/// add image to canvas
export const addImage = (imgUrl: string, canvas?: fabric.Canvas) => {
  if (!canvas) return;
  fabric.Image.fromURL(imgUrl, (img) => {
    img.scale(0.4);
    const {
      canvasHeight,
      canvasWidth,
      itemHeight: imgHeight,
      itemWidth: imgWidth,
    } = getItemAndCanvasDimensions
    (canvas, img);

    img.set({
      left: (canvasWidth - imgWidth) / 2,
      top: (canvasHeight - imgHeight) / 2,
    });
    canvas?.add(img);
    canvas?.requestRenderAll();

    img.controls.deleteControl = deleteItemControl;
  });
};

// add rectangle to canvas
export const addRectangle = (canvas?: fabric.Canvas) => {
  if (!canvas) return;
  const rect = new fabric.Rect({
    width: 200,
    height: 200,
    fill: "#2BEBC8",
  });
  const {
    canvasHeight,
    canvasWidth,
    itemHeight: rectHeight,
    itemWidth: rectWidth,
  } = getItemAndCanvasDimensions
  (canvas, rect);

  rect.set({
    left: (canvasWidth - rectWidth) / 2,
    top: (canvasHeight - rectHeight) / 2,
  });
  rect.controls.deleteControl = deleteItemControl;
  canvas?.add(rect);
  canvas?.requestRenderAll();
};

// add circle to canvas
export const addCircle = (canvas?: fabric.Canvas) => {
  if(!canvas) return;
  const circle = new fabric.Circle({
    radius: 50,
    fill: "#2BEBC8",
  });

  const {
    canvasHeight,
    canvasWidth,
    itemHeight: circleHeight,
    itemWidth: circleWidth,
  } = getItemAndCanvasDimensions
  (canvas, circle);

  circle.set({
    left: (canvasWidth - circleWidth) / 2,
    top: (canvasHeight - circleHeight) / 2,
  });

  circle.controls.deleteControl = deleteItemControl;
  canvas?.add(circle);
  canvas?.requestRenderAll();
};


// add line to canvas
export const addLine = (canvas?: fabric.Canvas) => {
  if(!canvas) return;
  const line = new fabric.Line([100, 100, 200, 200], {
    fill: "#2BEBC8",
    stroke: "#2BEBC8",
    strokeWidth: 2,
  });
  const {
    canvasHeight,
    canvasWidth,
    itemHeight: lineHeight,
    itemWidth: lineWidth,
  } = getItemAndCanvasDimensions
  (canvas, line);

  line.set({
    left: (canvasWidth - lineWidth) / 2,
    top: (canvasHeight - lineHeight) / 2,
  });

  line.controls.deleteControl = deleteItemControl;
  canvas?.add(line);
  canvas?.requestRenderAll();
};


// add text to canvas
export const addText = (canvas?: fabric.Canvas, textValue?: string) => {
  if(!canvas) return;
  const text = new fabric.Text(textValue ?? "Hello", {
    fontSize: 25,
    fill: "#2BEBC8",
  });
  const {
    canvasHeight,
    canvasWidth,
    itemHeight: textHeight,
    itemWidth: textWidth,
  } = getItemAndCanvasDimensions
  (canvas, text);

  text.set({
    left: (canvasWidth - textWidth) / 2,
    top: (canvasHeight - textHeight) / 2,
  });

  text.controls.deleteControl = deleteItemControl;
  canvas?.add(text);
  canvas?.requestRenderAll();
};

/// all canvas shapes not including images
export const canvasShapes: {
  shape: string;
  handler: (canvas?: fabric.Canvas, text?: string) => void;
  icon: ReactNode;
}[] = [
  {
    shape: "rectangle",
    handler: addRectangle,
    icon: <LuRectangleHorizontal className="text-xl" />,
  },
  {
    shape: "circle",
    handler: addCircle,
    icon: <LuCircle className="text-xl" />,
  },
  {
    shape: "line",
    handler: addLine,
    icon: <LuMinus className="text-xl" />,
  },
  {
    shape: "text",
    handler: addText,
    icon: <BiText className="text-xl" />,
  },
];

// get item and canvas centers
export const getItemAndCanvasDimensions
 = (
  canvas: fabric.Canvas,
  item: fabric.Object,
) => {
  const canvasWidth = canvas.getWidth() ?? 0;
  const canvasHeight = canvas.getHeight() ?? 0;
  const itemWidth = item.getScaledWidth() ?? 0;
  const itemHeight = item.getScaledWidth() ?? 0;

  return {
    canvasWidth,
    canvasHeight,
    itemWidth,
    itemHeight,
  };
};


// convert any blob to mp4 blob
export const convertBlobToMP4 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result;
      const buffer = new Uint8Array(arrayBuffer as ArrayBuffer);
      const mp4Blob = new Blob([buffer], { type: "video/mp4" });
      resolve(mp4Blob);
    };

    reader.onerror = () => {
      reject(new Error("Error converting Blob to Buffer: "));
    };

    reader.readAsArrayBuffer(blob);
  });
};