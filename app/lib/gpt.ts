import { ChatOpenAI } from "@langchain/openai";

export const gpt = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  modelName: "openai/gpt-3.5-turbo",
});
