import { useForm } from "react-hook-form";
import { useCreateBlog } from "../../hooks/useBlogs";
import "../style/blog.css";

export default function AdminBlog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      content: "",
      readTime: "",
      image: "",
      featured: false,
      color: "#ff6a00",
    },
  });

  const { mutate: createBlog, isPending: isCreating } = useCreateBlog();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("readTime", data.readTime);
    formData.append("featured", data.featured);
    formData.append("color", data.color);
    formData.append("date", new Date().toDateString());

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    createBlog(formData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="blog-form-container">
      {/* 🔥 HEADING OUTSIDE CARD */}
      <h2 className="blog-heading">Create Blog</h2>

      <div className="admin-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="blog-form-grid">
            {/* TITLE */}
            <div>
              <label className="blog-label">Title</label>
              <input
                className="blog-input"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="blog-label">Category</label>
              <input
                className="blog-input"
                {...register("category", { required: "Category is required" })}
              />
              {errors.category && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* EXCERPT */}
            <div className="full-width">
              <label className="blog-label">Excerpt</label>
              <textarea
                className="blog-textarea"
                {...register("excerpt", { required: "Excerpt is required" })}
              />
              {errors.excerpt && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.excerpt.message}
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="full-width">
              <label className="blog-label">Full Content</label>
              <textarea
                className="blog-textarea"
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.content.message}
                </span>
              )}
            </div>

            {/* READ TIME */}
            <div>
              <label className="blog-label">Read Time</label>
              <input
                className="blog-input"
                {...register("readTime", { required: "Read time is required" })}
              />
              {errors.readTime && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.readTime.message}
                </span>
              )}
            </div>

            {/* IMAGE */}
            <div>
              <label className="blog-label">Upload Image</label>
              <input
                type="file"
                className="blog-input"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.image.message}
                </span>
              )}
            </div>
          </div>

          {/* FEATURED */}
          <div className="blog-checkbox">
            <input type="checkbox" {...register("featured")} />
            <span>Featured Blog</span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="blog-submit-btn"
            disabled={isCreating}
          >
            {isCreating ? "Posting..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
