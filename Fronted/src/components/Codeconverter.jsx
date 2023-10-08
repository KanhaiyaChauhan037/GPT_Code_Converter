import React, { useState } from "react";
import "./styles.css";
import MonacoEditor from "react-monaco-editor";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js";

function Codeconverter() {
  const [code, setCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleConvert = async () => {
    setIsLoading(true); 
    try {
      const response = await fetch("http://localhost:8080/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      setConvertedCode(data.convertedCode);
    } catch (error) {
      console.error("Error converting code:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleDebug = async () => {
    setIsLoading1(true);
    try {
     const response = await fetch("http://localhost:8080/debug", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ code, language }),
     });

     const data = await response.json();
     setConvertedCode(data.convertedCode);
    } catch (error) {
      console.error("Error during debugging:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  const handleCheck = async () => {

    setIsLoading2(true);
    try {
      const response = await fetch("http://localhost:8080/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      setConvertedCode(data.convertedCode);
    } catch (error) {
      console.error("Error during quality check:", error);
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <div>
      <div className="action_button">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="typescript">Typescript</option>
        </select>
        <button onClick={handleConvert} disabled={isLoading}>
          {isLoading ? "Converting..." : "Convert"}
        </button>
        <button onClick={handleDebug} disabled={isLoading1}>
          {isLoading1 ? "Debugging..." : "Debug"}
        </button>
        <button onClick={handleCheck} disabled={isLoading2}>
          {isLoading2 ? "Checking..." : "Quality Check"}
        </button>
      </div>
      <div className="container">
        <div className="left-section">
          <MonacoEditor
            theme="vs-dark"
            language={language}
            value={code}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
              suggest: {
                basic: true,
                snippets: true,
              },
             
            }}
            onChange={(e) => setCode(e)}
          />
         
        </div>

        <div className="right-section">
          <div>
            <pre>{convertedCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Codeconverter;
