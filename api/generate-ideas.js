module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { industry, budget, complexity, audience, ideaCount = 3 } = req.body;

    // API key kontrolü
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY eksik');
    }

    // Prompt oluştur
    const prompt = `Şu kriterlere göre ${ideaCount} adet gerçekçi girişim fikri üret:

${industry ? `Sektör: ${industry}` : ''}
${budget ? `Bütçe: ${budget}` : ''}
${complexity ? `Karmaşıklık: ${complexity}` : ''}
${audience ? `Hedef Kitle: ${audience}` : ''}

Her fikir:
- Gerçekten uygulanabilir
- Net gelir modeli var
- Türkiye pazarına uygun

SADECE JSON formatında yanıt ver (başka metin YOK):
{
  "ideas": [
    {
      "title": "İş başlığı",
      "description": "2-3 cümle açıklama",
      "category": "${industry || 'Teknoloji'}",
      "budget": "${budget || '5.000-25.000₺'}",
      "complexity": "${complexity || 'Orta'}",
      "targetAudience": "${audience || 'B2C'}",
      "uniqueness": 4
    }
  ]
}`;

    // Gemini API çağrısı (fetch ile - paket gerekmez!)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API hatası: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Gemini boş yanıt döndü');
    }

    console.log('Gemini response:', text); // Debug için

    // JSON parse et
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return res.status(200).json(result);
    }

    throw new Error('Geçersiz JSON formatı');

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Fikirler üretilirken bir hata oluştu',
      message: error.message
    });
  }
};