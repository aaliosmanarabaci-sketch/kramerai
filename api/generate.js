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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
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
      return res.status(500).json({ error: 'Gemini boş yanıt döndü' });
    }

    console.log('Gemini response:', text);

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return res.status(200).json(result);
    }

    return res.status(500).json({ error: 'Geçersiz JSON formatı' });

  } catch (err) {
    console.error("Server error:", err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
}
