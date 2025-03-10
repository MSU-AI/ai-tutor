import { useState } from "react";

function FileDropBox() {
  const [files, setFiles] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploadedFile = await response.json(); // Assuming the server responds with file info
        setVideoUrl(`http://localhost:3000/uploads/${uploadedFile.filename}`);
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="item-center">
      <input
        type="file"
        multiple
        className="hidden"
        id="fileInput"
        onChange={handleFileUpload}
      />
      <label htmlFor="fileInput" className="bg-blue-500 text-white rounded-lg cursor-pointer">
        Upload Files
      </label>
      {videoUrl && (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <ul className="mt-3 text-gray-700">
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FileDropBox;

