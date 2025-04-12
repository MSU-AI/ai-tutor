import { useState } from "react";
import './FileDrop.css';  // Import the custom CSS file

function FileDropBox() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // Handle video file upload
  const handleVideoUpload = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const uploadedFile = await response.json(); // Assuming the server responds with file info
        setVideoUrl(`http://localhost:3000/uploads/${uploadedFile.filename}`);
        console.log("Video file uploaded successfully");
      } else {
        console.error("Video file upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle PDF file upload
  const handlePdfUpload = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const uploadedFile = await response.json(); // Assuming the server responds with file info
        setPdfFile(`http://localhost:3000/uploads/${uploadedFile.filename}`);
        console.log("PDF file uploaded successfully");
      } else {
        console.error("PDF file upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="file-dropbox-container">
      {/* Video File Drop Box */}
      <div className="file-dropbox">
        <input
          type="file"
          className="hidden"
          id="videoInput"
          accept="video/mp4"
          onChange={handleVideoUpload}
        />
        <label htmlFor="videoInput" className="upload-button">
          Upload Video
        </label>
        {videoUrl && (
          <div className="video-preview">
            <video controls className="video-player">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* PDF File Drop Box */}
      <div className="file-dropbox">
        <input
          type="file"
          className="hidden"
          id="pdfInput"
          accept="application/pdf"
          onChange={handlePdfUpload}
        />
        <label htmlFor="pdfInput" className="upload-button">
          Upload PDF
        </label>
        {pdfFile && (
          <div className="pdf-preview">
            {/* You can display a thumbnail or use an iframe for full preview */}
            <iframe
              src={pdfFile}
              width="100%"
              height="500px"
              title="PDF Preview"
              frameBorder="0"
            />
            {/* Alternatively, you can show a link to open the PDF in a new tab */}
            {/* <a href={pdfFile} target="_blank" rel="noopener noreferrer" className="file-list-item">
              View PDF
            </a> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileDropBox;
