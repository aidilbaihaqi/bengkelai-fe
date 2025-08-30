import Button from "./Button";
import { Link } from "@remix-run/react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 via-blue-600 to-teal-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Siap mencoba BengkelAI?
          </h2>
          <p className="text-xl lg:text-2xl text-teal-100 mb-8 leading-relaxed">
            Dapatkan diagnosa motor yang akurat dan temukan solusi terbaik dalam hitungan menit
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link to="/chat">
            <Button 
              variant="primary" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[280px]"
            >
              🚀 Coba Sekarang (Gratis)
            </Button>
          </Link>
          <Link to="/chat">
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 min-w-[200px]"
            >
              📱 Lihat Demo
            </Button>
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="space-y-4 mb-12">
          <p className="text-teal-200 text-lg">
            ✨ Tidak perlu download. Langsung gunakan di browser Anda.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-teal-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              100% Gratis
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Data Aman
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              AI Terpercaya
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
              </svg>
              24/7 Tersedia
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
          <p className="text-teal-100 mb-4 font-semibold">
            "BengkelAI membantu saya menghemat waktu dan biaya. Sekarang saya tahu persis masalah motor sebelum ke bengkel!"
          </p>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">A</span>
            </div>
            <div className="text-left">
              <p className="font-semibold">Aidil Baihaqi</p>
              <p className="text-sm text-teal-200">Pengguna Beta Tester</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Note */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-teal-200 text-sm">
            Bergabunglah dengan ribuan pemilik motor yang sudah merasakan kemudahan BengkelAI
          </p>
        </div>
      </div>
      
      {/* Floating Action Elements */}
      <div className="absolute top-10 right-10 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce hidden lg:block">
        🔥 Trending
      </div>
      <div className="absolute bottom-10 left-10 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse hidden lg:block">
        ✅ Terpercaya
      </div>
    </section>
  );
}