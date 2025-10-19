// src/pages/ComponentsGallery/components/AnimatedCard.jsx
const AnimatedCard = () => {
  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Animated Card
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Hover over me to see the animation!
        </p>
      </div>
    </div>
  );
};

export default AnimatedCard;
