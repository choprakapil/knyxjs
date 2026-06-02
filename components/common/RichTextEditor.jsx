"use client";
import React, { useRef, useEffect, useState } from "react";

export default function RichTextEditor({ value, onChange, placeholder = "Type content here..." }) {
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isSyncing = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync value from props into the editable div on mount or if external change occurs
  useEffect(() => {
    if (!mounted || !editorRef.current) return;
    
    // Prevent updating innerHTML while user is typing to avoid cursor jumps
    if (isSyncing.current) {
      isSyncing.current = false;
      return;
    }

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value, mounted]);

  const handleInput = () => {
    if (!editorRef.current) return;
    isSyncing.current = true;
    const html = editorRef.current.innerHTML;
    onChange(html === "<br>" ? "" : html);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");

    if (html) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const cleanElement = (el) => {
        const allowedTags = new Set([
          "B", "I", "U", "STRONG", "EM", "BR", "P", "UL", "OL", "LI", 
          "H1", "H2", "H3", "H4", "H5", "H6", "FONT", "SPAN"
        ]);

        if (el.attributes) {
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) {
            if (el.tagName === "FONT" && (attr.name === "color" || attr.name === "size")) {
              continue;
            }
            if (el.tagName === "SPAN" && attr.name === "style" && el.style.color) {
              const color = el.style.color;
              el.removeAttribute("style");
              el.style.color = color;
              continue;
            }
            el.removeAttribute(attr.name);
          }
        }

        const children = Array.from(el.childNodes);
        for (const child of children) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            if (!allowedTags.has(child.tagName)) {
              const textNode = document.createTextNode(child.textContent);
              el.replaceChild(textNode, child);
            } else {
              cleanElement(child);
            }
          }
        }
      };

      cleanElement(tempDiv);
      const cleanHtml = tempDiv.innerHTML;
      document.execCommand("insertHTML", false, cleanHtml);
    } else {
      document.execCommand("insertText", false, text);
    }
    handleInput();
  };

  const execCmd = (command, value = null) => {
    if (typeof document === "undefined") return;
    document.execCommand(command, false, value);
    handleInput();
  };

  if (!mounted) {
    return (
      <div style={{ height: "180px", border: "1px solid #e2e8f0", borderRadius: "12px", background: "#f8faff" }}></div>
    );
  }

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", background: "#ffffff", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "8px", background: "#f8faff", borderBottom: "1px solid #e2e8f0", alignItems: "center" }}>
        
        {/* Bold */}
        <button type="button" onClick={() => execCmd("bold")} style={btnStyle} title="Bold">
          <i className="fa-solid fa-bold" style={{ pointerEvents: "none" }}></i>
        </button>
        
        {/* Italic */}
        <button type="button" onClick={() => execCmd("italic")} style={btnStyle} title="Italic">
          <i className="fa-solid fa-italic" style={{ pointerEvents: "none" }}></i>
        </button>
        
        {/* Underline */}
        <button type="button" onClick={() => execCmd("underline")} style={btnStyle} title="Underline">
          <i className="fa-solid fa-underline" style={{ pointerEvents: "none" }}></i>
        </button>
        
        <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 4px" }}></div>

        {/* Unordered List */}
        <button type="button" onClick={() => execCmd("insertUnorderedList")} style={btnStyle} title="Bullet List">
          <i className="fa-solid fa-list-ul" style={{ pointerEvents: "none" }}></i>
        </button>
        
        {/* Ordered List */}
        <button type="button" onClick={() => execCmd("insertOrderedList")} style={btnStyle} title="Numbered List">
          <i className="fa-solid fa-list-ol" style={{ pointerEvents: "none" }}></i>
        </button>

        <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 4px" }}></div>

        {/* Text Size */}
        <select 
          onChange={(e) => {
            execCmd("fontSize", e.target.value);
            e.target.value = ""; // Reset dropdown selection
          }} 
          style={selectStyle}
          defaultValue=""
        >
          <option value="" disabled hidden>Text Size</option>
          <option value="1">Extra Small</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">Extra Large</option>
          <option value="6">Huge</option>
        </select>

        {/* Text Color Picker */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", position: "relative" }}>
          <input 
            type="color" 
            onChange={(e) => execCmd("foreColor", e.target.value)} 
            style={{ width: "26px", height: "26px", padding: 0, border: "2px solid #cbd5e1", borderRadius: "50%", cursor: "pointer", background: "transparent" }} 
            title="Text Color" 
          />
        </div>
        
        <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 4px" }}></div>

        {/* Clear formatting */}
        <button type="button" onClick={() => execCmd("removeFormat")} style={btnStyle} title="Clear Formatting">
          <i className="fa-solid fa-eraser" style={{ pointerEvents: "none" }}></i>
        </button>
      </div>

      {/* Editable Content Frame */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        className="editor-content-area"
        style={{
          padding: "16px",
          minHeight: "180px",
          maxHeight: "350px",
          overflowY: "auto",
          outline: "none",
          color: "#1e293b",
          fontSize: "14px",
          lineHeight: "1.6",
          textAlign: "left",
        }}
        placeholder={placeholder}
      />

      <style jsx global>{`
        .editor-content-area:empty:before {
          content: attr(placeholder);
          color: #94a3b8;
          cursor: text;
        }
        .editor-content-area ul {
          list-style-type: disc;
          padding-left: 20px;
          margin: 10px 0;
        }
        .editor-content-area ol {
          list-style-type: decimal;
          padding-left: 20px;
          margin: 10px 0;
        }
        .editor-content-area font[size="1"] { font-size: 11px; }
        .editor-content-area font[size="2"] { font-size: 13px; }
        .editor-content-area font[size="3"] { font-size: 15px; }
        .editor-content-area font[size="4"] { font-size: 18px; }
        .editor-content-area font[size="5"] { font-size: 24px; }
        .editor-content-area font[size="6"] { font-size: 32px; }
      `}</style>
    </div>
  );
}

const btnStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  color: "#475569",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "12px",
  transition: "all 0.2s",
};

const selectStyle = {
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
  outline: "none",
  color: "#475569",
  background: "#ffffff",
  cursor: "pointer",
  fontWeight: 600
};
