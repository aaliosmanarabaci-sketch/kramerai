module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "Prompt missing" });

    // Parse the prompt to get the original body
    const originalBody = JSON.parse(prompt);
    
    // Create the idea generation prompt
    const ideaPrompt = `Şu kriterlere göre ${originalBody.ideaCount || 3} adet gerçekçi girişim fikri üret:

${originalBody.industry ? `Sektör: ${originalBody.industry}` : ''}
${originalBody.budget ? `Bütçe: ${originalBody.budget}` : ''}
${originalBody.complexity ? `Karmaşıklık: ${originalBody.complexity}` : ''}
${originalBody.audience ? `Hedef Kitle: ${originalBody.audience}` : ''}

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
      "category": "${originalBody.industry || 'Teknoloji'}",
      "budget": "${originalBody.budget || '5.000-25.000₺'}",
      "complexity": "${originalBody.complexity || 'Orta'}",
      "targetAudience": "${originalBody.audience || 'B2C'}",
      "uniqueness": 4
    }
  ]
}`;

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: ideaPrompt }] }],
        }),
      }
    );

    if (!r.ok) {
      const errorData = await r.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API hatası: ${r.status}`);
    }

    const data = await r.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Gemini boş yanıt döndü');
    }

    console.log('Gemini response:', text);

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return res.status(200).json(result);
    }

    throw new Error('Geçersiz JSON formatı');

  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message });
  }
};
