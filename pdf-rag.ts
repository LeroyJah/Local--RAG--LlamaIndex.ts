import {VectorStoreIndex, Settings} from 'llamaindex';
import {PDFReader} from '@llamaindex/readers/pdf';
import { Ollama } from "@llamaindex/ollama";
import { HuggingFaceEmbedding } from "@llamaindex/huggingface";

Settings.llm = new Ollama({
    model: "llama3",
  });

  Settings.embedModel = new HuggingFaceEmbedding({
    modelType: "BAAI/bge-small-en-v1.5",
  });

async function main() {
    //instantiate the pdfreader
    const directory = './storage/pdf/The Rules of Blood Bowl.pdf'
    const reader = new PDFReader();
    const documents = await reader.loadData(directory);

    const index = await VectorStoreIndex.fromDocuments(documents)
    console.log('Index created.', index);

    // Query the index
    const queryEngine = index.asQueryEngine();
    console.log('Querying the index...');
   
    const response = await queryEngine.query({
      query: "Geef antwoord in het Nederlands. wat zijn de regels van het spel?"
    });

    console.log('Response:', response.message.content)

}

main().catch(console.error);