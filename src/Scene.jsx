import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Put your video at /public/hero.mp4. If it is missing, an animated canvas texture is used instead.
const VIDEO_SRC = "/hero.mp4";

function useMediaTexture() {
  const state = useMemo(() => {
    const video = document.createElement("video");
    Object.assign(video, { src: VIDEO_SRC, loop: true, muted: true, playsInline: true, crossOrigin: "anonymous" });
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 576;
    return { video, canvas, ctx: canvas.getContext("2d"), videoOK: false,
      videoTex: new THREE.VideoTexture(video), canvasTex: new THREE.CanvasTexture(canvas) };
  }, []);

  useEffect(() => {
    const { video } = state;
    const ok = () => { state.videoOK = true; };
    video.addEventListener("loadeddata", ok);
    video.play().catch(() => {});
    return () => { video.removeEventListener("loadeddata", ok); video.pause(); };
  }, [state]);

  return state;
}

function drawFallback({ ctx, canvas }, t) {
  const { width: w, height: h } = canvas;
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#10131c"); g.addColorStop(1, "#1d2457");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(242,239,233,.12)";
  for (let x = 0; x < w; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  ctx.fillStyle = "#4b5bff";
  ctx.beginPath(); ctx.arc(w / 2 + Math.sin(t) * 220, h / 2 + Math.cos(t * 1.3) * 90, 120, 0, 7); ctx.fill();
  ctx.fillStyle = "#f2efe9";
  ctx.fillRect(w * 0.2 + Math.cos(t * 0.7) * 80, h * 0.3, 160, 160);
}

function Screen({ scroll }) {
  const mesh = useRef();
  const media = useMediaTexture();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (!media.videoOK) { drawFallback(media, t); media.canvasTex.needsUpdate = true; }
    mesh.current.material.map = media.videoOK ? media.videoTex : media.canvasTex;
    mesh.current.material.needsUpdate = true;

    const s = scroll.current;
    mesh.current.rotation.y += ((pointer.x * 0.5 + s * Math.PI * 1.2) - mesh.current.rotation.y) * 0.06;
    mesh.current.rotation.x += ((-pointer.y * 0.25 + s * 0.6) - mesh.current.rotation.x) * 0.06;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.08 - s * 1.2;
    mesh.current.scale.setScalar(1 - s * 0.35);
  });

  return (
    <mesh ref={mesh} position={[1.6, 0, 0]}>
      {/* a curved 3D "screen": open cylinder segment */}
      <cylinderGeometry args={[3.2, 3.2, 3.6, 64, 1, true, -0.55, 1.1]} />
      <meshBasicMaterial side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

export default function Scene({ scroll }) {
  return (
    <Canvas className="scene" camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 2]}>
      <Screen scroll={scroll} />
    </Canvas>
  );
}
