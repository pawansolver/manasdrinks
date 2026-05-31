// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import CanModel from "../Components/CanModel";
import Layout from "../Components/Layout";
import { ShoppingCart, Factory, ShieldCheck, Tag, Truck, Clock, Shield, Medal } from "lucide-react";
import Navbar from "../Components/Navbar";
import { useInView } from "react-intersection-observer";
import Contact from "./Contact";
import Footer from "../Components/Footer";
// ==================== TEXT ANIMATION VARIANTS ====================
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};


// ==================== LAZY LOADING ====================
const FlavourCarousel = lazy(() => import("../Components/FlavourCarousel"));
const LabubuBanner = lazy(() => import("../Components/labubuBanner"));

// ==================== BRAND SLIDER COMPONENT ====================
const BRAND_IMAGES = [
  "/brand/image.png",
  "/brand/image copy.png",
  "/brand/image copy 2.png",
  "/brand/image copy 3.png",
  "/brand/image copy 4.png",
  "/brand/image copy 5.png",
  "/brand/image copy 6.png",
  "/brand/image copy 7.png",
  "/brand/image copy 8.png",
  "/brand/image copy 9.png",
  "/brand/image copy 10.png",
  "/brand/image copy 11.png",
  "/brand/image copy 12.png",
  "/brand/image copy 13.png",
  "/brand/image copy 14.png",
  "/brand/image copy 15.png",
  "/brand/image copy 16.png",
];

function BrandSlider() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightboxSrc(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Lightbox Modal ── */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-lg"
          onClick={() => setLightboxSrc(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightboxSrc}
              alt="Brand Full View"
              className="max-w-[90vw] max-h-[88vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(163,230,53,0.35)]"
            />
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute -top-5 -right-5 w-11 h-11 rounded-full bg-white/15 border border-white/25 text-white text-lg font-bold flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200"
            >
              ✕
            </button>
            <p className="text-center text-white/40 text-xs mt-3">Click outside or press Esc to close</p>
          </motion.div>
        </div>
      )}

      {/* ── Slider Track ── */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-[#111] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-[#111] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 home-brand-track" style={{ width: "max-content" }}>
          {[...Array(2)].flatMap((_, set) =>
            BRAND_IMAGES.map((src, i) => (
              <div
                key={`hb-${set}-${i}`}
                onClick={() => setLightboxSrc(src)}
                className="relative flex-shrink-0 w-72 h-[400px] rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  backdropFilter: "blur(8px)",
                  border: "1.5px solid rgba(163, 230, 53, 0.45)",
                  boxShadow: "0 0 18px rgba(163,230,53,0.15)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(163,230,53,0.9)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(163,230,53,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(163,230,53,0.45)";
                  e.currentTarget.style.boxShadow = "0 0 18px rgba(163,230,53,0.15)";
                }}
              >
                <img
                  src={src}
                  alt={`Brand ${i + 1}`}
                  className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover hint */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white/80 text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  Click to expand
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .home-brand-track { animation: homeBrandScroll ${17 * 3}s linear infinite; }
        .home-brand-track:hover { animation-play-state: paused; }
        @keyframes homeBrandScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </>
  );
}


// ==================== DATA CONFIGURATIONS ====================
const cans = [
  {
    id: 1,
    subtitle: "Purity Meets Elegance",
    title: "NEVAS WATER",
    description:
      "Experience the ultimate refreshment with Nevas. Crystal clear, elegantly packaged, and sourced for purity.",
    imagePath: "/bg/image-removebg-preview (1).png",
    modelPath: "",
    highlightColor: "#00d8ff",
    textColor: "#FFFFFF",
    modelGlowColor: "#00d8ff",
    scale: 1,
    position: [0.08, -0.2, 0],
    camera: [0, 0, 3],
    rotation: [0, 0, 0],
    bg: "/bg/blue.jpg",
    scrollHeight: 50,
    imageWidth: "320px",
  },
  {
    id: 2,
    subtitle: "Vitalizes Body & Mind",
    title: "Hustle",
    description:
      "Gives you wings — energize your mind and body with the taste of adrenaline and success.",
    imagePath: "/bg/image-removebg-preview (3).png",
    modelPath: "",
    highlightColor: "#FFC700",
    textColor: "#FFFFFF",
    modelGlowColor: "#ff1493",
    scale: [15, 28.3, 7.7],
    position: [0.08, -0.2, 0],
    camera: [0, 0, 4.5],
    rotation: [-0.5, 1.2, 0],
    bg: "/bg/redblue.png",
    scrollHeight: 50,
    imageWidth: "210px",
  },
  {
    id: 3,
    subtitle: "Unleash The Beast",
    title: "Jimmy,s",
    description:
      "A raw energy surge with the unmistakable punch of the original Monster blend.",
    imagePath: "/bg/image.png",
    modelPath: "",
    highlightColor: "#90EE90",
    textColor: "#FFFFFF",
    modelGlowColor: "#00ff00",
    scale: [0.22, 0.22, 0.22],
    position: [0.01, -0.5, 0.2],
    camera: [0, 0, 3],
    rotation: [0, -0.3, 0],
    bg: "/bg/wh.jpg",
    scrollHeight: 50,
    imageWidth: "165px",
  },
];

const heroConfig = {
  subtitle: "THE FUTURE OF ENERGY",
  title: "LIT ENERGY",
  flavor: "CLASSIC SURGE",
  description:
    "Engineered for peak performance. Our revolutionary blend delivers a smooth, sustained energy boost with zero crash, fueling your focus and ambition. This isn't just energy. It's an upgrade.",
  modelPath: "/model/lit.glb",
  highlightColor: "#00d8ff",
  textColor: "#FFFFFF",
  modelGlowColor: "#00d8ff",
  scale: 1,
  position: [0, -0.85, 0],
  camera: [0, 0.5, 3.5],
  rotation: [0, -4.8, 0],
  bg: "/bg/thunder.mp4",
  scrollHeight: 100,
};

const companySectionBg = "/bg/20260528-0625-09.3573016.mp4";

const SectionVideoBackground = ({ src }) => (
  <>
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      src={src}
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="absolute inset-0 bg-black/55 z-0" />
  </>
);

const newReleases = [
  {
    id: 1,
    title: "Solar Flare",
    flavor: "Mango & Chili",
    modelPath: "/model/orange.glb",
    glowColor: "rgba(255, 140, 0, 0.5)",
    modelGlowColor: "#ff8c00",
    scale: 9,
    position: [0, -0.6, 0],
  },
  {
    id: 2,
    title: "Nebula",
    flavor: "Berry & Grape",
    modelPath: "/model/pink.glb",
    glowColor: "rgba(255, 105, 180, 0.8)",
    modelGlowColor: "#ff69b4",
    scale: 0.05,
    position: [0, -0.5, 0],
  },
  {
    id: 3,
    title: "Gecko",
    flavor: "Kiwi & Lime",
    modelPath: "/model/monster_energy_drink.glb",
    glowColor: "rgba(50, 205, 50, 0.4)",
    modelGlowColor: "#32cd32",
    scale: 0.4,
    position: [0, -0.7, 0],
  },
];

// ==================== Beverage Image Background ====================
const BeverageImageBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <img
      src="/bg/blue.jpg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: "brightness(0.65) saturate(1.2)" }}
    />
    <div className="absolute inset-0" style={{
      background: "linear-gradient(135deg, rgba(2,11,24,0.7) 0%, rgba(4,20,40,0.5) 50%, rgba(6,32,58,0.6) 100%)"
    }} />
  </div>
);

// ==================== 3D COMPONENTS (Optimized with React.memo) ====================
const CameraController = ({ targetPosition }: any) => {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    state.camera.position.lerp(vec.set(...targetPosition), 0.05);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
  return null;
};

const ScrollShowcaseModel = React.memo(({ modelPath, imagePath, scale, position, modelGlowColor }: any) => {
  const group = useRef();
  const [canRotate, setCanRotate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanRotate(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (group.current && canRotate && !imagePath) {
      group.current.rotation.y += 0.003;
    }
  });

  // When imagePath exists, render nothing in 3D — image is rendered outside Canvas
  if (imagePath) return null;

  return (
    <motion3d.group
      ref={group}
      initial={{ x: 3, y: -0.5, scale: 0.6, rotateY: Math.PI / 4 }}
      animate={{
        x: position[0], y: position[1], z: position[2],
        scale: scale, rotateY: 0,
        transition: { duration: 1.8, ease: "easeInOut" },
      }}
      exit={{
        x: -3, y: 0.5, scale: 0.6, rotateY: -Math.PI / 4,
        transition: { duration: 1.2, ease: "easeInOut" },
      }}
    >
      <Suspense fallback={null}>
        <CanModel modelPath={modelPath} modelGlowColor={modelGlowColor} />
      </Suspense>
    </motion3d.group>
  );
});

const HeroModel = React.memo(({ config }: any) => {
  const { scene } = useGLTF(config.modelPath);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = t * 0.6;
      modelRef.current.position.y = config.position[1] + Math.sin(t * 1.2) * 0.05;
    }
  });

  const modelVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: config.scale,
      opacity: 1,
      transition: { duration: 4.5, delay: 0.5, ease: "easeOut" }
    },
  };

  return (
    <motion3d.primitive
      ref={modelRef}
      object={scene}
      position={config.position}
      variants={modelVariants}
    />
  );
});

const AnimatedCan = React.memo(({ config }: any) => {
  const { scene } = useGLTF(config.modelPath);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = t * 0.1;
      modelRef.current.position.y = (config.position[1] || 0) + Math.sin(t * 1.2) * 0.05;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={config.scale} position={config.position} />;
});

const ProductScene = React.memo(({ config }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  return (
    <div ref={ref} className="w-full h-full relative flex items-center justify-center">
      {inView ? (
        <Canvas camera={{ position: config.camera || [0, 0.6, 3.5], fov: 50 }} dpr={1} performance={{ min: 0.5 }} frameloop="demand">
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight color={config.modelGlowColor} position={[4, 4, 2]} intensity={2} />
            <directionalLight color="#ffffff" position={[-4, -2, 5]} intensity={0.8} />
            <AnimatedCan config={config} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="text-gray-500 font-display animate-pulse">Loading 3D Product...</div>
      )}
    </div>
  );
});

// ==================== MAIN PAGE COMPONENT ====================
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // optional progress indicator
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMainContent, setShowMainContent] = useState(true);
  const navigate = useNavigate();
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  // ==================== MODEL & IMAGE PRELOADING ====================
  useEffect(() => {
    const allModels = [
      ...cans.map((can) => can.modelPath),
      heroConfig.modelPath,
      ...newReleases.map((r) => r.modelPath),
    ].filter(Boolean);

    const allImages = [
      ...cans.map((can) => can.imagePath),
      ...cans.map((can) => can.bg),
    ].filter(Boolean);

    let loaded = 0;
    const total = allModels.length + allImages.length;

    if (total === 0) {
      setIsLoaded(true);
      return;
    }

    const itemLoaded = () => {
      loaded += 1;
      setProgress(Math.floor((loaded / total) * 100));
      if (loaded >= total) {
        setTimeout(() => setIsLoaded(true), 200);
      }
    };

    // Preload 3D Models
    allModels.forEach((path) => {
      try {
        useGLTF.preload(path);
        setTimeout(itemLoaded, 50);
      } catch (e) {
        itemLoaded();
      }
    });

    // Preload Images
    allImages.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = itemLoaded;
      img.onerror = itemLoaded;
    });
  }, []);

  // ==================== SCROLL HANDLER (about section only) ====================
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector("#about-section");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setShowMainContent(rect.top > window.innerHeight * 0.5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prevSlide = () => setActiveIndex((i) => (i - 1 + cans.length) % cans.length);
  const nextSlide = () => setActiveIndex((i) => (i + 1) % cans.length);

  // Auto-advance slider every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeCan = cans[activeIndex];

  // ==================== SPLASH SCREEN ====================
  if (!isLoaded) {
    return (
      <motion.div
        className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-[9999] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Ambient green glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[120px]" />
        </div>

        {/* 3D spinning logo container */}
        <div className="relative flex items-center justify-center mb-10" style={{ perspective: "800px" }}>

          {/* Outer rotating green ring */}
          <motion.div
            className="absolute w-52 h-52 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#22c55e",
              borderRightColor: "#22c55e33",
              borderBottomColor: "transparent",
              borderLeftColor: "#22c55e33",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner rotating ring (reverse) */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "transparent",
              borderRightColor: "#4ade80",
              borderBottomColor: "#4ade8055",
              borderLeftColor: "transparent",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* 3D spinning logo */}
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src="/logo/MANASH_LOGO.jpg__1_-removebg-preview.png"
              alt="Manash Logo"
              className="w-32 h-32 object-contain"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                filter: "drop-shadow(0 0 20px rgba(34,197,94,0.8))",
              }}
            />
          </motion.div>
        </div>

        {/* Brand name */}
        <motion.h1
          className="text-2xl font-black tracking-[0.3em] uppercase mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ color: "#22c55e" }}
        >
          MANASH
        </motion.h1>
        <motion.p
          className="text-xs tracking-[0.5em] text-gray-400 uppercase mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Beverage
        </motion.p>

        {/* Progress bar */}
        <div className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #16a34a, #4ade80)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <p className="mt-3 text-gray-500 text-xs tracking-widest">
          {progress < 100 ? `Loading... ${progress}%` : "Ready"}
        </p>
      </motion.div>
    );
  }


  // ==================== MAIN PAGE (everything below stays same) ====================

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden font-body">

      <Navbar />
      <AnimatePresence>
        {showMainContent && <Layout />}
      </AnimatePresence>

      {/* ==================== PRODUCT SLIDER SECTION ==================== */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCan.id + "-bg"}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage: `url(${activeCan.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.6) saturate(1.2)",
            }}
          />
        </AnimatePresence>

        {/* Left: Text */}
        <div className="relative z-10 w-1/2 h-full flex flex-col justify-center items-start p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCan.id + "-text"}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl mb-2 font-display tracking-wider" style={{ color: activeCan.highlightColor }}>
                {activeCan.subtitle}
              </h2>
              <h1 className="text-7xl font-display mb-4">{activeCan.title}</h1>
              <p className="text-lg max-w-md text-gray-300">{activeCan.description}</p>
              <motion.button
                className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold border-2 border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/products")}
              >
                <ShoppingCart size={22} />
                Shop Now
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Product Image */}
        <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeCan.id + "-img"}
              src={activeCan.imagePath}
              alt={activeCan.title}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1, y: ["-12px", "12px"] }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                y: { duration: 2.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.2 },
              }}
              style={{
                width: activeCan.imageWidth || "220px",
                height: "auto",
                objectFit: "contain",
                filter: `drop-shadow(0 0 40px ${activeCan.modelGlowColor}99)`,
              }}
            />
          </AnimatePresence>
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/25 transition-all duration-200 text-2xl"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/25 transition-all duration-200 text-2xl"
        >
          ›
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {cans.map((can, i) => (
            <button
              key={can.id}
              onClick={() => setActiveIndex(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeIndex === i ? "28px" : "10px",
                height: "10px",
                background: activeIndex === i ? activeCan.highlightColor : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      </section>

      <section
        id="about-section"
        className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={heroConfig.bg}
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <motion.div
          className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center z-20 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          <div className="w-full md:w-1/2 h-[70vh] flex items-center justify-center" style={{ perspective: "1000px" }}>
            <motion.img
              src="/bg/image-removebg-preview (3).png"
              alt="Energy Drink"
              initial={{ opacity: 0, scale: 0.8, rotateY: -40 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              animate={{
                y: ["-15px", "15px", "-15px"],
                rotateY: [-12, 12, -12],
                rotateX: [5, -5, 5],
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 30px rgba(0,216,255,0.4))",
                  "drop-shadow(0 0 60px rgba(0,216,255,0.8))",
                  "drop-shadow(0 0 30px rgba(0,216,255,0.4))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="max-h-[55vh] w-auto object-contain"
            />
          </div>
          <motion.div className="w-full md:w-1/2 px-8">
            <motion.h3
              className="text-cyan-400 uppercase mb-2 tracking-widest text-2xl font-display"
              custom={0}
              variants={textVariants}
            >
              {heroConfig.subtitle}
            </motion.h3>
            <motion.h1
              className="text-8xl font-display mb-2"
              custom={1}
              variants={textVariants}
            >
              {heroConfig.title}
            </motion.h1>
            <motion.h2
              className="text-3xl text-gray-300 mb-4 font-display"
              custom={2}
              variants={textVariants}
            >
              {heroConfig.flavor}
            </motion.h2>
            <motion.p
              className="text-gray-300 leading-relaxed text-lg"
              custom={3}
              variants={textVariants}
            >
              {heroConfig.description}
            </motion.p>
            <motion.button
              className="relative mt-8 px-8 py-3 rounded-full font-bold text-white text-lg overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              style={{
                background: "radial-gradient(circle at 20% 20%, #6b5bff, #1e1e3f, #000)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Discover The Flavors
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative w-full bg-[#111] py-20 px-6 flex flex-col items-center overflow-hidden">
        <h2 className="text-4xl md:text-6xl font-black mb-4 font-display">Our Brands</h2>
        <p className="text-lg text-gray-200 max-w-2xl text-center mb-14 font-medium">
          Explore the cutting edge of energy — crafted with bold flavors and a relentless drive for performance.
        </p>

        <BrandSlider />
      </section>



      {/* === COMPANY ABOUT + WHY US (premium beverage background) === */}
      <div className="relative w-full overflow-hidden border-t border-neutral-900">
        <BeverageImageBackground />

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full py-24 px-6 md:px-12 flex flex-col items-center"
        >
          <div className="max-w-7xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-500">
                MANASH BEVERAGE
              </h2>
              <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed">
                MANASH BEVERAGE is an Indian Company under proprietorship having its head office at Sutapatti, Muzaffarpur Bihar - 842001. Established one plant (Capacity 120 BPM) of CLEAR WATER in Muzaffarpur industrial area and established another plant (Capacity 90 BPM) of G-20 WATER in Hazipur industrial area. We are marketing the products of Frojo Group Beverages based in Assam, Royal Challenge Packaged Drinking Water, Jimmy’s Cocktails, Rockwell Refrigeration, Voltas Refrigerators and Packaged Dry Fruits in Bihar. Apart from, company is dealing with CCTV cameras and household electronics items in Bihar and Jharkhand by its own imports in collaboration with the channel partners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-lime-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3 text-lime-400">History</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">Started journey in 2015. Established water plant for NEELJAL COMPANY in 2011. Collaborated with ENERGY BEVERAGES PVT LTD for CLEAR Water Plant in 2021. Established G20 WATER plant in HAZIPUR in 2023-24.</p>
                </div>
                <div className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-lime-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3 text-lime-400">Market Leadership</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">Significant market share with around 3 operational plants and a vast distribution network in 22 districts of Bihar with a strong Sales Team.</p>
                </div>
                <div className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-lime-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3 text-lime-400">Expansion & Dist.</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">Expanded operations in Bihar, Jharkhand, and Chhattisgarh. Robust network of 150 distributors, 4000 retailers, and 250 distribution trucks.</p>
                </div>
                <div className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-lime-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3 text-lime-400">Ownership</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">Unlisted Proprietor based company (GSTN: 10AWGPR6556A1ZT). Dr. Reetu Raj is the Sole Proprietor. H/O: Kamlubabu Campus, Muzaffarpur, Bihar.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 pt-20 border-t border-white/10"
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                GREEN PACKSYS SOLUTIONS
              </h2>
              <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed">
                Founded in 2015, Green Packsys Solutions has quickly earned a reputation as a distinguished Manufacturer, Retailer, and Supplier of advanced systems for Mineral/Packaged Drinking Water Bottling Plants, Carbonated Soft Drink Plants, Fruit Juice Plants, and Liquid Filling Machines.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-2xl font-bold text-white mb-4 text-cyan-400">Our Products & Services</h3>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 text-sm">
                    <li>Sewage Treatment Plants (STP)</li>
                    <li>Effluent Treatment Plants (ETP)</li>
                    <li>Reverse Osmosis Plants (RO) for Commercial/Industrial use</li>
                    <li>De-Mineralized Water Plant (DM)</li>
                    <li>Water Softeners Plants</li>
                    <li>Ultra Filtration Plants for Contaminated Area</li>
                  </ul>
                </div>
                <div className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-2xl font-bold text-white mb-4 text-cyan-400">Our Clients & Reach</h3>
                  <ul className="list-disc list-inside text-neutral-400 space-y-3 text-sm">
                    <li><strong className="text-white">Corporate:</strong> Lords Group, Innodata India Pvt. Ltd., HCL, L&T, CLEAR Water, G20 Water</li>
                    <li><strong className="text-white">Schools/Colleges:</strong> DAV, DPS, GD Goenka, Manash International, Gurukul Academy</li>
                    <li><strong className="text-white">Hospitals:</strong> SS YADAV Hospital, Jindal’s, Amex Nursing Home, Apollo Pharmacy</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full py-24 px-6 md:px-12 flex flex-col items-center border-t border-white/10"
        >
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Why Choose Us?
              </h2>
              <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
                We deliver a qualitative array of state-of-the-art machinery engineered for diverse industrial applications. Manufactured using premium-grade materials and strict compliance with global quality guidelines, our solutions are synonymous with unmatched durability, precision, and resilience. Every product is rigorously inspected on multiple parameters by our expert quality analysts before dispatch.
              </p>
            </div>

            <div className="bg-neutral-900/70 backdrop-blur-md border border-neutral-800/80 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-all duration-700"></div>
              <h3 className="text-3xl font-bold text-white mb-4">Unwavering Commitment</h3>
              <p className="text-neutral-400 text-lg leading-relaxed relative z-10">
                While the market offers choices, our dedication goes beyond delivery. We channel our robust resources and dedicated backup teams to ensure your plants operate in perfect condition—well beyond the warranty period. Your focus remains on market dominance; our focus remains on your operational success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Factory size={28} className="text-indigo-400" />, title: "State-of-the-art Infrastructure", desc: "Advanced facilities ensuring superior manufacturing processes." },
                { icon: <Medal size={28} className="text-indigo-400" />, title: "High-quality Products", desc: "Premium materials and construction for unmatched durability." },
                { icon: <ShieldCheck size={28} className="text-indigo-400" />, title: "Experienced Auditors", desc: "Rigorous multi-parameter quality inspections before dispatch." },
                { icon: <Tag size={28} className="text-indigo-400" />, title: "Affordable Pricing", desc: "Cost-effective solutions without compromising on quality." },
                { icon: <Truck size={28} className="text-indigo-400" />, title: "Timely Delivery", desc: "Streamlined logistics to ensure your projects stay on schedule." },
                { icon: <Clock size={28} className="text-indigo-400" />, title: "24×7 Service", desc: "Round-the-clock backup team to keep your plants running perfectly." },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-indigo-500/50 hover:bg-neutral-800/60 transition-all duration-300 flex flex-col items-start"
                >
                  <div className="bg-neutral-950/80 backdrop-blur-sm p-3 rounded-xl border border-neutral-800 mb-4 shadow-lg shadow-indigo-500/10">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-neutral-900/70 backdrop-blur-md p-6 rounded-2xl border border-neutral-800/80 hover:border-indigo-500/50 hover:bg-neutral-800/60 transition-all duration-300 flex flex-col items-start lg:col-span-3 lg:flex-row lg:items-center lg:gap-6"
              >
                <div className="bg-neutral-950/80 backdrop-blur-sm p-3 rounded-xl border border-neutral-800 mb-4 lg:mb-0 shadow-lg shadow-indigo-500/10">
                  <Shield size={28} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 lg:mb-1">Ethical Business Practices</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">Guided by integrity, transparency, and a strong moral approach in all our dealings to foster long-term relationships.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
        <FlavourCarousel />
        <LabubuBanner />
      </Suspense>

      {/* Contact Section added to main page */}
      <Contact hideNavbar={true} />

      {/* Footer */}
      <Footer />
    </div>
  );
}