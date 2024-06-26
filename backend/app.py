from flask import Flask, request
from langchain_community.llms import Ollama
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.document_loaders import PDFPlumberLoader
from langchain_community.vectorstores import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain.prompts import PromptTemplate 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


folder_path = "db"
cached_llm = Ollama(model="llama3")

embeddings = FastEmbedEmbeddings()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1024, chunk_overlap=80,
    length_function=len, is_separator_regex=False
)
raw_prompt = PromptTemplate.from_template("""
    <s> [INST] You are a technical assistant good at searching documents. If you do not have an answer from the provided information say so. [/INST]</s>
    [INST]{input}
        Context: {context}
        Answer: 
    [/INST]                                   
    """)

@app.route('/data')
def get_data():
    return {'data': 'This is some data from the Flask backend'}

@app.route("/ask_pdf", methods=["POST"])
def aiPost():
    print("Post /ask_pdf called")
    json_content = request.json
    query = json_content.get("query")
    print(f"Query: {query}")

    print("Loading the vector store...")
    vector_store = Chroma(persist_directory=folder_path, embedding_function=embeddings)

    print("Creating chain")
    retriever = vector_store.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={
            "k":20,
            "score_threshold":0.1
        }
    )
    document_chain = create_stuff_documents_chain(cached_llm, raw_prompt)
    chain = create_retrieval_chain(retriever, document_chain)
    
    result = chain.invoke({"input":query})
    print(f"Result: {result}")
    response = {"answer": result["answer"]}
    return response

@app.route("/pdf", methods=["POST"])
def pdfPost():
    file = request.files["file"]
    file_name = file.filename
    save_file = "pdf/" + file_name
    file.save(save_file)
    print(f"Filename: {file_name}")

    loader = PDFPlumberLoader(save_file)
    docs = loader.load_and_split()
    print(f"Docs len: {len(docs)}")

    chunks = text_splitter.split_documents(docs)
    print(f"Chunks len: {len(chunks)}")

    vector_store = Chroma.from_documents(
        documents=chunks, embedding=embeddings, persist_directory=folder_path
    )

    vector_store.persist()

    response = {
        "status": "Sucessfully uploaded",
        "filename": file_name, 
        "documents_len": len(docs), 
        "chunks_len": len(chunks)
    }
    return response

def start_app():
    app.run(host="0.0.0.0", port=8080, debug=True)
    print("Starting the app...")
if __name__ == "__main__":
    start_app()
    