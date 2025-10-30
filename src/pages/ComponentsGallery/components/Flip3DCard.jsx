// src/pages/ComponentsGallery/components/Flip3DCard.jsx
import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function Flip3DCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="flip-card w-90 h-48" onClick={handleFlip}>
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, animationDirection: 'normal' }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <motion.div
          className="flip-card-front absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex flex-col justify-between p-6 text-white">
            <div className="text-right">
              <div className="text-sm opacity-80">Premium</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">3D Card</div>
              <div className="text-sm opacity-90">Click to flip</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">•••• 4242</div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="flip-card-back absolute w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            rotateY: 180 
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex flex-col justify-between p-6 text-white">
            <div className="h-8 bg-gray-700 rounded-md mb-4"></div>
            <div className="space-y-2">
              <div className="text-right text-sm">CVV</div>
              <div className="h-8 bg-gray-600 rounded-md flex items-center justify-end px-3">
                <div className="w-12 h-4 bg-white rounded"></div>
              </div>
            </div>
            <div className="text-center text-sm opacity-80">
              This is the back side with additional information
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}