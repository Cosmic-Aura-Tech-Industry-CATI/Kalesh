import { useEffect, useState } from "react";
import { Save, Plus } from "lucide-react";

import Button from "../components/Button";
import ContentBlock from "../components/ContentBlock";
import AddBlockMenu from "../components/AddBlockMenu";

import "../style/cmsManagement.css";

import {
  useGetPageByCategory,
  useCreatePage,
  useUpdatePage,
} from "../../hooks/useCMS";

const PAGE_CATEGORIES = [
  {
    label: "Privacy Policy",
    value: "privacy_policy",
  },
  {
    label: "Terms & Conditions",
    value: "terms_conditions",
  },
];

export default function CMSManagement() {
  //--------------------------------------
  // PAGE
  //--------------------------------------

  const [pageData, setPageData] = useState({
    category: "",
    title: "",
  });

  //--------------------------------------
  // BLOCKS
  //--------------------------------------

  const [blocks, setBlocks] = useState([]);

  //--------------------------------------
  // BLOCK MENU
  //--------------------------------------

  const [showBlockMenu, setShowBlockMenu] = useState(false);

  //--------------------------------------
  // API
  //--------------------------------------

  const { data: pageResponse, isLoading } = useGetPageByCategory(
    pageData.category,
  );

  const { mutate: createPage, isPending: creating } = useCreatePage();

  const { mutate: updatePage, isPending: updating } = useUpdatePage();

  //--------------------------------------
  // HANDLE PAGE INPUT
  //--------------------------------------

  const handlePageChange = (e) => {
    const { name, value } = e.target;

    setPageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //--------------------------------------
  // LOAD PAGE
  //--------------------------------------

  useEffect(() => {
    if (!pageResponse) return;

    const page = pageResponse.data || pageResponse.page || pageResponse;

    if (!page) return;

    setPageData({
      category: page.category || "",

      title: page.title || "",
    });

    if (page.blocks?.length) {
      setBlocks(
        page.blocks.map((block) => ({
          id: crypto.randomUUID(),

          type: block.type,

          content: block.content,
        })),
      );
    } else if (page.sections) {
      // Backward compatibility
      const converted = [];

      page.sections.forEach((item) => {
        if (item.heading) {
          converted.push({
            id: Date.now() + Math.random(),

            type: "heading",

            content: item.heading,
          });
        }

        if (item.introText) {
          converted.push({
            id: Date.now() + Math.random(),

            type: "intro",

            content: item.introText,
          });
        }

        if (item.type === "paragraph") {
          converted.push({
            id: Date.now() + Math.random(),

            type: "paragraph",

            content: item.content,
          });
        }

        if (item.type === "bullet_list") {
          converted.push({
            id: Date.now() + Math.random(),

            type: "bullet_list",

            content: item.content,
          });
        }

        if (item.type === "rich_bullet_list") {
          converted.push({
            id: Date.now() + Math.random(),

            type: "rich_bullet_list",

            content: item.content,
          });
        }
      });

      setBlocks(converted);
    }
  }, [pageResponse]);

  //--------------------------------------
  // ADD BLOCK
  //--------------------------------------

  const addBlock = (type) => {
    let content = "";

    switch (type) {
      case "bullet_list":
        content = [""];

        break;

      case "rich_bullet_list":
        content = [
          {
            title: "",

            description: "",
          },
        ];

        break;

      default:
        content = "";
    }

    setBlocks((prev) => [
      ...prev,

      {
        id: Date.now() + Math.random(),

        type,

        content,
      },
    ]);
  };

  //--------------------------------------
  // UPDATE BLOCK
  //--------------------------------------

  const updateBlock = (id, value) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;

        return {
          ...block,

          content: value,
        };
      }),
    );
  };

  //--------------------------------------
  // DELETE BLOCK
  //--------------------------------------

  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  //--------------------------------------
  // DUPLICATE BLOCK
  //--------------------------------------

  const duplicateBlock = (id) => {
    const block = blocks.find((item) => item.id === id);

    if (!block) return;

    const newBlock = {
      ...block,

      id: Date.now(),
    };

    setBlocks((prev) => {
      const index = prev.findIndex((item) => item.id === id);

      const arr = [...prev];

      arr.splice(index + 1, 0, newBlock);

      return arr;
    });
  };

  //--------------------------------------
  // MOVE BLOCK UP
  //--------------------------------------

  const moveBlockUp = (id) => {
    setBlocks((prev) => {
      const arr = [...prev];

      const index = arr.findIndex((item) => item.id === id);

      if (index <= 0) return prev;

      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];

      return arr;
    });
  };

  //--------------------------------------
  // MOVE BLOCK DOWN
  //--------------------------------------

  const moveBlockDown = (id) => {
    setBlocks((prev) => {
      const arr = [...prev];

      const index = arr.findIndex((item) => item.id === id);

      if (index === -1 || index === arr.length - 1) {
        return prev;
      }

      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];

      return arr;
    });
  };

  //--------------------------------------
  // SAVE PAGE
  //--------------------------------------

  const handleSave = () => {
    if (!pageData.category) {
      alert("Please select category.");

      return;
    }

    if (!pageData.title.trim()) {
      alert("Please enter title.");

      return;
    }

    const payload = {
      title: pageData.title,

      slug: pageData.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),

      category: pageData.category,

      blocks: blocks.map((block) => ({
        type: block.type,

        content: block.content,
      })),
    };

    const existingPage =
      pageResponse?.data || pageResponse?.page || pageResponse;

    if (existingPage?._id) {
      updatePage(
        {
          id: existingPage._id,
          data: payload,
        },
        {
          onSuccess: () => {
            alert("Page Updated Successfully");
          },
        },
      );
    } else {
      createPage(payload, {
        onSuccess: () => {
          alert("Page Created Successfully");
        },
      });
    }
  };

  //--------------------------------------
  // LOADING
  //--------------------------------------

  if (isLoading) {
    return (
      <div className="cms-page">
        <div className="cms-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="cms-page">
      {/* ================= HEADER ================= */}

      <div className="cms-header">
        <div>
          <h1>CMS Management</h1>

          <p>Manage Privacy Policy & Terms and Conditions pages.</p>
        </div>

        <Button onClick={handleSave} disabled={creating || updating}>
          <div className="cms-btn">
            <Save size={18} />

            {creating || updating ? "Saving..." : "Save Page"}
          </div>
        </Button>
      </div>

      {/* ================= PAGE DETAILS ================= */}

      <div className="cms-card">
        <h2>Page Details</h2>

        <div className="cms-grid">
          {/* CATEGORY */}

          <div className="cms-group">
            <label>Category</label>

            <select
              name="category"
              value={pageData.category}
              onChange={handlePageChange}
            >
              <option value="">Select Category</option>

              {PAGE_CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE */}

          <div className="cms-group">
            <label>Page Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter page title"
              value={pageData.title}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="cms-card">
        <div className="cms-section-header">
          <h2>Content Blocks</h2>

          <div className="cms-actions">
            <Button onClick={() => setShowBlockMenu(true)}>
              <div className="cms-btn">
                <Plus size={18} />
                Add Block
              </div>
            </Button>
          </div>
        </div>

        {blocks.length === 0 ? (
          <div className="cms-empty">
            No content added yet.
            <br />
            Use the buttons above to start building the page.
          </div>
        ) : (
          <div className="cms-sections">
            {blocks.map((block, index) => (
              <ContentBlock
                key={block.id}
                block={block}
                index={index}
                totalBlocks={blocks.length}
                onUpdate={updateBlock}
                onDelete={deleteBlock}
                onDuplicate={duplicateBlock}
                onMoveUp={moveBlockUp}
                onMoveDown={moveBlockDown}
              />
            ))}
          </div>
        )}
      </div>
      <AddBlockMenu
        open={showBlockMenu}
        onClose={() => setShowBlockMenu(false)}
        onSelect={addBlock}
      />
    </div>
  );
}
