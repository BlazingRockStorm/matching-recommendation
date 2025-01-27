import { GoogleGenerativeAI } from '@google/generative-ai';

export async function fetchGeminiData(maleInfo: string, femaleInfo: string) {
  const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
  const fetchData = async () => {
    const model = gemini.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Bạn nam: ${maleInfo}\nBạn nữ: ${femaleInfo}. Hãy tư vấn cho 2 bạn làm quen nhau như thế nào`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };
  return fetchData();
}
