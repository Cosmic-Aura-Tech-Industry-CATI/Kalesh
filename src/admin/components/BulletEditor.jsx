import { Plus, Trash2 } from "lucide-react";

export default function BulletEditor({ value = [""], onChange }) {
  //--------------------------------------
  // UPDATE BULLET
  //--------------------------------------

  const updateBullet = (index, text) => {
    const updated = [...value];

    updated[index] = text;

    onChange(updated);
  };

  //--------------------------------------
  // ADD BULLET
  //--------------------------------------

  const addBullet = () => {
    onChange([...value, ""]);
  };

  //--------------------------------------
  // REMOVE BULLET
  //--------------------------------------

  const removeBullet = (index) => {
    if (value.length === 1) return;

    const updated = value.filter((_, i) => i !== index);

    onChange(updated);
  };

  //--------------------------------------
  // ENTER = NEW BULLET
  //--------------------------------------

  const handleKeyDown = (e, index) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const updated = [...value];

    updated.splice(index + 1, 0, "");

    onChange(updated);
  };

  //--------------------------------------
  // BACKSPACE = REMOVE EMPTY
  //--------------------------------------

  const handleBackspace = (e, index) => {
    if (e.key !== "Backspace") return;

    if (value[index] !== "") return;

    if (value.length === 1) return;

    e.preventDefault();

    removeBullet(index);
  };

  return (
    <div className="bullet-editor">
      {value.map((bullet, index) => (
        <div key={index} className="bullet-row">
          <span className="bullet-dot">•</span>

          <input
            className="cms-input"
            placeholder={`Bullet ${index + 1}`}
            value={bullet}
            onChange={(e) => updateBullet(index, e.target.value)}
            onKeyDown={(e) => {
              handleKeyDown(e, index);
              handleBackspace(e, index);
            }}
          />

          <button
            type="button"
            className="bullet-remove"
            disabled={value.length === 1}
            onClick={() => removeBullet(index)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button type="button" className="bullet-add" onClick={addBullet}>
        <Plus size={16} />
        Add Bullet
      </button>
    </div>
  );
}
