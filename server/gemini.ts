import { GoogleGenAI } from "@google/genai";
import type { GenerateIdeasRequest, Idea } from "@shared/schema";
import { storage } from "./storage";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const PROMPT_TEMPLATES = [
  {
    system: `Sen Cosmo Kramer gibi yaratıcı ve çılgın fikirlere sahip bir girişimcisin. Seinfeld dizisindeki Kramer karakterinin ruhunu taşıyan, özgün ve ilginç iş fikirleri üretiyorsun. Fikirler sıradışı olmalı ama aynı zamanda gerçekleştirilebilir olmalı.`,
    intro: `Bana {count} yaratıcı girişim fikri üret. Her fikir şu özelliklere sahip olmalı:\n- Kramer'ın ruhunu yansıtan özgün ve yaratıcı\n- Kısa ama çarpıcı bir başlık\n- 2-3 cümlelik açıklama\n- Özgünlük puanı (1-5 arası)`
  },
  {
    system: `Sen iş dünyasının yaratıcı dehası, bir fikir fabrikasısın. Kramer'ın spontane ve sıra dışı düşünce tarzını modern girişimcilik anlayışıyla harmanlayarak benzersiz iş modelleri öneriyorsun.`,
    intro: `Şu anda {count} adet hiç duyulmamış, yenilikçi girişim konsepti istiyorum. Her fikir:\n- Piyasada benzeri olmayan\n- Uygulanabilir ve somut\n- Dikkat çekici bir isimle başlayan\n- Net bir değer önerisi içeren`
  },
  {
    system: `Kramer'ın ruhuyla hareket eden bir vizyon mimarısın. Geleneksel kalıpları kıran, insanları şaşırtan ama aynı zamanda mantıklı gelen iş fikirleri yaratıyorsun.`,
    intro: `Önüme {count} tane çılgın ama parlak iş fikri koy. Her biri:\n- Sıra dışı ve dikkat çekici\n- Pratik uygulama potansiyeli olan\n- Kısa ve akılda kalıcı başlıklı\n- Gerçekçi bir vizyona sahip`
  },
  {
    system: `Girişim dünyasının maveriği, kalıpların dışında düşünen bir stratejistsin. Kramer'ın cesur ve özgün bakış açısıyla pazar fırsatlarını keşfedip yenilikçi çözümler sunuyorsun.`,
    intro: `Bana {count} devrim niteliğinde iş fikri sun. Her konsept:\n- Pazar boşluğunu dolduran\n- Yaratıcı ve cesur\n- Akılda kalıcı bir adla tanımlanan\n- Somut uygulama adımları olan`
  }
];

function getCreativityParams(level: string = "balanced") {
  switch(level) {
    case "creative":
      return { temperature: 1.2, topP: 0.95 };
    case "wild":
      return { temperature: 1.5, topP: 0.98 };
    default:
      return { temperature: 0.9, topP: 0.9 };
  }
}

function createFilterKey(request: GenerateIdeasRequest): string {
  const parts = [
    request.industry || "any",
    request.budget || "any",
    request.complexity || "any",
    request.audience || "any"
  ];
  return parts.join("|");
}

export async function generateIdeas(request: GenerateIdeasRequest): Promise<Idea[]> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const { industry, budget, complexity, audience, ideaCount = 6, creativityLevel = "balanced" } = request;

  const filterKey = createFilterKey(request);
  const recentIdeas = await storage.getRecentIdeas(filterKey);
  
  const templateIndex = Math.floor(Math.random() * PROMPT_TEMPLATES.length);
  const selectedTemplate = PROMPT_TEMPLATES[templateIndex];
  const creativityParams = getCreativityParams(creativityLevel);
  
  const timestamp = Date.now();
  const randomSeed = Math.floor(Math.random() * 1000000);

  const systemPrompt = selectedTemplate.system;
  let userPrompt = selectedTemplate.intro.replace("{count}", ideaCount.toString());

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

  if (recentIdeas.length > 0) {
    userPrompt += `\n\nÖNEMLİ: Şu başlıklara benzer fikirler ÜRETME (farklı olmalı):\n${recentIdeas.slice(-10).map(t => `- ${t}`).join('\n')}`;
  }

  userPrompt += `\n\nYaratıcılık Seed: ${randomSeed} | Zaman: ${timestamp}`;
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
        temperature: creativityParams.temperature,
        topP: creativityParams.topP,
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

    const ideas = result.ideas.map((idea: any) => ({
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

    const ideaTitles = ideas.map((idea: Idea) => idea.title);
    await storage.addRecentIdeas(filterKey, ideaTitles);

    return ideas;
  } catch (error: any) {
    console.error("Gemini API error:", error);

    // Normalize common error shapes thrown by @google/genai
    const statusCode =
      error?.status ||
      error?.code ||
      error?.error?.status ||
      error?.error?.code;

    if (statusCode === 503) {
      throw new Error("Gemini AI şu anda çok yoğun. Lütfen birkaç saniye sonra tekrar deneyin.");
    }

    if (statusCode === 429) {
      throw new Error("Çok fazla istek gönderildi. Lütfen 30 saniye bekleyip tekrar deneyin.");
    }

    throw new Error("Fikirler üretilirken bir hata oluştu. Lütfen tekrar deneyin.");
  }
}
