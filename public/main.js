import { createVoronoiFromPoints } from "./modules/canvas-utils.js";
// Initialize Fabric.js canvas
const canvas = new fabric.Canvas("canvas");

// Store points for the Voronoi diagram
const points = [];

// Add a circle on canvas click
canvas.on("mouse:down", (e) => {
  const pointer = canvas.getPointer(e.e);
  const circle = new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 5,
    fill: "red",
    hasControls: false,
    hasBorders: false,
    originX: "center",
    originY: "center",
  });

  points.push({ x: pointer.x, y: pointer.y });
  canvas.add(circle);
});

// Generate Voronoi diagram on button click
document.getElementById("generateVoronoi").addEventListener("click", () => {
  if (points.length === 0) {
    return alert("No points to create a Voronoi diagram!");
  }
  var voronoiDiagram = createVoronoiFromPoints(points, canvas);
  // Clear existing Voronoi lines
  canvas.getObjects("line").forEach((line) => canvas.remove(line));

  // Iterate over Voronoi cells and draw edges
  for (const polygon of voronoiDiagram.cellPolygons()) {
    const vertices = Array.from(polygon);

    // Draw edges of each polygon
    for (let i = 0; i < vertices.length; i++) {
      const [x1, y1] = vertices[i];
      const [x2, y2] = vertices[(i + 1) % vertices.length]; // Wrap around to form a closed polygon

      const line = new fabric.Line([x1, y1, x2, y2], {
        stroke: "blue",
        strokeWidth: 1,
        selectable: false,
      });
      canvas.add(line);
    }
  }
});
