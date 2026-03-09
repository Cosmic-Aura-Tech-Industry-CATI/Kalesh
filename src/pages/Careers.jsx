import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/pages/careers.css";
import SEO from "../components/SEO";
import { useForm } from "react-hook-form";
import { useCreateApplication } from "../hooks/usePublicService";
import { useGetAllJobs } from "../hooks/useJobs";
import { useNavigate } from "react-router-dom";

function Careers() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const {
    mutate: createApplication,
    isPending,
    isLoading,
  } = useCreateApplication();

  const isSubmitting = isPending || isLoading;

  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileSize, setSelectedFileSize] = useState("");

  const { data: jobsData, isLoading: isLoadingJobs } = useGetAllJobs();
  const jobOpenings = jobsData?.data || [];

  const jobCategories = [
    "All",
    ...new Set(jobOpenings.map((job) => job.category)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredJobs = jobOpenings.filter((job) => {
    const matchCategory =
      selectedCategory === "All" || job.category === selectedCategory;

    const skillsString = Array.isArray(job.skill)
      ? job.skill.join(", ")
      : job.skill || "";

    const matchSearch =
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      skillsString.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);

      const size =
        file.size < 1024 * 1024
          ? Math.round(file.size / 1024) + " KB"
          : (file.size / (1024 * 1024)).toFixed(2) + " MB";

      setSelectedFileSize(size);
    }
  };

  const handleFileRemove = () => {
    setSelectedFileName("");
    setSelectedFileSize("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("resume", null);
  };

  const onSubmit = (data) => {
    if (!data.resume || data.resume.length === 0) {
      return alert("Please upload your resume");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("resume", data.resume[0]);

    createApplication(formData, {
      onSuccess: () => {
        setShowPopup(true);
        reset();
        handleFileRemove();
      },
      onError: (err) => {
        alert(err.response?.data?.message || "Something went wrong, try again");
      },
    });
  };

  const resumeRegister = register("resume", {
    required: true,
    onChange: handleFileChange,
  });

  return (
    <>
      <Helmet>
        <title>Careers at Kalesh – Join Our Anonymous Social Media Team</title>
        <meta
          name="description"
          content="Join the Kalesh team and build the future of anonymous social media."
        />
        <link rel="canonical" href="https://thekalesh.com/careers" />
      </Helmet>

      <SEO
        title="Careers at Kalesh – Join Our Anonymous Social Media Team"
        description="Join the Kalesh team and build the future."
      />

      <div className="container-fluid careers-page px-0">
        {/* TOP HEADING */}
        <div className="container text-center py-5">
          <h1 className="careers-title">
            Build the future at the heart of change at <br /> Kalesh.
          </h1>
        </div>

        {/* RECENT OPENINGS */}
        <div className="container py-5">
          <div className="recent-jobs-wrapper">
            <div className="recent-jobs-header">
              <h2 className="recent-jobs-title">Recent Openings</h2>

              <input
                type="text"
                placeholder="Search by title or skills..."
                className="recent-jobs-search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>

            <div className="job-category-tabs">
              {jobCategories.map((category) => (
                <button
                  key={category}
                  className={`job-category-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="jobs-grid">
              {isLoadingJobs ? (
                <p>Loading jobs...</p>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job._id} className="job-card">
                    <div className="job-badge-wrapper">
                      <span className="job-badge">{job.category}</span>
                    </div>

                    <h4 className="job-title">{job.title}</h4>

                    <p>
                      <strong>Skills:</strong>{" "}
                      {Array.isArray(job.skill)
                        ? job.skill.join(", ")
                        : job.skill}
                    </p>

                    <p>
                      <strong>Experience:</strong> {job.experience}
                    </p>

                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>

                    <button
                      className="job-apply-btn"
                      onClick={() => navigate(`/careers/${job._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p>No job openings at the moment.</p>
              )}
            </div>
          </div>
        </div>

        {/* ===== REST OF YOUR ORIGINAL SECTIONS REMAIN SAME ===== */}
        {/* Purposeful Section */}
        {/* Quote Section */}
        {/* Golden Form Section */}
        {/* Social Section */}
        {/* Success Popup */}
      </div>
    </>
  );
}

export default Careers;
