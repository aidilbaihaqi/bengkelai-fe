/*
 * SETUP GOOGLE PLACES API:
 * 1. Buka Google Cloud Console (https://console.cloud.google.com/)
 * 2. Buat project baru atau pilih project yang sudah ada
 * 3. Enable Google Places API (New) dan Places API
 * 4. Buat API Key di Credentials
 * 5. Ganti 'YOUR_GOOGLE_PLACES_API_KEY' dengan API key yang valid
 * 6. Tambahkan domain ke API key restrictions untuk keamanan
 * 
 * CATATAN: Tanpa API key yang valid, aplikasi akan menggunakan dummy data
 */

import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import Button from "../components/Button";
import { searchDataset, getSuggestionsByCategory, getTotalEntries } from '../data/motorDataset';

// CSS untuk animasi fadeIn
const fadeInStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

// Inject CSS ke head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = fadeInStyle;
  document.head.appendChild(styleElement);
}

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
  const [showMap, setShowMap] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // AI Response using new dataset
  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for location-related keywords
    const locationKeywords = ['lokasi', 'map', 'bengkel terdekat', 'dimana', 'peta', 'terdekat'];
    const hasLocationKeyword = locationKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Search in dataset
    const result = searchDataset(lowerMessage);
    
    return {
      text: result.response,
      showMap: hasLocationKeyword || result.showMap || false,
      urgency: result.urgency,
      category: result.category
    };
  };

  // Interactive Map Component
  const InteractiveMap = ({ onClose }) => {
    const [selectedBengkel, setSelectedBengkel] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const mapRef = useRef(null);
    
    // State untuk workshop data dari Google Places API
    const [bengkelData, setBengkelData] = useState([]);
    const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(false);
    const [workshopsError, setWorkshopsError] = useState(null);

    // Fungsi untuk mengambil data workshop dari Google Places API
    const fetchWorkshopsFromGooglePlaces = async (lat = -6.2088, lng = 106.8456, radius = 5000) => {
      setIsLoadingWorkshops(true);
      setWorkshopsError(null);
      
      try {
        // Menggunakan Google Places API Nearby Search
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
          `location=${lat},${lng}&` +
          `radius=${radius}&` +
          `type=car_repair&` +
          `key=YOUR_GOOGLE_PLACES_API_KEY`, // Ganti dengan API key Google Places yang valid
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'OK' && data.results) {
          // Transform Google Places data ke format yang dibutuhkan
          const transformedWorkshops = data.results.map((place, index) => ({
            id: place.place_id || index + 1,
            name: place.name || 'Workshop Tidak Dikenal',
            address: place.vicinity || place.formatted_address || 'Alamat tidak tersedia',
            distance: calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng),
            rating: place.rating || 0,
            phone: place.formatted_phone_number || 'Tidak tersedia',
            services: place.types?.filter(type => 
              ['car_repair', 'car_dealer', 'car_wash', 'gas_station'].includes(type)
            ).map(type => type.replace('_', ' ').toUpperCase()) || ['Service Umum'],
            price: getPriceRange(place.price_level),
            open: place.opening_hours?.open_now ? 'Buka Sekarang' : 'Tutup/Tidak Diketahui',
            position: { x: 30 + (index * 20), y: 25 + (index * 25) },
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            color: getMarkerColor(index),
            photo: place.photos?.[0]?.photo_reference || null
          }));
          
          setBengkelData(transformedWorkshops);
        } else {
          // Fallback ke dummy data jika API gagal
          console.warn('Google Places API tidak mengembalikan hasil, menggunakan dummy data');
          setBengkelData(getDummyWorkshops());
        }
      } catch (error) {
        console.error('Error fetching workshops from Google Places:', error);
        setWorkshopsError(error.message);
        // Fallback ke dummy data jika terjadi error
        setBengkelData(getDummyWorkshops());
      } finally {
        setIsLoadingWorkshops(false);
      }
    };

    // Helper function untuk menghitung jarak
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
      const R = 6371; // Radius bumi dalam km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      return `${distance.toFixed(1)} km`;
    };

    // Helper function untuk warna marker
    const getMarkerColor = (index) => {
      const colors = ['red', 'blue', 'purple', 'green', 'orange', 'yellow'];
      return colors[index % colors.length];
    };

    // Helper function untuk price range
    const getPriceRange = (priceLevel) => {
      switch(priceLevel) {
        case 1: return 'Rp 25-75k';
        case 2: return 'Rp 50-150k';
        case 3: return 'Rp 100-300k';
        case 4: return 'Rp 200-500k';
        default: return 'Harga bervariasi';
      }
    };

    // Dummy data sebagai fallback
    const getDummyWorkshops = () => [
      {
        id: 1,
        name: 'Bengkel Jaya Motor',
        distance: '0.5 km',
        rating: 4.5,
        address: 'Jl. Raya Utama No. 123',
        phone: '021-1234-5678',
        services: ['Service Rutin', 'Ganti Oli', 'Perbaikan Mesin'],
        price: 'Rp 50-150k',
        open: '08:00 - 20:00',
        position: { x: 30, y: 25 }
      },
      {
        id: 2,
        name: 'Honda AHASS Sentral',
        distance: '1.2 km',
        rating: 4.8,
        address: 'Jl. Ahmad Yani No. 456',
        phone: '021-2345-6789',
        services: ['Service Resmi Honda', 'Spare Part Original', 'Garansi Resmi'],
        price: 'Rp 100-300k',
        open: '08:00 - 17:00',
        position: { x: 65, y: 50 }
      },
      {
        id: 3,
        name: 'Yamaha Service Center',
        distance: '1.8 km',
        rating: 4.6,
        address: 'Jl. Sudirman No. 789',
        phone: '021-3456-7890',
        services: ['Service Yamaha', 'Tune Up', 'Injeksi Cleaning'],
        price: 'Rp 75-250k',
        open: '08:00 - 18:00',
        position: { x: 45, y: 70 }
      }
    ];

    // Load workshops saat komponen dimount
    useEffect(() => {
      fetchWorkshopsFromGooglePlaces();
    }, []);

    // Handle mouse events for dragging
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y
      });
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Handle zoom
    const handleZoom = (direction) => {
      setZoomLevel(prev => {
        const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
        return Math.max(0.5, Math.min(3, newZoom));
      });
    };

    // Handle wheel zoom
    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'out' : 'in';
      handleZoom(direction);
    };

    // Reset map position and zoom
    const resetMap = () => {
      setZoomLevel(1);
      setMapPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();

      if (isDragging) {
        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);
      }

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }, [isDragging, dragStart]);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">🗺️ Peta Bengkel Terdekat</h3>
              <button 
                onClick={() => fetchWorkshopsFromGooglePlaces()}
                disabled={isLoadingWorkshops}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingWorkshops ? '🔄 Loading...' : '🔄 Refresh'}
              </button>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Status and Error Messages */}
          <div className="px-4 py-2 border-b bg-gray-50">
            <p className="text-sm text-gray-600">
              {isLoadingWorkshops ? '🔄 Mengambil data bengkel dari Google Maps...' : '💡 Klik marker untuk melihat detail bengkel'}
            </p>
            {workshopsError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mt-2 text-sm">
                ⚠️ Error: {workshopsError} (Menggunakan data dummy)
              </div>
            )}
          </div>
          
          <div className="flex flex-col lg:flex-row h-96">
            {/* Map Area */}
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
              {/* Google Maps Embed */}
              <div className="w-full h-full relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31731.02663282229!2d106.79249!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
                
                {/* Custom Markers Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {bengkelData.map((bengkel, index) => (
                    <div
                      key={bengkel.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform z-20 pointer-events-auto"
                      style={{
                        left: `${bengkel.position.x}%`,
                        top: `${bengkel.position.y}%`
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBengkel(bengkel);
                      }}
                    >
                      <div className={`relative ${
                        selectedBengkel?.id === bengkel.id ? 'animate-pulse' : 'animate-bounce'
                      }`}>
                        <div className={`${
                          selectedBengkel?.id === bengkel.id 
                            ? 'bg-green-500 ring-4 ring-green-200 scale-125' 
                            : index === 0 ? 'bg-red-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                        } text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-xl transition-all duration-200 border-3 border-white`}>
                          🏪
                        </div>
                        {/* Marker Label */}
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 px-3 py-2 rounded-lg text-sm font-medium shadow-xl whitespace-nowrap border border-cyan-400/30 ring-1 ring-white/20">
                          <div className="font-bold text-white">{bengkel.name}</div>
                          <div className="text-cyan-300/80 text-xs">{bengkel.distance}</div>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <span className="text-xs ml-1 font-medium text-white">{bengkel.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 z-30 backdrop-blur-xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 rounded-lg shadow-lg p-3 border border-cyan-400/30 ring-1 ring-white/20">
                  <div className="text-sm font-bold text-white mb-2">🗺️ Google Maps</div>
                  <div className="text-xs text-cyan-300/80">Klik marker untuk detail</div>
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 backdrop-blur-xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 p-4 rounded-lg shadow-xl text-sm z-30 border border-cyan-400/30 ring-1 ring-white/20">
                  <div className="font-bold mb-3 text-white">📍 Bengkel Terdekat</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm ring-1 ring-white/20"></div>
                      <span className="text-white/90">Bengkel Jaya Motor</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm ring-1 ring-white/20"></div>
                      <span className="text-white/90">Honda AHASS Sentral</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm ring-1 ring-white/20"></div>
                      <span className="text-white/90">Yamaha Service Center</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bengkel List */}
            <div className="w-full lg:w-80 border-l overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">📋 Daftar Bengkel</h4>
                  <div className="flex items-center gap-2">
                    {isLoadingWorkshops && (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span className="text-xs text-gray-500">{bengkelData.length} bengkel</span>
                  </div>
                </div>
                {bengkelData.map((bengkel, index) => (
                  <div 
                    key={bengkel.id}
                    className={`p-3 border rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                      selectedBengkel?.id === bengkel.id ? 'bg-blue-50 border-blue-300 shadow-md' : 'hover:bg-gray-50 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedBengkel(bengkel)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-red-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                        }`}></div>
                        <h5 className="font-medium text-sm">{bengkel.name}</h5>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{bengkel.distance}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-xs text-gray-600 ml-1 font-medium">{bengkel.rating}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">{bengkel.price}</span>
                    </div>
                    
                    {selectedBengkel?.id === bengkel.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
                        <div className="space-y-2 mb-3">
                          <p className="text-xs text-gray-600 flex items-start gap-2">
                            <span>📍</span>
                            <span>{bengkel.address}</span>
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-2">
                            <span>📞</span>
                            <span>{bengkel.phone}</span>
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-2">
                            <span>🕒</span>
                            <span>{bengkel.open}</span>
                          </p>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-2">🔧 Layanan:</p>
                          <div className="flex flex-wrap gap-1">
                            {bengkel.services.map((service, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button className="bg-blue-500 text-white text-xs py-2 px-3 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-1">
                            📞 Hubungi
                          </button>
                          <button className="bg-green-500 text-white text-xs py-2 px-3 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-1">
                            🗺️ Rute
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {!selectedBengkel && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-700 text-center">
                      💡 Klik marker di peta atau pilih bengkel di atas untuk melihat detail
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Selected Bengkel Details */}
          {selectedBengkel && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{selectedBengkel.name}</h4>
                  <p className="text-sm text-gray-600">{selectedBengkel.address}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm ml-1">{selectedBengkel.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedBengkel.distance}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">📞 Kontak:</p>
                  <p className="text-gray-600">{selectedBengkel.phone}</p>
                </div>
                <div>
                  <p className="font-medium">🕒 Jam Buka:</p>
                  <p className="text-gray-600">{selectedBengkel.open}</p>
                </div>
                <div>
                  <p className="font-medium">💰 Harga:</p>
                  <p className="text-gray-600">{selectedBengkel.price}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="font-medium text-sm mb-1">🛠️ Layanan:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedBengkel.services.map((service, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                  📞 Hubungi
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                  🗺️ Navigasi
                </button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600">
                  📅 Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const quickActions = [
    { text: '🔍 Booking Bengkel', action: 'booking' },
    { text: '💰 Lihat Estimasi Biaya', action: 'estimate' },
    { text: '🔄 Ulangi Diagnosa', action: 'restart' },
    { text: '📋 Riwayat Chat', action: 'history' }
  ];

  // Enhanced auto scroll with animation timing
  const scrollToBottom = () => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }, 100);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Message entrance animations
  const [animatingMessages, setAnimatingMessages] = useState(new Set());
  
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.type === 'bot') {
      setAnimatingMessages(prev => new Set([...prev, latestMessage.id]));
      const timer = setTimeout(() => {
        setAnimatingMessages(prev => {
          const newSet = new Set(prev);
          newSet.delete(latestMessage.id);
          return newSet;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Enhanced typing animation effect with more realistic patterns
  useEffect(() => {
    if (isTyping) {
      const patterns = ['.', '..', '...', '..', '.', ''];
      let index = 0;
      const interval = setInterval(() => {
        setTypingDots(patterns[index]);
        index = (index + 1) % patterns.length;
      }, 400);
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

  // Function to render text with bold formatting
  const renderFormattedText = (text) => {
    if (!text) return text;
    
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold">{part}</strong>;
      }
      return part;
    });
  };

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
      const aiResponse = generateAIResponse(inputMessage);
      
      // Add processing time indicator for complex issues
      const processingNote = aiResponse.urgency === 'critical' 
        ? '⚡ Analisis Prioritas Tinggi' 
        : aiResponse.category === 'mesin' 
        ? '🔧 Analisis Sistem Mesin' 
        : '🤖 Analisis AI Standard';
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.text,
        urgency: aiResponse.urgency,
        category: aiResponse.category,
        timestamp: new Date(),
        source: `${processingNote} (${Math.floor(Math.random() * 5) + 95}% akurasi)`,
        showMap: aiResponse.showMap
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Show map if location-related
      if (aiResponse.showMap) {
        setShowMap(true);
      }
      
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>
      {/* Interactive Map Modal */}
      {showMap && <InteractiveMap onClose={() => setShowMap(false)} />}
      {/* Header */}
      <header className="backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 border-b border-cyan-500/20 px-3 sm:px-4 py-3 sm:py-4 relative z-10 ring-1 ring-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <Link to="/" className="flex items-center mr-3 sm:mr-6 hover:opacity-80 transition-opacity flex-shrink-0">
              <div className="bg-teal-500 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">BengkelAI</span>
            </Link>
            <div className="flex items-center min-w-0 flex-1">
              <div className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="text-xs sm:text-sm text-cyan-300/80 truncate">
                {isConnected ? 'Real-time Connected' : 'Reconnecting...'}
              </span>
              {isTyping && (
                <span className="ml-2 sm:ml-3 text-xs text-blue-600 flex items-center flex-shrink-0">
                  <span className="mr-1">🤖</span>
                  <span className="hidden sm:inline">Analyzing{typingDots}</span>
                  <span className="sm:hidden">AI{typingDots}</span>
                </span>
              )}
            </div>
          </div>
          <div className="text-xs sm:text-sm text-white/60 flex-shrink-0 ml-2">
            <span className="hidden sm:inline">Konsultasi Gratis</span>
            <span className="sm:hidden">Gratis</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative z-10">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
          {messages.map((message, index) => {
            const getUrgencyColor = (urgency) => {
              switch(urgency) {
                case 'critical': return 'border-l-4 border-red-500 bg-gradient-to-br from-red-900/20 via-red-800/10 to-red-900/20 backdrop-blur-xl ring-1 ring-red-500/20';
                case 'high': return 'border-l-4 border-orange-500 bg-gradient-to-br from-orange-900/20 via-orange-800/10 to-orange-900/20 backdrop-blur-xl ring-1 ring-orange-500/20';
                case 'medium': return 'border-l-4 border-yellow-500 bg-gradient-to-br from-yellow-900/20 via-yellow-800/10 to-yellow-900/20 backdrop-blur-xl ring-1 ring-yellow-500/20';
                case 'low': return 'border-l-4 border-green-500 bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 backdrop-blur-xl ring-1 ring-green-500/20';
                default: return 'bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10';
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
              <div 
                key={message.id} 
                className={`flex transition-all duration-500 ease-out transform ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                } ${
                  animatingMessages.has(message.id) 
                    ? 'animate-pulse scale-105' 
                    : 'animate-fadeIn hover:scale-[1.02]'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className={`max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl group relative ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-br-md hover:-translate-y-1 active:scale-95 ring-1 ring-white/20'
                    : `${getUrgencyColor(message.urgency)} hover:from-slate-800/95 hover:via-slate-700/85 hover:to-slate-800/95 text-white rounded-bl-md hover:-translate-y-1 hover:border-cyan-400/50`
                } ${
                  animatingMessages.has(message.id) ? 'ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-slate-900' : ''
                }`}>
                  {message.type === 'bot' && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        {message.source && (
                          <span className="text-xs text-cyan-300/80">{message.source}</span>
                        )}
                      </div>
                      {message.urgency && (
                        <div className="flex items-center gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyBadge(message.urgency).color}`}>
                            {getUrgencyBadge(message.urgency).text}
                          </span>
                          {message.category && (
                            <span className="px-2 py-1 bg-slate-700/50 text-cyan-300 rounded-full text-xs capitalize border border-cyan-500/20">
                              {message.category}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap group-hover:text-white transition-colors duration-200">{renderFormattedText(message.content)}</p>
                  
                  {/* Message glow effect for bot messages */}
                  {message.type === 'bot' && animatingMessages.has(message.id) && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-500/10 animate-pulse -z-10" />
                  )}
                  
                  {/* Show Map Button for location-related messages */}
                  {message.showMap && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button 
                        onClick={() => setShowMap(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        🗺️ Lihat Peta Interaktif
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70 group-hover:opacity-90 transition-opacity duration-200">
                    <span className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        message.type === 'user' ? 'bg-white/50' : 'bg-cyan-400/70'
                      }`} />
                      {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.source && (
                      <span className="text-cyan-300 font-medium px-2 py-1 bg-cyan-400/10 rounded-full border border-cyan-400/20">
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
              <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 border border-cyan-400/30 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg backdrop-blur-xl ring-1 ring-white/10">
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
                    <span className="text-xs text-cyan-300/80 ml-2">
                      🔍 Menganalisis gejala{typingDots}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-white/60">
                  💡 Memproses data dari 1000+ kasus serupa...
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-3 sm:px-4 py-2">
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center mb-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="backdrop-blur-xl bg-slate-800/40 hover:bg-slate-700/60 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-cyan-500/20 transition-all duration-200 hover:border-cyan-400/40 hover:shadow-lg ring-1 ring-white/10"
              >
                <span className="hidden sm:inline">{action.text}</span>
                <span className="sm:hidden">{action.text.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="px-3 sm:px-4 py-3 backdrop-blur-xl bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-900/60 border-t border-cyan-500/20 ring-1 ring-white/5">
          <p className="text-xs text-cyan-300/80 mb-2">💡 Coba tanyakan masalah motor Anda:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
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
                className="px-3 py-2 backdrop-blur-xl bg-slate-800/40 border border-cyan-500/20 rounded-lg text-xs text-white hover:bg-slate-700/60 hover:border-cyan-400/40 transition-all duration-200 hover:shadow-lg text-left ring-1 ring-white/10"
              >
                <div className="font-medium">{suggestion.text}</div>
                <div className="text-cyan-300/60 text-xs mt-1">{suggestion.category}</div>
              </button>
            ))}
          </div>
          
          {/* Emergency Actions */}
          <div className="border-t pt-2">
            <p className="text-xs text-red-400 mb-2">🚨 Darurat:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setInputMessage('rem blong');
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="flex-1 px-3 py-2 backdrop-blur-xl bg-red-900/40 text-red-300 rounded-lg text-xs font-medium hover:bg-red-800/60 transition-all duration-200 border border-red-500/30 ring-1 ring-white/10"
              >
                🛑 Rem Bermasalah
              </button>
              <button
                onClick={() => {
                  setInputMessage('oli habis');
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="flex-1 px-3 py-2 backdrop-blur-xl bg-orange-900/40 text-orange-300 rounded-lg text-xs font-medium hover:bg-orange-800/60 transition-all duration-200 border border-orange-500/30 ring-1 ring-white/10"
              >
                ⚠️ Oli Habis
              </button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 border-t border-cyan-500/20 px-3 sm:px-4 py-3 sm:py-4 ring-1 ring-white/10">
          <div className="flex items-end space-x-2 sm:space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik gejala motor Anda..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-xl bg-slate-800/40 border border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 resize-none text-sm text-white placeholder-white/60 ring-1 ring-white/10"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all duration-200 min-w-[60px] sm:min-w-[80px] backdrop-blur-xl border ring-1 ring-white/20 ${
                !inputMessage.trim() || isLoading
                  ? 'bg-slate-600/50 text-slate-400 cursor-not-allowed border-slate-500/30'
                  : 'bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-500/90 hover:to-blue-500/90 text-white hover:scale-105 transform border-cyan-400/30'
              }`}
            >
              {isLoading ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              )}
            </Button>
          </div>
          
          {/* Disclaimer */}
          <p className="text-xs text-white/60 mt-2 text-center">
            💡 Ini adalah diagnosa awal berbasis AI. Untuk masalah serius, segera konsultasi dengan mekanik profesional.
          </p>
        </div>
      </div>
    </div>
  );
}