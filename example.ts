import { Ollama } from "@llamaindex/ollama";
import { Document, VectorStoreIndex, Settings } from "llamaindex";
import { HuggingFaceEmbedding } from "@llamaindex/huggingface";

import fs from "fs/promises";

// Use Ollama LLM and Embed Model
Settings.llm = new Ollama({
  model: "llama3",
});

Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "BAAI/bge-small-en-v1.5",
});

async function main() {
  // Load essay from abramov.txt in Node
  // const path = "node_modules/llamaindex/examples/abramov.txt";
  // const path = "./test.txt";
  const path = "";
 
  const essay = await fs.readFile(path, "utf-8");
 
  // Create Document object with essay
  const document = new Document({ text: essay, id_: path });
 
  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);
 
  // Query the index
  const queryEngine = index.asQueryEngine();
 
  const response = await queryEngine.query({
    query: "geef me een samenvatting van max 50 woorden, in Nederlands.",
  });
 
  // Output response
  console.log(response.toString());
}
 
main().catch(console.error);