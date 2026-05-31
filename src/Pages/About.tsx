// @ts-nocheck
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";

// ── helpers ──────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

const SectionTitle = ({ children, accent = "#22c55e" }) => (
  <h2
    className="text-3xl md:text-4xl font-extrabold mb-6"
    style={{ color: accent }}
  >
    {children}
  </h2>
);

const BulletItem = ({ label, value }) => (
  <div className="flex flex-wrap gap-2 py-1.5 border-b border-white/10">
    <span className="text-green-400 font-semibold min-w-[220px]">{label}</span>
    <span className="text-neutral-200">{value}</span>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function About() {
  const [gpTab, setGpTab] = useState("overview");

  // ── Manash data ──────────────────────────────────────────────────────────
  const keyAspects = [
    {
      title: "History",
      color: "#22c55e",
      content:
        "MANASH BEVERAGE started its journey in 2015 in the segment of water industry. MANASH established the water plant for NEELJAL COMPANY in 2011 in Muzaffarpur, then continued its journey in collaboration with ENERGY BEVERAGES PVT LTD, Brand Name CLEAR Water Plant in MUZAFFARPUR in 2021. MANASH BEVERAGE successfully established another plant of G20 WATER plant in HAZIPUR in 2023-24.",
    },
    {
      title: "Market Leadership",
      color: "#22c55e",
      content:
        "MANASH BEVERAGE has a significant market share in the Indian Water Industry, with AROUND 3 operational plants and a vast distribution network in 22 districts of Bihar with a strong network of Sales Team.",
    },
    {
      title: "Product Line",
      color: "#22c55e",
      content:
        "Besides its namesake brands also established and distributes a premium drinking water.",
    },
    {
      title: "Expansion",
      color: "#22c55e",
      content:
        "MANASH BEVERAGE has expanded its operations both within BIHAR and into neighboring states like Jharkhand and Chhattisgarh.",
    },
    {
      title: "Ownership",
      color: "#22c55e",
      content: (
        <>
          MANASH BEVERAGE is an unlisted Proprietor based company under{" "}
          <strong>GSTN: 10AWGPR6556A1ZT</strong>.{" "}
          <strong>Dr. Reetu Raj</strong> is a Sole Proprietor of the Company.
        </>
      ),
    },
    {
      title: "Financial Performance",
      color: "#22c55e",
      content:
        "The company's revenue and profits have shown significant growth in recent years, indicating a strong and successful business model.",
    },
    {
      title: "Distribution",
      color: "#22c55e",
      content:
        "MANASH BEVERAGE has a robust distribution network, including 150 distributors, 4000 retailers and 250 distribution trucks tied up with the transport companies. They also sell their products through their own e-commerce platform and other online retailers.",
    },
  ];

  // ── Green Packsys data ───────────────────────────────────────────────────
  const gpProducts = [
    { code: "STP", name: "Sewage Treatment Plants" },
    { code: "ETP", name: "Effluent Treatment Plants" },
    {
      code: "RO",
      name: "Reverse Osmosis Plants (For Commercial / Industrial Use)",
    },
    { code: "DM", name: "De-Mineralized Water Plant" },
    { code: "—", name: "Water Softeners Plants" },
    { code: "—", name: "Ultra Filtration Plants for Contaminated Area" },
    {
      code: "—",
      name: "Water Treatment Plant for Microbial and Chemical Infected Area",
    },
  ];

  const gpClients = {
    Corporate: "Lords Group, Innodata India Pvt. Ltd., HCL, L&T, CLEAR Water, G20 Water, and many more.",
    "Schools / Colleges":
      "DAV, DPS, GD Goenka, Manash International, Gurukul Academy, NIIT, S S Academy and many more.",
    Hospitals:
      "SS YADAV Hospital, Jindal's, Amex Nursing Home, Apollo Pharmacy, Nidan Hospital and many more.",
  };

  const gpBasicInfo = [
    { label: "Nature of Business", value: "Manufacturer / Supplier" },
    { label: "Company GST", value: "10ASBPK2100N2ZD" },
    { label: "Company CEO", value: "Neel Kamal" },
    { label: "Company GM – Sales & Marketing", value: "Rohit Sharma" },
  ];

  const gpOurBase = [
    "State-of-the-art infrastructure",
    "High-quality products",
    "Experienced quality auditors",
    "Affordable pricing policy",
    "Timely delivery",
    "24×7 Service",
    "Ethical business practices",
  ];

  return (
    <div className="bg-[#0a0a0a] text-neutral-200 min-h-screen font-sans overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-green-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-700/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-28 pb-24 space-y-28">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <motion.section {...fadeUp()} className="text-center">
            {/* Logo image */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src="/logo/MANASH_LOGO.jpg__1_-removebg-preview.png"
                  alt="Manash Beverage Logo"
                  className="w-full h-full object-contain"
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(34,197,94,0.3))",
                  }}
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="text-white">MANASH </span>
              <span className="text-green-400">BEVERAGE</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              An Indian Company under proprietorship having its head office at{" "}
              <span className="text-green-400 font-semibold">
                Sutapatti, Muzaffarpur Bihar – 842001
              </span>
              . Established one plant (Capacity 120 BPM) of{" "}
              <strong className="text-white">CLEAR WATER</strong> in
              Muzaffarpur industrial area and another plant (Capacity 90 BPM)
              of{" "}
              <strong className="text-white">G-20 WATER</strong> in Hazipur
              industrial area.
            </p>
          </motion.section>

          {/* ── MARKETING PARAGRAPH ───────────────────────────────────── */}
          <motion.section {...fadeUp(0.1)}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm leading-relaxed text-neutral-300 text-[15px]">
              We are marketing the products of Frojo Group Beverages based in
              Assam, Royal Challenge Packaged Drinking Water, Jimmy's Cocktails,
              Rockwell Refrigeration, Voltas Refrigerators and Packaged Dry
              Fruits in Bihar. Apart from, company is dealing with CCTV cameras
              and household electronics items in Bihar and Jharkhand by its own
              imports in collaboration with the channel partners.
            </div>
          </motion.section>

          {/* ── STATS ROW ─────────────────────────────────────────────── */}
          <motion.section {...fadeUp(0.15)}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stat: "3", label: "Operational Plants" },
                { stat: "22", label: "Districts in Bihar" },
                { stat: "150+", label: "Distributors" },
                { stat: "4000+", label: "Retail Partners" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.08)}
                  className="bg-white/5 border border-green-500/20 rounded-2xl p-6 text-center hover:border-green-400/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.2)] transition-all duration-300"
                >
                  <p className="text-4xl font-black text-green-400">{s.stat}</p>
                  <p className="text-sm text-neutral-400 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── KEY ASPECTS OF MANASH BEVERAGE ───────────────────────── */}
          <motion.section {...fadeUp()}>
            <SectionTitle>Key Aspects of MANASH BEVERAGES</SectionTitle>
            <div className="space-y-5">
              {keyAspects.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.07)}
                  className="flex gap-4 items-start bg-white/4 border border-white/8 rounded-xl p-5 hover:border-green-500/40 hover:bg-green-950/20 transition-all duration-300"
                >
                  <div className="mt-1 min-w-[10px] h-[10px] rounded-full bg-green-400 shadow-[0_0_8px_#22c55e]" />
                  <div>
                    <h3 className="text-green-400 font-bold text-lg mb-1">
                      {item.title}:
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── BRAND SLIDER ──────────────────────────────────────────── */}
          <motion.section {...fadeUp()}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-400 mb-8 text-center tracking-wide">
              Our Brand Partners
            </h2>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 py-4">
              {/* Top fade masks */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
              {/* Track — duplicated for seamless loop */}
              <div
                className="flex gap-8 brand-slider-track"
                style={{ width: "max-content" }}
              >
                {[...Array(2)].flatMap((_, set) =>
                  [
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
                  ].map((src, i) => (
                    <div
                      key={`${set}-${i}`}
                      className="flex-shrink-0 w-36 h-24 rounded-xl overflow-hidden bg-white/8 border border-white/10 flex items-center justify-center hover:border-green-400/50 hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                      <img
                        src={src}
                        alt={`Brand ${i + 1}`}
                        className="max-w-full max-h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Inline keyframes for the slider + pause on hover */}
            <style>{`
              .brand-slider-track {
                animation: brandSlide ${17 * 1.5}s linear infinite;
              }
              .brand-slider-track:hover {
                animation-play-state: paused;
              }
              @keyframes brandSlide {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </motion.section>

          {/* ── DIVIDER ───────────────────────────────────────────────── */}
          <div className="border-t border-white/10 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-6 text-green-400 text-sm font-semibold tracking-widest uppercase">
              Our Sister Company
            </div>
          </div>

          {/* ── GREEN PACKSYS HERO ────────────────────────────────────── */}
          <motion.section {...fadeUp()} className="text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              <span className="text-white">GREEN </span>
              <span className="text-green-400">PACKSYS </span>
              <span className="text-white">SOLUTIONS</span>
            </h2>
            <div className="mt-2 text-green-400 underline underline-offset-4 text-lg font-semibold">
              GREEN PACKSYS SOLUTIONS
            </div>
          </motion.section>

          {/* ── GP TABS ───────────────────────────────────────────────── */}
          <motion.section {...fadeUp()}>
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-xl mb-8 border border-white/10">
              {["overview", "products", "clients", "info"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setGpTab(tab)}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold capitalize transition-all duration-300 ${
                    gpTab === tab
                      ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab === "overview"
                    ? "Overview"
                    : tab === "products"
                    ? "Products"
                    : tab === "clients"
                    ? "Clients"
                    : "Company Info"}
                </button>
              ))}
            </div>

            {/* ── Overview ── */}
            {gpTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 text-[15px] text-neutral-300 leading-relaxed"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p>
                    Founded in 2015,{" "}
                    <span className="text-green-400 font-semibold">
                      Green Packsys Solutions
                    </span>{" "}
                    has quickly earned a reputation as a distinguished
                    Manufacturer, Retailer, and Supplier of advanced systems for
                    Mineral/Packaged Drinking Water Bottling Plants, Carbonated
                    Soft Drink Plants, Fruit Juice Plants, Liquid Filling
                    Machines, and a variety of other specialized equipment.
                    Our state-of-the-art solutions are meticulously engineered to
                    meet the diverse needs of our clientele, positioning us as a
                    trusted partner in the packaging and beverage production
                    industry.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p>
                    At the heart of our operations lies a deep commitment to
                    exceeding customer expectations. We place immense value on
                    the delivery of exceptional quality products, ensuring that
                    every system we offer is designed with precision and built to
                    last. Our offerings are crafted to not only meet but surpass
                    the industry standards, providing customers with solutions
                    that are reliable, efficient, and tailored to their specific
                    operational requirements.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p>
                    The remarkable growth and success that{" "}
                    <span className="text-green-400 font-semibold">
                      Green Packsys Solutions
                    </span>{" "}
                    has achieved in a highly competitive market can be directly
                    attributed to the visionary leadership of{" "}
                    <strong className="text-white">Mr. Neel Kamal</strong>. His
                    unwavering support, strategic direction, and commitment to
                    excellence have been instrumental in shaping our company's
                    trajectory, empowering us to continuously expand our reach
                    and capabilities.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="mb-4 text-green-400 font-semibold text-base">
                    GREEN PACKSYS SOLUTIONS — Wide Industry Presence:
                  </p>
                  <p>
                    Widely known in the water treatment industry, as an
                    established and reliable supply partner. With over 10 years'
                    experience, offering the best most competitive prices using
                    components from leading manufacturers like{" "}
                    <span className="text-green-400">
                      Dow Chemicals, Hydromantic, Grundfos, Pentair, Lubin,
                      H-Guru
                    </span>{" "}
                    and many others. Reliable after sales, and prompt service is
                    our promise, with over 50 skilled service engineers in all
                    over India.
                  </p>
                </div>

                {/* Why Us */}
                <div className="bg-white/5 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-green-400 font-bold text-lg mb-3">
                    Why Us?
                  </h3>
                  <p className="mb-3">
                    We are engaged in the provision of a qualitative array of
                    machines for different industries. These are manufactured in
                    compliance with industrial quality guidelines using premium
                    quality raw materials. Their quality is inspected on multiple
                    parameters before dispatch by our team of quality analysts.
                  </p>
                  <p className="mb-4">
                    Customer is never out of choices but we channelize all our
                    resources and back up team to keep our plants in perfect
                    running condition even after warranty period.
                  </p>
                  <p className="text-green-400 font-semibold mb-2">Our base is:</p>
                  <ul className="space-y-1.5">
                    {gpOurBase.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vision */}
                <div className="bg-gradient-to-r from-green-950/40 to-emerald-950/30 border border-green-500/30 rounded-2xl p-6">
                  <h3 className="text-green-400 font-bold text-lg mb-2">
                    Our Vision & Mission
                  </h3>
                  <p>
                    We invest in research and development and through constant
                    innovations. We aim to develop most cost-effective plants
                    critical to our customers operations, improve their
                    productivity, and support their success.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── Products ── */}
            {gpTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-neutral-400 mb-6">
                  Green Packsys Solutions manufactures and supplies a wide range
                  of water treatment and industrial plant solutions:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {gpProducts.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-green-400/40 hover:bg-green-950/20 transition-all"
                    >
                      <span className="text-green-400 font-black text-sm min-w-[36px]">
                        {p.code !== "—" ? p.code : "✦"}
                      </span>
                      <span className="text-neutral-200 text-sm font-medium leading-snug">
                        {p.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h3 className="text-green-400 font-bold mb-2">
                      Products and Services
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      RO Plants Industrial and Commercial, Sewage Treatment Plant
                      (STP), Effluent Treatment Plant (ETP), DM Water Plant, EDI
                      Plant and Water Softeners. We have a large footprint in
                      North India, whereby we supply our plants on a sale as well
                      as rental basis, AMC services provided.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      {
                        label: "Quality Measures / Testing Facilities",
                        value: "Yes",
                      },
                      { label: "Customized Packaging", value: "Yes" },
                      {
                        label: "Payment Mode",
                        value: "Cheque / Online transfer / DD / Bank Transfer",
                      },
                      { label: "Shipment Mode", value: "By Road" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/10 rounded-xl p-4"
                      >
                        <p className="text-green-400 text-xs font-semibold mb-1">
                          {item.label}
                        </p>
                        <p className="text-white font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Clients ── */}
            {gpTab === "clients" && (
              <motion.div
                key="clients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {Object.entries(gpClients).map(([cat, names], i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-green-400/30 transition-all"
                  >
                    <h3 className="text-green-400 font-bold text-base mb-2">
                      {cat}:
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {names}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ── Company Info ── */}
            {gpTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-green-400 font-bold text-lg mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-2">
                    {gpBasicInfo.map((item, i) => (
                      <BulletItem key={i} label={item.label} value={item.value} />
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-green-400 font-bold text-lg mb-4">
                    Company USP
                  </h3>
                  <BulletItem
                    label="Quality Measures / Testing Facilities"
                    value="Yes"
                  />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-green-400 font-bold text-lg mb-4">
                    Packaging / Payment and Shipment Details
                  </h3>
                  <div className="space-y-2">
                    <BulletItem label="Customized Packaging" value="Yes" />
                    <BulletItem
                      label="Payment Mode"
                      value="Cheque / Online transfer / DD / Bank Transfer"
                    />
                    <BulletItem label="Shipment Mode" value="By Road" />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* ── FOOTER BANNER ─────────────────────────────────────────── */}
          <motion.section
            {...fadeUp()}
            className="text-center bg-gradient-to-r from-green-950/50 to-emerald-950/40 border border-green-500/30 rounded-3xl p-8 md:p-12"
          >
            <p className="text-green-400 font-black text-2xl md:text-3xl mb-2">
              For MANASH BEVERAGE
            </p>
            <div className="h-px w-48 bg-green-500/40 mx-auto my-4" />
            <p className="text-neutral-400 text-sm">
              H/O: Kamlubabu Campus, Near IDBI Bank, Sutapatti, Muzaffarpur,
              Bihar – 842001 &nbsp;|&nbsp; Ph: +91 7042626210
            </p>
            <p className="text-neutral-400 text-sm mt-1">
              Email:{" "}
              <a
                href="mailto:hr@manashbeverage.in"
                className="text-green-400 hover:underline"
              >
                hr@manashbeverage.in
              </a>{" "}
              /{" "}
              <a
                href="mailto:enquiry@manashbeverage.in"
                className="text-green-400 hover:underline"
              >
                enquiry@manashbeverage.in
              </a>
            </p>
          </motion.section>
        </main>
      </div>
    </div>
  );
}