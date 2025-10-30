import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function MagneticGlowCard() {
    const image="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58";
    const title="Card title here";
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-72 h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xl bg-black"
      style={{ perspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="w-full h-full rounded-3xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "translateZ(50px)" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-blue-500/40 mix-blend-overlay"
          style={{ transform: "translateZ(60px)" }}
        />
        <motion.h3
          className="absolute bottom-4 left-4 text-white text-lg font-semibold"
          style={{ transform: "translateZ(80px)" }}
        >
          {title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}
