import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

export default function ProductCard({ product }) {
  const images = product.imageUrls || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstImageLoading, setIsFirstImageLoading] = useState(true);

  // Auto image slide
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden"
    >
      {/* Image Slider */}
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden flex items-center justify-center">
        
        {/* ✅ Show loader ONLY for first image */}
        {currentIndex === 0 && isFirstImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <LoadingAnimation />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={product.name}
            onLoad={() => {
              if (currentIndex === 0) {
                setIsFirstImageLoading(false);
              }
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-contain p-4 absolute"
          />
        </AnimatePresence>

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {product.labelledPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">
                Rs. {product.labelledPrice.toLocaleString()}
              </p>
            )}
            <p className="text-lg font-bold text-green-600">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>

          <Link
            to={`/productoverview/${product.productId}`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm active:scale-95 transition"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
