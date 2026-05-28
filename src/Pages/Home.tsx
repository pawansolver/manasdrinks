// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import CanModel from "../Components/CanModel";
import Layout from "../Components/Layout";
import { ShoppingCart, Factory, ShieldCheck, Tag, Truck, Clock, Shield, Medal } from "lucide-react";
import Navbar from "../Components/Navbar";
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

// ==================== DATA CONFIGURATIONS ====================
const cans = [
  {
    id: 1,
    subtitle: "Sugar Free Energy",
    title: "Zero Ultra",
    description:
      "Zero sugar. Pure focus. Designed for those who crave power with precision — crisp, cool, and relentless.",
    modelPath: "/model/monster_can/scene.gltf",
    highlightColor: "#FFD700",
    textColor: "#FFFFFF",
    modelGlowColor: "#ff69b4",
    scale: 2.4,
    position: [0, -0.7, 0],
    camera: [0, 0, 3],
    rotation: [0, -1.2, 0],
    bg: "/bg/monsterBg.png",
    scrollHeight: 100,
  },
  {
    id: 2,
    subtitle: "Vitalizes Body & Mind",
    title: "Red Bull",
    description:
      "Gives you wings — energize your mind and body with the taste of adrenaline and success.",
    modelPath: "/model/red_bull_energy_drink_can.glb",
    highlightColor: "#FFC700",
    textColor: "#FFFFFF",
    modelGlowColor: "#ff1493",
    scale: [15, 28.3, 7.7],
    position: [0.08, -0.2, 0],
    camera: [0, 0, 4.5],
    rotation: [-0.5, 1.2, 0],
    bg: "/bg/redblue.png",
    scrollHeight: 100,
  },
  {
    id: 3,
    subtitle: "Unleash The Beast",
    title: "Monster Energy",
    description:
      "A raw energy surge with the unmistakable punch of the original Monster blend.",
    modelPath: "/model/monster_energy_drink.glb",
    highlightColor: "#90EE90",
    textColor: "#FFFFFF",
    modelGlowColor: "#00ff00",
    scale: [0.22, 0.22, 0.22],
    position: [0.01, -0.5, 0.2],
    camera: [0, 0, 3],
    rotation: [0, -0.3, 0],
    bg: "/bg/wh.jpg",
    scrollHeight: 150,
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

const ScrollShowcaseModel = React.memo(({ modelPath, scale, position, modelGlowColor }: any) => {
  const group = useRef();
  const [canRotate, setCanRotate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanRotate(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (group.current && canRotate) {
      group.current.rotation.y += 0.003;
    }
  });

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

const ProductScene = React.memo(({ config }: any) => (
  <Canvas camera={{ position: config.camera || [0, 0.6, 3.5], fov: 50 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <directionalLight color={config.modelGlowColor} position={[4, 4, 2]} intensity={2.5} />
      <directionalLight color="#ffffff" position={[-4, -2, 5]} intensity={1} />
      <Environment preset="city" />
      <Stars radius={80} depth={40} count={800} fade speed={0.5} />
      <AnimatedCan config={config} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Suspense>
  </Canvas>
));

// ==================== MAIN PAGE COMPONENT ====================
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // optional progress indicator
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMainContent, setShowMainContent] = useState(true);
  const navigate = useNavigate();

  // ==================== MODEL PRELOADING BEFORE SPLASH DISAPPEARS ====================
  useEffect(() => {
    const allModels = [
      ...cans.map((can) => can.modelPath),
      heroConfig.modelPath,
      ...newReleases.map((r) => r.modelPath),
    ];

    let loaded = 0;
    const total = allModels.length;

    Promise.all(
      allModels.map((path) =>
        new Promise((resolve) => {
          useGLTF.preload(path);
          // Fake mini progress simulation
          const timer = setInterval(() => {
            loaded += 1;
            setProgress(Math.floor((loaded / total) * 100));
            clearInterval(timer);
            resolve();
          }, 250);
        })
      )
    ).then(() => {
      // give small buffer for smoothness
      setTimeout(() => setIsLoaded(true), 600);
    });
  }, []);

  // ==================== SCROLL HANDLER ====================
  useEffect(() => {
    const handleScroll = () => {
      const scrollYvh = (window.scrollY / window.innerHeight) * 100;
      const cumulativeHeights = cans.map((can, i) =>
        cans.slice(0, i + 1).reduce((sum, c) => sum + (c.scrollHeight || 100), 0)
      );
      let newIndex = 0;
      for (let i = 0; i < cumulativeHeights.length; i++) {
        if (scrollYvh < cumulativeHeights[i]) {
          newIndex = i;
          break;
        }
      }
      if (newIndex !== activeIndex) setActiveIndex(newIndex);

      const aboutSection = document.querySelector("#about-section");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setShowMainContent(rect.top > window.innerHeight * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const activeCan = cans[activeIndex];

  // ==================== SPLASH SCREEN ====================
  if (!isLoaded) {
    return (
      <motion.div
        className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white font-display z-[9999]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/mabt2.png" // change this to your brand logo
          alt="Loading..."
          className="w-32 h-32 mb-6 animate-pulse"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-lime-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        <p className="mt-4 text-gray-400 tracking-wider text-sm">
          Loading Energy Assets... {progress}%
        </p>
      </motion.div>
    );
  }

  // ==================== MAIN PAGE (everything below stays same) ====================

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden font-body">
      
      <Navbar/>
      <AnimatePresence>
        {showMainContent && <Layout />}
      </AnimatePresence>

      <div
        style={{ height: `${cans.reduce((sum, can) => sum + (can.scrollHeight || 100), 0)}vh` }}
      />
      <AnimatePresence>
        {showMainContent && (
          <motion.div
            className="fixed inset-0 z-10 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCan.id}
                className="absolute inset-0 z-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  backgroundImage: `url(${activeCan.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.6) saturate(1.2)",
                }}
              />
            </AnimatePresence>

            <div className="relative z-10 w-1/2 h-screen flex flex-col justify-center items-start p-16">
              <motion.h2
                className="text-3xl mb-2 font-display tracking-wider"
                style={{ color: activeCan.highlightColor }}
                key={`${activeCan.id}-subtitle`}
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {activeCan.subtitle}
              </motion.h2>
              <motion.h1
                className="text-7xl font-display mb-4"
                key={`${activeCan.id}-title`}
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {activeCan.title}
              </motion.h1>
              <motion.p
                className="text-lg max-w-md text-gray-300"
                key={`${activeCan.id}-desc`}
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {activeCan.description}
              </motion.p>
              
              <motion.button
                className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold border-2 border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300"
                variants={textVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/products")}
              >
                <ShoppingCart size={22} />
                Shop Now
              </motion.button>
            </div>

            <div className="w-1/2 h-screen">
              <Canvas camera={{ fov: 40 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                <ambientLight intensity={0.4} />
                <directionalLight color={activeCan.modelGlowColor} position={[5, 5, 5]} intensity={1.8} />
                <directionalLight color="#ffffff" position={[-5, 3, 2]} intensity={0.6} />
                <Suspense fallback={null}>
                  <Environment preset="city" />
                  <CameraController targetPosition={activeCan.camera} />
                  <AnimatePresence mode="wait">
                    <ScrollShowcaseModel key={activeCan.id} {...activeCan} />
                  </AnimatePresence>
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="w-full md:w-1/2 h-[70vh]">
            <Canvas camera={{ fov: 50, position: heroConfig.camera }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <directionalLight color={heroConfig.modelGlowColor} position={[4, 4, 2]} intensity={2.5} />
                <directionalLight color="#ffffff" position={[-4, -2, 5]} intensity={1} />
                <Environment preset="city" />
                <Stars radius={80} depth={40} count={600} fade speed={0.5} />
                <HeroModel config={heroConfig} />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Suspense>
            </Canvas>
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

      <section className="relative w-full bg-[#111] py-20 px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 font-display">New Releases</h2>
        <p className="text-lg text-gray-400 max-w-2xl text-center mb-16">
          Explore the cutting edge of energy — crafted with bold flavors and a relentless drive for performance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
          {newReleases.map((release) => (
            <motion.div
              key={release.id}
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="relative w-full h-[400px] rounded-lg overflow-hidden"
                style={{ boxShadow: `0 0 40px ${release.glowColor}` }}
              >
                <ProductScene config={release} />
              </div>
              <h3 className="text-3xl font-bold mt-6 font-display" style={{ color: release.modelGlowColor }}>
                {release.title}
              </h3>
              <p className="text-gray-400 text-lg">{release.flavor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === COMPANY ABOUT + WHY US (shared video background) === */}
      <div className="relative w-full overflow-hidden border-t border-neutral-900">
        <SectionVideoBackground src={companySectionBg} />

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
    </div>
  );
}