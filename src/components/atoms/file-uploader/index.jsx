import React, { useState } from "react";
import Button from "../button";

function FileUploader({ onFileSelect, currentFile }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(file); // Send the file name to the parent component
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      // You can perform file upload logic here, e.g., send the file to a server.
      console.log("Uploading file:", selectedFile);
    } else {
      alert("Please select a file before uploading.");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .pdf" // Define the allowed file types
        onChange={handleFileSelect}
        className="mb-2"
      />
      {currentFile && <p>Current File Name: {currentFile}</p>}
      {/* <Button className="bg-red-500" onClick={handleFileUpload}>
        Upload
      </Button> */}
    </div>
  );
}

export default FileUploader;
