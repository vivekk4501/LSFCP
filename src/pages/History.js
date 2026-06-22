import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

function History() {
  const { history, clearHistory } = useAppContext();
  const [filter, setFilter] = useState("all");

  const filteredHistory = history.filter(
    (h) => filter === "all" || h.type === filter
  );

  const deleteHistoryItem = (item) => {
    // In a real app, this would delete a specific item
    // For now, we'll just clear all history as a simple implementation
    if (window.confirm('Delete this item? (Note: This will clear all history for now)')) {
      clearHistory();
    }
  };

  const exportHistory = () => {
    const csv = [
      ["Type", "Timestamp", "Details"],
      ...filteredHistory.map((item) => [
        item.type,
        item.timestamp ? new Date(item.timestamp).toLocaleString() : new Date().toLocaleString(),
        JSON.stringify(item.data).slice(0, 100) + "...",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "case_history.csv";
    a.click();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>📋 Processing History</h2>

      {/* FILTER + EXPORT */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["all", "upload", "fir", "summary", "fir-register"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                background:
                  filter === type ? "#4f46e5" : "#e5e7eb",
                color: filter === type ? "white" : "black",
              }}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={exportHistory}
          style={{
            background: "#22c55e",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          📊 Export CSV ({filteredHistory.length})
        </button>
      </div>

      {/* EMPTY */}
      {filteredHistory.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No records yet. Try adding some data.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredHistory
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={item.id || index}
                style={{
                  padding: "1.5rem",
                  borderRadius: "10px",
                  background: "#ffffff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "20px",
                      background: "#dbeafe",
                      color: "#1d4ed8",
                    }}
                  >
                    {item.type.toUpperCase()}
                  </span>

                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <small>
                      {item.timestamp ? 
                        new Date(item.timestamp).toLocaleString() : 
                        new Date().toLocaleString()
                      }
                    </small>

                    {item.id && (
                      <Link
                        to={`/case/${item.id}`}
                        style={{
                          color: "#4f46e5",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                      >
                        👁️ Details
                      </Link>
                    )}

                    <button
                      onClick={() => deleteHistoryItem(item)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  {item.type === "upload" && (
                    <p>
                      📁 <strong>Uploaded:</strong>{" "}
                      {Array.isArray(item.data) ? item.data.map((f) => f.name).join(", ") : 'Files'} (
                      {Array.isArray(item.data) ? item.data.length : 0} files)
                    </p>
                  )}

                  {item.type === "fir" && (
                    <div>
                      <p>
                        <strong>📋 FIR Classification: {item.data?.category && item.data.category !== 'Unknown Case' ? item.data.category : 'Case Analysis'}</strong> — Confidence:{" "}
                        {item.data?.confidence ? `${item.data.confidence}%` : 'Processing...'}
                      </p>
                      {item.data?.section && item.data.section !== 'IPC section not available' && (
                        <p><strong>IPC Section:</strong> {item.data.section}</p>
                      )}
                      {item.data?.severity && (
                        <p><strong>Severity:</strong> {item.data.severity}</p>
                      )}
                      {item.data?.text && (
                        <div
                          style={{
                            background: "#f3f4f6",
                            padding: "0.7rem",
                            borderRadius: "5px",
                            maxHeight: "100px",
                            overflow: "auto"
                          }}
                        >
                          {item.data.text.length > 150 ? item.data.text.substring(0, 150) + '...' : item.data.text}
                        </div>
                      )}
                      {!item.data?.category && !item.data?.text && (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>FIR classification data processing...</p>
                      )}
                    </div>
                  )}

                  {item.type === "summary" && (
                    <div>
                      <p>
                        📄 {item.data?.originalLength ? `${item.data.originalLength} chars` : 'Document'} →{" "}
                        <strong>Summary</strong>
                        {item.data?.compressionRatio && ` (${item.data.compressionRatio}% compressed)`}
                      </p>
                      {item.data?.summary && (
                        <div
                          style={{
                            background: "#eff6ff",
                            padding: "1rem",
                            borderLeft: "4px solid #3b82f6",
                            borderRadius: "4px",
                          }}
                        >
                          {item.data.summary}
                        </div>
                      )}
                    </div>
                  )}

                  {item.type === "fir-register" && (
                    <div>
                      <p>
                        📋 <strong>FIR Registered:</strong> {item.data?.title || 'Untitled'}
                      </p>
                      <p><strong>Location:</strong> {item.data?.location || 'Unknown'}</p>
                      <p><strong>Date:</strong> {item.data?.incidentDate || 'Unknown'}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default History;