# 🎭 KramerGenius - AI Powered Idea Generator

**Cosmo Kramer'ın yaratıcı ruhundan ilham alan yapay zeka destekli girişim fikri üreteci**

## 🌟 Özellikler

- 🤖 **AI Destekli Fikir Üretimi**: Google Gemini API ile güçlendirilmiş
- 🎯 **Akıllı Filtreleme**: Sektör, bütçe, karmaşıklık ve hedef kitle filtreleri
- 💾 **Favori Sistemi**: Beğendiğiniz fikirleri kaydedin
- 📄 **PDF Export**: Fikirlerinizi profesyonel PDF olarak indirin
- 🌙 **Dark/Light Mode**: Gözünüze uygun tema seçimi
- 📱 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Google Gemini API Key

### 1. Projeyi Klonlayın
```bash
git clone <your-repo-url>
cd KramerGenius
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Variables Ayarlayın
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

### 5. Production Build
```bash
npm run build
npm start
```

## 🔑 API Key Alma

1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. "Create API Key" butonuna tıklayın
3. API key'i kopyalayıp `.env` dosyasına ekleyin

## 🛠 Teknoloji Stack

**Frontend:**
- React 18 + TypeScript
- Vite (Build Tool)
- Tailwind CSS + Shadcn/ui
- Wouter (Routing)
- TanStack Query

**Backend:**
- Node.js + Express
- Google Gemini API
- Drizzle ORM (PostgreSQL ready)
- TypeScript

## 📁 Proje Yapısı

```
KramerGenius/
├── client/                 # Frontend React uygulaması
│   ├── src/
│   │   ├── components/     # UI bileşenleri
│   │   ├── pages/          # Sayfa bileşenleri
│   │   └── contexts/       # React context'leri
├── server/                 # Backend Express sunucusu
│   ├── gemini.ts          # AI entegrasyonu
│   ├── routes.ts          # API rotaları
│   └── storage.ts         # Veri depolama
├── shared/                 # Ortak TypeScript tipleri
└── dist/                   # Build çıktısı
```

## 🌐 Deployment

### Vercel/Netlify (Önerilen)
1. GitHub'a push edin
2. Vercel/Netlify'a bağlayın
3. Environment variables'ları ekleyin
4. Deploy edin

### Docker
```bash
# Dockerfile oluşturulacak
docker build -t kramergenius .
docker run -p 3333:3333 -e GEMINI_API_KEY=your_key kramergenius
```

### Railway/Render
1. Proje'yi bağlayın
2. Environment variables ekleyin
3. Auto-deploy aktifleştirin

## 🎯 API Endpoints

### `POST /api/generate-ideas` - Fikir Üretimi
```json
{
  "industry": "Teknoloji",
  "budget": "25.000-100.000₺",
  "complexity": "Orta",
  "audience": "B2C",
  "ideaCount": 3
}
```

### `GET /api/health` - Health Check
```json
{
  "status": "ok",
  "timestamp": "2025-10-07T10:00:00.000Z"
}
```

## 🛡️ Rate Limiting

API kötüye kullanımı önlemek için rate limiting uygulanmıştır:

**Genel API Limitleri:**
- 1 dakikada maksimum **30 istek** (tüm endpoint'ler için)
- Header'larda kalan istek sayısı görüntülenir

**Fikir Üretme Limitleri:**
- 15 dakikada maksimum **10 fikir üretme isteği**
- Rate limit aşıldığında `429 Too Many Requests` hatası döner
- Gemini API kotasını korumak için optimize edilmiştir

**Rate Limit Headers:**
```
RateLimit-Limit: 30
RateLimit-Remaining: 25
RateLimit-Reset: 60
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun
3. Commit edin
4. Pull request gönderin

## 📜 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasını inceleyin.

## 🎭 Kramer Hakkında

Bu proje, Seinfeld dizisinin unutulmaz karakteri Cosmo Kramer'ın yaratıcı ruhundan ilham alır. Kramer'ın "hiçbir şey imkansız değil" anlayışını modern girişimcilik dünyasına taşır.

---

**"Giddy up!"** - Cosmo Kramer
