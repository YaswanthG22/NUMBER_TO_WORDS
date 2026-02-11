import React, { useState } from "react";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [formatted, setFormatted] = useState(""); // formatted number with commas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("modern");

  const handleSubmit = async () => {
    if (!number.trim()) {
      setError("Please enter a number");
      setResult("");
      setFormatted("");
      return;
    }
    if (number.length > 9) {
    setError("Maximum 12 digits allowed");
    setResult("");
    setFormatted("");
    return;
    }

    const numValue = parseInt(number);
    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      setResult("");
      setFormatted("");
      return;
    }

    if (numValue < 0) {
      setError("Please enter a positive number");
      setResult("");
      setFormatted("");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setFormatted("");

    try {
      const response = await fetch(`http://localhost:8082/convert?number=${numValue}`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      const text = await response.text();
      setResult(text);

      // Format number in Indian commas
      const formattedNumber = new Intl.NumberFormat("en-IN").format(numValue);
      setFormatted(formattedNumber);
    } catch (err) {
      setError("❌ Backend server is not running or there's a connection issue");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value.length <= 9)) {
    setNumber(value);
    setError("");
    }
  };

  const clearAll = () => {
    setNumber("");
    setResult("");
    setFormatted("");
    setError("");
  };

  // ---------- Theme Configurations ----------
  const themes = {
    modern: {
      container: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      },
      card: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        width: "90%",
      },
      title: {
        color: "#2c3e50",
        fontSize: "32px",
        fontWeight: "700",
        marginBottom: "10px",
        textAlign: "center",
      },
      input: {
        padding: "15px 20px",
        fontSize: "18px",
        border: "2px solid #e1e8ed",
        borderRadius: "12px",
        width: "100%",
        marginBottom: "20px",
        outline: "none",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
      },
      button: {
        padding: "15px 30px",
        fontSize: "16px",
        backgroundColor: "#667eea",
        color: "white",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        marginRight: "10px",
        transition: "all 0.3s ease",
        fontWeight: "600",
      },
    },
    dark: {
      container: {
        background: "#1a1a1a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#e0e0e0",
      },
      card: {
        background: "#2d2d2d",
        border: "1px solid #404040",
        borderRadius: "10px",
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        maxWidth: "500px",
        width: "90%",
      },
      title: {
        color: "#00ff88",
        fontSize: "28px",
        fontWeight: "400",
        marginBottom: "20px",
        textAlign: "center",
      },
      input: {
        padding: "12px 16px",
        fontSize: "16px",
        backgroundColor: "#1a1a1a",
        border: "1px solid #404040",
        borderRadius: "8px",
        width: "100%",
        marginBottom: "20px",
        outline: "none",
        color: "#e0e0e0",
        boxSizing: "border-box",
      },
      button: {
        padding: "12px 24px",
        fontSize: "14px",
        backgroundColor: "#00ff88",
        color: "#000",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginRight: "10px",
      },
    },
    minimal: {
      container: {
        background: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      },
      card: {
        background: "white",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        padding: "32px",
        maxWidth: "400px",
        width: "90%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      },
      title: {
        color: "#111111",
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "24px",
        textAlign: "center",
      },
      input: {
        padding: "12px 16px",
        fontSize: "16px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        width: "100%",
        marginBottom: "16px",
        outline: "none",
        boxSizing: "border-box",
      },
      button: {
        padding: "12px 24px",
        fontSize: "16px",
        backgroundColor: "#111111",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginRight: "8px",
      },
    },
    neon: {
      container: {
        background: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Orbitron', monospace",
      },
      card: {
        background: "rgba(0, 0, 0, 0.8)",
        border: "2px solid #00ffff",
        borderRadius: "15px",
        padding: "40px",
        maxWidth: "500px",
        width: "90%",
        boxShadow: "0 0 30px #00ffff, inset 0 0 30px rgba(0, 255, 255, 0.1)",
      },
      title: {
        color: "#00ffff",
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "20px",
        textAlign: "center",
        textShadow: "0 0 20px #00ffff",
      },
      input: {
        padding: "15px 20px",
        fontSize: "16px",
        backgroundColor: "transparent",
        border: "2px solid #ff00ff",
        borderRadius: "10px",
        width: "100%",
        marginBottom: "20px",
        outline: "none",
        color: "#ffffff",
        boxSizing: "border-box",
        boxShadow: "0 0 15px rgba(255, 0, 255, 0.3)",
      },
      button: {
        padding: "15px 30px",
        fontSize: "16px",
        backgroundColor: "transparent",
        color: "#00ffff",
        border: "2px solid #00ffff",
        borderRadius: "10px",
        cursor: "pointer",
        marginRight: "10px",
        boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
      },
    },
  };

  const currentTheme = themes[theme];

  return (
    <div style={currentTheme.container}>
      <div style={currentTheme.card}>
        {/* Theme Selector */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="modern">Modern Gradient</option>
            <option value="dark">Dark Mode</option>
            <option value="minimal">Minimal Clean</option>
            <option value="neon">Neon Cyberpunk</option>
          </select>
        </div>

        <h1 style={currentTheme.title}>🔢 Number to Words</h1>

        {/* Input */}
        <input
          type="text"
          value={number}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a number"
          style={currentTheme.input}
        />

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={handleSubmit} disabled={loading} style={currentTheme.button}>
            {loading ? "Converting..." : "Convert"}
          </button>
          <button onClick={clearAll} style={currentTheme.button}>
            Clear
          </button>
        </div>

        {/* Formatted number just below input */}
        {formatted && (
          <p style={{ marginTop: "15px", fontSize: "18px", fontWeight: "600", textAlign: "center" }}>
            ₹ {formatted}
          </p>
        )}

        {/* Error */}
        {error && (
          <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>{error}</p>
        )}

        {/* Result */}
        {result && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h3>In Words:</h3>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
