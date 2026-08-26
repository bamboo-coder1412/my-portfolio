import * as THREE from "three";
import gsap from "gsap";
import { noise3 } from "./noise";

// Neural-constellation hero: a breathing sphere of glowing points linked by
// faint synapse lines. Replaces the old GLB character while keeping the same
// group -> scroll-timeline contract (outer group is tweened by GsapScroll,
// `tilt` follows the cursor, `spin` self-rotates).

const COUNT = 730;
const RADIUS = 1.9;
const BRIGHT_STRIDE = 8;
const NEIGHBORS = 2;
const NOISE_FREQ = 0.85;
const NOISE_SPEED = 0.35;

export interface ParticleField {
  group: THREE.Group;
  tilt: THREE.Group;
  spin: THREE.Group;
  update: (elapsed: number, delta: number) => void;
  startIntro: () => void;
  hover: (hoverDiv: HTMLDivElement) => () => void;
  dispose: () => void;
}

const createGlowTexture = () => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.45)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
};

const createParticles = (): ParticleField => {
  // Base constellation on a fibonacci sphere with slight radial jitter.
  const base = new Float32Array(COUNT * 3);
  const scatter = new Float32Array(COUNT * 3);
  const displaced = new Float32Array(COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const r = RADIUS * (0.94 + Math.random() * 0.12);
    base[i * 3] = Math.cos(theta) * ringRadius * r;
    base[i * 3 + 1] = y * r;
    base[i * 3 + 2] = Math.sin(theta) * ringRadius * r;

    // Intro start: same direction, flung far out.
    const spread = RADIUS * (3.2 + Math.random() * 2.8);
    const len = Math.hypot(base[i * 3], base[i * 3 + 1], base[i * 3 + 2]) || 1;
    scatter[i * 3] = (base[i * 3] / len) * spread;
    scatter[i * 3 + 1] = (base[i * 3 + 1] / len) * spread;
    scatter[i * 3 + 2] = (base[i * 3 + 2] / len) * spread;
  }

  // Synapse lines: each node linked to its nearest neighbors (deduplicated).
  const pairKeys = new Set<number>();
  const pairs: number[] = [];
  for (let i = 0; i < COUNT; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < COUNT; j++) {
      if (i === j) continue;
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      dists.push({ j, d: dx * dx + dy * dy + dz * dz });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let n = 0; n < NEIGHBORS; n++) {
      const j = dists[n].j;
      const key = i < j ? i * COUNT + j : j * COUNT + i;
      if (!pairKeys.has(key)) {
        pairKeys.add(key);
        pairs.push(i, j);
      }
    }
  }

  const brightIndices: number[] = [];
  const smallIndices: number[] = [];
  for (let i = 0; i < COUNT; i++) {
    (i % BRIGHT_STRIDE === 0 ? brightIndices : smallIndices).push(i);
  }

  const texture = createGlowTexture();
  const smallPositions = new Float32Array(smallIndices.length * 3);
  const brightPositions = new Float32Array(brightIndices.length * 3);
  const linePositions = new Float32Array(pairs.length * 3);

  const smallGeo = new THREE.BufferGeometry();
  const smallAttr = new THREE.BufferAttribute(smallPositions, 3);
  smallGeo.setAttribute("position", smallAttr);
  const brightGeo = new THREE.BufferGeometry();
  const brightAttr = new THREE.BufferAttribute(brightPositions, 3);
  brightGeo.setAttribute("position", brightAttr);
  const lineGeo = new THREE.BufferGeometry();
  const lineAttr = new THREE.BufferAttribute(linePositions, 3);
  lineGeo.setAttribute("position", lineAttr);

  const smallMat = new THREE.PointsMaterial({
    color: "#b794ff",
    size: 0.3,
    map: texture,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const brightMat = new THREE.PointsMaterial({
    color: "#e9d9ff",
    size: 0.58,
    map: texture,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const lineMat = new THREE.LineBasicMaterial({
    color: "#7c4dff",
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const spin = new THREE.Group();
  spin.add(new THREE.Points(smallGeo, smallMat));
  spin.add(new THREE.Points(brightGeo, brightMat));
  spin.add(new THREE.LineSegments(lineGeo, lineMat));
  const tilt = new THREE.Group();
  tilt.add(spin);
  const group = new THREE.Group();
  group.add(tilt);

  const state = { morph: 0, amp: 0.3, excite: 0 };

  const update = (elapsed: number, delta: number) => {
    spin.rotation.y += delta * (0.08 + state.excite * 0.16);

    const t = elapsed * NOISE_SPEED;
    const amp = state.amp * (1 + state.excite * 0.9);
    const morph = state.morph;
    for (let i = 0; i < COUNT; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];
      const n = noise3(
        bx * NOISE_FREQ + t,
        by * NOISE_FREQ + t * 0.8,
        bz * NOISE_FREQ - t * 0.6
      );
      const scale = 1 + amp * n;
      const dx = bx * scale;
      const dy = by * scale;
      const dz = bz * scale;
      displaced[i * 3] = scatter[i * 3] + (dx - scatter[i * 3]) * morph;
      displaced[i * 3 + 1] = scatter[i * 3 + 1] + (dy - scatter[i * 3 + 1]) * morph;
      displaced[i * 3 + 2] = scatter[i * 3 + 2] + (dz - scatter[i * 3 + 2]) * morph;
    }
    for (let s = 0; s < smallIndices.length; s++) {
      const i = smallIndices[s];
      smallPositions[s * 3] = displaced[i * 3];
      smallPositions[s * 3 + 1] = displaced[i * 3 + 1];
      smallPositions[s * 3 + 2] = displaced[i * 3 + 2];
    }
    for (let b = 0; b < brightIndices.length; b++) {
      const i = brightIndices[b];
      brightPositions[b * 3] = displaced[i * 3];
      brightPositions[b * 3 + 1] = displaced[i * 3 + 1];
      brightPositions[b * 3 + 2] = displaced[i * 3 + 2];
    }
    for (let p = 0; p < pairs.length; p++) {
      const i = pairs[p];
      linePositions[p * 3] = displaced[i * 3];
      linePositions[p * 3 + 1] = displaced[i * 3 + 1];
      linePositions[p * 3 + 2] = displaced[i * 3 + 2];
    }
    smallAttr.needsUpdate = true;
    brightAttr.needsUpdate = true;
    lineAttr.needsUpdate = true;

    // Neuron shimmer, gated by the intro morph so it fades in with the rest.
    const flicker = 0.72 + 0.28 * (noise3(elapsed * 0.9, 12.3, 45.6) * 0.5 + 0.5);
    brightMat.opacity = Math.min(1, morph * flicker * (1 + state.excite * 0.4));
  };
  update(0, 0);

  const startIntro = () => {
    gsap.to(state, { morph: 1, duration: 2.8, ease: "power2.inOut" });
    gsap.to(smallMat, { opacity: 0.85, duration: 2, delay: 0.2 });
    gsap.to(lineMat, { opacity: 0.16, duration: 2.2, delay: 1.1 });
  };

  const hover = (hoverDiv: HTMLDivElement) => {
    const onEnter = () => gsap.to(state, { excite: 1, duration: 0.6 });
    const onLeave = () => gsap.to(state, { excite: 0, duration: 1.4 });
    hoverDiv.addEventListener("mouseenter", onEnter);
    hoverDiv.addEventListener("mouseleave", onLeave);
    return () => {
      hoverDiv.removeEventListener("mouseenter", onEnter);
      hoverDiv.removeEventListener("mouseleave", onLeave);
    };
  };

  const dispose = () => {
    gsap.killTweensOf(state);
    gsap.killTweensOf(smallMat);
    gsap.killTweensOf(lineMat);
    smallGeo.dispose();
    brightGeo.dispose();
    lineGeo.dispose();
    smallMat.dispose();
    brightMat.dispose();
    lineMat.dispose();
    texture.dispose();
  };

  return { group, tilt, spin, update, startIntro, hover, dispose };
};

export default createParticles;
