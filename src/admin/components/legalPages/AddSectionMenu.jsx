import { useEffect, useRef, useState } from "react";

import { Plus, AlignLeft, List, ListTree } from "lucide-react";

export default function AddSectionMenu({ onAdd }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  // ==========================
  // Close on Outside Click
  // ==========================

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ==========================

  const handleAdd = (type) => {
    onAdd?.(type);

    setOpen(false);
  };

  return (
    <div className="add-section-menu" ref={menuRef}>
      <button
        type="button"
        className="add-section-trigger"
        onClick={() => setOpen(!open)}
      >
        <Plus size={18} />

        <span>Add Section</span>
      </button>

      {open && (
        <div className="add-section-dropdown">
          <button type="button" onClick={() => handleAdd("paragraph")}>
            <AlignLeft size={20} />

            <div>
              <h4>Paragraph</h4>

              <p>Long text content.</p>
            </div>
          </button>

          <button type="button" onClick={() => handleAdd("bullet_list")}>
            <List size={20} />

            <div>
              <h4>Bullet List</h4>

              <p>Simple bullet points.</p>
            </div>
          </button>

          <button type="button" onClick={() => handleAdd("rich_bullet_list")}>
            <ListTree size={20} />

            <div>
              <h4>Rich Bullet</h4>

              <p>Title + Description.</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
