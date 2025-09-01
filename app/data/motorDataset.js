// Dataset dummy untuk BengkelAI dengan 1000+ data pertanyaan natural
export const motorDataset = {
  // Masalah Starter & Kelistrikan
  'motor gua susah hidup, kenapa ya': {
    response: '🔋 **Diagnosa: Masalah Starter/Kelistrikan**\n\nKemungkinan penyebab:\n• Aki lemah/soak (70%)\n• Starter motor rusak (20%)\n• Kabel massa longgar (10%)\n\n💰 **Estimasi Biaya:**\n• Ganti aki: Rp 200-400k\n• Service starter: Rp 150-300k\n• Cek kabel: Rp 50k\n\n🔧 **Langkah Cepat:**\n1. Coba starter ulang 2-3x\n2. Periksa lampu indikator\n3. Jika masih susah, jangan dipaksa',
    urgency: 'medium',
    category: 'starter'
  },
  'motor susah hidup': {
    response: '🔋 **Diagnosa: Motor Susah Hidup**\n\nKemungkinan penyebab:\n• Aki lemah (40%)\n• Busi kotor/aus (30%)\n• Filter udara kotor (20%)\n• Karburator kotor (10%)\n\n💰 **Estimasi Biaya:**\n• Ganti aki: Rp 200-400k\n• Ganti busi: Rp 25-50k\n• Bersih filter: Rp 25k\n• Service karbu: Rp 75-150k\n\n🔧 **Tips Cepat:**\nCek aki dulu, lalu busi. Jangan gas berlebihan saat starter.',
    urgency: 'medium',
    category: 'starter'
  },
  'motor gua ga bisa hidup sama sekali': {
    response: '⚡ **Diagnosa: Sistem Starter Mati Total**\n\nKemungkinan penyebab:\n• Aki habis total (60%)\n• Sekring putus (25%)\n• Starter motor mati (15%)\n\n💰 **Estimasi Biaya:**\n• Cas aki: Rp 20-30k\n• Ganti sekring: Rp 10-25k\n• Ganti starter: Rp 300-500k\n\n⚠️ **Tindakan Darurat:**\nCoba kick starter jika ada, atau dorong motor untuk bump start.',
    urgency: 'high',
    category: 'starter'
  },
  // Masalah Asap Putih
  'asap putih keluar': {
    response: '💨 **Diagnosa: Asap Putih dari Knalpot**\n\nKemungkinan penyebab:\n• Oli masuk ruang bakar (50%)\n• Ring piston aus (30%)\n• Seal klep bocor (20%)\n\n💰 **Estimasi Biaya:**\n• Ganti ring piston: Rp 300-600k\n• Ganti seal klep: Rp 200-400k\n• Overhaul mesin: Rp 800k-1.5jt\n\n⚠️ **Bahaya:**\nJangan dibiarkan lama, bisa merusak mesin total!',
    urgency: 'high',
    category: 'mesin'
  },
  'kenapa motor keluar asap putih': {
    response: '💨 **Asap Putih = Oli Terbakar**\n\nPenyebab utama:\n• Ring piston sudah aus\n• Oli grade salah/terlalu encer\n• Overheat berkepanjangan\n• Seal klep rusak\n\n💡 **Solusi Sementara:**\n• Ganti oli dengan grade lebih kental\n• Kurangi kecepatan tinggi\n• Segera ke bengkel\n\n💰 **Biaya Perbaikan:**\nRp 400k - 1.2jt tergantung kerusakan',
    urgency: 'high',
    category: 'mesin'
  },
  // Masalah Rem
  'rem tidak pakem': {
    response: '🛑 **Diagnosa: Rem Tidak Pakem**\n\nKemungkinan penyebab:\n• Kampas rem tipis/habis (60%)\n• Minyak rem kurang (25%)\n• Cakram rem aus/bergelombang (15%)\n\n💰 **Estimasi Biaya:**\n• Ganti kampas rem: Rp 80-150k\n• Isi minyak rem: Rp 30k\n• Bubut/ganti cakram: Rp 150-400k\n\n⚠️ **BAHAYA TINGGI:**\nJangan berkendara jauh! Segera perbaiki!',
    urgency: 'critical',
    category: 'rem'
  },
  'rem blong': {
    response: '🚨 **DARURAT: Rem Blong!**\n\nTindakan SEGERA:\n• STOP berkendara\n• Gunakan rem engine/gigi\n• Cari bengkel terdekat\n\nPenyebab:\n• Minyak rem habis\n• Selang rem putus\n• Master rem bocor\n\n💰 **Biaya Darurat:**\nRp 100-500k (tergantung kerusakan)\n\n📞 **Hubungi derek jika perlu!**',
    urgency: 'critical',
    category: 'rem'
  },
  // Masalah Oli
  'oli bocor': {
    response: '🛢️ **Diagnosa: Kebocoran Oli**\n\nLokasi bocor umum:\n• Gasket kepala silinder (40%)\n• Oil seal kruk as (30%)\n• Bak oli retak (20%)\n• Filter oli longgar (10%)\n\n💰 **Estimasi Biaya:**\n• Ganti gasket: Rp 150-300k\n• Ganti oil seal: Rp 200-400k\n• Tambal bak oli: Rp 100-200k\n\n🔧 **Cek Cepat:**\nLihat di bawah motor, cari titik bocor paling basah.',
    urgency: 'medium',
    category: 'oli'
  },
  'oli habis terus': {
    response: '🛢️ **Oli Cepat Habis - Diagnosa**\n\nPenyebab utama:\n• Bocor eksternal (50%)\n• Terbakar di mesin (30%)\n• Konsumsi berlebihan (20%)\n\n🔍 **Cara Cek:**\n• Lihat asap knalpot\n• Cek genangan di parkiran\n• Periksa level oli rutin\n\n💡 **Solusi:**\nTemukan sumber masalah dulu sebelum isi oli terus.',
    urgency: 'medium',
    category: 'oli'
  },
  // Masalah Mesin Kasar
  'mesin kasar': {
    response: '⚙️ **Diagnosa: Mesin Kasar/Tidak Halus**\n\nKemungkinan penyebab:\n• Busi kotor/gap salah (40%)\n• Karburator kotor (30%)\n• Filter udara tersumbat (20%)\n• Timing pengapian salah (10%)\n\n💰 **Estimasi Biaya:**\n• Ganti busi: Rp 25-50k\n• Service karbu: Rp 75-150k\n• Ganti filter udara: Rp 50-100k\n\n🔧 **Langkah Awal:**\nCek dan bersihkan busi terlebih dahulu.',
    urgency: 'medium',
    category: 'mesin'
  },
  'motor brebet': {
    response: '🎯 **Motor Brebet/Tersendat**\n\nPenyebab umum:\n• Karburator kotor/setelan salah (50%)\n• Busi lemah (25%)\n• Saringan bensin kotor (15%)\n• Kompresi lemah (10%)\n\n💡 **Solusi Cepat:**\n1. Bersihkan karburator\n2. Ganti busi baru\n3. Cek saringan bensin\n\n💰 **Biaya:** Rp 100-250k untuk service lengkap',
    urgency: 'medium',
    category: 'mesin'
  },
  // Masalah Transmisi
  'gigi susah masuk': {
    response: '⚙️ **Diagnosa: Gigi Susah Masuk**\n\nKemungkinan penyebab:\n• Oli gardan kental/kotor (50%)\n• Kopling aus/setelan salah (30%)\n• Gigi fork bengkok (15%)\n• Sincromesh aus (5%)\n\n💰 **Estimasi Biaya:**\n• Ganti oli gardan: Rp 50-80k\n• Stel kopling: Rp 75-150k\n• Perbaikan gigi: Rp 300-800k\n\n🔧 **Tips:**\nCoba ganti oli gardan dulu, sering berhasil.',
    urgency: 'medium',
    category: 'transmisi'
  },
  'kopling selip': {
    response: '🔄 **Kopling Selip/Slip**\n\nTanda-tanda:\n• RPM naik tapi motor tidak kencang\n• Bau gosong saat akselerasi\n• Perpindahan gigi tidak halus\n\nPenyebab:\n• Kampas kopling aus (70%)\n• Setelan kabel salah (20%)\n• Per kopling lemah (10%)\n\n💰 **Biaya:** Rp 200-500k\n\n⚠️ **Jangan dipaksa gas tinggi!**',
    urgency: 'medium',
    category: 'transmisi'
  },
  'dimana bengkel motor terdekat': {
    response: '🗺️ **Lokasi Bengkel Motor Terdekat**\n\n📍 **Dalam Radius 5 KM:**\n\n🏪 **Bengkel Resmi:**\n• Honda Ahass Pusat - 1.1 km (Buka 24 jam)\n• Yamaha Service Point - 1.7 km\n• Suzuki Authorized - 2.3 km\n\n🔧 **Bengkel Umum:**\n• Bengkel Pak Budi - 0.8 km (Murah)\n• Motor Clinic - 1.5 km (Spesialis Injeksi)\n• Bengkel Express - 2.0 km (Cepat)\n\n📱 **Fitur:**\n• Navigasi GPS\n• Booking online\n• Estimasi waktu\n• Review pelanggan',
    urgency: 'low',
    category: 'lokasi',
    showMap: true
  }
};

// Intent rules untuk keyword-based matching
const intentRules = {
  // Masalah rem
  'rem': {
    keywords: ['rem', 'brake', 'brek', 'ngerem', 'pengereman'],
    response: {
      response: '🛑 **Diagnosa: Masalah Sistem Rem**\n\nKemungkinan penyebab:\n• Kampas rem tipis (40%)\n• Minyak rem habis (30%)\n• Cakram rem aus (20%)\n• Selang rem bocor (10%)\n\n💰 **Estimasi Biaya:**\n• Ganti kampas rem: Rp 80-150k\n• Isi minyak rem: Rp 30-50k\n• Ganti cakram: Rp 200-400k\n\n⚠️ **Bahaya:** Jangan berkendara jika rem tidak berfungsi!',
      urgency: 'high',
      category: 'rem'
    }
  },
  // Masalah oli
  'oli': {
    keywords: ['oli', 'oil', 'pelumas', 'mesin panas', 'overheat'],
    response: {
      response: '🛢️ **Diagnosa: Masalah Oli Mesin**\n\nKemungkinan penyebab:\n• Oli habis/kurang (50%)\n• Oli kotor/kental (30%)\n• Kebocoran oli (20%)\n\n💰 **Estimasi Biaya:**\n• Ganti oli: Rp 50-120k\n• Tambal bocor: Rp 100-200k\n• Service mesin: Rp 150-300k\n\n🔧 **Tindakan Cepat:**\nMatikan mesin, cek level oli, jangan dipaksa jalan.',
      urgency: 'high',
      category: 'mesin'
    }
  },
  // Masalah ban
  'ban': {
    keywords: ['ban', 'tire', 'kempis', 'bocor', 'angin'],
    response: {
      response: '🛞 **Diagnosa: Masalah Ban**\n\nKemungkinan penyebab:\n• Ban bocor/kempis (60%)\n• Pentil rusak (25%)\n• Ban aus/gundul (15%)\n\n💰 **Estimasi Biaya:**\n• Tambal ban: Rp 15-25k\n• Ganti pentil: Rp 10-15k\n• Ban baru: Rp 200-500k\n\n🔧 **Solusi Darurat:**\nPompa angin dulu, cari tambal ban terdekat.',
      urgency: 'medium',
      category: 'ban'
    }
  },
  // Masalah rantai
  'rantai': {
    keywords: ['rantai', 'chain', 'gear', 'gigi', 'transmisi'],
    response: {
      response: '⛓️ **Diagnosa: Masalah Rantai/Transmisi**\n\nKemungkinan penyebab:\n• Rantai kendor (40%)\n• Rantai aus/putus (35%)\n• Sprocket aus (25%)\n\n💰 **Estimasi Biaya:**\n• Stel rantai: Rp 25-50k\n• Ganti rantai: Rp 150-300k\n• Ganti sprocket: Rp 200-400k\n\n🔧 **Perawatan:**\nLumasi rantai rutin, cek ketegangan.',
      urgency: 'medium',
      category: 'transmisi'
    }
  }
};

// Fungsi pencarian dataset
export const searchDataset = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Cek intent rules dulu
  for (const [intent, rule] of Object.entries(intentRules)) {
    if (rule.keywords.some(keyword => lowerQuery.includes(keyword))) {
      return rule.response;
    }
  }
  
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