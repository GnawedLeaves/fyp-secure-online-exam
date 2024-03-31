import React, { useState } from "react";
import { db,storage } from "../../backend/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    questionCategory: "General",
    description: "",
    attachment: null,
  });

  const [categories, setCategories] = useState([
    { value: "general", label: "General" },
    { value: "user", label: "User" },
    { value: "bugs", label: "Bugs" },
    { value: "accountHelp", label: "Account Help" },
  ]);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      let attachmentUrl = null;

      // Check if an attachment is provided
      if (formData.attachment) {
        // Get a reference to the storage location and the path where the file is saved
        const fileRef = ref(storage, `contact_admin/${formData.attachment.name}`);
  
        // Upload the file to Firebase Storage
        await uploadBytes(fileRef, formData.attachment);
  
        // Get the download URL of the uploaded file
        attachmentUrl = await getDownloadURL(fileRef); 
  
        console.log("File uploaded successfully!");
      }
      // Add message data to Firestore
      await addDoc(collection(db, "messages"), {
        dateAdded: serverTimestamp(),
        messageBody: formData.description,
        questionCategory: formData.questionCategory,
        recipientId: "2", 
        senderId:'Instructor',
        attachmentUrl: attachmentUrl,
      });

      // Reset form data
      setFormData({
        questionCategory: "General",
        description: "",
        attachment: null,
      });
      
      document.getElementById("attachment").value = null; //clear the attachment field
      
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

    const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({
      ...formData,
      attachment: file, // Set the attachment to the selected file
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
            </div>
            
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

              <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={handleFileChange}

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
