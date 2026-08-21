import * as THREE from 'three';

export function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

// Builds a sphere whose vertex UVs are derived from the exact same phi/theta
// convention as latLonToVector3, so a canvas texture drawn with
// x = (lon+180)/360 * width, y = (90-lat)/180 * height lines up perfectly
// with markers/camera targets placed via latLonToVector3.
export function buildGlobeGeometry(radius, widthSegments = 64, heightSegments = 32) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let iy = 0; iy <= heightSegments; iy++) {
    const v = iy / heightSegments;
    const phi = v * Math.PI;
    for (let ix = 0; ix <= widthSegments; ix++) {
      const u = ix / widthSegments;
      const theta = u * Math.PI * 2;

      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      positions.push(x, y, z);
      normals.push(x / radius, y / radius, z / radius);
      uvs.push(u, v);
    }
  }

  const rowSize = widthSegments + 1;
  for (let iy = 0; iy < heightSegments; iy++) {
    for (let ix = 0; ix < widthSegments; ix++) {
      const a = iy * rowSize + ix;
      const b = iy * rowSize + ix + 1;
      const c = (iy + 1) * rowSize + ix;
      const d = (iy + 1) * rowSize + ix + 1;
      indices.push(a, d, b, a, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  return geometry;
}
