import React, { useState } from "react";



const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    questionCategory: "userGroup",
    description: "",
    attachment: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (

    <div className="section">
      <h2>Send your feedback/Report any matters.</h2>
      <br></br>
      <div className="col span_1_of_1">
        <div className="notifyadminform">
          <form id="submissionForm" onSubmit={handleSubmit}>
            <div className="notifyadminLabel">
              <label htmlFor="questionCategory"
              style={{
                fontSize: "18px", 
                fontFamily: ", sans-serif",
                fontWeight: "bold", 
              }}
              >Question Category:</label>
            </div>
            <select
              id="questionCategory"
              name="questionCategory"
              value={formData.questionCategory}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  questionCategory: e.target.value,
                })
              }
              style={{
                fontSize: "16px", // Adjust the font size as needed
                // Add any other styling properties as needed
              }}
            >
              <option value="general">General</option>
              <option value="user">User</option>
              <option value="bugs">Bugs</option>
              <option value="report">Report</option>
              <option value="accountHelp">Account Help</option>
            </select>
            <br />
            <br />
            <div className="descriptionLabel">
              <label htmlFor="description"
              style={{
                fontSize: "18px", 
                fontFamily: "Your Desired Font, sans-serif",
                fontWeight: "bold", 
              }}
              >
            Description:</label>
            </div>
            <textarea
              id="description"
              name="description"
              rows="10"
              cols="80"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required

              style={{
                fontSize: "18px", 
                fontFamily: " sans-serif",
              }}
            ></textarea>
            <br />
            <br />
            <div className="attachementForm">
              <label htmlFor="attachment"
            style={{
                fontSize: "18px", 
                fontFamily: "Your Desired Font, sans-serif", 
                fontWeight: "bold", 
              }}
              >Attachment:</label>
            </div>
            <div className="attachmentbutton">
              <input
                type="file"
                id="attachment"
                name="attachment"
                value={formData.attachment}
                onChange={(e) =>
                  setFormData({ ...formData, attachment: e.target.value })
                }

                style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}

              />
            </div>
            <br />
            <div className="adminSubmit">
              <input type="submit" value="Submit" 
              
              style={{
                background: "#4caf50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "18px",
              }}
              
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
