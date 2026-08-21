import { feature } from 'topojson-client';
import landTopology from 'world-atlas/land-50m.json';

const landFeature = feature(landTopology, landTopology.objects.land);
const LAND_FEATURES = landFeature.features ?? [landFeature];

function project(lon, lat, width, height) {
  return [((lon + 180) / 360) * width, ((90 - lat) / 180) * height];
}

// Splits a ring at antimeridian crossings so landmasses that wrap around
// ±180° longitude don't draw a stray line across the whole canvas.
function tracePolygon(ctx, coordinates, width, height) {
  for (const ring of coordinates) {
    let prevX = null;
    ring.forEach(([lon, lat], i) => {
      const [x, y] = project(lon, lat, width, height);
      if (i === 0 || prevX === null || Math.abs(x - prevX) > width / 2) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      prevX = x;
    });
  }
}

export function createWorldTexture({
  width = 4096,
  height = 2048,
  oceanColor = '#e5ddc9',
  landColor = '#3d4a29',
} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = oceanColor;
  ctx.fillRect(0, 0, width, height);

  ctx.beginPath();
  for (const f of LAND_FEATURES) {
    const geom = f.geometry;
    if (!geom) continue;
    if (geom.type === 'Polygon') {
      tracePolygon(ctx, geom.coordinates, width, height);
    } else if (geom.type === 'MultiPolygon') {
      for (const polygon of geom.coordinates) {
        tracePolygon(ctx, polygon, width, height);
      }
    }
  }
  ctx.fillStyle = landColor;
  ctx.fill('evenodd');

  return canvas;
}
