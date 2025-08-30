export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Ketik Gejala Motor",
      description: "Ceritakan masalah yang dialami motor Anda dengan bahasa sehari-hari",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/>
        </svg>
      )
    },
    {
      number: "2",
      title: "AI Menganalisa",
      description: "BengkelAI menganalisa gejala dan memberikan diagnosa serta estimasi biaya",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      number: "3",
      title: "Booking Bengkel",
      description: "Pilih bengkel terdekat dan booking slot sesuai kebutuhan Anda",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hanya 3 langkah mudah untuk mendapatkan solusi masalah motor Anda
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                {/* Step Number Circle */}
                <div className="relative mx-auto mb-6">
                  <div className="w-20 h-20 bg-white border-4 border-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-teal-600">{step.number}</span>
                  </div>
                  
                  {/* Icon Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full shadow-lg">
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Demo Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Demo Interaktif
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-teal-500 text-white p-2 rounded-full mr-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="font-semibold text-gray-800">Contoh Percakapan:</span>
              </div>
              
              <div className="space-y-3 text-left">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <p className="text-sm"><strong>Anda:</strong> "Motor susah hidup pagi hari"</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <p className="text-sm"><strong>BengkelAI:</strong> "Kemungkinan aki lemah atau karburator kotor. Estimasi servis Rp 150-250 ribu. Mau cari bengkel terdekat?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}