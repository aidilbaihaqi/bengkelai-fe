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
  const [showOilModal, setShowOilModal] = useState(false);
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
      case 'high': return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Motor Condition Overview */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.72 11.47l1.38-.53-.44-1.12-.93.35c-.72-.33-1.54-.52-2.4-.52-.86 0-1.68.19-2.4.52l-.93-.35-.44 1.12 1.38.53c-.48.44-.85.98-1.09 1.59l-1.38-.53-.44 1.12.93.35c-.08.33-.12.68-.12 1.04 0 .36.04.71.12 1.04l-.93.35.44 1.12 1.38-.53c.24.61.61 1.15 1.09 1.59l-1.38.53.44 1.12.93-.35c.72.33 1.54.52 2.4.52.86 0 1.68-.19 2.4-.52l.93.35.44-1.12-1.38-.53c.48-.44.85-.98 1.09-1.59l1.38.53.44-1.12-.93-.35c.08-.33.12-.68.12-1.04 0-.36-.04-.71-.12-1.04l.93-.35-.44-1.12-1.38.53c-.24-.61-.61-1.15-1.09-1.59zM10.33 16.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Kondisi Motor Saat Ini
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
          <div className="mb-2 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          <h4 className="font-semibold text-white mb-1">Cari Bengkel</h4>
          <p className="text-sm text-gray-300">Temukan bengkel terdekat</p>
        </button>
        
        <button 
          onClick={() => setActiveTab('spare-parts')}
          className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 text-left hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-200 group"
        >
          <div className="mb-2 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
            </svg>
          </div>
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
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <h4 className="font-semibold text-white mb-1">AI Diagnosa</h4>
          <p className="text-sm text-gray-300">Chat dengan AI assistant</p>
        </Link>
      </div>

      {/* Recent Service Reminders */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c-.55 0-1 .45-1 1v3.5c0 .28.11.53.29.71l2.5 2.5c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13 11.59V9c0-.55-.45-1-1-1z"/>
          </svg>
          Reminder Perawatan Mendatang
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

      {/* Oil Change Modal */}
      {showOilModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={() => setShowOilModal(false)}>
          <div className="bg-slate-900 rounded-2xl border border-red-500/30 w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 border-b border-red-500/30 relative">
              <button 
                onClick={() => setShowOilModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Peringatan Oli Mesin!</h3>
                  <p className="text-red-300 text-sm">Segera ganti oli motor Anda</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                  <p className="text-white"><strong>Status:</strong> Oli sudah habis (overdue 2 hari)</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                  </svg>
                  <p className="text-gray-300"><strong>Kondisi:</strong> 25% tersisa (kritis)</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V1h-2v1H8V1H6v1H4.5C3.67 2 3 2.67 3 3.5v15C3 19.33 3.67 20 4.5 20h15c.83 0 1.5-.67 1.5-1.5v-15C21 2.67 20.33 2 19.5 2z"/>
                  </svg>
                  <p className="text-gray-300"><strong>Terakhir ganti:</strong> 5 Januari 2024</p>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                    <p className="text-red-300 text-sm">
                      Berkendara dengan oli yang sudah habis dapat merusak mesin motor Anda secara permanen!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    console.log('Button Cari Bengkel diklik!');
                    setShowOilModal(false);
                    setActiveTab('workshop-finder');
                  }}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg hover:from-red-400 hover:to-red-500 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  Cari Bengkel
                </button>
                <button 
                  onClick={() => {
                    console.log('Button Nanti diklik!');
                    setShowOilModal(false);
                  }}
                  className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  Nanti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );



  const renderWorkshopFinder = () => {
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const workshops = [
      {
        id: 1,
        name: "Bengkel Jaya Motor",
        address: "Jl. Sudirman No. 123, Jakarta Pusat",
        phone: "+62 21 1234567",
        rating: 4.5,
        services: ["Ganti Oli", "Servis Mesin", "Ganti Ban", "Tune Up"],
        openHours: "08:00 - 17:00",
        lat: -6.2088,
        lng: 106.8456,
        distance: "1.2 km",
        specialties: ["Honda", "Yamaha", "Suzuki"]
      },
      {
        id: 2,
        name: "Motor Service Center",
        address: "Jl. Thamrin No. 456, Jakarta Pusat",
        phone: "+62 21 7654321",
        rating: 4.2,
        services: ["Ganti Oli", "Tune Up", "Rem", "Electrical"],
        openHours: "09:00 - 18:00",
        lat: -6.1944,
        lng: 106.8229,
        distance: "2.1 km",
        specialties: ["Kawasaki", "Honda", "Yamaha"]
      },
      {
        id: 3,
        name: "Bengkel Mandiri",
        address: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
        phone: "+62 21 9876543",
        rating: 4.7,
        services: ["Ganti Oli", "AC Motor", "Electrical", "Body Repair"],
        openHours: "07:00 - 19:00",
        lat: -6.2297,
        lng: 106.8175,
        distance: "3.5 km",
        specialties: ["Semua Merk", "Matic", "Sport"]
      },
      {
        id: 4,
        name: "Speed Motor Workshop",
        address: "Jl. Kuningan Raya No. 321, Jakarta Selatan",
        phone: "+62 21 5555123",
        rating: 4.3,
        services: ["Ganti Oli", "Performance Tuning", "Modifikasi"],
        openHours: "10:00 - 20:00",
        lat: -6.2382,
        lng: 106.8317,
        distance: "4.2 km",
        specialties: ["Sport Bike", "Racing", "Custom"]
      },
      {
        id: 5,
        name: "Bengkel Rakyat 24 Jam",
        address: "Jl. Casablanca No. 88, Jakarta Selatan",
        phone: "+62 21 7777888",
        rating: 4.0,
        services: ["Ganti Oli", "Emergency Service", "Towing"],
        openHours: "24 Jam",
        lat: -6.2241,
        lng: 106.8425,
        distance: "2.8 km",
        specialties: ["Emergency", "24 Hours", "Towing"]
      }
    ];

    useEffect(() => {
      const initMap = async () => {
        try {
          setIsLoading(true);
          setError(null);

          // Get user location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userPos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                setUserLocation(userPos);
                loadGoogleMaps(userPos);
              },
              (error) => {
                console.error('Error getting location:', error);
                // Default to Jakarta if location access denied
                const defaultPos = { lat: -6.2088, lng: 106.8456 };
                setUserLocation(defaultPos);
                loadGoogleMaps(defaultPos);
              }
            );
          } else {
            // Default to Jakarta if geolocation not supported
            const defaultPos = { lat: -6.2088, lng: 106.8456 };
            setUserLocation(defaultPos);
            loadGoogleMaps(defaultPos);
          }
        } catch (err) {
          setError('Failed to initialize map');
          setIsLoading(false);
        }
      };

      const loadGoogleMaps = async (center) => {
        try {
          const { Loader } = await import('@googlemaps/js-api-loader');
          const loader = new Loader({
            apiKey: "AIzaSyBHVIS02EN0lzuURaOEWbNdqGr_b-WrPLY",
            version: "weekly",
            libraries: ["places"]
          });

          const google = await loader.load();
          
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: center,
            zoom: 13,
            styles: [
              {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#1e293b"}]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#ffffff"}]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#0f172a"}]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"color": "#374151"}]
              }
            ]
          });

          // Add user location marker
          new google.maps.Marker({
            position: center,
            map: mapInstance,
            title: "Your Location",
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24)
            }
          });

          // Add workshop markers
          workshops.forEach(workshop => {
            const marker = new google.maps.Marker({
              position: { lat: workshop.lat, lng: workshop.lng },
              map: mapInstance,
              title: workshop.name,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EF4444"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
              }
            });

            marker.addListener('click', () => {
              setSelectedWorkshop(workshop);
            });
          });

          setMap(mapInstance);
          setIsLoading(false);
        } catch (err) {
          console.error('Error loading Google Maps:', err);
          setError('Failed to load Google Maps');
          setIsLoading(false);
        }
      };

      initMap();
    }, []);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Workshop Finder
            </h3>
            <div className="text-sm text-gray-400">
              {workshops.length} bengkel ditemukan
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="relative">
              <div 
                ref={mapRef} 
                className="w-full h-96 rounded-lg border border-slate-600/50"
                style={{ minHeight: '400px' }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-2"></div>
                      <p>Loading map...</p>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
                    <div className="text-red-400 text-center">
                      <p>{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Workshop List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <h4 className="font-semibold text-white mb-3 sticky top-0 bg-slate-800/90 backdrop-blur-sm py-2 -mx-2 px-2 rounded">
                Bengkel Terdekat
              </h4>
              {workshops.map((workshop) => (
                <div 
                  key={workshop.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedWorkshop?.id === workshop.id 
                      ? 'bg-cyan-500/20 border-cyan-500/50 ring-1 ring-cyan-500/30' 
                      : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50'
                  }`}
                  onClick={() => setSelectedWorkshop(workshop)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-white">{workshop.name}</h5>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="text-sm text-gray-300">{workshop.rating}</span>
                      </div>
                      <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded">
                        {workshop.distance}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{workshop.address}</p>
                  <p className="text-gray-400 text-xs mb-2">
                    <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    {workshop.phone}
                  </p>
                  <p className="text-gray-400 text-xs mb-3">
                    <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    {workshop.openHours}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {workshop.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                        {service}
                      </span>
                    ))}
                    {workshop.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">
                        +{workshop.services.length - 3} lainnya
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {workshop.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Workshop Details */}
          {selectedWorkshop && (
            <div className="mt-6 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">{selectedWorkshop.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-white font-semibold">{selectedWorkshop.rating}</span>
                    </div>
                    <span className="text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded text-sm">
                      {selectedWorkshop.distance}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedWorkshop(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-4">
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <strong>Alamat:</strong> {selectedWorkshop.address}
                  </p>
                  <p className="text-gray-300">
                    <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <strong>Telepon:</strong> {selectedWorkshop.phone}
                  </p>
                  <p className="text-gray-300">
                    <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <strong>Jam Buka:</strong> {selectedWorkshop.openHours}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2"><strong>Spesialisasi:</strong></p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {selectedWorkshop.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-300 mb-2"><strong>Layanan Tersedia:</strong></p>
                <div className="flex flex-wrap gap-1">
                  {selectedWorkshop.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-200 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Hubungi
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-200 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.39.39-1.02 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
                  </svg>
                  Petunjuk Arah
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-200 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                  </svg>
                  Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };



  const renderReminder = () => {
    const [selectedReminder, setSelectedReminder] = useState(null);
    const [showAddReminder, setShowAddReminder] = useState(false);
    const [newReminder, setNewReminder] = useState({
      component: '',
      dueDate: '',
      urgency: 'medium',
      description: ''
    });

    const addReminder = () => {
      if (newReminder.component && newReminder.dueDate) {
        const reminder = {
          id: Date.now(),
          ...newReminder,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setServiceReminders([...serviceReminders, reminder]);
        setNewReminder({ component: '', dueDate: '', urgency: 'medium', description: '' });
        setShowAddReminder(false);
      }
    };

    const deleteReminder = (id) => {
      setServiceReminders(serviceReminders.filter(reminder => reminder.id !== id));
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c-.55 0-1 .45-1 1v3.5c0 .28.11.53.29.71l2.5 2.5c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13 11.59V9c0-.55-.45-1-1-1z"/>
              </svg>
              Reminder Perawatan
            </h3>
            <button 
              onClick={() => setShowAddReminder(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Tambah Reminder
            </button>
          </div>

          {/* Reminder List */}
          <div className="space-y-4">
            {serviceReminders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h4 className="text-lg font-semibold text-white mb-2">Belum ada reminder</h4>
                <p className="text-gray-400">Tambahkan reminder perawatan motor Anda</p>
              </div>
            ) : (
              serviceReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:bg-slate-700/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(reminder.urgency)}`}>
                        {reminder.urgency.toUpperCase()}
                      </span>
                      <h4 className="font-medium text-white">{reminder.component}</h4>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{reminder.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>Jatuh tempo: {new Date(reminder.dueDate).toLocaleDateString('id-ID')}</span>
                      <span>Dibuat: {new Date(reminder.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedReminder(reminder)}
                      className="text-cyan-400 hover:text-cyan-300 p-2 rounded-lg hover:bg-slate-600/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-slate-600/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Reminder Modal */}
        {showAddReminder && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-md">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Tambah Reminder Baru</h3>
                  <button 
                    onClick={() => setShowAddReminder(false)}
                    className="text-white/80 hover:text-white p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Komponen</label>
                  <input
                    type="text"
                    value={newReminder.component}
                    onChange={(e) => setNewReminder({...newReminder, component: e.target.value})}
                    placeholder="Contoh: Ganti Oli Mesin"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal Jatuh Tempo</label>
                  <input
                    type="date"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tingkat Urgensi</label>
                  <select
                    value={newReminder.urgency}
                    onChange={(e) => setNewReminder({...newReminder, urgency: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi (Opsional)</label>
                  <textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                    placeholder="Deskripsi tambahan..."
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setShowAddReminder(false)}
                    className="flex-1 bg-slate-700 text-gray-300 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={addReminder}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSpareParts = () => {
    const [selectedPart, setSelectedPart] = useState(null);
    const [showComparison, setShowComparison] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [cart, setCart] = useState([]);
    const [showProductDetail, setShowProductDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const spareParts = [
      {
        id: 1,
        name: 'Oli Mesin Shell Advance AX7',
        category: 'Engine',
        price: 85000,
        originalPrice: 95000,
        brand: 'Shell',
        stock: 25,
        rating: 4.8,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        description: 'Oli mesin semi sintetik berkualitas tinggi untuk performa optimal motor Anda',
        specifications: ['SAE 10W-40', 'API SL/JASO MA2', 'Volume: 1 Liter', 'Cocok untuk motor 4-tak'],
        seller: 'Honda AHASS Pusat',
        location: 'Jakarta Selatan',
        warranty: '6 bulan'
      },
      {
        id: 2,
        name: 'Kampas Rem Brembo Premium',
        category: 'Brake System',
        price: 65000,
        originalPrice: 75000,
        brand: 'Brembo',
        stock: 18,
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop',
        description: 'Kampas rem premium untuk pengereman yang optimal dan aman',
        specifications: ['Material: Semi-metallic', 'Tahan panas tinggi', 'Low noise formula', 'Cocok untuk motor sport'],
        seller: 'Bengkel Jaya Motor',
        location: 'Jakarta Timur',
        warranty: '1 tahun'
      },
      {
        id: 3,
        name: 'Ban Michelin Pilot Street',
        category: 'Tires',
        price: 450000,
        originalPrice: 480000,
        brand: 'Michelin',
        stock: 12,
        rating: 4.9,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Ban motor premium untuk performa dan keamanan maksimal di segala cuaca',
        specifications: ['Ukuran: 110/70-17', 'Tubeless', 'Compound khusus', 'Grip optimal'],
        seller: 'Yamaha Service Center',
        location: 'Jakarta Barat',
        warranty: '2 tahun'
      },
      {
        id: 4,
        name: 'Aki GS Astra Premium GTZ7S',
        category: 'Electrical',
        price: 320000,
        originalPrice: 350000,
        brand: 'GS Astra',
        stock: 30,
        rating: 4.8,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop',
        description: 'Aki motor maintenance free dengan teknologi terdepan',
        specifications: ['12V 6Ah', 'Maintenance Free', 'Cold Cranking Amps: 100A', 'Tahan getaran'],
        seller: 'Honda AHASS',
        location: 'Jakarta Pusat',
        warranty: '1 tahun'
      },
      {
        id: 5,
        name: 'Rantai DID 428HD Gold',
        category: 'Drive System',
        price: 150000,
        originalPrice: 165000,
        brand: 'DID',
        stock: 22,
        rating: 4.8,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Rantai motor berkualitas tinggi dengan lapisan emas anti karat',
        specifications: ['Size: 428H x 130L', 'Gold plated', 'Tensile strength: 2100kg', 'O-ring sealed'],
        seller: 'Bengkel Mandiri',
        location: 'Jakarta Utara',
        warranty: '6 bulan'
      },
      {
        id: 6,
        name: 'Busi NGK Iridium IX',
        category: 'Engine',
        price: 35000,
        originalPrice: 40000,
        brand: 'NGK',
        stock: 50,
        rating: 4.9,
        reviews: 267,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Busi iridium premium untuk pembakaran sempurna dan hemat bahan bakar',
        specifications: ['Iridium electrode', 'Gap: 0.8mm', 'Heat range: 7', 'Long life: 20,000km'],
        seller: 'Suzuki Authorized',
        location: 'Jakarta Selatan',
        warranty: '1 tahun'
      },
      {
        id: 7,
        name: 'Filter Udara K&N Performance',
        category: 'Engine',
        price: 180000,
        originalPrice: 200000,
        brand: 'K&N',
        stock: 15,
        rating: 4.7,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Filter udara performa tinggi yang dapat dicuci dan digunakan kembali',
        specifications: ['Washable & reusable', 'High flow design', 'Cotton gauze media', 'Lifetime warranty'],
        seller: 'Motor Clinic',
        location: 'Jakarta Timur',
        warranty: 'Seumur hidup'
      },
      {
        id: 8,
        name: 'Kopling Set Honda Vario',
        category: 'Transmission',
        price: 250000,
        originalPrice: 280000,
        brand: 'Honda Genuine',
        stock: 8,
        rating: 4.8,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Set kopling original Honda untuk transmisi yang halus dan tahan lama',
        specifications: ['Original Honda parts', 'Complete set', 'High durability', 'Perfect fit'],
        seller: 'Honda AHASS',
        location: 'Jakarta Barat',
        warranty: '1 tahun'
      },
      {
        id: 9,
        name: 'Shock Breaker YSS G-Plus',
        category: 'Suspension',
        price: 850000,
        originalPrice: 950000,
        brand: 'YSS',
        stock: 6,
        rating: 4.9,
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Shock breaker premium dengan teknologi gas untuk kenyamanan maksimal',
        specifications: ['Gas charged', 'Adjustable preload', 'Length: 340mm', 'Chrome finish'],
        seller: 'Bengkel Specialist',
        location: 'Jakarta Pusat',
        warranty: '2 tahun'
      },
      {
        id: 10,
        name: 'Lampu LED Philips Ultinon',
        category: 'Electrical',
        price: 120000,
        originalPrice: 140000,
        brand: 'Philips',
        stock: 35,
        rating: 4.7,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Lampu LED berkualitas tinggi dengan cahaya putih terang dan hemat energi',
        specifications: ['6000K color temperature', '12V 18W', 'Long life: 12 years', 'Plug & play'],
        seller: 'Auto Parts Store',
        location: 'Jakarta Selatan',
        warranty: '3 tahun'
      },
      {
        id: 11,
        name: 'Velg Racing Boy SP522',
        category: 'Wheels',
        price: 1200000,
        originalPrice: 1350000,
        brand: 'Racing Boy',
        stock: 4,
        rating: 4.8,
        reviews: 23,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Velg racing premium dengan desain sporty dan material berkualitas tinggi',
        specifications: ['Aluminum alloy', 'Size: 17 inch', 'Lightweight design', 'Anodized finish'],
        seller: 'Racing Parts Shop',
        location: 'Jakarta Timur',
        warranty: '1 tahun'
      },
      {
        id: 12,
        name: 'Knalpot Yoshimura R77S',
        category: 'Exhaust',
        price: 2500000,
        originalPrice: 2800000,
        brand: 'Yoshimura',
        stock: 2,
        rating: 4.9,
        reviews: 34,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Knalpot racing premium dengan suara khas dan performa tinggi',
        specifications: ['Stainless steel', 'Carbon fiber end cap', 'Slip-on type', 'Racing sound'],
        seller: 'Performance Shop',
        location: 'Jakarta Barat',
        warranty: '2 tahun'
      }
    ];

    // Filter and sort products
    const categories = ['All', ...new Set(spareParts.map(part => part.category))];
    
    const filteredProducts = spareParts.filter(part => {
      const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           part.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           part.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    
    const addToCart = (product) => {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };
    
    const removeFromCart = (productId) => {
      setCart(cart.filter(item => item.id !== productId));
    };
    
    const getTotalPrice = () => {
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    const ProductDetailModal = () => (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white">Detail Produk</h3>
            <button 
              onClick={() => setShowProductDetail(false)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {selectedProduct && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Spesifikasi</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {selectedProduct.specifications.map((spec, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-cyan-400">•</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-400 mb-4">{selectedProduct.brand}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(selectedProduct.rating))}
                      </div>
                      <span className="text-sm text-gray-400">({selectedProduct.rating})</span>
                    </div>
                    <span className="text-sm text-gray-400">{selectedProduct.reviews} ulasan</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-green-400">Rp {selectedProduct.price.toLocaleString()}</span>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-lg text-gray-500 line-through">Rp {selectedProduct.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">Stok: {selectedProduct.stock} unit</p>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{selectedProduct.description}</p>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-white mb-2">Informasi Penjual</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p><span className="text-cyan-400">Toko:</span> {selectedProduct.seller}</p>
                      <p><span className="text-cyan-400">Lokasi:</span> {selectedProduct.location}</p>
                      <p><span className="text-cyan-400">Garansi:</span> {selectedProduct.warranty}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-lg transition-all duration-200 font-medium"
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5c.55 0 1 .45 1 1s-.45 1-1 1h-1v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6H2c-.55 0-1-.45-1-1s.45-1 1-1h5zM9 3v1h6V3H9zm0 8c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v2zm4 0c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v2z"/>
                      </svg>
                      Tambah ke Keranjang
                    </button>
                    <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44-2.83 3.76-5.14 6.67-6.27L11.93 3c-.59-.59-1.54-.59-2.12 0L8.34 4.46c-.59.59-.59 1.54 0 2.12l1.46 1.46c.59.59 1.54.59 2.12 0L13.38 6.58c2.83 1.44 5.14 3.76 6.27 6.67l1.52-1.36c.59-.59.59-1.54 0-2.12L19.71 8.31c-.59-.59-1.54-.59-2.12 0l-1.46 1.46c-.59.59-.59 1.54 0 2.12l1.46 1.46c.59.59 1.54.59 2.12 0l1.46-1.46c.59-.59.59-1.54 0-2.12z"/>
                      </svg>
                      Hubungi Penjual
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
        {showProductDetail && <ProductDetailModal />}
        
        {/* Shopping Cart Sidebar */}
        {cart.length > 0 && (
          <div className="fixed top-4 right-4 bg-slate-900 border border-cyan-500/30 rounded-xl p-4 w-80 z-40 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5c.55 0 1 .45 1 1s-.45 1-1 1h-1v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6H2c-.55 0-1-.45-1-1s.45-1 1-1h5z"/>
                </svg>
                Keranjang ({cart.length})
              </h3>
              <button 
                onClick={() => setCart([])}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
            
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.quantity}x Rp {item.price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white">Total:</span>
                <span className="font-bold text-green-400">Rp {getTotalPrice().toLocaleString()}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white py-2 rounded-lg transition-all duration-200 font-medium">
                Checkout
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
              </svg>
              Spare Parts E-Commerce
            </h3>
            <div className="text-sm text-gray-400">
              {sortedProducts.length} produk tersedia
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari produk, brand, atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option value="name">Urutkan: Nama</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-slate-700/30 rounded-lg border border-slate-600/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-200 hover:transform hover:scale-105">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowProductDetail(true);
                    }}
                  />
                  {product.originalPrice > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Stok: {product.stock}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2 cursor-pointer hover:text-cyan-400 transition-colors"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductDetail(true);
                        }}>
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-400">{product.brand} • {product.category}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400 text-xs">
                      {'★'.repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-xs text-gray-400">({product.rating}) • {product.reviews} ulasan</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-400">Rp {product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">Rp {product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{product.seller}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-2 rounded text-sm transition-all duration-200 font-medium"
                    >
                      <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5c.55 0 1 .45 1 1s-.45 1-1 1h-1v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6H2c-.55 0-1-.45-1-1s.45-1 1-1h5z"/>
                      </svg>
                      Keranjang
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductDetail(true);
                      }}
                      className="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Tidak ada produk ditemukan</h3>
              <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
          )}
          
          {/* Shopping Tips */}
          <div className="mt-8 bg-slate-800/30 rounded-lg p-4 border border-slate-700">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Tips Belanja Spare Parts
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Bandingkan harga dan kualitas dari berbagai penjual</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Periksa rating dan ulasan produk sebelum membeli</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Pastikan garansi dan kebijakan retur tersedia</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
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
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 ring-1 ring-white/20 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L14.4 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              Chat AI
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
            { 
              id: 'overview', 
              label: 'Overview', 
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
            },

            { 
              id: 'workshop-finder', 
              label: 'Workshop Finder', 
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            },
            { 
              id: 'reminder', 
              label: 'Reminder', 
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c-.55 0-1 .45-1 1v3.5c0 .28.11.53.29.71l2.5 2.5c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13 11.59V9c0-.55-.45-1-1z"/></svg>
            },
            { 
              id: 'spare-parts', 
              label: 'Spare Parts', 
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
            }
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
              <span className="hidden sm:flex sm:items-center sm:gap-2">
                {tab.icon}
                {tab.label}
              </span>
              <span className="sm:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative z-10">
          {activeTab === 'overview' && renderOverview()}

          {activeTab === 'workshop-finder' && renderWorkshopFinder()}
          {activeTab === 'reminder' && renderReminder()}
          {activeTab === 'spare-parts' && renderSpareParts()}
        </div>
      </div>
    </div>
  );
}