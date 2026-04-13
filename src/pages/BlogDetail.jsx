import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/blog.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${slug}`).then((res) => {
      
      console.log("BLOG DATA 👉", res.data); // 👈 ADD HERE
      console.log("CONTENT 👉", res.data.content); // 👈 ADD HERE

      setBlog(res.data);
    });
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail-container">
      <h1 className="blog-title">{blog.title}</h1>

      <p className="blog-author">By {blog.author}</p>

      <img
        src={`http://localhost:5000/uploads/${blog.image}`}
        alt=""
        className="blog-image"
      />

      {/* 🔥 THIS LINE FIXES EVERYTHING */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
