import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Menu,
  Check,
  Package,
  FileText,
  Zap,
  Award,
  Image,
  Shirt,
  Printer,
  Book,
  Sticker,
  Tag,
  ArrowRight,
  Sparkles,
  Quote,
  ChevronUp,
  ChevronDown,
  MessageCircleMore,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Star,
  StarHalf,
} from 'lucide-react';
import BackgroundParticles from './components/BackgroundParticles';

import ContactSection from './components/ContactSection';

const Homepage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [xPosition, setXPosition] = useState(0);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const containerRef = useRef(null);

  // kategori
  const categories = [
    { id: 'all', name: 'Semua Produk', icon: Package },
    { id: 'banner', name: 'Banner & Spanduk', icon: Image },
    { id: 'undangan', name: 'Undangan', icon: FileText },
    { id: 'yasin', name: 'Buku Yasin', icon: Book },
    { id: 'merchandise', name: 'Merchandise', icon: Shirt },
    { id: 'lakban', name: 'Lakban Custom', icon: Tag },
    { id: 'stationery', name: 'Kop Surat & Kartu Nama', icon: Printer },
    { id: 'publishing', name: 'Buku & Majalah', icon: Book },
    { id: 'stiker', name: 'Stiker & Label', icon: Sticker },
  ];

  const products = [
    /* BANNER & SPANDUK */
    {
      id: 1,
      name: 'Banner Flexi 280gsm',
      category: 'banner',
      price: 'Mulai dari Rp 20.000 / Meter',
      images: ['/assets/banner/bv-1.jpg', '/assets/banner/bv-2.jpg', '/assets/banner/bv-3.jpg'],
      description: 'Banner outdoor berkualitas untuk acara, promosi, atau branding toko. Harga tergantung jenis bahan',
      details: 'Tidak ada minimum pemesanan. Lama pengerjaan 1–2 hari kerja.',
      specs: ['Flexi 280gsm', 'Cetak Full Color', 'Tahan Cuaca', 'Finishing Mata Ayam Opsional', 'Ukuran Custom'],
    },
    {
      id: 2,
      name: 'Spanduk Flexi Premium 340gsm',
      category: 'banner',
      price: 'Mulai dari Rp 25.000 / Meter',
      images: ['/assets/banner/bh-2.jpg', '/assets/banner/bh-1.jpg', '/assets/banner/bh-3.jpg'],
      description: 'Spanduk premium untuk kebutuhan promosi jangka panjang. Harga tergantung dari jenis bahan',
      details: 'Tidak ada minimum pemesanan. Lama pengerjaan 1–2 hari kerja.',
      specs: ['Flexi 340gsm Premium', 'Warna Tajam', 'Anti Luntur', 'Finishing Lipat/Hotpress', 'Ukuran Custom'],
    },
    {
      id: 3,
      name: 'X-Banner Standar + Cetak',
      category: 'banner',
      price: 'Mulai dari Rp 60.000',
      images: ['/assets/banner/x-1.png', '/assets/banner/x-2.jpg', '/assets/banner/x-3.jpg'],
      description: 'Paket lengkap X-Banner dengan bahan flexi standar, cocok untuk event dan display toko. Harga tergantung dari jenis bahan',
      details: 'Tidak ada minimum pemesanan. Pengerjaan 1 hari kerja.',
      specs: ['Flexi 280gsm', 'Ukuran 60x160cm', 'Frame Standar', 'Cetak Full Color'],
    },

    /* UNDANGAN */
    {
      id: 4,
      name: 'Undangan Pernikahan Softcover Elegan',
      category: 'undangan',
      price: 'Mulai dari Rp 1.500 / pcs',
      images: ['/assets/undangan/sc-1.jpg', '/assets/undangan/sc-2.jpg'],
      description: 'Undangan pernikahan softcover dengan desain elegan dan modern.',
      details: 'Minimum pemesanan 100 pcs. Lama pengerjaan 5–7 hari kerja setelah approval desain.',
      specs: ['Art Paper 260gsm', 'Laminasi Doff/Glossy', 'Cetak Full Color', 'Free Desain Basic', 'Ukuran Custom'],
    },
    {
      id: 5,
      name: 'Undangan Aqiqah & Khitan Full Color',
      category: 'undangan',
      price: 'Mulai dari Rp 1.500 / pcs',
      images: ['/assets/undangan/su-1.jpg', '/assets/undangan/su-2.jpg'],
      description: 'Undangan aqiqah dan khitan dengan tampilan ceria dan full color.',
      details: 'Minimum pemesanan 100 pcs. Lama pengerjaan 3–5 hari kerja.',
      specs: ['Art Carton 230–260gsm', 'Full Color', 'Desain Ceria', 'Finishing Glossy', 'Ukuran Custom'],
    },
    {
      id: 6,
      name: 'Undangan Exclusive Hardcover',
      category: 'undangan',
      price: 'Mulai dari Rp 5.000 / pcs',
      images: ['/assets/undangan/hc-1.jpg', '/assets/undangan/hc-2.jpg', '/assets/undangan/hc-3.jpg'],
      description: 'Undangan hardcover premium dengan tampilan mewah dan elegan.',
      details: 'Minimum pemesanan 50 pcs. Lama pengerjaan 7–10 hari kerja.',
      specs: ['Hardcover Premium', 'Laminasi Doff', 'Hotprint Emas/Perak', 'Pita Opsional', 'Ukuran Custom'],
    },

    /* BUKU YASIN */
    {
      id: 7,
      name: 'Buku Yasin Hardcover Beludru Matte Paper',
      category: 'yasin',
      price: 'Mulai dari Rp 25.000 - Rp 35.000',
      images: ['/assets/yasin/hcbl-1.jpg', '/assets/yasin/hcbl-2.jpg', '/assets/yasin/hcbl-3.jpg'],
      description: 'Buku Yasin berkualitas premium untuk berbagai acara.',
      details: 'Minimum pemesanan 35 buku. Lama pengerjaan 7 hari kerja setelah persetujuan cetak dan konfirmasi pembayaran.',
      specs: ['Kertas HVS/Bookpaper', 'Cover Art Carton', 'Laminasi Doff/Glossy', 'Hotprint Emas/Perak', 'Ukuran Custom', 'Desain Elegan'],
    },
    {
      id: 8,
      name: 'Buku Yasin Matte Paper Glossy Hardcover RCP Bunga Berlian',
      category: 'yasin',
      price: 'Mulai dari Rp 25.000 - Rp 35.000',
      images: ['/assets/yasin/hcbb-1.jpg', '/assets/yasin/hcbb-2.jpg', '/assets/yasin/hcbb-3.jpg'],
      description: 'Buku Yasin Hardcover Exclusive dengan tampilan mewah, glossy, dan hiasan bunga berlian.',
      details: 'Minimum pemesanan 35 buku. Lama pengerjaan 7 hari kerja setelah persetujuan cetak dan konfirmasi pembayaran.',
      specs: ['Kertas HVS/Bookpaper', 'Cover Art Carton', 'Laminasi Doff/Glossy', 'Hotprint Emas/Perak', 'Ukuran Custom', 'Desain Elegan'],
    },
    {
      id: 9,
      name: 'Buku Yasin Hard Cover Motif Kubah',
      category: 'yasin',
      price: 'Mulai dari Rp 25.000 - Rp 35.000',
      images: ['/assets/yasin/hc-2.jpg', '/assets/yasin/hc-1.jpg', '/assets/yasin/hc-3.jpg'],
      description: 'Buku Yasin Hardcover Exclusive dengan tampilan glossy bermotif kubah.',
      details: 'Minimum pemesanan 35 buku. Lama pengerjaan 7 hari kerja setelah persetujuan cetak dan konfirmasi pembayaran.',
      specs: ['Kertas HVS/Bookpaper', 'Cover Art Carton', 'Laminasi Doff/Glossy', 'Hotprint Emas/Perak', 'Ukuran Custom', 'Desain Elegan'],
    },
    {
      id: 10,
      name: 'Buku Yasin dan Tahlil Soft Cover Custom',
      category: 'yasin',
      price: 'Mulai dari Rp 15.000 - Rp 25.000',
      images: ['/assets/yasin/sc-1.jpg', '/assets/yasin/sc-2.jpg', '/assets/yasin/sc-3.jpg'],
      description: 'Buku Yasin dan Tahlil dengan soft cover custom.',
      details: 'Minimum pemesanan 35 buku. Lama pengerjaan 7 hari kerja setelah persetujuan cetak dan konfirmasi pembayaran.',
      specs: ['Kertas HVS/Bookpaper', 'Soft Cover', 'Laminasi Doff/Glossy', 'Hotprint Emas/Perak', 'Ukuran Custom', 'Desain Elegan'],
    },
    /* MERCHANDISE */
    {
      id: 11,
      name: 'Mug Custom',
      category: 'merchandise',
      price: 'Mulai dari Rp 20.000',
      images: ['/assets/merchandise/m-1.jpeg', '/assets/merchandise/m-2.jpeg', '/assets/merchandise/m-3.jpeg'],
      description: 'Mug custom untuk souvenir dan merchandise perusahaan.',
      details: 'Minimum pemesanan 12 pcs. Lama pengerjaan 3–5 hari kerja.',
      specs: ['Bahan Keramik', 'Sablon Sublim', 'Tahan Panas', 'Warna Tajam', 'Food Grade'],
    },
    {
      id: 12,
      name: 'Totebag Custom',
      category: 'merchandise',
      price: 'Mulai dari Rp 18.000',
      images: ['/assets/merchandise/t-1.jpeg', '/assets/merchandise/t-2.jpg', '/assets/merchandise/t-3.jpg'],
      description: 'Totebag custom dengan bahan kuat dan desain bebas.',
      details: 'Minimum 12 pcs. Pengerjaan 3–5 hari kerja.',
      specs: ['Bahan Kanvas / Blacu', 'Sablon DTF / Plastisol', 'Jahit Rapi', 'Tahan Beban'],
    },
    {
      id: 13,
      name: 'Tumbler Custom',
      category: 'merchandise',
      price: 'Mulai dari Rp 50.000',
      images: ['/assets/merchandise/tb-1.png', '/assets/merchandise/tb-2.jpg', '/assets/merchandise/tb-3.jpg'],
      description: 'Tumbler custom cocok untuk souvenir dan merchandise.',
      details: 'Minimum 12 pcs. Lama pengerjaan 5 hari kerja.',
      specs: ['Bahan Stainless / Plastik Premium', 'Cetak Full Color', 'Tahan Panas & Dingin', 'Food Grade'],
    },
    /* LAKBAN CUSTOM */
    {
      id: 14,
      name: 'Lakban Custom BOPP 48mm',
      category: 'lakban',
      price: 'Mulai dari Rp 14.000 / roll',
      images: ['/assets/lakban/lb-1.jpg', '/assets/lakban/lb-2.jpg', '/assets/lakban/lb-3.jpg'],
      description: 'Lakban custom ukuran standar untuk kebutuhan packing.',
      details: 'Minimum 36 roll. Pengerjaan 7 hari kerja.',
      specs: ['Bahan BOPP', 'Lebar 48mm', 'Tinta Tidak Luntur', 'Cetak 1–3 Warna', 'Lem Kuat'],
    },
    {
      id: 15,
      name: 'Lakban Custom BOPP 60mm',
      category: 'lakban',
      price: 'Mulai dari Rp 22.000 / roll',
      images: ['/assets/lakban/lb-1.jpg', '/assets/lakban/lb-2.jpg', '/assets/lakban/lb-3.jpg'],
      description: 'Lakban custom lebar untuk branding pengemasan.',
      details: 'Minimum 1000 roll. Pengerjaan 7 hari kerja.',
      specs: ['BOPP Premium', 'Lebar 60mm', 'Cetak Full Custom', 'Waterproof', 'Lem Super Strong'],
    },
    {
      id: 16,
      name: 'Lakban Custom Fragile / Warning',
      category: 'lakban',
      price: 'Mulai dari Rp 22.000 / roll',
      images: ['/assets/lakban/lbf-1.jpg'],
      description: 'Lakban fragile khusus untuk kebutuhan pengiriman barang.',
      details: 'Minimum 1000 roll. Pengerjaan 7 hari kerja.',
      specs: ['Bahan BOPP', 'Desain Peringatan “FRAGILE”', 'Warna Cerah', 'Tahan Air', 'Adhesive Kuat'],
    },
    /* KOP SURAT & KARTU NAMA */
    {
      id: 17,
      name: 'Kartu Nama Premium',
      category: 'stationery',
      price: 'Mulai dari Rp 25.000 / box',
      images: ['/assets/stationery/kn-3.jpg', '/assets/stationery/kn-1.jpg', '/assets/stationery/kn-2.jpg'],
      description: 'Kartu nama premium untuk kebutuhan identitas bisnis.',
      details: 'Minimum pemesanan 1 box (100 pcs). Lama pengerjaan 2–3 hari kerja.',
      specs: ['Art Carton 260–310 gsm', 'Laminasi Doff/Glossy', 'Spot UV Opsional', 'Sudut Rounded Opsional', 'Full Color Cetak Digital'],
    },
    {
      id: 18,
      name: 'Kop Surat Custom Profesional',
      category: 'stationery',
      price: 'Mulai dari Rp 150.000 / Rim HVS',
      images: ['/assets/stationery/ks-1.jpg', '/assets/stationery/ks-2.jpg', '/assets/stationery/ks-3.jpeg'],
      description: 'Kop surat custom untuk kebutuhan perusahaan, instansi, atau organisasi.',
      details: 'Minimum pemesanan 1 Rim. Lama pengerjaan 5 hari kerja.',
      specs: ['HVS 80–100 gsm', 'Cetak Full Color', 'Ukuran A4', 'Logo dan informasi custom', 'Hasil warna tajam'],
    },
    /* BUKU & MAJALAH */
    {
      id: 19,
      name: 'Buku Katalog Full Color',
      category: 'publishing',
      price: 'Mulai dari Rp 50.000 - Rp 200.000',
      images: ['/assets/publishing/bp-1.jpeg', '/assets/publishing/bp-2.jpeg'],
      description: 'Cetak buku katalog full color dengan kualitas premium. Harga tergantung Quantity, jumlah halaman, jenis kertas, dan warna cetak',
      details: 'Minimum pemesanan 20 buku. Pengerjaan 5–7 hari kerja.',
      specs: ['HVS / Book Paper / Art Paper', 'Perfect Binding', 'Cover Laminasi Doff/Glossy', 'Full Color'],
    },
    {
      id: 20,
      name: 'Notebook Custom',
      category: 'publishing',
      price: 'Mulai dari Rp 10.000 - Rp 30.000',
      images: ['/assets/publishing/bt-1.jpeg', '/assets/publishing/bt-2.jpeg', '/assets/publishing/bt-3.jpeg'],
      description: 'Majalah custom dengan layout profesional.',
      details: 'Minimum 30 buku. Pengerjaan 5–7 hari kerja.',
      specs: ['Kertas Art Paper', 'Staple Binding / Perfect Binding', 'Full Color', 'Desain Layout Custom'],
    },
    /* STIKER & LABEL */
    {
      id: 21,
      name: 'Stiker Vinyl Custom',
      category: 'stiker',
      price: 'Mulai dari Rp 1.000 - Rp. 15 000/ lembar',
      images: ['/assets/stiker/s-1.jpg', '/assets/stiker/s-2.jpg'],
      description: 'Stiker vinyl premium waterproof untuk indoor/outdoor.',
      details: 'Minimum 50 lembar. Pengerjaan 2–3 hari kerja.',
      specs: ['Bahan Vinyl', 'Waterproof', 'Cutting Presisi', 'Glossy / Matte', 'Tahan UV'],
    },
    {
      id: 22,
      name: 'Label Produk Custom',
      category: 'stiker',
      price: 'Mulai dari Rp 2.000 - Rp 25.000 / pcs',
      images: ['/assets/stiker/l-1.jpg', '/assets/stiker/l-2.jpg'],
      description: 'Label custom untuk kemasan produk UMKM dan brand.',
      details: 'Minimum 100 pcs. Pengerjaan 2–3 hari kerja.',
      specs: ['Bahan Vinyl / Chromo', 'Finishing Glossy / Matte', 'Cetak Full Color', 'Cutting Custom'],
    },
  ];

  const features = ['Kualitas Premium & Warna Konsisten', 'Cetak Kilat (One Day Service)', 'Harga Kompetitif untuk Semua Kebutuhan', 'Pemesanan Online Mudah & Praktis'];

  const productItems = [
    { img: '/images/1.png', delay: 0 },
    { img: '/images/2.png', delay: 0.1 },
    { img: '/images/9.jpg', delay: 0.2 },
    { img: '/images/7.jpg', delay: 0.3 },
  ];

  // Review Data
  const reviews = [
    {
      id: 1,
      name: 'Budi Santoso',
      location: 'Jakarta',
      rating: 4.5,
      teks: 'Pelayanan sangat cepat dan hasil cetakan berkualitas tinggi. Saya sangat puas dengan One Day Service mereka. Rekomendasi banget untuk yang butuh cetak cepat!',
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      location: 'Tangerang',
      rating: 5,
      teks: 'Harga kompetitif dan hasil memuaskan. Tim sangat responsif dalam menjawab pertanyaan. Sudah langganan di sini untuk semua kebutuhan cetak kantor.',
    },
    {
      id: 3,
      name: 'Ahmad Rizki',
      location: 'Depok',
      rating: 4.5,
      teks: 'Kualitas cetak warna sangat tajam dan konsisten. Pengerjaan tepat waktu sesuai janji. Sangat profesional!',
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      location: 'Bekasi',
      rating: 5,
      teks: 'Sudah beberapa kali order untuk kebutuhan event dan selalu puas. Hasil cetakan banner dan brosur sangat bagus. Terima kasih Nuansa Grafika!',
    },
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'Apa itu layanan One Day Service?',
      answer: 'One Day Service adalah layanan cetak kilat kami di mana pesanan Anda akan selesai dalam waktu 24 jam. Layanan ini tersedia untuk berbagai jenis produk seperti dokumen, brosur, dan banner dengan minimum order tertentu.',
    },
    {
      id: 2,
      question: 'Apakah ada minimum order untuk cetak?',
      answer:
        'Minimum order berbeda-beda tergantung jenis produk. Untuk cetak dokumen biasa tidak ada minimum order, namun untuk produk khusus seperti buku atau packaging ada minimum order. Silakan hubungi kami untuk informasi lebih detail.',
    },
    {
      id: 3,
      question: 'Bagaimana cara melakukan pemesanan?',
      answer:
        'Anda bisa melakukan pemesanan melalui WhatsApp, telepon, email, atau datang langsung ke toko kami. Kirimkan file yang akan dicetak beserta spesifikasi yang diinginkan, kemudian tim kami akan memberikan quotation dan estimasi waktu pengerjaan.',
    },
    {
      id: 4,
      question: 'Apakah bisa revisi desain sebelum cetak?',
      answer: 'Tentu saja! Kami akan mengirimkan proof/sample desain sebelum proses cetak dimulai. Anda bisa melakukan revisi hingga desain sesuai dengan keinginan Anda. Kepuasan pelanggan adalah prioritas kami.',
    },
    {
      id: 5,
      question: 'Apa saja metode pembayaran yang tersedia?',
      answer: 'Kami menerima berbagai metode pembayaran termasuk transfer bank (BCA, Mandiri, BNI).',
    },
  ];

  const filteredProducts = activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory);
  const allReviews = [...reviews, ...reviews, ...reviews];
  const cardWidth = 320 + 24; // width + gap
  const loopWidth = reviews.length * cardWidth;

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
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  useEffect(() => {
    if (isPaused) return;

    const animate = () => {
      positionRef.current -= 0.5;
      const singleSetWidth = reviews.length * 344;
      if (positionRef.current <= -singleSetWidth) {
        positionRef.current = positionRef.current % singleSetWidth;
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, reviews.length]);

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star
        stars.push(<Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />);
      } else if (rating > i - 1 && rating < i) {
        // Half star
        stars.push(<StarHalf key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />);
      } else {
        // Empty star
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans scroll-smooth overflow-x-hidden w-full">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 backdrop-blur-xl shadow-2xl z-50 ">
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
              <div className="w-14 h-10 md:w-18 md:h-10 rounded-lg overflow-hidden shadow-lg">
                <img src="/assets/logo-bg.png" alt="Nuansa Grafika Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl lg:text-xl font-extrabold text-white transition-all">Nuansa Grafika</h1>
                <p className="text-[12px] md:text-xs lg:text-sm text-gray-300 font-medium">Graphic Design Printing</p>
              </div>
            </a>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm lg:text-base text-gray-300 hover:text-amber-400 font-semibold transition-colors relative group py-2"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm lg:text-base text-gray-300 hover:text-amber-400 font-semibold transition-colors relative group py-2 whitespace-nowrap"
              >
                Produk & Layanan
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm lg:text-base text-gray-300 hover:text-amber-400 font-semibold transition-colors relative group py-2"
              >
                Tentang Kami
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-4 lg:px-6 py-2 rounded-full text-sm lg:text-base font-bold shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Konsultasi Gratis
              </a>
            </div>

            <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden mt-4 pb-2 space-y-3 overflow-hidden border-t border-amber-500/20"
              >
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-300 hover:text-amber-400 font-medium pt-3 px-4 hover:bg-white/10 rounded-lg transition-all duration-300 hover:translate-x-2"
                >
                  Home
                </motion.a>
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-300 hover:text-amber-400 font-medium py-2 px-4 hover:bg-white/10 rounded-lg transition-all duration-300 hover:translate-x-2"
                >
                  Produk & Layanan
                </motion.a>
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-300 hover:text-amber-400 font-medium py-2 px-4 hover:bg-white/10 rounded-lg transition-all duration-300 hover:translate-x-2"
                >
                  Tentang Kami
                </motion.a>
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-bold text-center mt-3 hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  Hubungi Kami
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      {/* Hero */}
      <section id="home" className="relative min-h-[100vh] md:min-h-[100vh] pt-32 md:pt-34 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <BackgroundParticles />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="inline-flex font-mono items-center bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-5 py-2 rounded-full mb-6 font-bold text-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Sparkles size={16} className="mr-2" />
                Terpercaya Sejak 2014
              </motion.div>
              {/* Main Heading */}
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                Solusi Cetak
                <br />
                <span className="relative inline-block">
                  <span className="text-amber-500">Profesional.</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="20" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C60 2 140 2 198 10" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.h1>
              {/* Subheading */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Nuansa Grafika menghadirkan hasil cetak premium dengan warna tajam, detail presisi, dan layanan cepat termasuk <span className="font-bold text-amber-400">One Day Service</span>.
              </motion.p>
              {/* Features List */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    },
                  },
                }}
                className="space-y-3 mb-10"
              >
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 100,
                          damping: 12,
                        },
                      },
                    }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-2 rounded-full shadow-lg group-hover:shadow-amber-400/50 transition-shadow duration-300">
                      <Check size={18} className="text-gray-900" strokeWidth={3} />
                    </div>
                    <span className="text-white text-base sm:text-lg font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
              {/* CTA Buttons */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 group"
                >
                  Lihat Produk
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={20} className="ml-3" />
                  </motion.div>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                >
                  Hubungi Kami
                </a>
              </motion.div>
            </div>
            {/* Right Content*/}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, type: 'spring' }} className="relative hidden lg:flex justify-center items-center">
              <motion.div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-amber-500/20 max-w-md w-full" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-3xl blur-xl -z-10" />

                <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[400px]">
                  {/* Large Image - Takes 2x2 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    whileHover={{ scale: 0.98, rotate: -2 }}
                    className="col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
                  >
                    <img src={productItems[0].img} alt="featured" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  {/* Small Images */}
                  {productItems.slice(1).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      className={`overflow-hidden rounded-xl shadow-lg cursor-pointer group ${index === 0 ? 'col-span-1 row-span-1' : index === 1 ? 'col-span-1 row-span-2' : 'col-span-2 row-span-1'}`}
                    >
                      <img src={item.img} alt="product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </motion.div>
                  ))}
                </div>

                {/* Decorative orbs */}
                <motion.div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-20 blur-2xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} />
                <motion.div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-500 rounded-full opacity-20 blur-2xl" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 4, repeat: Infinity }} />
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-0 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20"
              >
                <Sparkles className="text-amber-400" size={24} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-20 right-0 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20"
              >
                <Zap className="text-yellow-400" size={24} />
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer hover:text-amber-400 transition-colors">
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col justify-center items-center gap-2"
            >
              <span className="text-xs font-medium">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-2 bg-current rounded-full mt-2" />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </section>
      {/* Product Section */}
      <section id="products" className="py-20 bg-gradient-to-b from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Jelajahi <span className="text-amber-500">Produk</span> Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Kami menyediakan beragam layanan cetak, dari skala personal hingga kebutuhan bisnis korporat.</p>
          </motion.div>

          {/* Category Filter - Improved with smooth transitions */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-12">
            <div className="flex gap-3 pb-4 overflow-x-auto justify-start md:justify-center scrollbar-hide">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl font-semibold transition-all duration-300 w-28 h-28 text-center flex-shrink-0 ${
                      isActive ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900 shadow-lg shadow-amber-200' : 'bg-white text-gray-700 hover:bg-amber-50 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotate: isActive ? [0, -10, 10, 0] : 0,
                        scale: isActive ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={28} className="mb-2" />
                    </motion.div>
                    <span className="text-xs line-clamp-2">{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Products Grid - Enhanced animations */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div key={activeCategory} variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    whileHover={{
                      y: -12,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    onClick={() => setSelectedProduct(product)}
                    className="relative group cursor-pointer rounded-2xl bg-white shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 hover:border-amber-400 transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-64">
                      <motion.img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6, ease: 'easeOut' }} />

                      {/* Gradient Overlay */}
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />

                      {/* Hover Badge */}
                      <motion.div
                        className="absolute top-3 right-3 bg-amber-400 text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ZoomIn size={14} />
                        Lihat Detail
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-extrabold text-gray-900 text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-amber-600 font-bold text-base mb-2">{product.price}</p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-amber-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{product.images.length} Foto</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className="text-center py-20 bg-gray-50 rounded-2xl">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Package size={64} className="mx-auto text-gray-400 mb-4" />
                </motion.div>
                <p className="text-xl text-gray-500 font-semibold mb-2">Produk di kategori ini belum tersedia.</p>
                <p className="text-gray-400">Silahkan pilih kategori lain.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-blue-50 to-amber-50 ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative block md:hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/50">
                <img src="/images/banner-1.png" alt="about image" className="w-full h-96 object-cover object-left" />
                <div className="absolute inset-0 bg-black/35 transition-opacity"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl p-6 shadow-2xl border-4 border-white"
              >
                <div className="text-center ">
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">10+</div>
                  <div className="text-sm font-semibold text-gray-800">Tahun Pengalaman</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Mengenal Lebih Jauh <span className="text-amber-500">Kami</span>
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed border-l-4 border-blue-400 pl-4 bg-blue-50/80 p-3 rounded-r-lg shadow-sm">
                Nuansa Grafika Printing berfokus pada layanan percetakan terbaik mulai dari proses desain, pencetakan, hingga finishing. Dengan Quality Control yang ketat, kami memastikan setiap produk memiliki kualitas terbaik dan dapat
                dikirim dengan cepat.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Kepuasan pelanggan adalah prioritas utama kami. Karena itu, kami selalu memberikan hasil cetak yang optimal, pelayanan profesional, dan perhatian penuh pada setiap detail. Komitmen ini kami wujudkan untuk memberikan
                pengalaman terbaik bagi seluruh pelanggan.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 border-t-4 border-gray-900 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">500+</div>
                  <div className="text-sm text-gray-700 font-medium">Project Selesai</div>
                </div>
                <div className="bg-white rounded-xl p-5 border-t-4 border-amber-500 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-extrabold text-amber-600 mb-1">99%</div>
                  <div className="text-sm text-gray-700 font-medium">Kepuasan Pelanggan</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="review" className="py-12 md:py-24 bg-gradient-to-b from-amber-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>Testimoni Pelanggan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Apa Kata <span className="text-amber-600">Pelanggan Kami</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">Kepuasan pelanggan adalah prioritas utama kami. Simak pengalaman mereka yang telah menggunakan layanan kami.</p>
          </motion.div>
        </div>

        {/* Infinite Scroll Reviews */}
        <div className="relative">
          <div className="flex gap-4 md:gap-6 py-4 overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div
              ref={containerRef}
              className="flex gap-4 md:gap-6 shrink-0"
              style={{
                willChange: 'transform',
              }}
            >
              {allReviews.map((review, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    z: 50,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="relative bg-white rounded-2xl p-4 sm:p-6 w-72 sm:w-80 shrink-0 shadow-md border border-gray-100 hover:border-amber-300 hover:shadow-2xl transition-all duration-300 group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-3 -left-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full p-2 sm:p-3 shadow-lg">
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>

                  {/* Stars Based on rating */}
                  <div className="flex gap-1 mb-3 sm:mb-4">{renderStars(review.rating)}</div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 min-h-[60px]">"{review.teks}"</p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-3 sm:mb-4" />

                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md">{review.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{review.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays - Hidden on mobile for better visibility */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-amber-50 to-transparent pointer-events-none z-10" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none z-10" />
        </div>

        {/* Bottom Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="container mx-auto px-4 sm:px-6 mt-8 md:mt-16">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-center">
            <div className="group flex-1 min-w-[100px]">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 mb-1 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-gray-600 text-xs sm:text-sm md:text-base">Pelanggan Puas</div>
            </div>
            <div className="w-px h-12 sm:h-16 bg-gray-300" />
            <div className="group flex-1 min-w-[100px]">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 mb-1 group-hover:scale-110 transition-transform">5.0</div>
              <div className="text-gray-600 text-xs sm:text-sm md:text-base">Rating Tertinggi</div>
            </div>
            <div className="w-px hidden sm:block h-12 sm:h-16 bg-gray-300" />
            <div className="group flex-1 min-w-[100px]">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 mb-1 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-gray-600 text-xs sm:text-sm md:text-base">Layanan Support</div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-b from-blue-50 via-gray-50 to-white relative">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.15)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Pertanyaan yang <span className="text-amber-500">Sering Ditanyakan</span>
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Informasi lengkap seputar layanan, waktu pengerjaan, dan prosedur pemesanan.</p>
          </motion.div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="backdrop-blur-sm bg-white border border-gray-200 hover:border-amber-400 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 cursor-pointer text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold text-lg pr-4">{faq.question}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                      <ChevronDown size={20} className="text-amber-500 flex-shrink-0" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                      <motion.div initial={{ y: -10 }} animate={{ y: 0 }} exit={{ y: -10 }} transition={{ duration: 0.2 }} className="px-6 pb-6">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-4" />
                        <p className="text-gray-700 leading-relaxed text-base">{faq.answer}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
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
            <p className="text-lg text-gray-600">Jangan ragu menghubungi kami untuk konsultasi atau pemesanan langsung.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-800 p-8 border-t-8 border-amber-500 hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Informasi Kontak</h3>

              <div className="space-y-8">
                <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-xl shadow-lg flex-shrink-0">
                    <MapPin className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-lg">Alamat</p>
                    <p className="text-gray-600 leading-relaxed">Jl. Agung Raya 1 RT.9/RW.2, Lenteng Agung, Jagakarsa, Jakarta Selatan</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-xl shadow-lg flex-shrink-0">
                    <Phone className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-lg">Nomor Telepon</p>
                    <p className="text-gray-600 leading-relaxed">+62 815 9553 889 / +62 856 7281 994</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-xl shadow-lg flex-shrink-0">
                    <Mail className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-lg">Email</p>
                    <p className="text-gray-600 leading-relaxed">nuansa_grafika@yahoo.co.id</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Map Container */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden shadow-xl border-2 border-gray-800">
              <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                <iframe
                  title="Lokasi Nuansa Grafika"
                  width="100%"
                  height="420"
                  frameBorder="0"
                  className="rounded-2xl"
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6988.24783512814!2d106.84082777156264!3d-6.323690025249367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed18e8ba0aff%3A0xbea0477acd2f61ae!2sPercetakan%20Nuansa%20Grafika!5e1!3m2!1sid!2sid!4v1765305034130!5m2!1sid!2sid"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-extrabold mb-3 text-amber-400">Nuansa Grafika</h3>
            <p className="text-gray-300 text-sm max-w-xs">Solusi cetak cepat, berkualitas, dan terpercaya untuk semua kebutuhan Anda.</p>
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 text-white">Hubungi</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 flex items-center justify-center md:justify-start">
                <Phone size={16} className="mr-2 text-amber-400" /> +62 815 9553 889 / +62 856 7281 994
              </li>
              <li className="text-gray-300 flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2 text-amber-400" /> nuansa_grafika@yahoo.co.id
              </li>
              <li className="text-gray-300 flex items-start justify-center md:justify-start">
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
          href="https://wa.me/628159553889?text=Halo%20Kak,%20saya%20ingin%20konsultasi%20mengenai%20cetak%20produk."
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
          <motion.div
            className="fixed min-h-screen inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-2 sm:p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setSelectedProduct(null);
              setCurrentImageIndex(0);
            }}
          >
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full my-auto relative"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedProduct(null);
                  setCurrentImageIndex(0);
                }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-colors z-20 shadow-lg"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-gray-800" />
              </motion.button>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
                {/* Left: Image Gallery */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-amber-400/50">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />

                    {selectedProduct.images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevImage}
                          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all"
                        >
                          <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-gray-900" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextImage}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all"
                        >
                          <ChevronRight size={20} className="sm:w-6 sm:h-6 text-gray-900" />
                        </motion.button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                          {selectedProduct.images.map((_, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.2 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(idx);
                              }}
                              className={`h-2 sm:h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-amber-400 w-6 sm:w-8' : 'bg-white/70 w-2 sm:w-2.5'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {selectedProduct.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {selectedProduct.images.map((img, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-amber-400 scale-105 shadow-lg' : 'border-gray-200 hover:border-amber-300'}`}
                        >
                          <img src={img} alt={`${selectedProduct.name} ${idx + 1}`} className="w-full h-16 sm:h-24 object-cover" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Details */}
                <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[50vh] md:max-h-none pr-2">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">{selectedProduct.name}</h3>
                    <p className="text-amber-600 font-bold text-xl sm:text-2xl mb-3 sm:mb-4">{selectedProduct.price}</p>
                    <div className="flex items-center mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="sm:w-5 sm:h-5 text-amber-400 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600 font-medium text-sm sm:text-base">(5.0)</span>
                    </div>
                  </motion.div>

                  <motion.div className="border-t border-gray-200 pt-4 sm:pt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 sm:mb-3">Deskripsi Produk</h4>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedProduct.details}</p>
                  </motion.div>

                  <motion.div className="border-t border-gray-200 pt-4 sm:pt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 sm:mb-4">Spesifikasi Utama</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {selectedProduct.specs.map((spec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.4 + i * 0.05,
                            type: 'spring',
                            stiffness: 300,
                            damping: 24,
                          }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          className="flex items-center space-x-2 text-gray-700 bg-gray-50 p-2.5 sm:p-3 rounded-lg hover:bg-amber-50 transition-colors"
                        >
                          <Check size={16} className="sm:w-[18px] sm:h-[18px] text-green-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/6281312088319?text=Saya%20tertarik%20dengan%20produk%20${encodeURIComponent(selectedProduct.name)}.%20Mohon%20info%20lebih%20lanjut.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all mt-4 sm:mt-6"
                  >
                    Order Sekarang Via WhatsApp!
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;
