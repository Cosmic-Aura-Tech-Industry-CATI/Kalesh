import { useEffect, useState } from "react";
import { Save, Plus } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../components/Button";
import SectionCard from "../components/SectionCard";

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
    value: "terms_and_conditions",
  },
];

export default function CMSManagement() {
  //--------------------------------------
  // PAGE DATA
  //--------------------------------------

  const [pageData, setPageData] = useState({
    category: "",
    title: "",
  });

  //--------------------------------------
  // SECTIONS
  //--------------------------------------

  const [sections, setSections] = useState([]);

  //--------------------------------------
  // API HOOKS
  //--------------------------------------

  const {
    data: pageResponse,
    isLoading,
    refetch,
  } = useGetPageByCategory(pageData.category);

  const { mutate: createPage, isPending: creating } = useCreatePage();

  const { mutate: updatePage, isPending: updating } = useUpdatePage();

  //--------------------------------------
  // PAGE INPUT
  //--------------------------------------

  const handlePageChange = (e) => {
    const { name, value } = e.target;

    setPageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //--------------------------------------
  // SECTION TEMPLATE
  //--------------------------------------

  const createEmptySection = () => ({
    id: Date.now() + Math.random(),

    heading: "",

    introText: "",

    type: "paragraph",

    content: "",
  });

  //--------------------------------------
  // LOAD PAGE
  //--------------------------------------

  useEffect(() => {
    if (!pageResponse) return;

    const page = pageResponse.data || pageResponse.page || pageResponse;

    if (!page) {
      setSections([]);
      return;
    }

    setPageData({
      category: page.category || "",
      title: page.title || "",
    });

    setSections(
      (page.sections || []).map((section) => ({
        id: Date.now() + Math.random(),
        heading: section.heading || "",
        introText: section.introText || "",
        type: section.type || "paragraph",
        content:
          section.content ??
          (section.type === "bullet_list"
            ? [""]
            : section.type === "rich_bullet_list"
              ? [
                  {
                    title: "",
                    description: "",
                  },
                ]
              : ""),
      })),
    );
  }, [pageResponse]);

  //--------------------------------------
  // SAVE PAGE
  //--------------------------------------

  const handleSave = () => {
    if (!pageData.category) {
      toast.error("Please select page category.");
      return;
    }

    if (!pageData.title.trim()) {
      toast.error("Please enter page title.");
      return;
    }

    if (sections.length === 0) {
      toast.error("Please add at least one section.");
      return;
    }

    const payload = {
      title: pageData.title.trim(),

      category: pageData.category,

      sections: sections.map((section) => ({
        heading: section.heading.trim(),

        introText: section.introText.trim(),

        type: section.type,

        content: section.content,
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
            toast.success("Page updated successfully.");
            refetch();
          },
          onError: (error) => {
            toast.error(
              error?.response?.data?.message || "Unable to update page.",
            );
          },
        },
      );

      return;
    }

    createPage(payload, {
      onSuccess: () => {
        toast.success("Page created successfully.");
        refetch();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Unable to create page.");
      },
    });
  };

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
  // CONVERT BLOCKS TO SECTIONS
  //--------------------------------------

  const convertBlocksToSections = () => {
    const sections = [];

    let currentSection = null;

    blocks.forEach((block) => {
      if (block.type === "heading") {
        if (currentSection) {
          sections.push(currentSection);
        }

        currentSection = {
          heading: block.content,
          introText: "",
          type: "paragraph",
          content: "",
        };

        return;
      }

      if (!currentSection) {
        currentSection = {
          heading: "",
          introText: "",
          type: "paragraph",
          content: "",
        };
      }

      if (block.type === "intro") {
        currentSection.introText = block.content;
      }

      if (block.type === "paragraph") {
        currentSection.type = "paragraph";
        currentSection.content = block.content;
      }

      if (block.type === "bullet_list") {
        currentSection.type = "bullet_list";
        currentSection.content = block.content;
      }

      if (block.type === "rich_bullet_list") {
        currentSection.type = "rich_bullet_list";
        currentSection.content = block.content;
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  };

  //--------------------------------------
  // ADD SECTION
  //--------------------------------------

  const addSection = () => {
    setSections((prev) => [...prev, createEmptySection()]);
  };

  //--------------------------------------
  // DELETE SECTION
  //--------------------------------------

  const deleteSection = (id) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  //--------------------------------------
  // DUPLICATE SECTION
  //--------------------------------------

  const duplicateSection = (id) => {
    setSections((prev) => {
      const index = prev.findIndex((item) => item.id === id);

      if (index === -1) return prev;

      const duplicate = {
        ...prev[index],

        id: Date.now() + Math.random(),

        heading: `${prev[index].heading}`,

        introText: `${prev[index].introText}`,

        content: Array.isArray(prev[index].content)
          ? JSON.parse(JSON.stringify(prev[index].content))
          : prev[index].content,
      };

      const updated = [...prev];

      updated.splice(index + 1, 0, duplicate);

      return updated;
    });
  };

  //--------------------------------------
  // MOVE SECTION UP
  //--------------------------------------

  const moveSectionUp = (id) => {
    setSections((prev) => {
      const updated = [...prev];

      const index = updated.findIndex((item) => item.id === id);

      if (index <= 0) return prev;

      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });
  };

  //--------------------------------------
  // MOVE SECTION DOWN
  //--------------------------------------

  const moveSectionDown = (id) => {
    setSections((prev) => {
      const updated = [...prev];

      const index = updated.findIndex((item) => item.id === id);

      if (index === -1 || index === updated.length - 1) {
        return prev;
      }

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      return updated;
    });
  };

  //--------------------------------------
  // UPDATE SECTION
  //--------------------------------------

  const updateSection = (id, field, value) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== id) return section;

        return {
          ...section,

          [field]: value,
        };
      }),
    );
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
      {/* ========================= HEADER ========================= */}

      <div className="cms-header">
        <div>
          <h1>CMS Management</h1>

          <p>Manage Privacy Policy & Terms & Conditions Pages</p>
        </div>

        <Button onClick={handleSave} disabled={creating || updating}>
          <div className="cms-btn">
            <Save size={18} />

            {creating || updating ? "Saving..." : "Save Page"}
          </div>
        </Button>
      </div>

      {/* ========================= PAGE DETAILS ========================= */}

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
              placeholder="Enter Page Title"
              value={pageData.title}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* ========================= SECTIONS ========================= */}

      <div className="cms-card">
        <div className="cms-section-header">
          <h2>Sections</h2>

          <Button onClick={addSection}>
            <div className="cms-btn">
              <Plus size={18} />
              Add Section
            </div>
          </Button>
        </div>

        {sections.length === 0 ? (
          <div className="cms-empty">
            <h3>No Sections Added</h3>

            <p>Click "Add Section" to create your first content section.</p>
          </div>
        ) : (
          <div className="cms-sections">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                totalSections={sections.length}
                onUpdate={updateSection}
                onDelete={deleteSection}
                onDuplicate={duplicateSection}
                onMoveUp={moveSectionUp}
                onMoveDown={moveSectionDown}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
