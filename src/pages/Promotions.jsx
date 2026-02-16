import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { useCreatePromotion } from "../hooks/usePublicService";

import "../styles/pages/promotions.css";

function Promotions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: createPromotion, isPending } = useCreatePromotion();
  const [success, setSuccess] = useState("");

  const onSubmit = (data) => {
    setSuccess("");
    createPromotion(data, {
      onSuccess: () => {
        setSuccess("✅ Message sent successfully!");
        reset();
      },
      onError: () => {
        setSuccess("❌ Something went wrong. Try again.");
      },
    });
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
            <h1 className="promo-title">
              Partner with Kalesh – Promotions & Brand Collaborations
            </h1>
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

          <form
            className="promo-form gold-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* NAME */}
            <div className="gold-field">
              <label>
                <span className="icon">👤</span> NAME
              </label>
              <input
                placeholder="Enter your full name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <small>{errors.name.message}</small>}
            </div>

            {/* EMAIL */}
            <div className="gold-field">
              <label>
                <span className="icon">📧</span> E-MAIL ID
              </label>
              <input
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Valid email required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Valid email required",
                  },
                })}
              />
              {errors.email && <small>{errors.email.message}</small>}
            </div>

            {/* PHONE */}
            <div className="gold-field">
              <label>
                <span className="icon">📞</span> PHONE NO
              </label>
              <input
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "Enter 10-digit phone number",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter 10-digit phone number",
                  },
                })}
              />
              {errors.phone && <small>{errors.phone.message}</small>}
            </div>

            {/* MESSAGE */}
            <div className="gold-field">
              <label>
                <span className="icon">💬</span> MESSAGE
              </label>
              <textarea
                placeholder="Write your message"
                {...register("message", {
                  required: "Message cannot be empty",
                })}
              />
              {errors.message && <small>{errors.message.message}</small>}
            </div>

            {/* BUTTON */}
            <button className="gold-button" disabled={isPending}>
              {isPending ? "Sending..." : "SEND MESSAGE →"}
            </button>

            {success && <p className="status">{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Promotions;
