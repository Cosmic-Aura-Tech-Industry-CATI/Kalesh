import { useMemo, useState } from "react";
import {
  Search,
  X,
  Type,
  AlignLeft,
  FileText,
  List,
  ListTree,
} from "lucide-react";

const BLOCKS = [
  {
    id: "heading",
    title: "Heading",
    description: "Large section heading",
    icon: Type,
  },
  {
    id: "intro",
    title: "Intro Text",
    description: "Small introduction text",
    icon: AlignLeft,
  },
  {
    id: "paragraph",
    title: "Paragraph",
    description: "Long text paragraph",
    icon: FileText,
  },
  {
    id: "bullet_list",
    title: "Bullet List",
    description: "Simple bullet points",
    icon: List,
  },
  {
    id: "rich_bullet_list",
    title: "Rich Bullet List",
    description: "Title with description",
    icon: ListTree,
  },
];

export default function AddBlockMenu({ open, onClose, onSelect }) {
  const [search, setSearch] = useState("");

  //---------------------------------------
  // FILTER BLOCKS
  //---------------------------------------

  const filteredBlocks = useMemo(() => {
    return BLOCKS.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  //---------------------------------------
  // CLOSE
  //---------------------------------------

  if (!open) return null;

  //---------------------------------------

  return (
    <div className="block-menu-overlay" onClick={onClose}>
      <div className="block-menu" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}

        <div className="block-menu-header">
          <h2>Add Content Block</h2>

          <button className="block-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* SEARCH */}

        <div className="block-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search block..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* BLOCK LIST */}

        <div className="block-list">
          {filteredBlocks.length === 0 && (
            <div className="block-empty">No block found</div>
          )}

          {filteredBlocks.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className="block-item"
                onClick={() => {
                  onSelect(item.id);

                  onClose();
                }}
              >
                <div className="block-icon">
                  <Icon size={22} />
                </div>

                <div className="block-content">
                  <h4>{item.title}</h4>

                  <p>{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
