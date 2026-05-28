// @ts-nocheck
"use client";
import React, { useState, useCallback, memo } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import Link from "next/link";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Association", path: "/association" },
  { name: "Career", path: "/career" },
  { name: "Contact", path: "/contact" },
  { name: "Gallery", path: "/gallery" },
];

const Navbar = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleNav = useCallback((path) => {
    navigate(path);
    setMobileOpen(false);
  }, [navigate]);

  return (
    <>
      {/* ======= DESKTOP NAVBAR ======= */}
      <header className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-6 py-3 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg shadow-black/30">
        {/* Logo */}
        <button
          onClick={() => handleNav("/")}
          className="flex items-center gap-2 shrink-0 group"
        >
          <img
            src="/mLogo.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover shadow-[0_0_12px_rgba(0,255,255,0.5)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.9)] transition-all duration-300"
          />
          <span className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors hidden sm:block">
            Manash
          </span>
        </button>

        {/* CENTER: Links – desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => handleNav(link.path)}
                className={`relative px-3 py-1.5 text-[13px] font-medium rounded-full whitespace-nowrap transition-all duration-200
                  ${active
                    ? "text-cyan-400 bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNav("/signup")}
            className="hidden sm:block px-4 py-1.5 text-xs font-semibold rounded-full border border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_8px_rgba(0,255,255,0.3)] hover:shadow-[0_0_16px_rgba(0,255,255,0.6)]"
          >
            Sign Up
          </button>

          <button
            onClick={() => handleNav("/cart")}
            className="relative p-2 rounded-full border border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.3)] hover:shadow-[0_0_16px_rgba(0,255,255,0.6)] transition-all"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full bg-cyan-400 text-black text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-full border border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400 transition-all"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ======= MOBILE DRAWER ======= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <nav className="absolute top-0 right-0 h-full w-64 bg-neutral-950 border-l border-white/10 shadow-2xl flex flex-col pt-20 pb-8 px-6 gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.path)}
                  className={`text-left w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${active
                      ? "text-cyan-400 bg-white/10 shadow-[inset_0_0_10px_rgba(0,255,255,0.1)]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {link.name}
                </button>
              );
            })}
            <div className="mt-auto">
              <button
                onClick={() => handleNav("/signup")}
                className="w-full py-2.5 text-sm font-bold rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
