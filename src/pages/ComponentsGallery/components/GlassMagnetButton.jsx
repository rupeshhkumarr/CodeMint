import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function GlassMagnetButton({ label = "Hover me" }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        x.set(offsetX * 0.5);
        y.set(offsetY * 0.5);
    };

    return (
        <div className="w-72 h-72 bg-slate-800 rounded-xl flex items-center justify-center " >
            <motion.button
                ref={ref}
                className="relative bg-white/10 backdrop-blur-lg border border-white/30 rounded-full px-10 py-4 text-white cursor-pointer font-semibold tracking-wide shadow-md"
                style={{
                    x: springX,
                    y: springY,
                    boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {label ? label : "Hover me"}
            </motion.button>
        </div>
    );
}
