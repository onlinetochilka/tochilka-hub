import React, { useMemo } from "react";

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const angleRad = (angleDeg - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

// Generates a mathematically perfect gear path mimicking the reference
const createGearPath = () => {
  let d = "";
  const points = 8;
  const step = 360 / points;
  const rOuter = 95;
  const rInner = 65;

  for (let i = 0; i < points; i++) {
    const base = i * step;
    const a1 = base - 7;
    const a2 = base + 7;
    const a3 = base + 22.5 - 6;
    const a4 = base + 22.5 + 6;

    const p1 = polarToCartesian(100, 100, rOuter, a1);
    const p2 = polarToCartesian(100, 100, rOuter, a2);
    const p3 = polarToCartesian(100, 100, rInner, a3);
    const p4 = polarToCartesian(100, 100, rInner, a4);
    const pMid = polarToCartesian(100, 100, rInner - 8, base + 22.5);

    if (i === 0) d += `M ${p1.x} ${p1.y} `;
    else d += `L ${p1.x} ${p1.y} `;

    // Flat/slightly curved top of tooth
    d += `A ${rOuter} ${rOuter} 0 0 1 ${p2.x} ${p2.y} `;
    // Down to valley
    d += `L ${p3.x} ${p3.y} `;
    // Deep curved valley
    d += `Q ${pMid.x} ${pMid.y} ${p4.x} ${p4.y} `;
  }
  d += "Z";
  return d;
};

export default function GlassGear({ className }) {
  const gearPath = useMemo(() => createGearPath(), []);
  
  // SVG Mask that includes a central hole
  const gearMask = useMemo(() => {
    const holePath = `M100 100 m-25 0 a25 25 0 1 0 50 0 a25 25 0 1 0 -50 0`;
    const svgString = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="${gearPath} ${holePath}" fill="black" fill-rule="evenodd" stroke="black" stroke-width="4" stroke-linejoin="round" /></svg>`;
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(svgString)}')`;
  }, [gearPath]);

  return (
    <div className={`relative flex items-center justify-center ${className || "w-[380px] h-[380px] md:w-[480px] md:h-[480px]"}`}>
      
      {/* 1. Precise Geometric Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-70">
        {/* Diagonal crossing lines */}
        <div className="absolute w-[120%] h-[1px] bg-stone-300 rotate-45" />
        <div className="absolute w-[120%] h-[1px] bg-stone-300 -rotate-45" />
        {/* Vertical/Horizontal faint lines */}
        <div className="absolute w-[1px] h-[120%] bg-stone-300/50" />
        <div className="absolute w-[120%] h-[1px] bg-stone-300/50" />
        
        {/* Wireframe circles overlapping */}
        <div className="absolute w-[80%] h-[80%] rounded-full border border-stone-300/60" />
        <div className="absolute w-[45%] h-[45%] rounded-full border border-stone-300/40 translate-x-12 -translate-y-12" />
        <div className="absolute w-[100%] h-[100%] rounded-full border border-stone-300/30 -translate-x-6 translate-y-6" />
        
        {/* Loop accents */}
        <svg className="absolute w-[110%] h-[110%] text-stone-300/60 rotate-12" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <path d="M 150 50 C 180 20, 200 80, 160 100" />
          <path d="M 50 150 C 20 180, 0 120, 40 100" />
        </svg>
      </div>

      {/* 2. The Stacked Glass Layers */}
      <div className="relative w-[85%] h-[85%] flex items-center justify-center">
        
        {/* LAYER 1 (Base, largest) */}
        <div className="absolute w-[100%] h-[100%] animate-[spin_60s_linear_infinite]">
          {/* Blur Mask */}
          <div 
            className="absolute inset-0 bg-white/20 backdrop-blur-[6px] shadow-[0_16px_40px_rgba(0,101,132,0.1)]"
            style={{ maskImage: gearMask, WebkitMaskImage: gearMask, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
          />
          {/* Vector Stroke Edge */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-sm">
            <path d={gearPath} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinejoin="round" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
          </svg>
        </div>

        {/* LAYER 2 */}
        <div className="absolute w-[85%] h-[85%] animate-[spin_45s_linear_infinite_reverse]">
          <div 
            className="absolute inset-0 bg-white/30 backdrop-blur-[4px] shadow-[0_8px_20px_rgba(0,101,132,0.1)]"
            style={{ maskImage: gearMask, WebkitMaskImage: gearMask, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
          />
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-md">
            <path d={gearPath} fill="none" stroke="rgba(255,255,255,1)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>

        {/* --- Deep Accents hidden between layers --- */}
        <div className="absolute w-[95%] h-[95%] animate-[spin_20s_ease-in-out_infinite_alternate]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Top Left Blue Swish */}
            <path d="M 30 100 A 70 70 0 0 1 80 35" fill="none" stroke="#006584" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
            <path d="M 40 100 A 60 60 0 0 1 85 45" fill="none" stroke="#006584" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            
            {/* Bottom Right Red Swish */}
            <path d="M 160 90 A 60 60 0 0 1 110 155" fill="none" stroke="#B71234" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
          </svg>
        </div>

        {/* LAYER 3 */}
        <div className="absolute w-[70%] h-[70%] animate-[spin_35s_linear_infinite]">
          <div 
            className="absolute inset-0 bg-white/40 backdrop-blur-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
            style={{ maskImage: gearMask, WebkitMaskImage: gearMask, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
          />
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-lg">
            <path d={gearPath} fill="none" stroke="rgba(255,255,255,1)" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>

        {/* LAYER 4 (Innermost gear step) */}
        <div className="absolute w-[55%] h-[55%] animate-[spin_25s_linear_infinite_reverse]">
          <div 
            className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"
            style={{ maskImage: gearMask, WebkitMaskImage: gearMask, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
          />
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-xl">
            <path d={gearPath} fill="none" stroke="rgba(255,255,255,1)" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="2" />
          </svg>
        </div>
        
      </div>

      {/* 3. Center Core Hub */}
      <div className="absolute w-[18%] h-[18%] animate-[spin_20s_linear_infinite_reverse]">
        {/* Outer glass ring of the core */}
        <div className="absolute inset-0 rounded-full bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_16px_rgba(0,101,132,0.2)] flex items-center justify-center p-2">
          {/* Inner Navy ring */}
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#002845] to-[#006584] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center border-2 border-white/50">
            {/* Center Red Dot */}
            <div className="w-[45%] h-[45%] rounded-full bg-[#B71234] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_0_8px_rgba(183,18,52,0.6)]" />
          </div>
        </div>
      </div>

      {/* Floating glass fragment accents */}
      <div className="absolute inset-0 animate-[spin_30s_ease-in-out_infinite]">
        <div className="absolute top-[30%] left-[25%] w-8 h-8 bg-white/40 backdrop-blur-md rounded-md rotate-12 border border-white" />
        <div className="absolute bottom-[25%] right-[20%] w-4 h-12 bg-[#006584]/20 backdrop-blur-sm rounded-full -rotate-45 border border-white/50" />
      </div>

    </div>
  );
}
