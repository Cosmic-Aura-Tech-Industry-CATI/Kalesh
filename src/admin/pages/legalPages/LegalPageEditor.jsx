import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditorToolbar from "../../components/legalPages/EditorToolbar";
import LegalEditor from "../../components/legalPages/LegalEditor";
import MobilePreviewModal from "../../components/legalPages/MobilePreviewModal";

import {
  useCreateLegalPage,
  useUpdateLegalPage,
  useGetLegalPage,
} from "../../../hooks/useLegalPages";

import toast from "react-hot-toast";

import "../../style/legalPages/legal-editor.css";

export default function LegalPageEditor() {
  const navigate = useNavigate();

  const { slug } = useParams();

  const isEdit = Boolean(slug);

  // =====================================
  // Create Mutation
  // =====================================

  //const { mutate: createPage, isPending } = useCreateLegalPage();

  const { mutate: createPage, isPending: creating } = useCreateLegalPage();

  const { mutate: updatePage, isPending: updating } = useUpdateLegalPage();

  //const { data: pageData } = useGetLegalPage(id, {
  //enabled: isEdit,
  //});

  const { data: pageData } = useGetLegalPage(slug);

  const isPending = creating || updating;

  // ===============================
  // Page State
  // ===============================

  const [title, setTitle] = useState("");

  const [pageId, setPageId] = useState("");

  const [category, setCategory] = useState("");

  const [sections, setSections] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);

  // Dirty state (Future auto detection)
  const [dirty, setDirty] = useState(false);

  // Save state (Future API)
  //const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log("pageData:", pageData);

    if (!pageData?.data?.page) return;

    const page = pageData.data.page;

    console.log("Loaded page:", page);

    setPageId(page._id);
    setTitle(page.title);
    setCategory(page.category);
    setSections(page.sections || []);

    console.log("Sections:", page.sections);

    setDirty(false);
  }, [pageData]);

  // =====================================
  // Title
  // =====================================

  const handleTitleChange = (value) => {
    setTitle(value);
    setDirty(true);
  };

  // =====================================
  // Category
  // =====================================

  const handleCategoryChange = (value) => {
    setCategory(value);
    setDirty(true);
  };

  // =====================================
  // Sections
  // =====================================

  const handleSectionsChange = (newSections) => {
    setSections(newSections);
    setDirty(true);
  };

  // =====================================
  // Validation
  // =====================================

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Page title is required.");
      return false;
    }

    if (!category) {
      toast.error("Please select a category.");
      return false;
    }

    if (sections.length === 0) {
      toast.error("Add at least one section.");
      return false;
    }

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      // Heading

      if (!section.heading?.trim()) {
        toast.error(`Section ${i + 1}: Heading is required.`);
        return false;
      }

      // Paragraph

      if (section.type === "paragraph") {
        if (!section.content?.trim()) {
          toast.error(`Section ${i + 1}: Paragraph content is required.`);
          return false;
        }
      }

      // Bullet List

      if (section.type === "bullet_list") {
        if (!Array.isArray(section.content) || section.content.length === 0) {
          toast.error(`Section ${i + 1}: Add at least one bullet.`);
          return false;
        }

        const hasEmptyBullet = section.content.some((item) => !item.trim());

        if (hasEmptyBullet) {
          toast.error(`Section ${i + 1}: Empty bullets are not allowed.`);
          return false;
        }
      }

      // Rich Bullet List

      if (section.type === "rich_bullet_list") {
        if (!Array.isArray(section.content) || section.content.length === 0) {
          toast.error(`Section ${i + 1}: Add at least one item.`);
          return false;
        }

        const invalidItem = section.content.some(
          (item) => !item.title?.trim() || !item.description?.trim(),
        );

        if (invalidItem) {
          toast.error(`Section ${i + 1}: Title and Description are required.`);
          return false;
        }
      }
    }

    return true;
  };
  // ===============================
  // Handlers
  // ===============================

  const handleBack = () => {
    navigate(-1);
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  // =====================================
  // Build Payload
  // =====================================

  const buildPayload = () => {
    return {
      title: title.trim(),

      category,

      sections: sections.map((section) => ({
        heading: section.heading?.trim() || "",

        introText: section.introText?.trim() || "",

        type: section.type,

        content: section.content,
      })),

      isSystemPage: false,

      isProtected: false,
    };
  };

  const handleSave = () => {
    // ===============================
    // Validation
    // ===============================

    if (!validateForm()) {
      return;
    }

    // ===============================
    // Build Payload
    // ===============================

    const payload = buildPayload();

    // ===============================
    // Save
    // ===============================

    if (isEdit) {
      updatePage(
        {
          id: pageId,
          payload,
        },
        {
          onSuccess: () => {
            setDirty(false);

            navigate("/admin/legal-pages", {
              replace: true,
            });
          },

          onError: (error) => {
            console.error(error);
          },
        },
      );
    } else {
      createPage(payload, {
        onSuccess: () => {
          setDirty(false);

          navigate("/admin/legal-pages", {
            replace: true,
          });
        },

        onError: (error) => {
          console.error("Create Page Error:", error);
        },
      });
    }
  };

  // =====================================
  // Form Valid State
  // =====================================

  const isValid = title.trim() !== "" && category !== "" && sections.length > 0;

  console.log({
    title,
    category,
    sections,
  });

  return (
    <>
      <div className="legal-editor-page">
        <EditorToolbar
          onBack={handleBack}
          onPreview={handlePreview}
          onSave={handleSave}
          saving={isPending}
          dirty={dirty}
          canSave={isValid}
        />

        <LegalEditor
          title={title}
          category={category}
          sections={sections}
          setTitle={handleTitleChange}
          setCategory={handleCategoryChange}
          setSections={handleSectionsChange}
          onSave={handleSave}
          onPreview={handlePreview}
          saving={isPending}
          canSave={isValid}
        />
      </div>

      <MobilePreviewModal
        open={previewOpen}
        page={{
          title,
          category,
          sections,
          lastUpdated: new Date(),
        }}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
