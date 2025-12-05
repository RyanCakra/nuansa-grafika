import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Menu, Star, Check, Package, FileText, Image, Shirt, Printer, Book, Sticker, Tag, ArrowRight, Sparkles, ChevronUp, MessageCircleMore, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const NuansaGrafika = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Data
  const categories = [
    { id: 'all', name: 'Semua Produk', icon: Package },
    { id: 'yasin', name: 'Buku Yasin', icon: Book },
    { id: 'banner', name: 'Banner & Spanduk', icon: Image },
    { id: 'undangan', name: 'Undangan', icon: FileText },
    { id: 'merchandise', name: 'Merchandise', icon: Shirt },
    { id: 'lakban', name: 'Lakban Custom', icon: Tag },
    { id: 'stationery', name: 'Kop Surat & Kartu Nama', icon: Printer },
    { id: 'publishing', name: 'Buku & Majalah', icon: Book },
    { id: 'stiker', name: 'Stiker & Label', icon: Sticker },
  ];

  const products = [
    {
      id: 1,
      name: 'Buku Yasin Premium',
      category: 'yasin',
      price: 'Mulai dari Rp 15.000',
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
      ],
      description: 'Buku Yasin berkualitas premium untuk berbagai acara',
      details: 'Dicetak menggunakan kertas HVS 70-80 gsm dengan kualitas terbaik. Cocok untuk acara pernikahan, khitanan, dan acara keagamaan lainnya.',
      specs: ['Kertas HVS/Bookpaper', 'Cover Art Carton', 'Laminasi Doff/Glossy', 'Hotprint Emas/Perak', 'Ukuran Custom', 'Desain Elegan'],
    },
    {
      id: 2,
      name: 'Banner Tahan Cuaca',
      category: 'banner',
      price: 'Mulai dari Rp 25.000/m²',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop',
      ],
      description: 'Banner tahan cuaca untuk promosi indoor & outdoor',
      details: 'Dicetak menggunakan bahan Flexi premium dengan tinta eco-solvent yang tahan lama. Dilengkapi finishing ring besi untuk pemasangan yang kuat.',
      specs: ['Bahan Flexi Premium', 'Tahan Air & Cuaca', 'Finishing Ring Besi', 'Ukuran Custom', 'Warna Tajam', 'Tahan UV'],
    },
    {
      id: 3,
      name: 'Undangan Pernikahan Mewah',
      category: 'undangan',
      price: 'Mulai dari Rp 3.000/lembar',
      images: [
        'https://images.unsplash.com/photo-1523218924458-d62f0acca98d?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop',
      ],
      description: 'Undangan elegant dengan berbagai pilihan desain',
      details: 'Tersedia berbagai kertas premium dengan finishing mewah. Desain dapat disesuaikan dengan tema acara Anda.',
      specs: ['Kertas Premium', 'Finishing Mewah', 'Desain Custom', 'Bentuk Bervariasi', 'Emboss/Deboss', 'Hotprint'],
    },
    {
      id: 4,
      name: 'Sablon Mug & Tumbler',
      category: 'merchandise',
      price: 'Mulai dari Rp 20.000',
      images: [
        'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1565345558062-5f492e7dc3a9?w=800&h=800&fit=crop',
      ],
      description: 'Sablon mug, tumbler, dan totebag berkualitas tinggi',
      details: 'Menggunakan sublimation paper dan DTF film untuk hasil yang tajam dan tahan lama. Cocok untuk souvenir dan merchandise perusahaan.',
      specs: ['Bahan Premium', 'Tinta Tidak Luntur', 'Heat Press', 'Hasil Tajam', 'Food Grade', 'Tahan Cuci'],
    },
    {
      id: 5,
      name: 'Lakban Custom BOPP',
      category: 'lakban',
      price: 'Mulai dari Rp 8.000/roll',
      images: [
        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&h=800&fit=crop',
      ],
      description: 'Lakban dengan desain custom untuk branding',
      details: 'Dibuat dari bahan BOPP berkualitas tinggi dengan lem yang kuat. Cocok untuk packaging dan branding bisnis Anda.',
      specs: ['Bahan BOPP Kuat', 'Tahan Air', 'Branding Profesional', 'Lem Kuat', 'Warna Cerah', 'Ukuran Custom'],
    },
    {
      id: 6,
      name: 'Kop Surat & Kartu Nama Profesional',
      category: 'stationery',
      price: 'Mulai dari Rp 500/lembar',
      images: [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1586167246683-d5a16c3f5f1e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1560179406-e6445d98a6e2?w=800&h=800&fit=crop',
      ],
      description: 'Media cetak untuk identitas bisnis profesional',
      details: 'Dicetak dengan kertas premium menggunakan mesin digital atau offset. Hasil warna tajam dan profesional.',
      specs: ['Kertas Premium', 'Ukuran Standar', 'Warna Tajam', 'Cetak Digital/Offset', 'Laminasi Opsional', 'Spot UV'],
    },
    {
      id: 7,
      name: 'Buku Katalog Full Color',
      category: 'publishing',
      price: 'Mulai dari Rp 20.000',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=800&fit=crop',
      ],
      description: 'Penerbitan buku dan majalah berkualitas tinggi',
      details: 'Menggunakan HVS, Book Paper, atau Art Paper dengan cover laminasi doff/glossy. Perfect binding untuk hasil yang rapi dan profesional.',
      specs: ['Kertas Berkualitas', 'Cover Laminasi', 'Perfect Binding', 'Full Color', 'Ukuran Custom', 'Spot UV'],
    },
    {
      id: 8,
      name: 'Stiker Vinyl Custom',
      category: 'stiker',
      price: 'Mulai dari Rp 2.000/lembar',
      images: [
        'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
      ],
      description: 'Stiker custom untuk berbagai keperluan branding',
      details: 'Dicetak dengan bahan vinyl premium menggunakan mesin cutting presisi. Waterproof dan tahan lama untuk outdoor maupun indoor.',
      specs: ['Bahan Vinyl', 'Waterproof', 'Ukuran Custom', 'Cutting Presisi', 'Glossy/Matte', 'Tahan UV'],
    },
  ];

  const filteredProducts = activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  useEffect(() => {
    if (selectedProduct) {
      setCurrentImageIndex(0);
    }
  }, [selectedProduct]);

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="flex items-center space-x-3 group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6">
                <Sparkles size={24} className="text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-gray-900">Nuansa Grafika</h1>
                <p className="text-xs text-gray-600 font-medium">Graphic Design Printing</p>
              </div>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:text-amber-500 font-semibold transition-colors relative group py-2"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:text-amber-500 font-semibold transition-colors relative group py-2"
              >
                Produk & Layanan
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:text-amber-500 font-semibold transition-colors relative group py-2"
              >
                Tentang Kami
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-6 py-2 rounded-full font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Konsultasi Gratis
              </a>
            </div>

            <button className="md:hidden text-gray-900 p-2 hover:bg-amber-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-4 pb-2 space-y-3 overflow-hidden border-t border-gray-100">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-700 hover:text-amber-500 font-medium pt-3 px-4 hover:bg-amber-50 rounded-lg"
                >
                  Home
                </a>
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-700 hover:text-amber-500 font-medium py-2 px-4 hover:bg-amber-50 rounded-lg"
                >
                  Produk & Layanan
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-700 hover:text-amber-500 font-medium py-2 px-4 hover:bg-amber-50 rounded-lg"
                >
                  Tentang Kami
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-bold text-center mt-3"
                >
                  Hubungi Kami
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-amber-400 rounded-full mix-blend-color-dodge blur-3xl opacity-30 top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-yellow-500 rounded-full mix-blend-color-dodge blur-3xl opacity-30 bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '500ms' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-block bg-amber-400 text-gray-900 px-4 py-1.5 rounded-full mb-6 font-bold text-sm shadow-lg">
                <Sparkles size={16} className="inline mr-2" />
                Percetakan Digital Terbaik
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Solusi <span className="block text-amber-400">Cetak Cepat</span> & Berkualitas
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-lg">Nuansa Grafika, Percetakan Digital di Jakarta. Proses pemesanan online yang mudah dengan *One Day Service*.</p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-400 p-2 rounded-full">
                    <Check size={18} className="text-gray-900" />
                  </div>
                  <span className="text-white font-medium text-lg">Kualitas Tinggi & Terjamin</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-400 p-2 rounded-full">
                    <Check size={18} className="text-gray-900" />
                  </div>
                  <span className="text-white font-medium text-lg">Pelayanan Cepat (One Day Service)</span>
                </div>
              </div>

              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all"
              >
                Lihat Produk <ArrowRight size={20} className="ml-3" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden md:flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-[0_0_60px_rgba(255,193,7,0.5)] transform rotate-2 hover:rotate-0 transition-transform duration-700 max-w-md w-full border border-amber-500/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-xl p-4 shadow-lg h-40 flex items-center justify-center">
                      <Book size={40} className="text-gray-500" />
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4 shadow-lg h-32 flex items-center justify-center">
                      <Printer size={40} className="text-gray-500" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-6">
                    <div className="bg-gray-100 rounded-xl p-4 shadow-lg h-32 flex items-center justify-center">
                      <Image size={40} className="text-gray-500" />
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4 shadow-lg h-40 flex items-center justify-center">
                      <Shirt size={40} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 -left-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-4 shadow-2xl border-4 border-white"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">24 Jam</div>
                  <div className="text-sm font-semibold text-gray-800">Cetak Kilat</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Jelajahi <span className="text-amber-500">Produk</span> Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Kami menyediakan beragam layanan cetak, dari skala personal hingga kebutuhan bisnis korporat.</p>
          </motion.div>

          <div className="mb-16">
            <div className="flex space-x-4 pb-4 overflow-x-auto justify-start md:justify-center scrollbar-hide">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl font-semibold transition-all w-32 h-32 text-center flex-shrink-0 shadow-lg ${
                      activeCategory === category.id ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900 ring-4 ring-amber-200 scale-105' : 'bg-white text-gray-700 hover:bg-amber-50 hover:shadow-xl'
                    }`}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="text-xs line-clamp-2">{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Produk Grid - Masonry Layout */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedProduct(product)}
                  className="relative group cursor-pointer rounded-2xl bg-white shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 hover:border-amber-400 transition-all duration-300 break-inside-avoid"
                >
                  <div className="relative overflow-hidden" style={{ height: index % 3 === 0 ? '280px' : index % 3 === 1 ? '320px' : '260px' }}>
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <ZoomIn size={14} />
                      Lihat Detail
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-extrabold text-gray-900 text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-amber-600 font-bold text-base mb-2">{product.price}</p>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-amber-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{product.images.length} Foto</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-gray-50 rounded-2xl">
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-500 font-semibold">Produk di kategori ini belum tersedia.</p>
              <p className="text-gray-400">Silahkan pilih kategori lain.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/50">
                <img src="https://images.unsplash.com/photo-1590698933947-a202b069a861?w=600&h=800&fit=crop" alt="Printing Factory" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gray-900/60 transition-opacity hover:opacity-0"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl p-6 shadow-2xl border-4 border-white"
              >
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">10+</div>
                  <div className="text-sm font-semibold text-gray-800">Tahun Pengalaman</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Mengenal Lebih Jauh <span className="text-amber-500">Kami</span>
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed border-l-4 border-amber-400 pl-4 bg-amber-50 p-3 rounded-r-lg shadow-sm">
                Nuansa Grafika Printing berfokus pada layanan percetakan terbaik mulai dari proses desain, pencetakan, hingga finishing. Dengan Quality Control yang ketat, kami memastikan setiap produk memiliki kualitas terbaik dan dapat
                dikirim dengan cepat.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Kepuasan pelanggan adalah prioritas utama kami. Karena itu, kami selalu memberikan hasil cetak yang optimal, pelayanan profesional, dan perhatian penuh pada setiap detail. Komitmen ini kami wujudkan untuk memberikan
                pengalaman terbaik bagi seluruh pelanggan.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-100 rounded-xl p-5 border-t-4 border-gray-900 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">5000+</div>
                  <div className="text-sm text-gray-700 font-medium">Project Selesai</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-5 border-t-4 border-amber-500 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-extrabold text-amber-600 mb-1">100%</div>
                  <div className="text-sm text-gray-700 font-medium">Kepuasan Pelanggan</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Kontak <span className="text-amber-500">Kami</span>
            </h2>
            <p className="text-lg text-gray-600">Jangan ragu menghubungi kami untuk konsultasi gratis atau pemesanan.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-amber-500">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Informasi Kontak</h3>

              <div className="space-y-8">
                <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-xl shadow-lg flex-shrink-0">
                    <MapPin className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 mb-1 text-lg">Alamat </p>
                    <p className="text-gray-700">Jl. Agung Raya 1 RT.9/RW.2, Lenteng Agung, Jagakarsa, Jakarta Selatan</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
                  <a href="https://wa.me/6281312088319" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group w-full">
                    <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-xl shadow-lg flex-shrink-0">
                      <Phone className="text-gray-900" size={24} />
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 mb-1 text-lg transition-colors">Nomor Telepon</p>
                      <p className="text-gray-700 font-bold">+62 813-1208-8319 / +62 815-9553-889</p>
                    </div>
                  </a>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-xl shadow-lg flex-shrink-0">
                    <Mail className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 mb-1 text-lg">Email </p>
                    <p className="text-gray-700">nuansagrafika@yahoo.co.id</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                <iframe
                  title="Lokasi Nuansa Grafika"
                  width="100%"
                  height="420"
                  frameBorder="0"
                  className="rounded-2xl"
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.867512497676!2d106.83737337424905!3d-6.279853361427306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f23a412030d9%3A0x67d8f94943729e20!2sJl.%20Agung%20Raya%20I%20No.9%2C%20RT.9%2FRW.2%2C%20Lenteng%20Agung%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012630!5e0!3m2!1sen!2sid!4v1701628107873!5m2!1sen!2sid"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-extrabold mb-3 text-amber-400">Nuansa Grafika</h3>
            <p className="text-gray-400 text-sm max-w-xs">Solusi cetak cepat, berkualitas, dan terpercaya untuk semua kebutuhan Anda.</p>
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 text-white">Hubungi</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 flex items-center justify-center md:justify-start">
                <Phone size={16} className="mr-2 text-amber-400" /> +62 813-1208-8319
              </li>
              <li className="text-gray-400 flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2 text-amber-400" /> nuansagrafika@yahoo.co.id
              </li>
              <li className="text-gray-400 flex items-start justify-center md:justify-start">
                <MapPin size={16} className="mt-1 mr-2 text-amber-400 flex-shrink-0" /> Jl. Agung Raya 1, Jakarta Selatan
              </li>
            </ul>
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 text-white">Ikuti Kami</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <img src="https://simpleicons.org/icons/instagram.svg" alt="IG" className="w-5 h-5 filter brightness-0 invert" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <img src="https://simpleicons.org/icons/facebook.svg" alt="FB" className="w-5 h-5 filter brightness-0 invert" />
              </a>
              <a href="https://wa.me/6281312088319" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <img src="https://simpleicons.org/icons/whatsapp.svg" alt="WA" className="w-5 h-5 filter brightness-0 invert" />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">© 2025 Nuansa Grafika. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <motion.a
          href="https://wa.me/6281312088319?text=Halo%20Nuansa%20Grafika,%20saya%20ingin%20konsultasi%20mengenai%20cetak%20produk."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircleMore size={28} />
        </motion.a>

        <AnimatePresence>
          {showScroll && (
            <motion.button
              onClick={scrollTop}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700 text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Product Modal with Gallery */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)}>
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-white p-3 rounded-full hover:bg-gray-100 transition-colors z-20 shadow-lg">
                <X size={24} className="text-gray-800" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left: Image Gallery */}
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-amber-400/50">
                    <img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} className="w-full h-96 object-cover" />

                    {selectedProduct.images.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all">
                          <ChevronLeft size={24} className="text-gray-900" />
                        </button>
                        <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all">
                          <ChevronRight size={24} className="text-gray-900" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProduct.images.map((_, idx) => (
                            <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-amber-400 w-8' : 'bg-white/70'}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {selectedProduct.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`rounded-xl overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-amber-400 scale-105 shadow-lg' : 'border-gray-200 hover:border-amber-300'}`}
                        >
                          <img src={img} alt={`${selectedProduct.name} ${idx + 1}`} className="w-full h-24 object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{selectedProduct.name}</h3>
                    <p className="text-amber-600 font-bold text-2xl mb-4">{selectedProduct.price}</p>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-amber-400 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600 font-medium">(5.0)</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-900 text-xl mb-3">Deskripsi Produk</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedProduct.details}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-900 text-xl mb-4">Spesifikasi Utama</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProduct.specs.map((spec, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center space-x-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                          <Check size={18} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm font-medium">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/6281312088319?text=Saya%20tertarik%20dengan%20produk%20${encodeURIComponent(selectedProduct.name)}.%20Mohon%20info%20lebih%20lanjut.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  >
                    Order Sekarang Via WhatsApp!
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NuansaGrafika;
