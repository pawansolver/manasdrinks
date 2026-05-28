// @ts-nocheck
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  {
    id: 1,
    type: "photo",
    title: "Apex Legends Partnership",
    src: "/posterCollabs/apexMonster.jpg",
    description: "Monster Energy limited edition partnership with Apex Legends, featuring custom in-game skins."
  },
  {
    id: 2,
    type: "video",
    title: "Adrenaline Surge Promo",
    src: "/avatars/mon.webm",
    thumbnail: "/posterCollabs/monstereall.jpeg",
    description: "Official promotional trailer showcasing high-octane branding and athlete sponsorships."
  },
  {
    id: 3,
    type: "photo",
    title: "Call of Duty Promo",
    src: "/posterCollabs/codmonster.png",
    description: "Exclusive Call of Duty double XP codes and custom brand packaging."
  },
  {
    id: 4,
    type: "photo",
    title: "Red Bull Collaboration",
    src: "/posterCollabs/redbullcollab.jpg",
    description: "Corporate collaboration highlighting performance-driven extreme sports integrations."
  },
  {
    id: 5,
    type: "photo",
    title: "Extreme Skateboarding",
    src: "/crousel/1a.jpg",
    description: "Athletes performing top-tier stunts under our active brand sponsorship."
  },
  {
    id: 6,
    type: "video",
    title: "Skater Trick Highlights",
    src: "https://assets.mixkit.co/videos/preview/mixkit-extreme-sport-skater-doing-tricks-in-a-park-34288-large.mp4",
    thumbnail: "/crousel/10th.jpg",
    description: "Slow-motion skateboard tricks highlighting precision, energy, and determination."
  },
  {
    id: 7,
    type: "photo",
    title: "F1 Racing Grid Logo",
    src: "/posterCollabs/redbullcollabs.avif",
    description: "Representing our energy presence at major F1 grand prix races globally."
  },
  {
    id: 8,
    type: "photo",
    title: "Monster Energy Showcase",
    src: "/crousel/11th.jpg",
    description: "Our signature original green glow cans arrayed for display."
  },
  {
    id: 9,
    type: "photo",
    title: "Cyberpunk Neon Can",
    src: "/crousel/la.png",
    description: "Futuristic digital design concept featuring holographic neon energy formulas."
  }
];

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-40 pb-20 px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase mb-4"
          >
            Photo & Video <span className="text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Capture the energy. View the latest highlights, collaborations, and extreme event media from around the globe.
          </motion.p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center gap-4 mb-12">
          {["all", "photo", "video"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 border ${
                filter === type
                  ? "bg-lime-400 text-black border-lime-400 font-bold shadow-[0_0_15px_rgba(163,230,53,0.4)]"
                  : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600"
              }`}
            >
              {type === "all" ? "Show All" : `${type}s`}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:border-lime-400/40 hover:shadow-lime-500/5 transition-all duration-300"
                onClick={() => setActiveItem(item)}
              >
                {/* Media Container */}
                <div className="aspect-[4/3] bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                  {item.type === "video" ? (
                    <>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-14 h-14 bg-lime-400/90 text-neutral-900 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 shadow-[0_0_15px_rgba(163,230,53,0.6)] transition-all duration-300">
                          ▶
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-lime-400 border border-lime-400/30 px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 text-white text-3xl font-light hover:text-lime-400 transition-colors"
            >
              ✕
            </button>

            {/* Media Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-4xl w-full max-h-[75vh] flex items-center justify-center overflow-hidden mb-6"
            >
              {activeItem.type === "video" ? (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[75vh] rounded-lg shadow-2xl border border-white/10"
                />
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
              )}
            </motion.div>

            {/* Media Info */}
            <div className="text-center max-w-xl px-4">
              <h3 className="text-2xl font-bold text-white mb-2">{activeItem.title}</h3>
              <p className="text-neutral-400 text-sm">{activeItem.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
