export default async function handler(req, res) {
  try {
    // ✅ CORS ve method kontrolü
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    let body;
    try {
      body = req.body || JSON.parse(req.body || "{}");
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { prompt } = body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    // Parse the prompt to get the original body
    let originalBody;
    try {
      originalBody = JSON.parse(prompt);
    } catch (e) {
      return res.status(400).json({ error: "Invalid prompt JSON" });
    }
    
    // Create the idea generation prompt
    const ideaPrompt = `Sen bir girişim danışmanısın. Şu kriterlere göre ${originalBody.ideaCount || 3} adet gerçekçi ve uygulanabilir iş fikri üret:

${originalBody.industry ? `- Sektör: ${originalBody.industry}` : ''}
${originalBody.budget ? `- Bütçe: ${originalBody.budget}` : ''}
${originalBody.complexity ? `- Karmaşıklık: ${originalBody.complexity}` : ''}
${originalBody.audience ? `- Hedef Kitle: ${originalBody.audience}` : ''}

Her fikir şunları içermeli:
- Gerçekten uygulanabilir olmalı
- Net gelir modeli olmalı
- Türkiye pazarına uygun olmalı
- Özgünlük puanı 1-5 arası olmalı
- Detaylı yol haritası, artılar, eksiler ve gerekli beceriler

ÇOK ÖNEMLİ: Yanıtını SADECE aşağıdaki JSON formatında ver. Başka hiçbir metin ekleme:

{
  "ideas": [
    {
      "title": "İş Fikri Başlığı",
      "description": "İş fikrinin 2-3 cümle açıklaması",
      "category": "${originalBody.industry || 'Teknoloji'}",
      "budget": "${originalBody.budget || '5.000-25.000₺'}",
      "complexity": "${originalBody.complexity || 'Orta'}",
      "targetAudience": "${originalBody.audience || 'B2C'}",
      "uniqueness": 4,
      "potentialIncome": "Aylık 15.000-50.000₺ arası gelir potansiyeli",
      "targetMarket": "Türkiye'deki orta gelirli aileler ve bireyler",
      "roadmap": [
        {
          "phase": "1. Hazırlık Aşaması",
          "duration": "1-2 ay",
          "tasks": ["Pazar araştırması", "İş planı hazırlama", "Yasal izinler"]
        },
        {
          "phase": "2. Başlangıç",
          "duration": "2-3 ay", 
          "tasks": ["Ofis kurulumu", "İlk müşteri bulma", "Hizmet testi"]
        },
        {
          "phase": "3. Büyüme",
          "duration": "6-12 ay",
          "tasks": ["Ekip genişletme", "Hizmet çeşitlendirme", "Pazarlama"]
        }
      ],
      "pros": [
        "Düşük başlangıç maliyeti",
        "Yüksek talep potansiyeli",
        "Ölçeklenebilir iş modeli"
      ],
      "cons": [
        "Yoğun rekabet",
        "Müşteri güveni kazanma süreci",
        "İlk aylarda düşük gelir"
      ],
      "requiredSkills": [
        "İletişim becerileri",
        "Proje yönetimi",
        "Pazarlama bilgisi"
      ]
    }
  ]
}

JSON formatını kesinlikle koru. Ekstra metin, yorum veya açıklama EKLEME.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: ideaPrompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res
        .status(response.status)
        .json({ error: "Gemini API request failed", details: data });
    }

    // Parse Gemini response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('Gemini empty response:', data);
      return res.status(500).json({ error: 'Gemini boş yanıt döndü', details: data });
    }

    console.log('Gemini raw response:', text);

    // Parse JSON from response (remove markdown code blocks if any)
    let cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Try to extract JSON object
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const result = JSON.parse(jsonMatch[0]);
        
        // Validate that ideas array exists
        if (!result.ideas || !Array.isArray(result.ideas)) {
          console.error('Invalid response format - missing ideas array:', result);
          return res.status(500).json({ 
            error: 'Geçersiz yanıt formatı',
            details: 'ideas dizisi bulunamadı',
            rawResponse: result
          });
        }
        
        console.log('Successfully parsed ideas:', result.ideas.length);
        return res.status(200).json(result);
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Text:', jsonMatch[0]);
        return res.status(500).json({ 
          error: 'JSON parse hatası',
          details: parseError.message,
          rawText: jsonMatch[0].substring(0, 200)
        });
      }
    }

    console.error('No JSON found in response:', text);
    return res.status(500).json({ 
      error: 'Geçersiz JSON formatı',
      rawResponse: text.substring(0, 200)
    });

  } catch (err) {
    console.error("Server error:", err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
}
