import { createRoot } from "react-dom/client";
import "./style.css";
import MonacoEditor, { loader, OnMount } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import { Braces } from "lucide-react";
loader.config({ monaco });
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    return new editorWorker();
  },
};
const App = () => {
  const [code, setCode] = useState<string>(``);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTooltipPosition = () => {
      if (!buttonRef.current) return;

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();

      if (rect.left < 100) {
        button.style.setProperty("--tooltip-left", "0px");
        button.style.setProperty("--tooltip-transform", "none");
      } else if (rect.right > window.innerWidth - 100) {
        button.style.setProperty("--tooltip-left", "auto");
        button.style.setProperty("--tooltip-right", "10px");
        button.style.setProperty("--tooltip-transform", "none");
      } else {
        button.style.setProperty("--tooltip-left", "50%");
        button.style.setProperty("--tooltip-right", "auto");
        button.style.setProperty("--tooltip-transform", "translateX(-50%)");
      }
    };

    window.addEventListener("resize", updateTooltipPosition);
    updateTooltipPosition();

    return () => window.removeEventListener("resize", updateTooltipPosition);
  }, []);
  function onChange(value: string | undefined) {
    if (!value) return;
    setCode(value);
  }
  function format() {
    monacoEditorRef.current?.getAction("editor.action.formatDocument")?.run();
  }
  const handleEditorDidMount: OnMount = (editor) => {
    monacoEditorRef.current =
      editor as unknown as monaco.editor.IStandaloneCodeEditor;
  };
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
          width="100%"
          height="100%"
          defaultLanguage="json"
          theme="vs-dark"
          defaultValue={code}
          options={{
            selectOnLineNumbers: true,
            insertSpaces: true,
            tabSize: 2,
            placeholder: "input json here",
            fontSize: 16,
          }}
          onChange={onChange}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="bottom-nav">
        <button
          ref={buttonRef}
          className="nav-btn"
          onClick={format}
          data-tooltip="格式化JSON"
        >
          <Braces size={20} />
        </button>
      </div>
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
