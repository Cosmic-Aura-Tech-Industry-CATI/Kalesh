import { Plus, Trash2 } from "lucide-react";

export default function RichBulletEditor({
  value = [
    {
      title: "",
      description: "",
    },
  ],
  onChange,
}) {
  //--------------------------------------
  // UPDATE
  //--------------------------------------

  const updateItem = (index, field, text) => {
    const updated = [...value];

    updated[index] = {
      ...updated[index],
      [field]: text,
    };

    onChange(updated);
  };

  //--------------------------------------
  // ADD
  //--------------------------------------

  const addItem = () => {
    onChange([
      ...value,
      {
        title: "",
        description: "",
      },
    ]);
  };

  //--------------------------------------
  // REMOVE
  //--------------------------------------

  const removeItem = (index) => {
    if (value.length === 1) return;

    const updated = value.filter((_, i) => i !== index);

    onChange(updated);
  };

  return (
    <div className="rich-editor">
      {value.map((item, index) => (
        <div key={index} className="rich-card">
          {/* HEADER */}

          <div className="rich-header">
            <h4>Rich Bullet {index + 1}</h4>

            <button
              type="button"
              className="rich-remove"
              disabled={value.length === 1}
              onClick={() => removeItem(index)}
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* TITLE */}

          <div className="cms-group">
            <label>Title</label>

            <input
              className="cms-input"
              placeholder="Enter title"
              value={item.title}
              onChange={(e) => updateItem(index, "title", e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}

          <div className="cms-group">
            <label>Description</label>

            <textarea
              rows={5}
              className="cms-textarea"
              placeholder="Enter description..."
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
            />
          </div>
        </div>
      ))}

      {/* ADD */}

      <button type="button" className="rich-add" onClick={addItem}>
        <Plus size={16} />
        Add Rich Bullet
      </button>
    </div>
  );
}
