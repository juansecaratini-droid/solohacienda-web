import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { latLonToVector3, buildGlobeGeometry } from './geo';
import { createWorldTexture } from './worldTexture';

const RADIUS = 1.55;
const BA_LAT = -34.6;
const BA_LON = -58.4;

// Push the whole scene to the right so the globe never sits under the hero
// copy, which is constrained to the left column.
const GLOBE_OFFSET = new THREE.Vector3(2.05, -0.1, -0.3);

const START_CAM = new THREE.Vector3(0.6, 1.5, 7.2).add(GLOBE_OFFSET);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function GlobeScene({ progressRef }) {
  const groupRef = useRef();
  const highlightRef = useRef();
  const { camera } = useThree();

  const baPos = useMemo(() => new THREE.Vector3(...latLonToVector3(BA_LAT, BA_LON, RADIUS)), []);
  const endCam = useMemo(
    () => GLOBE_OFFSET.clone().add(baPos.clone().normalize().multiplyScalar(2.35)),
    [baPos]
  );
  // Floats just above the surface so it reads as a soft spotlight, not a
  // marker embedded in the terrain.
  const highlightPos = useMemo(() => baPos.clone().normalize().multiplyScalar(RADIUS + 0.4), [baPos]);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const globeGeometry = useMemo(() => buildGlobeGeometry(RADIUS, 160, 80), []);
  const worldTexture = useMemo(() => {
    const canvas = createWorldTexture({
      oceanColor: '#e5ddc9',
      landColor: '#3d4a29',
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.flipY = false;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state, delta) => {
    const raw = progressRef.current ?? 0;
    const p = easeInOutCubic(Math.min(Math.max(raw, 0), 1));

    tmp.lerpVectors(START_CAM, endCam, p);
    camera.position.copy(tmp);
    camera.lookAt(GLOBE_OFFSET);

    if (groupRef.current) {
      const idle = Math.max(0, 1 - raw * 3.2);
      // Bounded sway instead of unbounded accumulation: it must settle back
      // to exactly 0 once idle hits 0, or the camera (which targets a fixed
      // world position) would end up looking at the wrong longitude.
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2 * idle;
      groupRef.current.position.set(
        GLOBE_OFFSET.x,
        GLOBE_OFFSET.y + Math.sin(state.clock.elapsedTime * 0.4) * 0.05 * idle,
        GLOBE_OFFSET.z
      );
    }

    const markerT = Math.min(Math.max((raw - 0.55) / 0.4, 0), 1);
    const markerScale = easeInOutCubic(markerT);
    if (highlightRef.current) {
      highlightRef.current.intensity = markerScale * 0.9;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} color="#f7f3ea" />
      <directionalLight position={[4, 3, 5]} intensity={0.75} color="#fff7e8" />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#c9d4a8" />

      <group ref={groupRef} position={GLOBE_OFFSET}>
        <mesh geometry={globeGeometry}>
          <meshStandardMaterial map={worldTexture} roughness={0.95} metalness={0} />
        </mesh>

        <mesh scale={1.025}>
          <sphereGeometry args={[RADIUS, 48, 32]} />
          <meshBasicMaterial color="#8a9760" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>

        {/* Soft highlight over Buenos Aires instead of a pin — lets the map
            itself stay the focus as the zoom lands. */}
        <pointLight
          ref={highlightRef}
          position={highlightPos}
          intensity={0}
          distance={1.6}
          decay={2}
          color="#f3e4c6"
        />
      </group>
    </>
  );
}
