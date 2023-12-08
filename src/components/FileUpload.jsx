import React, { useState } from "react";
import "../components/styles/FileUpload.css";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleFileRemove = (index) => {
    const files = [...selectedFiles];
    files.splice(index, 1);
    setSelectedFiles(files);
  };

  return (
    <div className="file-upload">
      <label htmlFor="file-input">
        Choose files
        <input
          id="file-input"
          type="file"
          multiple
          onChange={handleFileSelect}
        />
      </label>
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          {selectedFiles.map((file, index) => (
            <div className="file" key={index}>
              <span className="file-name">{file.name}</span>
              <button
                className="remove-button"
                onClick={() => handleFileRemove(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
