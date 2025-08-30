export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      emoji: "AI",
      title: "Diagnosa AI",
      description: "Input gejala, dapatkan kemungkinan penyebab & solusi",
      badge: "AI Powered"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      emoji: "!",
      title: "Pengingat Servis",
      description: "Notifikasi ganti oli, kampas rem, dsb",
      badge: "Coming Soon"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      emoji: "@",
      title: "Cari Bengkel Terdekat",
      description: "Temukan bengkel terpercaya di sekitar Anda",
      badge: "Coming Soon"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
      emoji: "#",
      title: "Booking Online",
      description: "Antri bengkel jadi efisien",
      badge: "Coming Soon"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fitur Utama
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi lengkap untuk kebutuhan perawatan motor Anda
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group hover:scale-105 transform border border-teal-100"
            >
              {/* Badge */}
              <div className="absolute -top-3 -right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  feature.badge === 'AI Powered' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {feature.badge}
                </span>
              </div>
              
              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-teal-500 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              
              {/* Emoji */}
              <div className="text-4xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.emoji}
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}