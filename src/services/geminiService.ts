import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getNutritionRecommendation = async (
  pregnancyStage: string,
  workoutType: string,
  preferences: string[]
) => {
  const prompt = `Como um especialista em nutrição para gestantes e atletas, forneça recomendações personalizadas.
  Estágio da gravidez: ${pregnancyStage}
  Tipo de treino: ${workoutType}
  Preferências/Restrições: ${preferences.join(", ")}

  Por favor, forneça:
  1. Sugestões de refeições para o dia.
  2. Alimentos recomendados e por que.
  3. Alimentos a evitar.
  4. Dicas de hidratação e porções.
  
  Responda em Português (Brasil) formatado em Markdown.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const getWorkoutAdvice = async (
  pregnancyStage: string,
  fitnessLevel: string,
  goals: string
) => {
  const prompt = `Como um personal trainer especializado em gestantes e atletas, forneça um guia de treino.
  Estágio da gravidez: ${pregnancyStage}
  Nível de condicionamento: ${fitnessLevel}
  Objetivos: ${goals}

  Por favor, forneça:
  1. Exercícios recomendados.
  2. Exercícios a evitar ou modificar.
  3. Alertas de segurança importantes.
  4. Dicas de intensidade.

  Responda em Português (Brasil) formatado em Markdown.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const getBabyDevelopmentInfo = async (week: number) => {
  const prompt = `Descreva o desenvolvimento do bebê na semana ${week} da gravidez.
  Inclua:
  1. Tamanho aproximado (comparação com fruta).
  2. Principais marcos de desenvolvimento.
  3. O que a mãe pode estar sentindo.
  
  Responda em Português (Brasil) formatado em Markdown.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};
