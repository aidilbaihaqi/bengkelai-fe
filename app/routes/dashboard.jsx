import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";

export const meta = () => {
  return [
    { title: "Dashboard - BengkelAI" },
    { name: "description", content: "Dashboard pengguna BengkelAI untuk monitoring motor dan layanan" },
  ];
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [motorCondition, setMotorCondition] = useState({
    engine: { status: 'good', percentage: 85, lastCheck: '2024-01-15' },
    brake: { status: 'warning', percentage: 65, lastCheck: '2024-01-10' },
    oil: { status: 'critical', percentage: 25, lastCheck: '2024-01-05' },
    battery: { status: 'good', percentage: 90, lastCheck: '2024-01-12' },
    tire: { status: 'good', percentage: 80, lastCheck: '2024-01-08' },
    chain: { status: 'warning', percentage: 60, lastCheck: '2024-01-03' }
  });

  const [serviceReminders, setServiceReminders] = useState([
    {
      id: 1,
      component: 'Oli Mesin',
      dueDate: '2024-02-01',
      urgency: 'critical',
      mileage: 5000,
      description: 'Ganti oli mesin setiap 3000-5000 km'
    },
    {
      id: 2,
      component: 'Kampas Rem',
      dueDate: '2024-02-15',
      urgency: 'high',
      mileage: 8000,
      description: 'Periksa ketebalan kampas rem'
    },
    {
      id: 3,
      component: 'Rantai Motor',
      dueDate: '2024-03-01',
      urgency: 'medium',
      mileage: 10000,
      description: 'Pembersihan dan pelumasan rantai'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Motor Condition Overview */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          🏍️ Kondisi Motor Saat Ini
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(motorCondition).map(([key, condition]) => {
            const componentNames = {
              engine: 'Mesin',
              brake: 'Rem',
              oil: 'Oli',
              battery: 'Aki',
              tire: 'Ban',
              chain: 'Rantai'
            };
            
            return (
              <div key={key} className={`p-4 rounded-lg border backdrop-blur-sm ${getStatusColor(condition.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{componentNames[key]}</span>
                  <span className="text-sm opacity-80">{condition.percentage}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      condition.status === 'good' ? 'bg-green-500' :
                      condition.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${condition.percentage}%` }}
                  />
                </div>
                <p className="text-xs opacity-70">Cek terakhir: {condition.lastCheck}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => setActiveTab('workshop-finder')}
          className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-6 text-left hover:from-cyan-600/30 hover:to-blue-600/30 transition-all duration-200 group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔍</div>
          <h4 className="font-semibold text-white mb-1">Cari Bengkel</h4>
          <p className="text-sm text-gray-300">Temukan bengkel terdekat</p>
        </button>
        
        <button 
          onClick={() => setActiveTab('spare-parts')}
          className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 text-left hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-200 group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔧</div>
          <h4 className="font-semibold text-white mb-1">Spare Parts</h4>
          <p className="text-sm text-gray-300">Estimasi harga suku cadang</p>
        </button>
        
        <button 
          onClick={() => setActiveTab('service-reminders')}
          className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 text-left hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-200 group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⏰</div>
          <h4 className="font-semibold text-white mb-1">Reminder</h4>
          <p className="text-sm text-gray-300">Jadwal perawatan motor</p>
        </button>
        
        <Link 
          to="/chat"
          className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 text-left hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-200 group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🤖</div>
          <h4 className="font-semibold text-white mb-1">AI Diagnosa</h4>
          <p className="text-sm text-gray-300">Chat dengan AI assistant</p>
        </Link>
      </div>

      {/* Recent Service Reminders */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          ⏰ Reminder Perawatan Mendatang
        </h3>
        <div className="space-y-3">
          {serviceReminders.slice(0, 3).map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(reminder.urgency)}`}>
                    {reminder.urgency.toUpperCase()}
                  </span>
                  <h4 className="font-medium text-white">{reminder.component}</h4>
                </div>
                <p className="text-sm text-gray-300 mb-1">{reminder.description}</p>
                <p className="text-xs text-gray-400">Target: {reminder.dueDate} | {reminder.mileage} km</p>
              </div>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServiceReminders = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          ⏰ Service Reminders
        </h3>
        <div className="space-y-4">
          {serviceReminders.map((reminder) => (
            <div key={reminder.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(reminder.urgency)}`}>
                    {reminder.urgency.toUpperCase()}
                  </span>
                  <h4 className="font-semibold text-white">{reminder.component}</h4>
                </div>
                <span className="text-sm text-gray-400">{reminder.dueDate}</span>
              </div>
              <p className="text-gray-300 mb-3">{reminder.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Target mileage: {reminder.mileage} km</span>
                <div className="flex gap-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    Selesai
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkshopFinder = () => {
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [showMap, setShowMap] = useState(false);
    
    const workshops = [
      {
        id: 1,
        name: 'Bengkel Jaya Motor',
        address: 'Jl. Sudirman No. 123, Jakarta Pusat',
        distance: '0.5 km',
        rating: 4.5,
        services: ['Service Rutin', 'Ganti Oli', 'Tune Up'],
        phone: '021-12345678',
        openHours: '08:00 - 17:00',
        lat: -6.2088,
        lng: 106.8456
      },
      {
        id: 2,
        name: 'Honda AHASS Sentral',
        address: 'Jl. Thamrin No. 45, Jakarta Pusat',
        distance: '1.2 km',
        rating: 4.8,
        services: ['Service Resmi Honda', 'Spare Part Original', 'Garansi Resmi'],
        phone: '021-87654321',
        openHours: '08:00 - 16:00',
        lat: -6.1944,
        lng: 106.8229
      },
      {
        id: 3,
        name: 'Yamaha Service Center',
        address: 'Jl. Gatot Subroto No. 67, Jakarta Selatan',
        distance: '2.1 km',
        rating: 4.6,
        services: ['Service Yamaha', 'Diagnostic Computer', 'Body Repair'],
        phone: '021-11223344',
        openHours: '09:00 - 17:00',
        lat: -6.2297,
        lng: 106.8253
      }
    ];

    const InteractiveWorkshopMap = () => (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden">
          {/* Map Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              🗺️ Workshop Finder - Interactive Map
            </h3>
            <button 
              onClick={() => setShowMap(false)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 flex">
            {/* Map Area */}
            <div className="flex-1 bg-slate-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-white text-lg mb-2">Interactive Google Maps</p>
                  <p className="text-gray-400">Peta interaktif dengan lokasi bengkel terdekat</p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                    {workshops.map((workshop) => (
                      <div key={workshop.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white text-sm">{workshop.name}</h4>
                          <span className="text-xs text-cyan-400">{workshop.distance}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 text-xs">
                            {'★'.repeat(Math.floor(workshop.rating))}
                          </div>
                          <span className="text-xs text-gray-400 ml-1">({workshop.rating})</span>
                        </div>
                        <p className="text-xs text-gray-300 mb-2">{workshop.address}</p>
                        <button 
                          onClick={() => setSelectedWorkshop(workshop)}
                          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-1 px-2 rounded text-xs transition-colors"
                        >
                          Lihat Detail
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Workshop Details Sidebar */}
            {selectedWorkshop && (
              <div className="w-80 bg-slate-800 border-l border-slate-700 p-4 overflow-y-auto">
                <h4 className="text-lg font-bold text-white mb-3">{selectedWorkshop.name}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">📍 Alamat</p>
                    <p className="text-sm text-white">{selectedWorkshop.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">📞 Telepon</p>
                    <p className="text-sm text-white">{selectedWorkshop.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">🕒 Jam Buka</p>
                    <p className="text-sm text-white">{selectedWorkshop.openHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">⭐ Rating</p>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(selectedWorkshop.rating))}
                      </div>
                      <span className="text-sm text-white ml-2">({selectedWorkshop.rating})</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">🔧 Layanan</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedWorkshop.services.map((service, index) => (
                        <span key={index} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors">
                      📞 Hubungi Bengkel
                    </button>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors">
                      🗺️ Petunjuk Arah
                    </button>
                    <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded transition-colors">
                      📅 Booking Online
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {showMap && <InteractiveWorkshopMap />}
        
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              🗺️ Workshop Finder
            </h3>
            <button 
              onClick={() => setShowMap(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 ring-1 ring-white/20"
            >
              🗺️ Buka Peta Interaktif
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="bg-slate-700/30 rounded-lg border border-slate-600/50 p-4 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white">{workshop.name}</h4>
                  <span className="text-sm text-cyan-400 font-medium">{workshop.distance}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(workshop.rating))}
                  </div>
                  <span className="text-sm text-gray-400 ml-2">({workshop.rating})</span>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{workshop.address}</p>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-1">Layanan:</p>
                  <div className="flex flex-wrap gap-1">
                    {workshop.services.slice(0, 2).map((service, index) => (
                      <span key={index} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">
                        {service}
                      </span>
                    ))}
                    {workshop.services.length > 2 && (
                      <span className="text-xs text-gray-400">+{workshop.services.length - 2} lainnya</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedWorkshop(workshop)}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded text-sm transition-colors"
                  >
                    Detail
                  </button>
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm transition-colors">
                    Hubungi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSpareParts = () => {
    const [selectedPart, setSelectedPart] = useState(null);
    const [showComparison, setShowComparison] = useState(false);
    
    const spareParts = [
      {
        id: 1,
        name: 'Oli Mesin',
        category: 'Engine',
        priceRange: 'Rp 45.000 - 85.000',
        shops: 12,
        image: '🛢️',
        description: 'Oli mesin berkualitas untuk performa optimal',
        variants: [
          { brand: 'Shell Advance', price: 85000, shop: 'Bengkel Jaya Motor', rating: 4.8 },
          { brand: 'Castrol Power1', price: 75000, shop: 'Honda AHASS', rating: 4.7 },
          { brand: 'Yamalube', price: 65000, shop: 'Yamaha Service', rating: 4.6 },
          { brand: 'Pertamina Enduro', price: 45000, shop: 'Bengkel Mandiri', rating: 4.3 }
        ]
      },
      {
        id: 2,
        name: 'Kampas Rem',
        category: 'Brake System',
        priceRange: 'Rp 35.000 - 65.000',
        shops: 8,
        image: '🛑',
        description: 'Kampas rem untuk keamanan berkendara',
        variants: [
          { brand: 'Brembo', price: 65000, shop: 'Honda AHASS', rating: 4.9 },
          { brand: 'Nissin', price: 55000, shop: 'Yamaha Service', rating: 4.7 },
          { brand: 'TDR', price: 45000, shop: 'Bengkel Jaya Motor', rating: 4.5 },
          { brand: 'Aspira', price: 35000, shop: 'Bengkel Mandiri', rating: 4.2 }
        ]
      },
      {
        id: 3,
        name: 'Ban Motor',
        category: 'Tires',
        priceRange: 'Rp 250.000 - 450.000',
        shops: 15,
        image: '🏍️',
        description: 'Ban motor untuk berbagai kondisi jalan',
        variants: [
          { brand: 'Michelin Pilot Street', price: 450000, shop: 'Honda AHASS', rating: 4.9 },
          { brand: 'Pirelli Angel ST', price: 420000, shop: 'Yamaha Service', rating: 4.8 },
          { brand: 'IRC RoadWinner', price: 320000, shop: 'Bengkel Jaya Motor', rating: 4.6 },
          { brand: 'Swallow SB117', price: 250000, shop: 'Bengkel Mandiri', rating: 4.3 }
        ]
      },
      {
        id: 4,
        name: 'Aki Motor',
        category: 'Electrical',
        priceRange: 'Rp 180.000 - 320.000',
        shops: 10,
        image: '🔋',
        description: 'Aki motor untuk sistem kelistrikan',
        variants: [
          { brand: 'GS Astra Premium', price: 320000, shop: 'Honda AHASS', rating: 4.8 },
          { brand: 'Yuasa YTX7A', price: 280000, shop: 'Yamaha Service', rating: 4.7 },
          { brand: 'Incoe Gold', price: 220000, shop: 'Bengkel Jaya Motor', rating: 4.5 },
          { brand: 'RD Power', price: 180000, shop: 'Bengkel Mandiri', rating: 4.2 }
        ]
      },
      {
        id: 5,
        name: 'Rantai Motor',
        category: 'Drive System',
        priceRange: 'Rp 85.000 - 150.000',
        shops: 7,
        image: '⛓️',
        description: 'Rantai motor untuk transmisi tenaga',
        variants: [
          { brand: 'DID Chain', price: 150000, shop: 'Honda AHASS', rating: 4.8 },
          { brand: 'RK Chain', price: 130000, shop: 'Yamaha Service', rating: 4.7 },
          { brand: 'SSS Chain', price: 110000, shop: 'Bengkel Jaya Motor', rating: 4.5 },
          { brand: 'TK Chain', price: 85000, shop: 'Bengkel Mandiri', rating: 4.3 }
        ]
      },
      {
        id: 6,
        name: 'Busi Motor',
        category: 'Engine',
        priceRange: 'Rp 15.000 - 35.000',
        shops: 20,
        image: '⚡',
        description: 'Busi motor untuk pembakaran optimal',
        variants: [
          { brand: 'NGK Iridium', price: 35000, shop: 'Honda AHASS', rating: 4.9 },
          { brand: 'Denso Iridium', price: 32000, shop: 'Yamaha Service', rating: 4.8 },
          { brand: 'Bosch Platinum', price: 25000, shop: 'Bengkel Jaya Motor', rating: 4.6 },
          { brand: 'Champion Copper', price: 15000, shop: 'Bengkel Mandiri', rating: 4.2 }
        ]
      }
    ];

    const PriceComparisonModal = () => (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedPart?.image}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedPart?.name}</h3>
                <p className="text-sm text-gray-400">{selectedPart?.category}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowComparison(false)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-gray-300 mb-6">{selectedPart?.description}</p>
            
            <h4 className="text-lg font-semibold text-white mb-4">Perbandingan Harga dari {selectedPart?.shops} Toko</h4>
            
            <div className="space-y-3">
              {selectedPart?.variants.map((variant, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-2 rounded-lg">
                        <span className="text-lg">{selectedPart?.image}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white">{variant.brand}</h5>
                        <p className="text-sm text-gray-400">{variant.shop}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-400">Rp {variant.price.toLocaleString()}</p>
                      <div className="flex items-center justify-end">
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(Math.floor(variant.rating))}
                        </div>
                        <span className="text-sm text-gray-400 ml-1">({variant.rating})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm transition-colors">
                      📞 Hubungi Toko
                    </button>
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm transition-colors">
                      📍 Lihat Lokasi
                    </button>
                    <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded text-sm transition-colors">
                      🛒 Pesan Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Price Analysis */}
            <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <h5 className="font-semibold text-white mb-3">📊 Analisis Harga</h5>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-400">Harga Terendah</p>
                  <p className="text-lg font-bold text-green-400">
                    Rp {Math.min(...(selectedPart?.variants.map(v => v.price) || [])).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Harga Rata-rata</p>
                  <p className="text-lg font-bold text-yellow-400">
                    Rp {Math.round((selectedPart?.variants.reduce((sum, v) => sum + v.price, 0) || 0) / (selectedPart?.variants.length || 1)).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Harga Tertinggi</p>
                  <p className="text-lg font-bold text-red-400">
                    Rp {Math.max(...(selectedPart?.variants.map(v => v.price) || [])).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {showComparison && <PriceComparisonModal />}
        
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              🔧 Spare Parts Estimator
            </h3>
            <div className="text-sm text-gray-400">
              Compare prices transparently • Showcase workshop products
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spareParts.map((part) => (
              <div key={part.id} className="bg-slate-700/30 rounded-lg border border-slate-600/50 p-4 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{part.image}</span>
                  <div>
                    <h4 className="font-semibold text-white">{part.name}</h4>
                    <p className="text-xs text-gray-400">{part.category}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{part.description}</p>
                
                <div className="mb-3">
                  <p className="text-green-400 font-medium text-lg">{part.priceRange}</p>
                  <p className="text-sm text-gray-400">{part.shops} toko tersedia</p>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedPart(part);
                    setShowComparison(true);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-2 rounded transition-all duration-200"
                >
                  📊 Bandingkan Harga
                </button>
              </div>
            ))}
          </div>
          
          {/* Quick Tips */}
          <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-slate-700">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              💡 Tips Membeli Spare Parts
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Bandingkan harga dari beberapa toko sebelum membeli</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Pilih spare parts original atau berkualitas tinggi</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Periksa garansi dan kebijakan retur toko</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Konsultasikan dengan mekanik untuk rekomendasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 border-b border-cyan-500/20 px-4 py-4 relative z-10 ring-1 ring-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-6 hover:opacity-80 transition-opacity">
              <div className="bg-teal-500 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">BengkelAI</span>
            </Link>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/chat" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 ring-1 ring-white/20"
            >
              💬 Chat AI
            </Link>
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto w-full px-4 py-6 relative z-10">
        <div className="flex flex-wrap gap-2 mb-6 bg-slate-800/30 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'service-reminders', label: '⏰ Service Reminders', icon: '⏰' },
            { id: 'workshop-finder', label: '🗺️ Workshop Finder', icon: '🗺️' },
            { id: 'spare-parts', label: '🔧 Spare Parts', icon: '🔧' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg ring-1 ring-white/20'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative z-10">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'service-reminders' && renderServiceReminders()}
          {activeTab === 'workshop-finder' && renderWorkshopFinder()}
          {activeTab === 'spare-parts' && renderSpareParts()}
        </div>
      </div>
    </div>
  );
}