import { GoogleGenerativeAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { category, ideaCount = 3 } = req.body;

    // Validation
    if (!category) {
      res.status(400).json({ error: 'Category is required' });
      return;
    }

    if (ideaCount < 3 || ideaCount > 10) {
      res.status(400).json({ error: 'Idea count must be between 3 and 10' });
      return;
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create prompt
    const prompt = `Sen Cosmo Kramer'ın yaratıcı ruhundan ilham alan bir girişim fikri üreticisisin. 

Kategori: ${category}
Fikir sayısı: ${ideaCount}

Her fikir için şu formatı kullan:
{
  "title": "Fikir Başlığı",
  "description": "Detaylı açıklama",
  "marketPotential": "Pazar potansiyeli",
  "kramerStyle": "Kramer tarzı yaratıcı yaklaşım"
}

Sadece JSON array formatında yanıt ver, başka açıklama ekleme.`;

    // Generate ideas
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let ideas;
    try {
      ideas = JSON.parse(text);
    } catch (parseError) {
      // If JSON parsing fails, create structured response from text
      const lines = text.split('\n').filter(line => line.trim());
      ideas = lines.slice(0, ideaCount).map((line, index) => ({
        title: `Kramer Fikri ${index + 1}`,
        description: line.trim(),
        marketPotential: "Yüksek potansiyel",
        kramerStyle: "Kramer'ın yaratıcı yaklaşımı"
      }));
    }

    // Ensure we have the right number of ideas
    if (ideas.length > ideaCount) {
      ideas = ideas.slice(0, ideaCount);
    }

    res.status(200).json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    res.status(500).json({ 
      error: 'Fikirler üretilirken bir hata oluştu',
      details: error.message 
    });
  }
}
