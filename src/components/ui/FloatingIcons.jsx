import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Globe, Calculator, Microscope, PenTool, LineChart, Lightbulb, Compass } from 'lucide-react';

const icons = [
  { Icon: BookOpen, top: '12%', left: '8%', size: 28, delay: 0 },
  { Icon: Globe, top: '22%', left: '82%', size: 32, delay: 1 },
  { Icon: Calculator, top: '60%', left: '12%', size: 24, delay: 2 },
  { Icon: Microscope, top: '8%', left: '58%', size: 34, delay: 0.5 },
  { Icon: GraduationCap, top: '78%', left: '78%', size: 30, delay: 1.5 },
  { Icon: PenTool, top: '42%', left: '4%', size: 22, delay: 2.5 },
  { Icon: LineChart, top: '72%', left: '42%', size: 28, delay: 0.8 },
  { Icon: Lightbulb, top: '38%', left: '92%', size: 24, delay: 1.2 },
  { Icon: Compass, top: '88%', left: '22%', size: 30, delay: 1.8 },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const { Icon, top, left, size, delay } = item;
        return (
          <motion.div
            key={index}
            className="absolute text-brand-navy/[0.06]"
            style={{ top, left }}
            animate={{
              y: [0, -14, 0],
              x: [0, 7, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{
              duration: 10 + (index % 4) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <Icon size={size} strokeWidth={1} />
          </motion.div>
        );
      })}
    </div>
  );
}
