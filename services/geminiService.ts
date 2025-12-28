
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI with the environment-provided API key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Роль Арсена как архитектора валидации
export const runConsiliumValidation = async (tzId: string, rawData: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        ТЫ: Арсен Одабашьян (Архитектор проекта). 
        ЗАДАЧА: Валидация данных ИИ-консилиума для задачи ${tzId}.
        
        ПРАВИЛА ГЛАВЫ I:
        - ТОЛЬКО ФАКТЫ (Factual/Descriptive).
        - НИКАКОЙ ИНТЕРПРЕТАЦИИ.
        - ПРОВЕРКА ИСТОЧНИКОВ (World Bank, UNDP, WHO, OECD и др.).
        - ПОРОГ КОНСЕНСУСА: 0.75.

        ВХОДНЫЕ ДАННЫЕ (Data Collection Output):
        ${rawData}

        ТРЕБУЕМЫЙ ВЫХОД: JSON с оценкой консенсуса, списком верифицированных фактов и выявленными противоречиями.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            consensusScore: { type: Type.NUMBER, description: "От 0 до 1" },
            verifiedFacts: { type: Type.ARRAY, items: { type: Type.STRING } },
            contradictions: { type: Type.ARRAY, items: { type: Type.STRING } },
            draftSnippet: { type: Type.STRING, description: "Чистый текст для Главы I без воды" },
            isReadyForAuthor: { type: Type.BOOLEAN }
          },
          required: ["consensusScore", "verifiedFacts", "contradictions", "draftSnippet"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Consilium Validation Error:", error);
    throw error;
  }
};

/**
 * Added analyzeToneAndFacts function to handle editorial reviews.
 * Verifies academic tone and factual accuracy against provided sources.
 */
export const analyzeToneAndFacts = async (draft: string, sources: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        ТЫ: Редакционный Гейт (Валидатор фактов и тона).
        ЗАДАЧА: Проверка черновика на соответствие академическому стилю и фактическую точность на основе источников.
        
        ЧЕРНОВИК:
        ${draft}
        
        ИСТОЧНИКИ:
        ${sources.join('\n')}
        
        ТРЕБУЕМЫЙ ВЫХОД: JSON с оценкой соответствия стилю (toneScore 0-100), списком выявленных фактологических проблем (factIssues: statement, correction, severity) и общим резюме (summary).
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            toneScore: { type: Type.NUMBER },
            factIssues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  statement: { type: Type.STRING },
                  correction: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ["низкая", "средняя", "высокая"] }
                },
                required: ["statement", "correction", "severity"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["toneScore", "factIssues", "summary"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Analyze Tone and Facts Error:", error);
    throw error;
  }
};
