import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an MRI image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        https://brain-tumor-ai-production-1325.up.railway.app/predict,
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Please try again.");
    }
  };
  const tumorInfo = {
  glioma:
    "Glioma is a tumor that starts in the brain's glial cells. Common symptoms include headaches, seizures, memory issues, and vision problems.",

  meningioma:
    "Meningioma develops in the membranes surrounding the brain and spinal cord. Most are slow-growing and non-cancerous.",

  "no tumor":
    "No tumor was detected in the MRI scan. Continue regular checkups and consult a healthcare professional if symptoms persist.",

  pituitary:
    "Pituitary tumors occur in the pituitary gland and may affect hormone production, causing headaches, vision changes, and hormonal imbalances."
};
  return (
    <div className="container">
      <h1>🧠 Brain Tumor Detection</h1>

<p className="subtitle">
  AI-powered MRI analysis for detecting Glioma, Meningioma,
  Pituitary Tumors and No Tumor cases.
</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
  setResult(null);

  if (selectedFile) {
    setPreview(URL.createObjectURL(selectedFile));
  }
}}
      />

      <br />
      <br />

      {preview && (
        <img
          src={preview}
          alt="MRI Preview"
          width="250"
          style={{
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        />
      )}

      <br />

      <button onClick={handleUpload}>
        Predict
      </button>

      {result && (
  <div className="result-card">
    <h2>Prediction: {result.tumor_type}</h2>
    <h3>Confidence: {result.confidence}%</h3>

    <p className="tumor-description">
  {tumorInfo[result.tumor_type] ||
    "Please upload a valid brain MRI image for accurate prediction."}
</p>
  </div>
)}
    

    <div className="info-section">

      <div className="info-card">
        <h2>Symptoms</h2>
        <ul>
          <li>Persistent headaches</li>
          <li>Blurred vision</li>
          <li>Seizures</li>
          <li>Nausea and vomiting</li>
          <li>Difficulty speaking</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>Precautions</h2>
        <ul>
          <li>Get regular health checkups</li>
          <li>Consult a neurologist if symptoms persist</li>
          <li>Follow prescribed medications</li>
          <li>Maintain a healthy lifestyle</li>
          <li>Avoid self-diagnosis</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>Risk Reduction</h2>
        <ul>
          <li>Avoid exposure to harmful radiation</li>
          <li>Exercise regularly</li>
          <li>Eat a balanced diet</li>
          <li>Get adequate sleep</li>
          <li>Manage stress levels</li>
        </ul>
      </div>
    </div>
  </div>
  );
}
export default App;
