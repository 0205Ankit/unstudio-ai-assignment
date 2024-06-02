import { fabric } from "fabric";
import { deleteItemControl } from "./deleteItemConfig";
import { LuMinus, LuRectangleHorizontal, LuCircle } from "react-icons/lu";
import { type ReactNode } from "react";
import { BiText } from "react-icons/bi";

export const addImage = (imgUrl: string, canvas?: fabric.Canvas) => {
  fabric.Image.fromURL(imgUrl, (img) => {
    img.scale(0.4);
    img.set({ left: 200, top: 200 });
    canvas?.add(img);
    canvas?.requestRenderAll();

    img.controls.deleteControl = deleteItemControl;
  });
};

export const addRectangle = (canvas?: fabric.Canvas) => {
  const rect = new fabric.Rect({
    width: 200,
    height: 200,
    left: 200,
    top: 100,
    fill: "#2BEBC8",
  });
  rect.controls.deleteControl = deleteItemControl;
  canvas?.add(rect);
  canvas?.requestRenderAll();
};

export const addCircle = (canvas?: fabric.Canvas) => {
  const circle = new fabric.Circle({
    radius: 20,
    left: 200,
    top: 100,
    fill: "#2BEBC8",
  });
  circle.controls.deleteControl = deleteItemControl;
  canvas?.add(circle);
  canvas?.requestRenderAll();
};

export const addLine = (canvas?: fabric.Canvas) => {
  const line = new fabric.Line([100, 100, 200, 200], {
    fill: "#2BEBC8",
    stroke: "#2BEBC8",
    strokeWidth: 2,
  });
  line.controls.deleteControl = deleteItemControl;
  canvas?.add(line);
  canvas?.requestRenderAll();
};

export const addText = (canvas?: fabric.Canvas, textValue?: string) => {
  const text = new fabric.Text(textValue ?? "Hello", {
    fontSize: 25,
    left: 200,
    top: 100,
    fill: "#2BEBC8",
  });
  text.controls.deleteControl = deleteItemControl;
  canvas?.add(text);
  canvas?.requestRenderAll();
};

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
