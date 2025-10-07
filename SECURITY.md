# 🔒 Security & Rate Limiting

## API Rate Limiting

KramerGenius API'si, kötüye kullanımı önlemek ve Gemini API kotasını korumak için **express-rate-limit** kullanır.

### Limitler

#### 1. Genel API Rate Limit
- **Süre:** 1 dakika
- **Maksimum İstek:** 30 istek/IP
- **Kapsam:** Tüm `/api/*` endpoint'leri
- **Hata Kodu:** `429 Too Many Requests`

#### 2. Fikir Üretme Rate Limit
- **Süre:** 15 dakika
- **Maksimum İstek:** 10 istek/IP
- **Kapsam:** `/api/generate-ideas` endpoint'i
- **Hata Kodu:** `429 Too Many Requests`

### Rate Limit Response Headers

API her istekte aşağıdaki header'ları döner:

```
RateLimit-Policy: 30;w=60           # Policy: 60 saniyede 30 istek
RateLimit-Limit: 30                 # Maksimum istek sayısı
RateLimit-Remaining: 25             # Kalan istek sayısı
RateLimit-Reset: 60                 # Reset süresi (saniye)
```

### Örnek Hata Yanıtı

Rate limit aşıldığında:

```json
{
  "error": "Çok fazla fikir üretme isteği gönderildi.",
  "message": "Lütfen birkaç dakika bekleyip tekrar deneyin.",
  "retryAfter": "15 dakika"
}
```

## Güvenlik En İyi Uygulamalar

### Environment Variables
- ✅ `.env` dosyası `.gitignore`'da
- ✅ API key'ler şifrelenmeli
- ✅ Production'da mutlaka `env.example` kullanılmalı

### API Güvenliği
- ✅ Rate limiting aktif
- ✅ Request validation (Zod)
- ✅ Error handling
- ✅ CORS yapılandırması (gerekirse eklenebilir)

### Önerilen Ek Güvenlik Önlemleri

#### 1. CORS Politikası Eklemek (Opsiyonel)
```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
```

#### 2. Helmet.js (HTTP Header Güvenliği)
```bash
npm install helmet
```

```typescript
import helmet from 'helmet';
app.use(helmet());
```

#### 3. API Key Authentication (Gelecek için)
Frontend'den gelen istekleri doğrulamak için:
```typescript
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.CLIENT_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
```

## Rate Limiting Özelleştirme

`server/routes.ts` dosyasında rate limit ayarlarını değiştirebilirsiniz:

```typescript
// Daha sıkı limit
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  // 15 dakikada 5 istek
});

// Daha gevşek limit (development için)
const devLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,  // Dakikada 100 istek
});
```

## İzleme ve Logging

Rate limit ihlalleri loglanır. Production'da izleme için:
- CloudWatch (AWS)
- Datadog
- Sentry

eklenebilir.

## Raporlama

Rate limit aşımları şüphelenilen IP'ler için:
1. Log dosyalarını kontrol edin
2. IP blacklist oluşturun
3. Cloudflare gibi CDN kullanın

---

**Son Güncelleme:** 2025-10-07  
**Versiyon:** 1.0.0

