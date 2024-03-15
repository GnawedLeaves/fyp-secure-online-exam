import React, { useState } from "react";
import { db,storage } from "../../backend/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    questionCategory: "General",
    description: "",
  });

  const [categories, setCategories] = useState([
    { value: "general", label: "General" },
    { value: "user", label: "User" },
    { value: "bugs", label: "Bugs" },
    { value: "report", label: "Report" },
    { value: "accountHelp", label: "Account Help" },
  ]);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Add message data to Firestore
      await addDoc(collection(db, "messages"), {
        dateAdded: serverTimestamp(),
        messageBody: formData.description,
        questionCategory: formData.questionCategory,
        recipientId: "2", 
        senderId:'Instructor',
      });

      // Reset form data
      setFormData({
        questionCategory: "General",
        description: "",
      });

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "general" ? "" : value,
    });
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
             onChange={handleChange}
              style={{
                fontSize: "16px",
              }}
            >
               {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
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
