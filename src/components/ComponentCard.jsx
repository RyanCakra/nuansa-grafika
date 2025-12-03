import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Menu, Star, Check, ArrowRight, Sparkles } from 'lucide-react';

// Product Card Component
const ProductCard = ({ product, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="relative group cursor-pointer rounded-2xl bg-white shadow-lg hover:shadow-2xl overflow-hidden border-t-4 border-amber-400/0 hover:border-amber-500 transition-all duration-300"
    >
      {/* Image */}
      <div className="overflow-hidden h-48 md:h-64">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-extrabold text-gray-900 text-xl mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-amber-600 font-bold text-base mb-2">{product.price}</p>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="flex items-center mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-amber-400 fill-current" />
          ))}
        </div>
      </div>

      {/* CTA/Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="bg-amber-400 text-gray-900 px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
          Detail Produk <ArrowRight size={16} />
        </span>
      </div>
    </motion.div>
  );
};

// Category Button
const CategoryButton = ({ category, active, onClick, index }) => {
  const Icon = category.icon;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl font-semibold transition-all w-32 h-32 text-center flex-shrink-0 shadow-lg ${
        active ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900 ring-4 ring-amber-200 scale-105' : 'bg-white text-gray-700 hover:bg-amber-50 hover:shadow-xl'
      }`}
    >
      <Icon size={24} className="mb-2" />
      <span className="text-xs line-clamp-2">{category.name}</span>
    </motion.button>
  );
};

export { ProductCard, CategoryButton };
