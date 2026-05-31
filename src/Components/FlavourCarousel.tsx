// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// ── Media Data ────────────────────────────────────────────────────────────────
const PHOTOS = [
  { id: 1,  src: "/brand/image.png",       title: "Brand 1" },
  { id: 2,  src: "/brand/image copy.png",  title: "Brand 2" },
  { id: 3,  src: "/brand/image copy 2.png",  title: "Brand 3" },
  { id: 4,  src: "/brand/image copy 3.png",  title: "Brand 4" },
  { id: 5,  src: "/brand/image copy 4.png",  title: "Brand 5" },
  { id: 6,  src: "/brand/image copy 5.png",  title: "Brand 6" },
  { id: 7,  src: "/brand/image copy 6.png",  title: "Brand 7" },
  { id: 8,  src: "/brand/image copy 7.png",  title: "Brand 8" },
  { id: 9,  src: "/brand/image copy 8.png",  title: "Brand 9" },
  { id: 10, src: "/brand/image copy 9.png",  title: "Brand 10" },
  { id: 11, src: "/brand/image copy 10.png", title: "Brand 11" },
  { id: 12, src: "/brand/image copy 11.png", title: "Brand 12" },
  { id: 13, src: "/brand/image copy 12.png", title: "Brand 13" },
  { id: 14, src: "/brand/image copy 13.png", title: "Brand 14" },
  { id: 15, src: "/brand/image copy 14.png", title: "Brand 15" },
  { id: 16, src: "/brand/image copy 15.png", title: "Brand 16" },
  { id: 17, src: "/brand/image copy 16.png", title: "Brand 17" },
];

const VIDEOS = [
  { id: 1,  src: "/bg/thunder.mp4",    title: "Thunder",    poster: "/bg/redblue.jpg" },
  { id: 2,  src: "/bg/splash.mp4",     title: "Splash",     poster: "/bg/blue.jpg" },
  { id: 3,  src: "/avatars/mon.webm",  title: "Monster",    poster: "/bg/monsterBg.png" },
  { id: 4,  src: "/bg/20260528-0625-09.3573016.mp4", title: "Brand Story", poster: "/bg/about_beverage_bg.png" },
];

// ── Shared Carousel Logic ─────────────────────────────────────────────────────
function MediaCarousel({ items, isVideo }) {
  const total    = items.length;
  const MIN_IDX  = Math.min(2, total - 1);
  const MAX_IDX  = Math.max(MIN_IDX, total - 3);

  const [index, setIndex] = useState(MIN_IDX);
  const controls          = useAnimation();
  const intervalRef       = useRef(null);
  const videoRefs         = useRef({});

  const tilt        = 5;
  const spacing     = 340;
  const scaleFactor = 0.1;
  const yOffset     = 38;

  const getCardStyle = (i) => {
    const offset   = i - index;
    return {
      x:      offset * spacing,
      rotate: offset * tilt,
      scale:  1 - Math.abs(offset) * scaleFactor,
      y:      Math.abs(offset) * yOffset,
    };
  };

  const setSafeIndex = (newIndex) => {
    if (newIndex >= MIN_IDX && newIndex <= MAX_IDX) {
      setIndex(newIndex);
      return true;
    }
    return false;
  };

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        return next > MAX_IDX ? MIN_IDX : next;
      });
    }, 3000);
  };

  useEffect(() => {
    setIndex(MIN_IDX);
    startAutoScroll();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [items]);

  // Pause/play videos based on active index
  useEffect(() => {
    if (!isVideo) return;
    Object.entries(videoRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const itemIdx = items.findIndex((v) => String(v.id) === String(id));
      if (itemIdx === index) {
        el.play().catch(() => {});
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [index, isVideo, items]);

  const handleDragEnd = (_, info) => {
    const { x: dist } = info.offset;
    const { x: vel  } = info.velocity;
    let newIdx = index;
    let moved  = false;

    if      (vel  < -500) { newIdx = index + 1; moved = true; }
    else if (vel  >  500) { newIdx = index - 1; moved = true; }
    else if (dist < -100) { newIdx = index + 1; moved = true; }
    else if (dist >  100) { newIdx = index - 1; moved = true; }

    if (setSafeIndex(newIdx) || moved) startAutoScroll();
  };

  const handleHoverStart = (i) => {
    if (i !== index) return;
    controls.start({ rotate: [0, 1, -1, 1, 0], scale: 1.05, transition: { duration: 0.8, ease: "easeInOut" } });
  };
  const handleHoverEnd = (i) => {
    if (i !== index) return;
    controls.start({ rotate: 0, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } });
  };

  return (
    <motion.div
      className="relative w-full flex items-center justify-center h-[500px] overflow-hidden"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.05}
      onDragStart={() => { if (intervalRef.current) clearInterval(intervalRef.current); }}
      onDragEnd={handleDragEnd}
    >
      {/* Side blackout masks */}
      <div className="absolute left-0 top-0 h-full w-[22%] bg-black z-50 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[22%] bg-black z-50 pointer-events-none" />

      {items.map((item, i) => {
        const style  = getCardStyle(i);
        const offset = i - index;
        if (Math.abs(offset) > 3) return null;
        const isCenter = offset === 0;

        return (
          <motion.div
            key={item.id}
            className="absolute flex flex-col items-center gap-4 cursor-pointer select-none"
            onClick={() => setSafeIndex(i)}
            animate={style}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ zIndex: 100 - Math.abs(offset), pointerEvents: isCenter ? "auto" : "none" }}
            onHoverStart={() => handleHoverStart(i)}
            onHoverEnd={() => handleHoverEnd(i)}
          >
            <motion.div
              animate={isCenter ? controls : undefined}
              className={`w-64 h-80 rounded-2xl overflow-hidden transition-all duration-500 border-4 ${
                isCenter
                  ? "shadow-[0_0_80px_#00ff00] border-[#00ff00]"
                  : "shadow-[0_0_40px_#00ff00b3] opacity-70 border-transparent"
              }`}
            >
              {isVideo ? (
                <video
                  ref={(el) => { videoRefs.current[item.id] = el; }}
                  src={item.src}
                  poster={item.poster}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </motion.div>

            <p className={`text-xl font-bold italic ${isCenter ? "text-[#00ff00]" : "text-gray-400"}`}>
              {item.title}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
const FlavourCarousel = () => {
  const [tab, setTab] = useState("photos"); // "photos" | "videos"

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative py-12">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">
        Video &amp; Photo <span className="text-[#00ff00]">Gallery</span>
      </h1>

      {/* Toggle buttons */}
      <div className="flex gap-2 mb-10 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-sm">
        <button
          onClick={() => setTab("photos")}
          className={`px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
            tab === "photos"
              ? "bg-[#00ff00] text-black shadow-[0_0_20px_rgba(0,255,0,0.5)]"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          📷 Photos
        </button>
        <button
          onClick={() => setTab("videos")}
          className={`px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
            tab === "videos"
              ? "bg-[#00ff00] text-black shadow-[0_0_20px_rgba(0,255,0,0.5)]"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          🎬 Videos
        </button>
      </div>

      {/* Carousel */}
      {tab === "photos" ? (
        <MediaCarousel key="photos" items={PHOTOS} isVideo={false} />
      ) : (
        <MediaCarousel key="videos" items={VIDEOS} isVideo={true} />
      )}

      {/* Top/bottom polish gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
};

export default FlavourCarousel;