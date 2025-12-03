import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Menu, Star, Check, Package, FileText, Image, Shirt, Printer, Book, Sticker, Tag, ArrowRight, Sparkles, ChevronUp, MessageCircleMore } from 'lucide-react';

import { ProductCard, CategoryButton } from './components/ComponentCard.jsx';

const NuansaGrafika = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

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
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
      description: 'Buku Yasin berkualitas premium untuk berbagai acara',
      details: 'Dicetak menggunakan kertas HVS 70-80 gsm...',
      specs: ['Kertas HVS/Bookpaper', 'Cover Art Carton', 'Laminasi Doff/Glossy', 'Hotprint Emas/Perak'],
    },
    {
      id: 2,
      name: 'Banner Tahan Cuaca',
      category: 'banner',
      price: 'Mulai dari Rp 25.000/m²',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
      description: 'Banner tahan cuaca untuk promosi indoor & outdoor',
      details: 'Dicetak menggunakan bahan Flexi...',
      specs: ['Bahan Flexi Premium', 'Tahan Air & Cuaca', 'Finishing Ring Besi', 'Ukuran Custom'],
    },
    {
      id: 3,
      name: 'Undangan Pernikahan Mewah',
      category: 'undangan',
      price: 'Mulai dari Rp 3.000/lembar',
      image: 'https://images.unsplash.com/photo-1523218924458-d62f0acca98d?w=400&h=600&fit=crop',
      description: 'Undangan elegant dengan berbagai pilihan desain',
      details: 'Tersedia berbagai kertas premium...',
      specs: ['Kertas Premium', 'Finishing Mewah', 'Desain Custom', 'Bentuk Bervariasi'],
    },
    {
      id: 4,
      name: 'Sablon Mug & Tumbler',
      category: 'merchandise',
      price: 'Mulai dari Rp 20.000',
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&h=600&fit=crop',
      description: 'Sablon mug, tumbler, dan totebag berkualitas tinggi',
      details: 'Menggunakan sublimation paper dan DTF film...',
      specs: ['Bahan Premium', 'Tinta Tidak Luntur', 'Heat Press', 'Hasil Tajam'],
    },
    {
      id: 5,
      name: 'Lakban Custom BOPP',
      category: 'lakban',
      price: 'Mulai dari Rp 8.000/roll',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=600&fit=crop',
      description: 'Lakban dengan desain custom untuk branding',
      details: 'Dibuat dari bahan BOPP...',
      specs: ['Bahan BOPP Kuat', 'Tahan Air', 'Branding Profesional', 'Lem Kuat'],
    },
    {
      id: 6,
      name: 'Kop Surat & Kartu Nama Profesional',
      category: 'stationery',
      price: 'Mulai dari Rp 500/lembar',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
      description: 'Media cetak untuk identitas bisnis profesional',
      details: 'Dicetak dengan kertas premium...',
      specs: ['Kertas Premium', 'Ukuran Standar', 'Warna Tajam', 'Cetak Digital/Offset'],
    },
    {
      id: 7,
      name: 'Buku Katalog Full Color',
      category: 'publishing',
      price: 'Mulai dari Rp 20.000',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: 'Penerbitan buku dan majalah berkualitas tinggi',
      details: 'Menggunakan HVS, Book Paper...',
      specs: ['Kertas Berkualitas', 'Cover Laminasi', 'Perfect Binding', 'Full Color'],
    },
    {
      id: 8,
      name: 'Stiker Vinyl Custom',
      category: 'stiker',
      price: 'Mulai dari Rp 2.000/lembar',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=600&fit=crop',
      description: 'Stiker custom untuk berbagai keperluan branding',
      details: 'Dicetak dengan bahan vinyl premium...',
      specs: ['Bahan Vinyl', 'Waterproof', 'Ukuran Custom', 'Cutting Presisi'],
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

  return (
    <div className="min-h-screen bg-gray-950 font-sans scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-xl z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
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
                <p className="text-xs text-gray-600 font-medium">Digital Printing Terbaik</p>
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

            {/* Mobile Button */}
            <button className="md:hidden text-gray-900 p-2 hover:bg-amber-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-4 pb-2 space-y-3 overflow-hidden border-t border-gray-100">
                {/* Gunakan fungsi scrollIntoView untuk smooth scroll di mobile */}
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
      <hr className="border-t border-gray-200" />
      {/* Hero */}
      <section id="home" className="pt-32 pb-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <div className="absolute w-96 h-96 bg-amber-400 rounded-full mix-blend-color-dodge blur-3xl opacity-30 top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-yellow-500 rounded-full mix-blend-color-dodge blur-3xl opacity-30 bottom-1/4 right-1/4 animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
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

            {/* Right Content */}
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
              {/* Floating Badge */}
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
      <hr className="border-t border-gray-200" />
      {/* Product Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Jelajahi <span className="text-amber-500">Produk</span> Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Kami menyediakan beragam layanan cetak, dari skala personal hingga kebutuhan bisnis korporat.</p>
          </motion.div>

          <div className="mb-16">
            <div className="flex space-x-4 pb-4 overflow-x-auto justify-start md:justify-center">
              {categories.map((category, index) => (
                <CategoryButton key={category.id} category={category} active={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} index={index} />
              ))}
            </div>
          </div>

          {/* Produk Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} index={index} />
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:col-span-4 text-center py-10 bg-white rounded-xl shadow-inner border border-amber-200">
                <p className="text-xl text-gray-500 font-semibold">Produk di kategori ini belum tersedia.</p>
                <p className="text-gray-400">Silahkan pilih kategori lain.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      <hr className="border-t border-gray-200" />
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
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

            {/* Content */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Mengenal Lebih Jauh <span className="text-amber-500">Kami</span>
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed border-l-4 border-amber-400 pl-4 bg-amber-50 p-3 rounded-r-lg">
                *Nuansa Grafika* adalah percetakan digital terdepan yang berfokus pada kualitas cetak premium dan pelayanan pelanggan yang prima.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">Kami hadir untuk memudahkan kebutuhan cetak Anda, mengedepankan ketepatan waktu, hasil cetak yang tajam, dan harga yang kompetitif.</p>

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
      <hr className="border-t border-gray-200" />
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Kontak <span className="text-amber-500">Kami</span>
            </h2>
            <p className="text-lg text-gray-600">Jangan ragu menghubungi kami untuk konsultasi gratis atau pemesanan.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Kontak */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-amber-500">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Informasi Kontak</h3>

              <div className="space-y-8">
                {/* Alamat */}
                <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-xl shadow-lg flex-shrink-0">
                    <MapPin className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 mb-1 text-lg">Alamat </p>
                    <p className="text-gray-700">Jl. Agung Raya 1 RT.9/RW.2, Lenteng Agung, Jagakarsa, Jakarta Selatan</p>
                  </div>
                </motion.div>

                {/* Telepon - Tambahkan link WA API */}
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

                {/* Email */}
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

            {/* Map */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="w-full h-full min-h-[400px] bg-gray-200 flex items-center justify-center">
                {/* Iframe ke lokasi Nuansa Grafika */}
                <iframe
                  title="Lokasi Nuansa Grafika"
                  width="100%"
                  height="420"
                  frameBorder="0"
                  className="rounded-2xl"
                  loading="lazy"
                  allowFullScreen
                  // Ganti URL ini dengan embed map yang sebenarnya jika tersedia
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.867512497676!2d106.83737337424905!3d-6.279853361427306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f23a412030d9%3A0x67d8f94943729e20!2sJl.%20Agung%20Raya%20I%20No.9%2C%20RT.9%2FRW.2%2C%20Lenteng%20Agung%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012630!5e0!3m2!1sen!2sid!4v1701628107873!5m2!1sen!2sid"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <hr className="border-t border-gray-200" />
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-extrabold mb-3 text-amber-400">Nuansa Grafika</h3>
            <p className="text-gray-400 text-sm max-w-xs">Solusi cetak cepat, berkualitas, dan terpercaya untuk semua kebutuhan Anda.</p>
          </div>

          {/* Kolom 2: Kontak Cepat */}
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

          {/* Kolom 3: Sosial Media */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 text-white">Ikuti Kami</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <img src="https://simpleicons.org/icons/instagram.svg" alt="IG" className="w-5 h-5 filter brightness-0 invert" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <img src="https://simpleicons.org/icons/facebook.svg" alt="FB" className="w-5 h-5 filter brightness-0 invert" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <img src="https://simpleicons.org/icons/whatsapp.svg" alt="WA" className="w-5 h-5 filter brightness-0 invert" />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">© 2025 Nuansa Grafika. All rights reserved.</p>
        </div>
      </footer>{' '}
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 flex flex-row gap-3 z-[1000]">
        <motion.a
          href="https://wa.me/6281312088319?text=Halo%20Nuansa%20Grafika,%20saya%20ingin%20konsultasi%20mengenai%20cetak%20produk."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all flex items-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircleMore size={28} />
        </motion.a>

        <AnimatePresence>
          {showScroll && (
            <motion.button
              onClick={scrollTop}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700 text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-colors"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Modal Box */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
            >
              {/* Close */}
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-amber-100 transition-colors z-10">
                <X size={20} className="text-gray-800" />
              </button>

              {/* Image */}
              <div className="w-full h-72 rounded-2xl overflow-hidden mb-6 border-4 border-amber-400/50 shadow-md">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{selectedProduct.name}</h3>
              <p className="text-amber-600 font-bold text-xl mb-4">{selectedProduct.price}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedProduct.details}</p>

              {/* Specs */}
              <h4 className="font-bold text-gray-900 text-lg mb-3 border-b pb-2 border-amber-400">Spesifikasi Utama</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedProduct.specs.map((s, i) => (
                  <motion.div key={i} className="flex items-center space-x-2 text-gray-700 bg-gray-50 p-2 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </motion.div>
                ))}
              </div>

              <a
                href="https://wa.me/6281312088319?text=Saya%20tertarik%20dengan%20produk%20[Nama Produk Anda].%20Mohon%20info%20lebih%20lanjut."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedProduct(null)}
                className="mt-8 block text-center bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Order Sekarang Via WhatsApp!
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NuansaGrafika;
