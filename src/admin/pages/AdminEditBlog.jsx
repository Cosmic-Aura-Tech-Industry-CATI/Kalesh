import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogBySlug, useUpdateBlog } from "../../hooks/useBlogs";
import { useEffect, useState } from "react";
import "../style/adminEditBlog.css";

export default function AdminEditBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBlogBySlug(slug);
  const { mutate: updateBlog } = useUpdateBlog();

  const blog = data?.data?.blog;

  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [readTime, setReadTime] = useState("");
  const [featured, setFeatured] = useState(false);

  // 🔥 HTML → BLOCKS CONVERT
  const parseHTML = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const parsed = [];

    temp.childNodes.forEach((node) => {
      if (node.tagName === "H2") {
        parsed.push({ id: Date.now(), type: "heading", value: node.innerText });
      }
      if (node.tagName === "H3") {
        parsed.push({
          id: Date.now(),
          type: "subheading",
          value: node.innerText,
        });
      }
      if (node.tagName === "P") {
        parsed.push({
          id: Date.now(),
          type: "paragraph",
          value: node.innerText,
        });
      }
      if (node.tagName === "UL") {
        const items = Array.from(node.querySelectorAll("li")).map(
          (li) => li.innerText,
        );
        parsed.push({
          id: Date.now(),
          type: "bullets",
          value: items.join(", "),
        });
      }
    });

    return parsed;
  };

  // 🔥 LOAD DATA
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBlocks(parseHTML(blog.content || ""));
      setReadTime(blog.readTime || "");
      setFeatured(blog.featured || false);
    }
  }, [blog]);

  // UPDATE BLOCK
  const updateBlock = (id, value) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, value } : b)));
  };

  // DELETE BLOCK
  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // HTML GENERATE
  const generateHTML = () => {
    let html = "";

    blocks.forEach((block) => {
      if (block.type === "heading") html += `<h2>${block.value}</h2>`;
      if (block.type === "subheading") html += `<h3>${block.value}</h3>`;
      if (block.type === "paragraph") html += `<p>${block.value}</p>`;
      if (block.type === "bullets") {
        html += "<ul>";
        block.value.split(",").forEach((item) => {
          html += `<li>${item.trim()}</li>`;
        });
        html += "</ul>";
      }
    });

    return html;
  };

  const handleUpdate = () => {
    updateBlog(
      {
        slug,
        payload: {
          title,
          content: generateHTML(),
          readTime,
          featured,
        },
      },
      {
        onSuccess: () => {
          alert("Updated ✅");
          navigate("/admin/blogs");
        },
      },
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (!blog) return <p>Not found</p>;

  return (
    <div className="admin-page-wrapper">
      <h2 className="admin-page-title">Edit Blog</h2>

      <div className="edit-blog-card">
        {/* TITLE */}
        <label>Blog Title</label>
        <input
          className="admin-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* BLOCKS */}
        {blocks.map((block) => (
          <div key={block.id} className="edit-block">
            <label>
              {block.type === "heading" && "Heading"}
              {block.type === "subheading" && "Sub Heading"}
              {block.type === "paragraph" && "Paragraph"}
              {block.type === "bullets" && "Bullet Points"}
            </label>

            {block.type === "paragraph" || block.type === "bullets" ? (
              <textarea
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            ) : (
              <input
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            <button
              className="edit-delete-btn"
              onClick={() => deleteBlock(block.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {/* READ TIME */}
        <label>Read Time</label>
        <input value={readTime} onChange={(e) => setReadTime(e.target.value)} />

        {/* FEATURED */}
        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>

        <button className="edit-blog-btn" onClick={handleUpdate}>
          Update Blog
        </button>
      </div>
    </div>
  );
}
