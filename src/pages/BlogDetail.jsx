import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${slug}`).then((res) => setBlog(res.data));
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <img
        src={`http://localhost:5000/uploads/${blog.image}`}
        alt=""
        style={{ width: "100%", marginBottom: "20px" }}
      />
      {blog.content?.map((block, i) => {
        if (block.type === "subheader") {
          return <h3 key={i}>{block.value}</h3>;
        }

        if (block.type === "description") {
          return <p key={i}>{block.value}</p>;
        }

        if (block.type === "bullets") {
          return (
            <ul key={i}>
              {block.value.split(",").map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}
