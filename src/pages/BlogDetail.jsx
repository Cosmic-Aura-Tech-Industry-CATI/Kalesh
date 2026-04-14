import { useParams } from "react-router-dom";
import { useGetBlogBySlug } from "../hooks/useBlogs";
import "../styles/pages/blogdetail.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: blogResponse, isLoading, error } = useGetBlogBySlug(slug);

  if (isLoading) return <p className="loading-text">Loading...</p>;

  if (error || !blogResponse?.data?.blog) {
    return <p className="error-text">Blog not found.</p>;
  }

  const blog = blogResponse.data.blog;

  return (
    <div className="blog-detail-container">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-author">By {blog.author} • {blog.readTime} min read</p>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
        />
      )}

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}