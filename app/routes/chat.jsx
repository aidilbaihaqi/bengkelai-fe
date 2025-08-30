import { useState, useEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import Button from "../components/Button";

// Loader function for SSR support
export const loader = async () => {
  return json({
    chatConfig: {
      title: 'BengkelAI - Konsultasi Motor',
      description: 'Konsultasi masalah motor Anda dengan AI yang cerdas dan dapatkan solusi terpercaya.',
      supportSSR: true,
      version: '1.0.0'
    }
  });
};

// Meta function for SEO and SSR
export const meta = () => {
  return [
    { title: 'BengkelAI - Konsultasi Motor dengan AI' },
    { name: 'description', content: 'Konsultasi masalah motor Anda dengan AI yang cerdas. Dapatkan diagnosa akurat dan estimasi biaya perbaikan secara real-time.' },
    { name: 'keywords', content: 'bengkel motor, konsultasi motor, AI motor, diagnosa motor, perbaikan motor' },
    { property: 'og:title', content: 'BengkelAI - Konsultasi Motor dengan AI' },
    { property: 'og:description', content: 'Konsultasi masalah motor Anda dengan AI yang cerdas dan dapatkan solusi terpercaya.' },
    { property: 'og:type', content: 'website' }
  ];
};

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Halo! Saya BengkelAI, asisten AI untuk motor Anda. Ceritakan masalah yang dialami motor Anda, dan saya akan membantu mendiagnosa serta memberikan solusi terbaik. 🚲⚡\n\n🔄 **Status:** Real-time AI Analysis Ready',
      timestamp: new Date(),
      source: 'BengkelAI v1.0',
      urgency: 'low',
      category: 'system'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [typingDots, setTypingDots] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Comprehensive AI responses dataset for demo
  const aiResponses = {
    // Masalah Starter & Kelistrikan
    'susah hidup': {
      response: '🔋 **Diagnosa: Masalah Starter/Kelistrikan**\n\nKemungkinan penyebab:\n• Aki lemah/soak (70%)\n• Starter motor rusak (20%)\n• Kabel massa longgar (10%)\n\n💰 **Estimasi Biaya:**\n• Ganti aki: Rp 200-400k\n• Service starter: Rp 150-300k\n• Cek kabel: Rp 50k\n\n🔧 **Langkah Cepat:**\n1. Coba starter ulang 2-3x\n2. Periksa lampu indikator\n3. Jika masih susah, jangan dipaksa',
      urgency: 'medium',
      category: 'kelistrikan'
    },
    'tidak bisa hidup': {
      response: '⚡ **Diagnosa: Sistem Starter Mati Total**\n\nKemungkinan penyebab:\n• Aki habis total (60%)\n• Sekring putus (25%)\n• Starter motor mati (15%)\n\n💰 **Estimasi Biaya:**\n• Cas aki: Rp 20-30k\n• Ganti sekring: Rp 10-25k\n• Ganti starter: Rp 300-500k\n\n⚠️ **Tindakan Darurat:**\nCoba kick starter jika ada, atau dorong motor untuk bump start.',
      urgency: 'high',
      category: 'kelistrikan'
    },
    
    // Masalah Mesin & Pembakaran
    'asap putih': {
      response: '💨 **Diagnosa: Masalah Pembakaran**\n\nKemungkinan penyebab:\n• Ring piston aus (50%)\n• Head gasket bocor (30%)\n• Oli masuk ruang bakar (20%)\n\n💰 **Estimasi Biaya:**\n• Ganti ring piston: Rp 300-600k\n• Ganti head gasket: Rp 200-400k\n• Tune up mesin: Rp 150-250k\n\n🚨 **Peringatan:**\nJangan biarkan terlalu lama, bisa merusak mesin lebih parah!',
      urgency: 'high',
      category: 'mesin'
    },
    'asap hitam': {
      response: '🖤 **Diagnosa: Pembakaran Tidak Sempurna**\n\nKemungkinan penyebab:\n• Karburator kotor/setelan salah (60%)\n• Filter udara kotor (25%)\n• Busi aus/kotor (15%)\n\n💰 **Estimasi Biaya:**\n• Bersih karbu + stel: Rp 75-150k\n• Ganti filter udara: Rp 25-50k\n• Ganti busi: Rp 15-35k\n\n✅ **Solusi Cepat:**\nCoba bersihkan filter udara dulu, sering kali ini penyebabnya.',
      urgency: 'medium',
      category: 'mesin'
    },
    'mesin kasar': {
      response: '🔧 **Diagnosa: Mesin Tidak Halus**\n\nKemungkinan penyebab:\n• Karburator kotor (40%)\n• Busi aus/gap tidak tepat (35%)\n• Timing pengapian salah (25%)\n\n💰 **Estimasi Biaya:**\n• Service karburator: Rp 50-100k\n• Ganti busi: Rp 15-35k\n• Stel timing: Rp 50-75k\n\n🎯 **Rekomendasi:**\nMulai dari yang termurah - ganti busi dulu, lalu bersih karbu.',
      urgency: 'low',
      category: 'mesin'
    },
    
    // Masalah Rem
    'rem blong': {
      response: '🚨 **BAHAYA! Masalah Rem Kritis**\n\n⚠️ **JANGAN BERKENDARA!**\n\nKemungkinan penyebab:\n• Minyak rem habis (40%)\n• Kampas rem habis (35%)\n• Selang rem bocor (25%)\n\n💰 **Estimasi Biaya:**\n• Isi minyak rem: Rp 25-50k\n• Ganti kampas rem: Rp 75-150k\n• Ganti selang rem: Rp 100-200k\n\n🆘 **Tindakan Segera:**\n1. Matikan mesin\n2. Parkir di tempat aman\n3. Hubungi bengkel terdekat',
      urgency: 'critical',
      category: 'rem'
    },
    'rem keras': {
      response: '🛑 **Diagnosa: Sistem Rem Keras**\n\nKemungkinan penyebab:\n• Kampas rem tipis (50%)\n• Minyak rem kotor (30%)\n• Kaliper rem macet (20%)\n\n💰 **Estimasi Biaya:**\n• Ganti kampas rem: Rp 75-150k\n• Kuras minyak rem: Rp 50-75k\n• Service kaliper: Rp 100-200k\n\n⚡ **Tips Sementara:**\nPeriksa ketebalan kampas rem, jika tipis segera ganti.',
      urgency: 'medium',
      category: 'rem'
    },
    
    // Masalah Oli & Pelumasan
    'oli bocor': {
      response: '🛢️ **Diagnosa: Kebocoran Oli**\n\nKemungkinan penyebab:\n• Gasket tutup klep bocor (40%)\n• Seal kruk as bocor (35%)\n• Baut drain oli longgar (25%)\n\n💰 **Estimasi Biaya:**\n• Ganti gasket: Rp 50-100k\n• Ganti seal: Rp 100-200k\n• Kencangkan baut: Rp 25k\n\n🔍 **Cara Cek:**\nLihat di bawah motor, oli menetes dari mana? Foto dan kirim ke bengkel.',
      urgency: 'medium',
      category: 'pelumasan'
    },
    'oli habis': {
      response: '⚠️ **Diagnosa: Oli Mesin Habis**\n\nKemungkinan penyebab:\n• Bocor tidak terdeteksi (60%)\n• Oli terbakar (pembakaran) (25%)\n• Lupa ganti oli lama (15%)\n\n💰 **Estimasi Biaya:**\n• Ganti oli + filter: Rp 75-150k\n• Cek kebocoran: Rp 50k\n• Perbaikan bocor: Rp 100-300k\n\n🚨 **PENTING:**\nJangan nyalakan mesin tanpa oli! Bisa rusak total.',
      urgency: 'critical',
      category: 'pelumasan'
    },
    
    // Masalah Transmisi & Kopling
    'gigi susah masuk': {
      response: '⚙️ **Diagnosa: Masalah Transmisi**\n\nKemungkinan penyebab:\n• Oli gardan kental/kotor (50%)\n• Kopling aus (30%)\n• Setelan kopling salah (20%)\n\n💰 **Estimasi Biaya:**\n• Ganti oli gardan: Rp 50-75k\n• Ganti kampas kopling: Rp 150-300k\n• Stel kopling: Rp 25-50k\n\n🔧 **Coba Dulu:**\nPanaskan mesin 5 menit, kadang oli kental karena dingin.',
      urgency: 'medium',
      category: 'transmisi'
    },
    
    // Masalah Suara
    'suara kasar': {
      response: '🔊 **Diagnosa: Suara Mesin Abnormal**\n\nKemungkinan penyebab:\n• Rantai keteng kendor (40%)\n• Klep perlu stel (35%)\n• Bearing aus (25%)\n\n💰 **Estimasi Biaya:**\n• Stel rantai keteng: Rp 50-75k\n• Stel klep: Rp 75-125k\n• Ganti bearing: Rp 200-400k\n\n👂 **Identifikasi Suara:**\n• Tek-tek-tek: Klep\n• Ngung-ngung: Bearing\n• Krek-krek: Rantai',
      urgency: 'medium',
      category: 'mesin'
    },
    
    // Default response
    'default': {
      response: '🤖 **Analisis Gejala Motor**\n\nTerima kasih sudah menceritakan masalah motor Anda. Untuk memberikan diagnosa yang lebih akurat, bisa tolong jelaskan:\n\n📝 **Detail yang dibutuhkan:**\n• Kapan masalah mulai terjadi?\n• Suara apa yang terdengar?\n• Apakah ada asap? Warna apa?\n• Sudah berapa lama tidak service?\n\n💡 **Atau coba kata kunci:**\n"susah hidup", "asap putih", "rem blong", "oli bocor", "mesin kasar"\n\n📞 **Estimasi pemeriksaan umum: Rp 50-100 ribu**',
      urgency: 'low',
      category: 'general'
    }
  };

  const quickActions = [
    { text: '🔍 Booking Bengkel', action: 'booking' },
    { text: '💰 Lihat Estimasi Biaya', action: 'estimate' },
    { text: '🔄 Ulangi Diagnosa', action: 'restart' },
    { text: '📋 Riwayat Chat', action: 'history' }
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typing dots animation
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingDots(prev => {
          if (prev === '') return '.';
          if (prev === '.') return '..';
          if (prev === '..') return '...';
          return '';
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setTypingDots('');
    }
  }, [isTyping]);

  // Simulate real-time connection status
  useEffect(() => {
    const checkConnection = () => {
      // Simulate occasional connection checks
      const isOnline = Math.random() > 0.05; // 95% uptime simulation
      setIsConnected(isOnline);
    };
    
    const interval = setInterval(checkConnection, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate real-time AI response with variable timing
    const responseTime = Math.random() * 2000 + 800; // 0.8-2.8 seconds for realism
    
    setTimeout(() => {
      const messageText = inputMessage.toLowerCase();
      let responseData = aiResponses.default;
      
      // Enhanced keyword matching for demo
      Object.keys(aiResponses).forEach(keyword => {
        if (messageText.includes(keyword) && keyword !== 'default') {
          responseData = aiResponses[keyword];
        }
      });
      
      // Add processing time indicator for complex issues
      const processingNote = responseData.urgency === 'critical' 
        ? '⚡ Analisis Prioritas Tinggi' 
        : responseData.category === 'mesin' 
        ? '🔧 Analisis Sistem Mesin' 
        : '🤖 Analisis AI Standard';
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: responseData.response,
        urgency: responseData.urgency,
        category: responseData.category,
        timestamp: new Date(),
        source: `${processingNote} (${Math.floor(Math.random() * 5) + 95}% akurasi)`
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setIsLoading(false);
    }, responseTime);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'booking':
        setInputMessage('Saya ingin booking bengkel terdekat');
        break;
      case 'estimate':
        setInputMessage('Berapa estimasi biaya perbaikan?');
        break;
      case 'restart':
        setMessages([messages[0]]);
        break;
      case 'history':
        // Save to localStorage for demo
        localStorage.setItem('bengkelai_chat_history', JSON.stringify(messages));
        alert('Riwayat chat disimpan!');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-6 hover:opacity-80 transition-opacity">
              <div className="bg-teal-500 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">BengkelAI</span>
            </Link>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Real-time Connected' : 'Reconnecting...'}
              </span>
              {isTyping && (
                <span className="ml-3 text-xs text-blue-600 flex items-center">
                  <span className="mr-1">🤖</span>
                  <span>Analyzing{typingDots}</span>
                </span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Konsultasi Gratis
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((message) => {
            const getUrgencyColor = (urgency) => {
              switch(urgency) {
                case 'critical': return 'border-l-4 border-red-500 bg-red-50';
                case 'high': return 'border-l-4 border-orange-500 bg-orange-50';
                case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50';
                case 'low': return 'border-l-4 border-green-500 bg-green-50';
                default: return 'bg-white';
              }
            };
            
            const getUrgencyBadge = (urgency) => {
              switch(urgency) {
                case 'critical': return { text: 'KRITIS', color: 'bg-red-500 text-white' };
                case 'high': return { text: 'TINGGI', color: 'bg-orange-500 text-white' };
                case 'medium': return { text: 'SEDANG', color: 'bg-yellow-500 text-white' };
                case 'low': return { text: 'RENDAH', color: 'bg-green-500 text-white' };
                default: return { text: 'INFO', color: 'bg-gray-500 text-white' };
              }
            };
            
            return (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.type === 'user' 
                    ? 'bg-teal-500 text-white rounded-2xl rounded-br-md' 
                    : `${getUrgencyColor(message.urgency)} text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100`
                } px-4 py-3`}>
                  {message.type === 'bot' && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        {message.source && (
                          <span className="text-xs text-gray-500">{message.source}</span>
                        )}
                      </div>
                      {message.urgency && (
                        <div className="flex items-center gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyBadge(message.urgency).color}`}>
                            {getUrgencyBadge(message.urgency).text}
                          </span>
                          {message.category && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs capitalize">
                              {message.category}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.type === 'user' && message.source && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs ml-2">
                        {message.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-600 ml-2">
                      🔍 Menganalisis gejala{typingDots}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  💡 Memproses data dari 1000+ kasus serupa...
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2">
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-full text-sm border border-gray-200 transition-colors duration-200 hover:border-teal-300"
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 py-3 bg-gray-50 border-t">
          <p className="text-xs text-gray-600 mb-2">💡 Coba tanyakan masalah motor Anda:</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { text: '🔋 Motor susah hidup', query: 'susah hidup', category: 'Starter' },
              { text: '💨 Asap putih keluar', query: 'asap putih', category: 'Mesin' },
              { text: '🛑 Rem tidak pakem', query: 'rem blong', category: 'Rem' },
              { text: '🛢️ Oli bocor', query: 'oli bocor', category: 'Pelumasan' },
              { text: '🔧 Mesin kasar', query: 'mesin kasar', category: 'Mesin' },
              { text: '⚙️ Gigi susah masuk', query: 'gigi susah masuk', category: 'Transmisi' }
            ].map((suggestion) => (
              <button
                key={suggestion.query}
                onClick={() => {
                  setInputMessage(suggestion.query);
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200 hover:shadow-sm text-left"
              >
                <div className="font-medium">{suggestion.text}</div>
                <div className="text-gray-500 text-xs mt-1">{suggestion.category}</div>
              </button>
            ))}
          </div>
          
          {/* Emergency Actions */}
          <div className="border-t pt-2">
            <p className="text-xs text-red-600 mb-2">🚨 Darurat:</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setInputMessage('rem blong');
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
              >
                🛑 Rem Bermasalah
              </button>
              <button
                onClick={() => {
                  setInputMessage('oli habis');
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors"
              >
                ⚠️ Oli Habis
              </button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik gejala motor Anda... (contoh: 'motor susah hidup pagi hari')"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                !inputMessage.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-teal-500 hover:bg-teal-600 text-white hover:scale-105 transform'
              }`}
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              )}
            </Button>
          </div>
          
          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 Ini adalah diagnosa awal berbasis AI. Untuk masalah serius, segera konsultasi dengan mekanik profesional.
          </p>
        </div>
      </div>
    </div>
  );
}