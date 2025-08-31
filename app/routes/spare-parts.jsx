import { useState } from "react";
import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Spare Parts - BengkelAI" },
    { name: "description", content: "Katalog spare parts motor lengkap dengan harga terbaik" },
  ];
};

// Data spare parts
const sparePartsData = {
  mesin: [
    {
      id: 1,
      name: "Busi NGK Iridium",
      brand: "NGK",
      price: 85000,
      originalPrice: 95000,
      image: "/images/spare-part/Busi-Spark-Plug-600x600.jpg",
      rating: 4.8,
      reviews: 245,
      stock: 50,
      description: "Busi iridium premium untuk performa mesin optimal",
      compatibility: ["Honda Beat", "Yamaha Mio", "Suzuki Nex"],
      warranty: "6 bulan"
    },
    {
      id: 2,
      name: "Filter Udara K&N",
      brand: "K&N",
      price: 125000,
      originalPrice: 140000,
      image: "/images/spare-part/SARINGAN udara.jpg",
      rating: 4.7,
      reviews: 189,
      stock: 25,
      description: "Filter udara racing untuk aliran udara maksimal",
      compatibility: ["Honda Vario", "Yamaha Aerox", "Suzuki Address"],
      warranty: "1 tahun"
    },
    {
      id: 3,
      name: "Oli Mesin Motul 5100",
      brand: "Motul",
      price: 65000,
      originalPrice: 75000,
      image: "/images/spare-part/oli.jpg",
      rating: 4.9,
      reviews: 567,
      stock: 100,
      description: "Oli semi sintetik untuk perlindungan mesin terbaik",
      compatibility: ["Semua motor 4 tak"],
      warranty: "Garansi kualitas"
    }
  ],
  rem: [
    {
      id: 4,
      name: "Kampas Rem Brembo",
      brand: "Brembo",
      price: 95000,
      originalPrice: 110000,
      image: "/images/spare-part/kampas rem.jpg",
      rating: 4.8,
      reviews: 156,
      stock: 30,
      description: "Kampas rem premium untuk pengereman optimal",
      compatibility: ["Honda PCX", "Yamaha NMAX", "Suzuki Burgman"],
      warranty: "8 bulan"
    },
    {
      id: 5,
      name: "Minyak Rem DOT 4",
      brand: "Castrol",
      price: 35000,
      originalPrice: 40000,
      image: "/images/spare-part/cakram rem.jpg",
      rating: 4.6,
      reviews: 89,
      stock: 75,
      description: "Minyak rem berkualitas tinggi untuk sistem rem",
      compatibility: ["Semua motor dengan rem cakram"],
      warranty: "Garansi kualitas"
    }
  ],
  kelistrikan: [
    {
      id: 6,
      name: "Aki Yuasa YTX7A-BS",
      brand: "Yuasa",
      price: 285000,
      originalPrice: 320000,
      image: "/images/spare-part/AKI.jpeg",
      rating: 4.9,
      reviews: 234,
      stock: 15,
      description: "Aki kering maintenance free untuk motor injeksi",
      compatibility: ["Honda Beat FI", "Yamaha Mio M3", "Suzuki Nex FI"],
      warranty: "1 tahun"
    },
    {
      id: 7,
      name: "Lampu LED Philips",
      brand: "Philips",
      price: 145000,
      originalPrice: 165000,
      image: "/images/spare-part/lampu led.jpg",
      rating: 4.7,
      reviews: 178,
      stock: 40,
      description: "Lampu LED hemat energi dengan cahaya terang",
      compatibility: ["Universal (H4, H6)"],
      warranty: "2 tahun"
    }
  ],
  transmisi: [
    {
      id: 8,
      name: "Rantai DID 428",
      brand: "DID",
      price: 175000,
      originalPrice: 195000,
      image: "/images/spare-part/piston.jpg",
      rating: 4.8,
      reviews: 123,
      stock: 20,
      description: "Rantai premium tahan lama untuk transmisi",
      compatibility: ["Honda CB150R", "Yamaha R15", "Suzuki GSX-R150"],
      warranty: "1 tahun"
    },
    {
      id: 9,
      name: "Sprocket Depan SSS",
      brand: "SSS",
      price: 85000,
      originalPrice: 95000,
      image: "/images/spare-part/pompa oli.jpg",
      rating: 4.6,
      reviews: 67,
      stock: 35,
      description: "Sprocket baja berkualitas untuk daya tahan maksimal",
      compatibility: ["Honda Sonic", "Yamaha Jupiter", "Suzuki Satria"],
      warranty: "6 bulan"
    }
  ],
  suspensi: [
    {
      id: 10,
      name: "Shock Absorber YSS",
      brand: "YSS",
      price: 450000,
      originalPrice: 520000,
      image: "/images/spare-part/pegas.webp",
      rating: 4.9,
      reviews: 89,
      stock: 12,
      description: "Shock absorber adjustable untuk kenyamanan berkendara",
      compatibility: ["Honda Vario 150", "Yamaha Aerox 155"],
      warranty: "1 tahun"
    }
  ],
  ban: [
    {
      id: 11,
      name: "Ban Michelin City Pro",
      brand: "Michelin",
      price: 285000,
      originalPrice: 315000,
      image: "/images/spare-part/ban.jpg",
      rating: 4.8,
      reviews: 156,
      stock: 25,
      description: "Ban tubeless untuk grip dan daya tahan optimal",
      compatibility: ["Ring 14 (90/90-14)"],
      warranty: "Garansi manufaktur"
    },
    {
      id: 12,
      name: "Ban Pirelli Angel Scooter",
      brand: "Pirelli",
      price: 325000,
      originalPrice: 365000,
      image: "/images/spare-part/radiator.jpg",
      rating: 4.9,
      reviews: 234,
      stock: 18,
      description: "Ban premium untuk performa dan keamanan maksimal",
      compatibility: ["Ring 13 (120/70-13)"],
      warranty: "Garansi manufaktur"
    }
  ]
};

export default function SpareParts() {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { key: 'semua', label: 'Semua Kategori', icon: '🛍️' },
    { key: 'mesin', label: 'Mesin', icon: '🔧' },
    { key: 'rem', label: 'Rem', icon: '🛑' },
    { key: 'kelistrikan', label: 'Kelistrikan', icon: '⚡' },
    { key: 'transmisi', label: 'Transmisi', icon: '⚙️' },
    { key: 'suspensi', label: 'Suspensi', icon: '🏍️' },
    { key: 'ban', label: 'Ban', icon: '🛞' }
  ];

  // Get all products
  const getAllProducts = () => {
    return Object.values(sparePartsData).flat();
  };

  // Filter products
  const getFilteredProducts = () => {
    let products = selectedCategory === 'semua' 
      ? getAllProducts() 
      : sparePartsData[selectedCategory] || [];

    // Search filter
    if (searchQuery) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return products.sort((a, b) => b.reviews - a.reviews);
    }
  };

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              <span className="text-white font-bold text-xl">BengkelAI</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/chat" className="text-gray-300 hover:text-white transition-colors">
                Chat AI
              </Link>
              <span className="text-cyan-400 font-medium">Spare Parts</span>
            </nav>

            {/* Cart Button */}
            <button 
              onClick={() => setShowCart(true)}
              className="relative bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              Keranjang
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Spare Parts <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Premium</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Temukan spare parts berkualitas tinggi untuk motor Anda dengan harga terbaik
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari spare parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="popular">Terpopuler</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.key
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredProducts().map(product => (
            <div key={product.id} className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover bg-gradient-to-br from-slate-700 to-slate-600"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center" style={{display: 'none'}}>
                  <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                {product.originalPrice > product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {product.rating}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-400">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-400">{formatPrice(product.price)}</div>
                    {product.originalPrice > product.price && (
                      <div className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>Stock: {product.stock}</span>
                  <span>{product.reviews} reviews</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                    </svg>
                    Tambah
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getFilteredProducts().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Keranjang Belanja</h3>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-white/80 hover:text-white p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-gray-400">Keranjang masih kosong</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.brand}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-cyan-400 text-sm font-medium">{formatPrice(item.price)}</span>
                          <span className="text-gray-400 text-xs">x{item.quantity}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t border-slate-700 p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">Total:</span>
                  <span className="text-xl font-bold text-cyan-400">{formatPrice(getTotalPrice())}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-lg transition-all duration-200 font-medium">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}