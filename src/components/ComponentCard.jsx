import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Menu, Star, Check, ArrowRight, Sparkles } from 'lucide-react';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       when: 'beforeChildren',
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.95, y: 20 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.35, ease: 'easeOut' },
//   },
// };

// Product Card Component
const ProductCard = ({ product, onClick, index }) => {
  return (
    <motion.div
      layout // biarkan Framer Motion menghitung layout changes
      initial={{ opacity: 0, y: 10 }} // entry sederhana
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: 'easeOut', delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="relative group cursor-pointer rounded-2xl bg-white shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 hover:border-amber-400 transition-all duration-300"
    >
      {/* Image area — TETAP dan konsisten tingginya */}
      <div className="overflow-hidden h-64 md:h-72">
        <img src={product.images?.[0] ?? product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-extrabold text-gray-900 text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-amber-600 font-bold text-base mb-2">{product.price}</p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-amber-400 fill-current" />
            ))}
          </div>
          <span className="text-xs text-gray-500">{(product.images || []).length} Foto</span>
        </div>
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
