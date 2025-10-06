import { GoogleGenAI } from "@google/genai";
import type { GenerateIdeasRequest, Idea } from "@shared/schema";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateIdeas(request: GenerateIdeasRequest): Promise<Idea[]> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
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
      "description": "2-3 cümlelik kısa açıklama",
      "category": "Sektör adı",
      "budget": "Bütçe seviyesi",
      "complexity": "Karmaşıklık seviyesi",
      "uniqueness": 5,
      "roadmap": [
        {
          "phase": "Faz 1: Hazırlık",
          "duration": "1-2 hafta",
          "tasks": ["Görev 1", "Görev 2", "Görev 3"]
        },
        {
          "phase": "Faz 2: Geliştirme",
          "duration": "2-4 hafta",
          "tasks": ["Görev 1", "Görev 2"]
        },
        {
          "phase": "Faz 3: Lansман",
          "duration": "1 hafta",
          "tasks": ["Görev 1", "Görev 2"]
        }
      ],
      "pros": ["Artı 1", "Artı 2", "Artı 3"],
      "cons": ["Eksi 1", "Eksi 2"],
      "requiredSkills": ["Beceri 1", "Beceri 2", "Beceri 3"],
      "potentialRevenue": "Aylık tahmini gelir",
      "targetMarketSize": "Hedef pazar büyüklüğü tahmini"
    }
  ]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            ideas: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  category: { type: "string" },
                  budget: { type: "string" },
                  complexity: { type: "string" },
                  uniqueness: { type: "number" },
                  roadmap: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        phase: { type: "string" },
                        duration: { type: "string" },
                        tasks: {
                          type: "array",
                          items: { type: "string" },
                        },
                      },
                      required: ["phase", "duration", "tasks"],
                    },
                  },
                  pros: {
                    type: "array",
                    items: { type: "string" },
                  },
                  cons: {
                    type: "array",
                    items: { type: "string" },
                  },
                  requiredSkills: {
                    type: "array",
                    items: { type: "string" },
                  },
                  potentialRevenue: { type: "string" },
                  targetMarketSize: { type: "string" },
                },
                required: ["title", "description", "category", "budget", "complexity", "uniqueness", "roadmap", "pros", "cons", "requiredSkills", "potentialRevenue", "targetMarketSize"],
              },
            },
          },
          required: ["ideas"],
        },
      },
      contents: userPrompt,
    });

    const content = response.text;
    if (!content) {
      throw new Error("No content received from Gemini");
    }

    const result = JSON.parse(content);
    
    if (!result.ideas || !Array.isArray(result.ideas)) {
      throw new Error("Invalid response format from Gemini");
    }

    return result.ideas.map((idea: any) => ({
      title: idea.title || "Başlıksız Fikir",
      description: idea.description || "Açıklama yok",
      category: idea.category || industry || "Genel",
      budget: idea.budget || budget || "Orta Bütçe",
      complexity: idea.complexity || complexity || "Orta",
      uniqueness: Math.max(1, Math.min(5, idea.uniqueness || 3)),
      roadmap: idea.roadmap || [],
      pros: idea.pros || [],
      cons: idea.cons || [],
      requiredSkills: idea.requiredSkills || [],
      potentialRevenue: idea.potentialRevenue || "Belirsiz",
      targetMarketSize: idea.targetMarketSize || "Belirsiz",
    }));
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Fikirler üretilirken bir hata oluştu. Lütfen tekrar deneyin.");
  }
}
