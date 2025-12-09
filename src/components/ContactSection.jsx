import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Instagram, Facebook, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      content: 'Jl. Agung Raya 1 RT.9/RW.2, Lenteng Agung, Jagakarsa, Jakarta Selatan',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Nomor Telepon',
      content: '+62 813-1208-8319',
      subcontent: '+62 815-9553-889',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'nuansagrafika@yahoo.co.id',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: 'Senin - Sabtu: 08.00 - 17.00',
      subcontent: 'Minggu: Tutup',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  const socialMedia = [
    { icon: Instagram, label: 'Instagram', link: '#', color: 'hover:bg-pink-500' },
    { icon: Facebook, label: 'Facebook', link: '#', color: 'hover:bg-blue-600' },
    { icon: MessageSquare, label: 'WhatsApp', link: '#', color: 'hover:bg-green-500' },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} /> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Hubungi <span className="text-amber-500">Kami</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Jangan ragu menghubungi kami untuk konsultasi gratis atau pemesanan. Tim kami siap membantu Anda!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Side - Contact Info & Form */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-t-4 border-amber-500">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>

              <div className="space-y-5">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ x: 5 }} className="flex items-start gap-4 group">
                      <div className={`bg-gradient-to-br ${item.color} p-3 rounded-xl shadow-lg flex-shrink-0 group-hover:shadow-xl transition-shadow duration-300`}>
                        <Icon className="text-white" size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 mb-1 text-base sm:text-lg">{item.title}</p>
                        <p className="text-gray-700 text-sm sm:text-base break-words">{item.content}</p>
                        {item.subcontent && <p className="text-gray-600 text-sm mt-1">{item.subcontent}</p>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="font-bold text-gray-900 mb-4">Ikuti Kami</p>
                <div className="flex flex-wrap gap-3">
                  {socialMedia.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a key={index} href={social.link} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} className={`bg-gray-100 p-3 rounded-full ${social.color} transition-all duration-300 group`} title={social.label}>
                        <Icon size={20} className="text-gray-700 group-hover:text-white transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Kirim Pesan Cepat</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                    placeholder="Tuliskan pesan Anda di sini..."
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isSuccess}
                  whileHover={{ scale: isSuccess ? 1 : 1.02 }}
                  whileTap={{ scale: isSuccess ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSuccess ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 hover:shadow-xl hover:shadow-amber-500/50'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full" />
                      Mengirim...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle size={20} />
                      Pesan Terkirim!
                    </>
                  ) : (
                    <>
                      Kirim Pesan
                      <Send size={20} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="h-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full min-h-[500px] lg:min-h-[700px]">
              <div className="relative w-full h-full">
                {/* Map Header */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 to-yellow-500 p-4 z-10">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <MapPin size={20} />
                    Lokasi Kami
                  </h4>
                </div>

                {/* Map */}
                <iframe
                  title="Lokasi Nuansa Grafika"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full pt-16"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6988.24783512814!2d106.84082777156264!3d-6.323690025249367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed18e8ba0aff%3A0xbea0477acd2f61ae!2sPercetakan%20Nuansa%20Grafika!5e1!3m2!1sid!2sid!4v1765305034130!5m2!1sid!2sid"
                />

                {/* Direction Button */}
                <motion.a
                  href="https://maps.app.goo.gl/your-google-maps-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-6 right-6 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  <MapPin size={20} />
                  Buka di Maps
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-8 sm:p-12 shadow-xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Siap Memulai Proyek Anda?</h3>
          <p className="text-gray-800 mb-6 max-w-2xl mx-auto">Hubungi kami sekarang dan dapatkan konsultasi gratis untuk kebutuhan cetak Anda!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+6281312088319"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Telepon Sekarang
            </motion.a>
            <motion.a
              href="https://wa.me/6281312088319"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
