import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${slug}`)
      .then(res => setBlog(res.data));
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt="" />
      <p>{blog.content}</p>
    </div>
  );
}