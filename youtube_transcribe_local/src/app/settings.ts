import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { Settings } from "llamaindex";
import { Ollama } from "@llamaindex/ollama";
import { HuggingFaceEmbedding } from "@llamaindex/huggingface";

export function initSettings() {
  // Settings.llm = new OpenAI({
  //   model: "gpt-4.1",
  // });
  Settings.llm = new Ollama({
    model: "llama3",
  });
  // Settings.embedModel = new OpenAIEmbedding({
  //   model: "text-embedding-3-small",
  // });
    Settings.embedModel = new HuggingFaceEmbedding({
    modelType: "BAAI/bge-small-en-v1.5",
  });
}
