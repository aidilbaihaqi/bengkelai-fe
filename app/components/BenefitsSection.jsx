export default function BenefitsSection() {
  const benefits = [
    {
      icon: "👤",
      title: "Pemilik Motor",
      description: "Hemat waktu & biaya, solusi transparan",
      features: [
        "Diagnosa cepat tanpa antri",
        "Estimasi biaya yang jelas",
        "Rekomendasi bengkel terpercaya",
        "Pengingat perawatan rutin"
      ],
      bgColor: "from-blue-50 to-teal-50",
      iconBg: "bg-blue-500"
    },
    {
      icon: "🛠️",
      title: "Bengkel Lokal",
      description: "Tambah pelanggan, digitalisasi antrian",
      features: [
        "Sistem booking otomatis",
        "Manajemen stok digital",
        "Promosi online",
        "Dashboard analitik"
      ],
      bgColor: "from-orange-50 to-yellow-50",
      iconBg: "bg-orange-500"
    },
    {
      icon: "🌍",
      title: "Masyarakat",
      description: "Lebih aman di jalan, kurangi mogok mendadak",
      features: [
        "Kendaraan lebih terawat",
        "Keselamatan berkendara",
        "Ekonomi bengkel lokal",
        "Teknologi untuk semua"
      ],
      bgColor: "from-green-50 to-teal-50",
      iconBg: "bg-green-500"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Manfaat untuk Semua
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            BengkelAI memberikan nilai lebih untuk setiap pengguna dalam ekosistem otomotif
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white text-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group hover:scale-105 transform"
            >
              {/* Icon & Title */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <div className={`inline-flex items-center justify-center w-12 h-12 ${benefit.iconBg} text-white rounded-full mb-4`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {benefit.description}
                </p>
              </div>
              
              {/* Features List */}
              <div className="space-y-3">
                {benefit.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Decorative Element */}
              <div className={`mt-6 h-1 bg-gradient-to-r ${benefit.bgColor} rounded-full`}></div>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-teal-800 rounded-2xl p-6">
            <div className="text-4xl font-bold text-teal-300 mb-2">24/7</div>
            <p className="text-gray-300">Layanan AI Tersedia</p>
          </div>
          <div className="bg-orange-800 rounded-2xl p-6">
            <div className="text-4xl font-bold text-orange-300 mb-2">95%</div>
            <p className="text-gray-300">Akurasi Diagnosa</p>
          </div>
          <div className="bg-blue-800 rounded-2xl p-6">
            <div className="text-4xl font-bold text-blue-300 mb-2">&lt; 2 Min</div>
            <p className="text-gray-300">Waktu Respons</p>
          </div>
        </div>
      </div>
    </section>
  );
}