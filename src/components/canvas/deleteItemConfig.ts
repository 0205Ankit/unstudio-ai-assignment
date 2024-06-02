import {fabric} from "fabric";

export const deleteItemControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetX: 10,
  offsetY: -10,
  cursorStyle: "pointer",
  mouseUpHandler: (_, transform) => {
    const target = transform.target;
    const canvas = target.canvas;
    canvas?.remove(target);
    canvas?.requestRenderAll();
    return false;
  },
  render: (ctx, left, top) => {
    const size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = `${size - 8}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("X", 0, 0);
    ctx.restore();
  },
});
