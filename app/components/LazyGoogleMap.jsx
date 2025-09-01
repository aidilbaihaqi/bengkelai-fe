import { useState, useRef, useEffect } from "react";

const LazyGoogleMap = ({ userLocation, onLocationUpdate }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      // Clear existing markers
      markersRef.current.forEach(marker => {
        marker.setMap(null);
      });
      markersRef.current = [];

      // Add user location marker
      const userMarker = new google.maps.Marker({
        position: center,
        map: mapInstance,
        title: "Lokasi Anda",
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24)
        }
      });
      markersRef.current.push(userMarker);

      // Sample workshop data
      const workshops = [
        {
          id: 1,
          name: "Bengkel Motor Jaya",
          address: "Jl. Sudirman No. 123, Jakarta Pusat",
          rating: 4.5,
          distance: "0.8 km",
          phone: "021-12345678",
          services: ["Service Rutin", "Ganti Oli", "Tune Up"],
          position: { lat: center.lat + 0.01, lng: center.lng + 0.01 }
        },
        {
          id: 2,
          name: "Motor Service Pro",
          address: "Jl. Thamrin No. 456, Jakarta Pusat",
          rating: 4.8,
          distance: "1.2 km",
          phone: "021-87654321",
          services: ["Perbaikan Mesin", "Ganti Ban", "Service AC"],
          position: { lat: center.lat - 0.01, lng: center.lng + 0.015 }
        },
        {
          id: 3,
          name: "Bengkel Specialist",
          address: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
          rating: 4.3,
          distance: "2.1 km",
          phone: "021-11223344",
          services: ["Modifikasi", "Cat Ulang", "Upgrade Performa"],
          position: { lat: center.lat + 0.015, lng: center.lng - 0.01 }
        }
      ];

      // Add workshop markers
      workshops.forEach(workshop => {
        const marker = new google.maps.Marker({
          position: workshop.position,
          map: mapInstance,
          title: workshop.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#ef4444" stroke="#ffffff" stroke-width="1"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              <h3 class="font-bold text-gray-900 mb-1">${workshop.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${workshop.address}</p>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-yellow-500">⭐</span>
                <span class="text-sm font-medium">${workshop.rating}</span>
                <span class="text-sm text-gray-500">• ${workshop.distance}</span>
              </div>
              <div class="mb-2">
                <p class="text-sm font-medium text-gray-700 mb-1">Layanan:</p>
                <div class="flex flex-wrap gap-1">
                  ${workshop.services.map(service => 
                    `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${service}</span>`
                  ).join('')}
                </div>
              </div>
              <p class="text-sm text-gray-600">📞 ${workshop.phone}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
        });

        markersRef.current.push(marker);
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Error loading Google Maps:', err);
      setError('Gagal memuat peta. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation && mapRef.current) {
      loadGoogleMaps(userLocation);
    }
  }, [userLocation]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <div className="text-red-600 mb-2">⚠️</div>
        <p className="text-red-700 font-medium">{error}</p>
        <button 
          onClick={() => {
            setError(null);
            setIsLoading(true);
            if (userLocation) loadGoogleMaps(userLocation);
          }}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-2"></div>
            <p className="text-gray-400">Memuat peta...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg"
        role="application"
        aria-label="Peta lokasi bengkel motor terdekat"
      />
    </div>
  );
};

export default LazyGoogleMap;