import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Globe, Calculator, Microscope, PenTool, FileText, CalendarDays, Compass, Library, LineChart, Lightbulb } from 'lucide-react';

const icons = [
  { Icon: BookOpen, top: '15%', left: '10%', size: 40, delay: 0 },
  { Icon: Globe, top: '25%', left: '80%', size: 48, delay: 1 },
  { Icon: Calculator, top: '65%', left: '15%', size: 36, delay: 2 },
  { Icon: Microscope, top: '10%', left: '60%', size: 52, delay: 0.5 },
  { Icon: GraduationCap, top: '80%', left: '75%', size: 44, delay: 1.5 },
  { Icon: PenTool, top: '45%', left: '5%', size: 32, delay: 2.5 },
  { Icon: LineChart, top: '75%', left: '45%', size: 40, delay: 0.8 },
  { Icon: Lightbulb, top: '40%', left: '90%', size: 36, delay: 1.2 },
  { Icon: Compass, top: '85%', left: '25%', size: 48, delay: 1.8 },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef1f5] to-white/50" />
      
      {icons.map((item, index) => {
        const { Icon, top, left, size, delay } = item;
        return (
          <motion.div
            key={index}
            className="absolute text-brand-navy/10"
            style={{ top, left }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 8 + (index % 4) * 2, // Varied duration
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </div>
  );
}
