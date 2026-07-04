import { useEffect, useRef } from "react";

export default function ParagraphEditor({ value, onChange }) {
  const textareaRef = useRef(null);

  //--------------------------------------
  // AUTO RESIZE
  //--------------------------------------

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [value]);

  //--------------------------------------
  // CHANGE
  //--------------------------------------

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  //--------------------------------------
  // WORD COUNT
  //--------------------------------------

  const wordCount = value?.trim() ? value.trim().split(/\s+/).length : 0;

  //--------------------------------------
  // CHARACTER COUNT
  //--------------------------------------

  const characterCount = value?.length || 0;

  return (
    <div className="paragraph-editor">
      <textarea
        ref={textareaRef}
        className="cms-textarea paragraph-textarea"
        placeholder="Write paragraph..."
        value={value}
        onChange={handleChange}
      />

      <div className="paragraph-footer">
        <span>Characters : {characterCount}</span>

        <span>Words : {wordCount}</span>
      </div>
    </div>
  );
}
