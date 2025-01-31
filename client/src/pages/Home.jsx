import React, { useState, useRef } from "react";
import styles from "./Home.module.css";
import { TypeAnimation } from "react-type-animation";
import { uploadDocument } from "../services/api";

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for input

  const handleFileChange = (event) => {
    console.log("Function called");
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      console.log("File selected:", selectedFile);
      setFile(selectedFile);
    } else {
      console.log("No file selected.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);

    try {
      console.log("Uploading file:", file);
      const response = await uploadDocument(file);
      console.log("Upload successful:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.homepage}>
      {/* Orbital Logo */}
      <img src="/orbital.png" alt="orbital" className={styles.orbital} />

      {/* Left Section */}
      <div className={styles.left}>
        <h1>SHOPTALK</h1>
        <h2>Supercharge your products</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          aliquam distinctio asperiores molestias magnam, eaque natus, quam
          numquam cumque accusantium blanditiis at facere delectus.
        </h3>

        {/* Hidden File Input */}
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef} // Use ref to trigger click
          onChange={handleFileChange}
          className={styles.fileInput}
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: "none" }} // Hide input but keep it functional
        />

        {/* Label acts as a button to trigger file input */}
        <label
          htmlFor="fileUpload"
          className={styles.uploadLabel}
          onClick={() => fileInputRef.current.click()} // Programmatically trigger file selection
        >
          Choose File
        </label>

        {/* Display Selected File Name */}
        {file && <p>Selected File: {file.name}</p>}

        {/* Upload Button */}
        <button
          className={styles.uploadButton}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload your documents"}
        </button>
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <div className={styles.imageContainer}>
          <div className={styles.bgContainer}>
            <div className={styles.bg}></div>
          </div>
          <img src="/bot.png" alt="bot" className={styles.bot} />
          <div className={styles.chat}>
            <img src="/bot.png" alt="chat bot" />
            <TypeAnimation
              sequence={[
                "Human: We produce food for Mice",
                1000,
                "Bot: We produce food for Hamsters",
                1000,
                "Human2: We produce food for Guinea Pigs",
                1000,
                "Bot: We produce food for Chinchillas",
                1000,
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



