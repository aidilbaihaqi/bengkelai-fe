# BengkelAi - Digital Motorcycle Health & Service Ecosystem with AI Analysis

🏍️ **Platform AI untuk Ekosistem Kesehatan & Layanan Motor Digital**

[![Development Status](https://img.shields.io/badge/Status-Development%20v1-orange)](https://bengkel-ai.id)
[![Live Demo](https://img.shields.io/badge/Demo-Live-green)](https://bengkel-ai.id)

## 👥 Tim Pengembang

- **Widya** - Business and Product Lead
- **Aidil Baihaqi** - Full Stack Developer  
- **Muhammad Thesar** - AI Engineer

## 🌟 Overview

**Project Theme**: Digital Motorcycle Health & Service Ecosystem with AI Analysis  
**Project Name**: BengkelAi

Sebuah aplikasi yang dapat membantu pemilik motor mendiagnosa masalah, kasih estimasi biaya, berikan rekomendasi dan langsung hubungkan ke bengkel terdekat. Platform ini dirancang khusus untuk 120 juta pengguna motor di Indonesia yang membutuhkan solusi praktis dan terpercaya untuk perawatan kendaraan mereka.

## 🚧 Status Pengembangan

**Development v1** - Tahap Awal Pengembangan

Saat ini aplikasi masih dalam tahap pengembangan awal. Fitur yang dapat dilihat dan diakses:

## 🚀 Unique Sales Proposition

### 🤖 AI Gejala → Diagnosa Ringan
User cukup ketik gejala/suara: "knalpot keluar asap putih" → AI kasih kemungkinan penyebab, estimasi biaya, & tingkat keparahan (urgent / bisa ditunda).

### ⏰ Service Reminder Otomatis
Aplikasi otomatis hitung jadwal ganti oli, rantai, kampas rem → kasih notifikasi push.

### 🗺️ Workshop Finder + Booking
- Cari bengkel terdekat (Google Maps API)
- Booking slot → skip antrian
- Rating & review bengkel

### 💰 Estimasi Biaya
- AI tampilkan range harga sparepart & jasa (dari data katalog)
- Bisa bandingkan bengkel terdekat

### 🏪 Integrasi Bengkel Lokal
- Bengkel dapat dashboard: kelola booking, stok sparepart, promo
- Bisa jadi peluang digitalisasi bengkel kecil

### 🛒 Marketplace Produk Bengkel
Bengkel dapat memajang produk-produk mereka pada sebuah katalog khusus.

### ✅ Fitur yang Tersedia Saat Ini
- **Landing Page** - Halaman utama dengan informasi platform
- **Prototype AI Engine** - Demo awal sistem kecerdasan buatan
- **LLM Integration** - Integrasi Large Language Model untuk konsultasi
- **NLP Processing** - Pemrosesan bahasa alami untuk analisis
- **Spare Part E-Commerce** - Prototype marketplace suku cadang
- **Workshop Finder** - Pencari bengkel terdekat
- **Service Reminder** - Pengingat jadwal servis kendaraan

### 🔄 Dalam Pengembangan
- Sistem booking online
- Dashboard bengkel
- Sistem pembayaran
- Mobile application
- Advanced AI diagnostics

## 🎯 Fitur Utama (Roadmap)

### 🤖 AI & Machine Learning
- **Diagnostic AI**: Diagnosis otomatis masalah kendaraan
- **Predictive Maintenance**: Prediksi kebutuhan perawatan
- **Smart Recommendations**: Rekomendasi suku cadang dan layanan
- **Natural Language Processing**: Konsultasi dengan bahasa natural

### 🛒 E-Commerce Suku Cadang
- Marketplace suku cadang original dan aftermarket
- Sistem verifikasi keaslian produk
- Integrasi dengan bengkel partner
- Sistem review dan rating

### 🔍 Workshop Finder
- Pencarian bengkel berdasarkan lokasi
- Filter berdasarkan spesialisasi dan rating
- Sistem booking online
- Real-time availability

### ⏰ Service Reminder
- Pengingat otomatis jadwal servis
- Tracking riwayat perawatan
- Notifikasi berbasis AI
- Integrasi dengan kalender

### 📱 Platform Integration
- Web application (React/Remix.js)
- Mobile app (React Native)
- API untuk integrasi bengkel
- Dashboard analytics

## 🛠️ Tech Stack

### Frontend
- **Framework**: Remix.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Language**: TypeScript/JavaScript

### Backend
- **Framework**: FastAPI Python
- **Database**: MySQL (data user, booking, bengkel, product) + Redis (cache)
- **AI Chatbot**: NLP Intent Recognition (Dialogflow / Rasa / LLM API)
- **Containerization**: Docker
- **Geospasial**: Google Maps API / OpenStreetMap

### Infrastructure
- **Hosting**: VPS Hosting 2c/4gb + domain.id
- **Web Server**: Nginx
- **Process Manager**: PM2
- **SSL**: Let's Encrypt
- **Domain**: bengkel-ai.id

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd bengkelai-fe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

```bash
# .env
NODE_ENV=production
PORT=3000
# Add other environment variables as needed
```

## 🌐 Live Demo

Kunjungi aplikasi live di: **[https://bengkel-ai.id](https://bengkel-ai.id)**

## 💼 Business Model

- **Freemium untuk user** (diagnosa gratis)
- **Komisi booking bengkel** (3-5%)
- **Subscription untuk bengkel** (premium dashboard)
- **Ads / featured listing** untuk bengkel
- **Partnership**: asuransi, spare part marketplace atau produk bengkel

## 🎯 Kenapa Menarik untuk Lomba

- **Problem Nyata**: 120 Juta motor di Indonesia, banyak user awam soal mesin
- **Impact Besar**: Hemat waktu, kurangi biaya, bantu bengkel lokal
- **Scalable**: Bisa ekspansi ke ASEAN (Vietnam, Thailand dan negara dengan pengguna motor banyak lainnya)
- **Trend AI**: NLP Chatbot + Service Assistant → masih jarang di domain motor

## 📋 Roadmap Development

### 0 - 6 Bulan (Current - v1)
- [x] Landing page
- [x] Basic AI prototype
- [x] Infrastructure setup
- [ ] Kumpulkan dataset gejala motor
- [ ] Bangun chatbot sederhana
- [ ] MVP untuk booking

### 6 - 12 Bulan (v2)
- [ ] Tambah rating & review
- [ ] Integrasi katalog sparepart
- [ ] Pengembangan marketplace
- [ ] Advanced AI diagnostics
- [ ] Mobile application

### 12 - 18 Bulan (v3)
- [ ] Premium dashboard bengkel
- [ ] Kerjasama leasing/asuransi
- [ ] Advanced analytics
- [ ] Multi-language support

### 18 - 24 Bulan (v4)
- [ ] Emergency Roadside Assistance
- [ ] Fleet Management
- [ ] Enterprise features

## 📞 Contact

- **Website**: [bengkel-ai.id](https://bengkel-ai.id)
- **Email**: aidilmusirjun@gmailcom

## 🙏 Acknowledgments

- Tim pengembang Bengkel AI
- Komunitas open source
- Partner bengkel dan supplier

---

**Bengkel AI** - Revolutionizing Automotive Services with Artificial Intelligence 🚗🤖