"use client";
import React, { useState, useEffect } from "react";
const FeedbackForm = ({ session }) => {
  const [formData, setFormData] = useState({
    A: "",
    B: "",
    C: session?.user.email,
    D: new Date().toLocaleDateString(),
    E: "",
  });
  const urlPath = process.env.NEXT_PUBLIC_FEEDBACK_SHEET_ROUTEHANDLER_URL;
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => {
    const submitFeedback = async () => {
      try {
        const response = await fetch(`${urlPath}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFeedbackMessage("Feedback submitted successfully");
        } else {
          const errorData = await response.json();
          setFeedbackMessage(`Error submitting feedback: ${errorData.message}`);
        }
      } catch (error) {
        setFeedbackMessage(`Error submitting feedback: ${error.message}`);
      }
    };

    if (formSubmitted) {
      submitFeedback();
    }
  }, [formSubmitted]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      E: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      {!formSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="form-group p-2 d-flex flex-column justify-between"
        >
          <label htmlFor="formFeedback">Feedback:</label>
          <textarea
            className="form-control mx-3"
            id="formFeedback"
            rows={3}
            value={formData.E}
            onChange={handleInputChange}
          />

          <button type="submit" className="btn btn-primary m-2">
            Submit Feedback
          </button>
        </form>
      )}

      {formSubmitted && (
        <div
          className={`alert ${
            feedbackMessage.includes("successfully")
              ? "alert-success"
              : "alert-danger"
          }`}
          role="alert"
        >
          {feedbackMessage}
        </div>
      )}
    </>
  );
};

export default FeedbackForm;
