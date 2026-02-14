import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/pages/promotions.css";

function Promotions() {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Valid email required";
    if (!form.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter 10-digit phone number";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT (BACKEND CONNECT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess("");

    try {
      // 🔗 BACKEND API (change URL)
      const res = await fetch("https://api.thekalesh.com/api/v1/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess("✅ Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setSuccess("❌ Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Promotions & Collaborations – Partner with Kalesh</title>
        <meta
          name="description"
          content="Explore partnership opportunities with Kalesh. Connect for influencer collaborations, brand partnerships, and promotional support. Let's build something amazing together."
        />
        <link rel="canonical" href="https://thekalesh.com/promotions" />
      </Helmet>

      <div className="promo-page">
        <div className="promo-row">
          <div className="promo-image-col-6 ">
            <img
              src="/promotion-image.png"
              alt="How can we help you"
              className="promo-image"
            />
          </div>

          <div className="promo-text-col-6">
            <h1 className="promo-title">Partner with Kalesh – Promotions & Brand Collaborations</h1>
            <p className="promo-para">
              Connect with Kalesh for influencer and brand collaborations,
              partnerships, or support. Reach out via our contact form or choose
              a topic below so we can best support your growth and success with
              us.
            </p>
          </div>
        </div>
      

      {/* For collaborations and promotions */}

      {/* BETWEEN TEXT */}
      <div className="promo-between-text container text-center ">
        <h2 className="promo-between-title fs-1 fw-bold ">
          For collaboration and promotion.
        </h2>
      </div>

      {/* FORM */}
      <div className="promo-form-container gold-theme  mt-5">
        <div className="promo-between-text container text-center mt-4 mb-4">
          <h2 className="promo-between-title fs-1 fw-bold">Contact Us.</h2>
        </div>

        <form className="promo-form gold-form" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="gold-field">
            <label>
              <span className="icon">👤</span> NAME
            </label>
            <input
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <small>{errors.name}</small>}
          </div>

          {/* EMAIL */}
          <div className="gold-field">
            <label>
              <span className="icon">📧</span> E-MAIL ID
            </label>
            <input
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <small>{errors.email}</small>}
          </div>

          {/* PHONE */}
          <div className="gold-field">
            <label>
              <span className="icon">📞</span> PHONE NO
            </label>
            <input
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <small>{errors.phone}</small>}
          </div>

          {/* MESSAGE */}
          <div className="gold-field">
            <label>
              <span className="icon">💬</span> MESSAGE
            </label>
            <textarea
              name="message"
              placeholder="Write your message"
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <small>{errors.message}</small>}
          </div>

          {/* BUTTON */}
          <button className="gold-button" disabled={loading}>
            {loading ? "Sending..." : "SEND MESSAGE →"}
          </button>

          {success && <p className="status">{success}</p>}
        </form>
      </div>
    </div>
    </>
  );
}

export default Promotions;
