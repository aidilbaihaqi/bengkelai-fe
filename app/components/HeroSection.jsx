import Button from "./Button";
import { Link } from "@remix-run/react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="bg-orange-500 p-3 rounded-xl mr-3">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold">BengkelAI</h1>
            </div>
            
            {/* Headline */}
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Asisten AI untuk Motor Anda
              <span className="ml-3 text-orange-400 font-bold">AI</span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-teal-100 mb-8 leading-relaxed">
              Diagnosa gejala motor, dapatkan estimasi perbaikan, dan temukan bengkel terdekat - langsung dari browser Anda.
            </p>
            
            {/* CTA Button */}
            <div className="mb-8">
              <Link to="/chat">
                <Button 
                  variant="primary" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Coba Sekarang (Gratis)
                </Button>
              </Link>
            </div>
            
            {/* Trust Badge */}
            <p className="text-teal-200 text-sm">
              Tidak perlu download. Langsung gunakan di browser Anda.
            </p>
          </div>
          
          {/* Right Content - Chat Mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
              {/* Chat Header */}
              <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                <div className="bg-teal-500 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">BengkelAI Assistant</h3>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-teal-500 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                    <p className="text-sm">Knalpot keluar asap putih</p>
                  </div>
                </div>
                
                {/* Bot Message */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs">
                    <p className="text-sm mb-2">
                      Kemungkinan ring piston aus. Estimasi Rp 200-300 ribu.
                    </p>
                    <p className="text-sm font-medium text-teal-600">
                      Mau booking bengkel terdekat?
                    </p>
                  </div>
                </div>
                
                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              AI Powered
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Gratis
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}