import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";

import {
  useDeleteLegalPage,
  useGetLegalPages,
} from "../../../hooks/useLegalPages";

import LegalPageService from "../../../services/LegalPageService";

import EmptyState from "../../components/legalPages/EmptyState";
import LegalPageCard from "../../components/legalPages/LegalPageCard";
import DeleteDialog from "../../components/legalPages/DeleteDialog";
import MobilePreviewModal from "../../components/legalPages/MobilePreviewModal";

import "../../style/legalPages/legal-pages.css";
import "../../style/legalPages/cards.css";

export default function LegalPages() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetLegalPages();

  const pages = data?.data?.pages || [];

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState(null);

  const { mutate: deletePage, isPending } = useDeleteLegalPage();
  // console.log(pages)
  // ===============================
  // Preview handle
  // ===============================

  const handlePreview = async (page) => {
    try {
      const res = await LegalPageService.getPage(page.slug);

      console.log("Preview Data", res.data.page);

      setPreviewPage(res.data.page);

      setPreviewOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // ===============================
  // Delete Button Click
  // ===============================

  const handleDeleteClick = (page) => {
    setSelectedPage(page);
    setDeleteOpen(true);
  };

  // ===============================
  // Confirm Delete
  // ===============================

  const handleDeleteConfirm = () => {
    if (!selectedPage) return;

    deletePage(selectedPage._id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setSelectedPage(null);
      },
    });
  };

  return (
    <>
      <div className="legal-pages">
        {/* ================= HEADER ================= */}

        <div className="legal-pages-header">
          <div>
            <h1 className="legal-page-title">Legal Pages</h1>

            <p className="legal-page-subtitle">
              Manage Privacy Policy, Terms & Conditions and other legal pages.
            </p>
          </div>

          <button
            className="legal-create-btn"
            onClick={() => navigate("/admin/legal-pages/new")}
          >
            <Plus size={18} />
            <span>Create Page</span>
          </button>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="legal-pages-grid">
          {/* Loading */}

          {isLoading && (
            <div className="legal-loading">
              <Loader2 size={42} className="spin" />
              <p>Loading legal pages...</p>
            </div>
          )}

          {/* Error */}

          {!isLoading && isError && (
            <div className="legal-error">
              <h3>Unable to load pages.</h3>

              <p>Something went wrong while fetching legal pages.</p>
            </div>
          )}

          {/* Empty */}

          {!isLoading && !isError && pages.length === 0 && <EmptyState />}

          {/* Cards */}

          {!isLoading &&
            !isError &&
            pages.length > 0 &&
            pages.map((page) => (
              <LegalPageCard
                key={page._id || page.slug}
                page={page}
                onPreview={handlePreview}
                onEdit={(page) =>
                  navigate(`/admin/legal-pages/edit/${page._id}`)
                }
                onDelete={handleDeleteClick}
              />
            ))}
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}

      <DeleteDialog
        open={deleteOpen}
        page={selectedPage}
        loading={isPending}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedPage(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      {/* ================= PREVIEW MODAL ================= */}

      <MobilePreviewModal
        open={previewOpen}
        page={previewPage}
        onClose={() => {
          setPreviewOpen(false);
          setPreviewPage(null);
        }}
      />
    </>
  );
}
