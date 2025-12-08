import { createRoot } from "react-dom/client";
import "./style.css";
import MonacoEditor, { MonacoEditorHandle } from "react-monaco-editor";
import { useRef, useState } from "react";

const App = () => {
  const [code, setCode] = useState<string>(``);
  const monacoEditorRef = useRef<MonacoEditorHandle>(null);
  function onChange(value: string | undefined) {
    if (!value) return;
    setCode(value);
  }
  function format() {
    const model = monacoEditorRef.current?.editor.getModel();
    model?.setValue(JSON.stringify(JSON.parse(model.getValue()), null, 2));
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        <MonacoEditor
          ref={monacoEditorRef}
          width="100%"
          height="100%"
          language="json"
          theme="vs-dark"
          value={code}
          options={{
            selectOnLineNumbers: true,
            insertSpaces: true,
            tabSize: 2,
            placeholder: "input json here",
          }}
          onChange={onChange}
        />
      </div>
      <div className="bottom-nav">
        <button className="nav-btn" onClick={format}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16M9 7V4M15 7V4M9 17v3M15 17v3"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
