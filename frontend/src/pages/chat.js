import React, { useState } from "react";
import { postPdf } from "../services/api"; // Import the postPdf function
import Header from '../components/header';

const Chat = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
        const response = await postPdf(file); // Use the postPdf function
        console.log(response)
        setUploadStatus(response.status);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header title="RAG App" />
      <h1 className="text-3xl font-bold mb-4">Upload PDF</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      <p className="mt-2">{uploadStatus}</p>
    </div>
  );
};

export default Chat;
 