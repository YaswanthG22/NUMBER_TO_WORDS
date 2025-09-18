import React, { useState } from "react";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/convert?number=${number}`);
      const text = await response.text();
      setResult(text);
    } catch (err) {
      setResult("⚠️ Error: Backend not running");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Number to Words Converter</h2>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter number"
      />
      <button onClick={handleSubmit}>Submit</button>
      <h3>{result}</h3>
    </div>
  );
}

export default App;
