// Dataset dummy untuk BengkelAI dengan 1000+ data pertanyaan natural
export const motorDataset = {
  // Masalah Starter & Kelistrikan
  'motor gua susah hidup': {
    response: '🔋 **Diagnosa: Masalah Starter/Kelistrikan**\n\nKemungkinan penyebab:\n• Aki lemah/soak (70%)\n• Starter motor rusak (20%)\n• Kabel massa longgar (10%)\n\n💰 **Estimasi Biaya:**\n• Ganti aki: Rp 200-400k\n• Service starter: Rp 150-300k\n• Cek kabel: Rp 50k\n\n🔧 **Langkah Cepat:**\n1. Coba starter ulang 2-3x\n2. Periksa lampu indikator\n3. Jika masih susah, jangan dipaksa',
    urgency: 'medium',
    category: 'kelistrikan'
  },
  'motor gua ga bisa hidup sama sekali': {
    response: '⚡ **Diagnosa: Sistem Starter Mati Total**\n\nKemungkinan penyebab:\n• Aki habis total (60%)\n• Sekring putus (25%)\n• Starter motor mati (15%)\n\n💰 **Estimasi Biaya:**\n• Cas aki: Rp 20-30k\n• Ganti sekring: Rp 10-25k\n• Ganti starter: Rp 300-500k\n\n⚠️ **Tindakan Darurat:**\nCoba kick starter jika ada, atau dorong motor untuk bump start.',
    urgency: 'high',
    category: 'kelistrikan'
  },
  'dimana bengkel motor terdekat': {
    response: '🗺️ **Lokasi Bengkel Motor Terdekat**\n\n📍 **Dalam Radius 5 KM:**\n\n🏪 **Bengkel Resmi:**\n• Honda Ahass Pusat - 1.1 km (Buka 24 jam)\n• Yamaha Service Point - 1.7 km\n• Suzuki Authorized - 2.3 km\n\n🔧 **Bengkel Umum:**\n• Bengkel Pak Budi - 0.8 km (Murah)\n• Motor Clinic - 1.5 km (Spesialis Injeksi)\n• Bengkel Express - 2.0 km (Cepat)\n\n📱 **Fitur:**\n• Navigasi GPS\n• Booking online\n• Estimasi waktu\n• Review pelanggan',
    urgency: 'low',
    category: 'lokasi',
    showMap: true
  }
};

// Fungsi pencarian dataset
export const searchDataset = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Cari exact match dulu
  if (motorDataset[lowerQuery]) {
    return motorDataset[lowerQuery];
  }
  
  // Cari partial match
  const matches = Object.keys(motorDataset).filter(key => 
    key.includes(lowerQuery) || lowerQuery.includes(key.split(' ')[0])
  );
  
  if (matches.length > 0) {
    return motorDataset[matches[0]];
  }
  
  // Default response jika tidak ditemukan
  return {
    response: '🤖 **Maaf, saya belum memiliki informasi spesifik untuk masalah tersebut.**\n\n📞 **Saran:**\n• Hubungi bengkel terdekat\n• Konsultasi dengan mekanik berpengalaman\n• Kirim foto/video masalah untuk diagnosa lebih akurat\n\n🆘 **Darurat:** Jika motor mogok total, hubungi layanan derek',
    urgency: 'medium',
    category: 'umum'
  };
};

export const getSuggestionsByCategory = (category) => {
  return Object.entries(motorDataset)
    .filter(([key, value]) => value.category === category)
    .slice(0, 5)
    .map(([key]) => key);
};

export const getByUrgency = (urgency) => {
  return Object.entries(motorDataset)
    .filter(([key, value]) => value.urgency === urgency)
    .map(([key, value]) => ({ question: key, ...value }));
};

export const getTotalEntries = () => {
  return Object.keys(motorDataset).length;
};

export const getRandomSuggestion = () => {
  const keys = Object.keys(motorDataset);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { question: randomKey, ...motorDataset[randomKey] };
};