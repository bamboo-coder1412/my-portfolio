import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleParallax,
  handleTouchMove,
} from "./utils/mouseUtils";
import createParticles from "./utils/particles";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      const particles = createParticles();
      particles.group.position.set(0, 13.1, 0);
      scene.add(particles.group);
      const detachHover = hoverDivRef.current
        ? particles.hover(hoverDivRef.current)
        : undefined;

      setCharTimeline(particles.group, camera);
      setAllTimeline();

      const progress = setProgress((value) => setLoading(value));
      progress.loaded().then(() => {
        setTimeout(() => {
          particles.startIntro();
          gsap.to(".character-rim", {
            y: "55%",
            opacity: 1,
            delay: 0.2,
            duration: 2,
          });
        }, 2500);
      });

      const onResize = () =>
        handleResize(renderer, camera, canvasDiv, particles.group);
      window.addEventListener("resize", onResize);

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      const clock = new THREE.Clock();
      let frameId = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        handleParallax(
          particles.tilt,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        particles.update(clock.elapsedTime, delta);
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(debounce);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        detachHover?.();
        particles.dispose();
        scene.clear();
        renderer.dispose();
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
