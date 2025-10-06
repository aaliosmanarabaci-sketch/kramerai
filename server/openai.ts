import OpenAI from "openai";
import type { GenerateIdeasRequest, Idea } from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateIdeas(request: GenerateIdeasRequest): Promise<Idea[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const { industry, budget, complexity, audience } = request;

  const systemPrompt = `Sen Cosmo Kramer gibi yaratıcı ve çılgın fikirlere sahip bir girişimcisin. Seinfeld dizisindeki Kramer karakterinin ruhunu taşıyan, özgün ve ilginç iş fikirleri üretiyorsun. Fikirler sıradışı olmalı ama aynı zamanda gerçekleştirilebilir olmalı.`;

  let userPrompt = `Bana 6 yaratıcı girişim fikri üret. Her fikir şu özelliklere sahip olmalı:
- Kramer'ın ruhunu yansıtan özgün ve yaratıcı
- Kısa ama çarpıcı bir başlık
- 2-3 cümlelik açıklama
- Özgünlük puanı (1-5 arası)`;

  if (industry) {
    userPrompt += `\n- Sektör odağı: ${industry}`;
  }
  if (budget) {
    userPrompt += `\n- Bütçe seviyesi: ${budget}`;
  }
  if (complexity) {
    userPrompt += `\n- Karmaşıklık: ${complexity}`;
  }
  if (audience) {
    userPrompt += `\n- Hedef kitle: ${audience}`;
  }

  userPrompt += `\n\nJSON formatında şu yapıda cevap ver:
{
  "ideas": [
    {
      "title": "Fikir Başlığı",
      "description": "Kısa açıklama",
      "category": "Sektör adı",
      "budget": "Bütçe seviyesi",
      "complexity": "Karmaşıklık seviyesi",
      "uniqueness": 5
    }
  ]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 4096,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    const result = JSON.parse(content);
    
    if (!result.ideas || !Array.isArray(result.ideas)) {
      throw new Error("Invalid response format from OpenAI");
    }

    return result.ideas.map((idea: any) => ({
      title: idea.title || "Başlıksız Fikir",
      description: idea.description || "Açıklama yok",
      category: idea.category || industry || "Genel",
      budget: idea.budget || budget || "Orta Bütçe",
      complexity: idea.complexity || complexity || "Orta",
      uniqueness: Math.max(1, Math.min(5, idea.uniqueness || 3)),
    }));
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Fikirler üretilirken bir hata oluştu. Lütfen tekrar deneyin.");
  }
}
