import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function FIRRegister() {
  const [formData, setFormData] = useState({
    title: "",
    complainantName: "",
    complainantContact: "",
    incidentDate: "",
    incidentTime: "",
    location: "",
    description: "",
    accusedName: "",
    accusedDescription: "",
    witnessName: "",
    witnessContact: "",
    status: "Open"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { addToHistory } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      setUploadLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setFormData((prev) => ({ ...prev, description: text }));
        setUploadLoading(false);
      };
      reader.onerror = () => {
        setError("Failed to read the uploaded file.");
        setUploadLoading(false);
      };
      reader.readAsText(file);
    } else {
      setError("Auto-extraction supports .txt files. Please paste text from PDF/DOCX manually.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setFormData((prev) => ({ ...prev, description: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.complainantName || !formData.description || !formData.location || !formData.title) {
      setError("Please fill in all required fields (Title, Name, Location, Description).");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1200));

    const firId = Date.now();
    addToHistory('fir-register', { ...formData, id: firId });

    setSuccess(`FIR registered successfully! Case ID: #${firId}`);
    setLoading(false);
    setTimeout(() => navigate("/profile"), 2000);
  };

  const togglePreview = () => setPreview(!preview);

  return (
    <div className="container">
      <h2>📝 Register FIR Case</h2>
      <p>File a new First Information Report with complete details</p>

      {error && <div className="message error-message" style={{ marginBottom: "1rem" }}>{error}</div>}
      {success && <div className="message success-message" style={{ marginBottom: "1rem" }}>{success}</div>}

      {/* Document Upload */}
      <div className="drop-zone" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h4>📎 Upload Document (optional)</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: '0.5rem 0 1rem' }}>
          Upload a <strong>.txt</strong> file to auto-fill the incident description.
        </p>
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          id="fir-doc-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="fir-doc-upload" className="browse-btn" style={{ cursor: "pointer" }}>
          {uploadLoading ? "Reading..." : "Choose File"}
        </label>
        {uploadedFile && (
          <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
            <span>📄 {uploadedFile.name}</span>
            <button type="button" onClick={clearUploadedFile} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
              Remove
            </button>
          </div>
        )}
        {uploadLoading && <div className="loader" style={{ width: 24, height: 24, margin: "0.5rem auto" }} />}
      </div>

      <form onSubmit={handleSubmit} className="fir-form">
        <div className="form-group-full">
          <h3 style={{ color: "var(--primary-blue)", marginBottom: "0.5rem" }}>Case Title</h3>
          <input
            type="text"
            name="title"
            placeholder="e.g. Theft at Main Street Shop"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group-full">
          <h3 style={{ color: "var(--primary-blue)", marginBottom: "0.5rem", marginTop: "1rem" }}>Complainant Details</h3>
        </div>
        <div>
          <label>Full Name *</label>
          <input
            type="text"
            name="complainantName"
            placeholder="John Doe"
            value={formData.complainantName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact Number / Email</label>
          <input
            type="text"
            name="complainantContact"
            placeholder="+91 98765 43210"
            value={formData.complainantContact}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-full">
          <h3 style={{ color: "var(--primary-blue)", marginBottom: "0.5rem", marginTop: "1rem" }}>Incident Details</h3>
        </div>
        <div>
          <label>Incident Date *</label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Incident Time</label>
          <input
            type="time"
            name="incidentTime"
            value={formData.incidentTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-full">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            placeholder="Street, City, State"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-full">
          <label>Incident Description *</label>
          <textarea
            name="description"
            placeholder="Describe the incident in detail..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <div className="form-group-full">
          <h3 style={{ color: "var(--primary-blue)", marginBottom: "0.5rem", marginTop: "1rem" }}>Accused Details (if known)</h3>
        </div>
        <div>
          <label>Accused Name</label>
          <input
            type="text"
            name="accusedName"
            placeholder="Name or Unknown"
            value={formData.accusedName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Physical Description</label>
          <input
            type="text"
            name="accusedDescription"
            placeholder="Height, build, clothing..."
            value={formData.accusedDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-full">
          <h3 style={{ color: "var(--primary-blue)", marginBottom: "0.5rem", marginTop: "1rem" }}>Witness Information</h3>
        </div>
        <div>
          <label>Witness Name</label>
          <input
            type="text"
            name="witnessName"
            placeholder="Witness name"
            value={formData.witnessName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Witness Contact</label>
          <input
            type="text"
            name="witnessContact"
            placeholder="Contact details"
            value={formData.witnessContact}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-full" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button type="button" onClick={togglePreview} style={{ background: "white", color: "var(--primary-blue)", border: "2px solid var(--primary-blue)" }}>
            {preview ? "Hide Preview" : "Preview FIR"}
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register FIR"}
          </button>
        </div>
      </form>

      {preview && (
        <div className="fir-preview">
          <h3>📋 FIR Preview</h3>
          <p><strong>Title:</strong> {formData.title || "—"}</p>
          <p><strong>Complainant:</strong> {formData.complainantName || "—"}</p>
          <p><strong>Contact:</strong> {formData.complainantContact || "—"}</p>
          <p><strong>Date & Time:</strong> {formData.incidentDate} {formData.incidentTime}</p>
          <p><strong>Location:</strong> {formData.location || "—"}</p>
          <p><strong>Description:</strong> {formData.description || "—"}</p>
          <p><strong>Accused:</strong> {formData.accusedName || "Unknown"} {formData.accusedDescription ? `(${formData.accusedDescription})` : ""}</p>
          <p><strong>Witness:</strong> {formData.witnessName || "—"} {formData.witnessContact ? `| ${formData.witnessContact}` : ""}</p>
        </div>
      )}
    </div>
  );
}

export default FIRRegister;

