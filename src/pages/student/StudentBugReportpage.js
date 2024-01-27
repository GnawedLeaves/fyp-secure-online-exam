import React, { useState } from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  FeedbackForm,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import CustomAttachment from "../../components/CustomAttachment/CustomAttachment";
import FormSubmitButton from "../../components/Button/FormSubmitButton";

const StudentBugReportpage = () => {
  const options = ["General", "User", "Bugs", "Report","Help"];
  const [formData, setFormData] = useState({
    questionCategory: "General",
    description: "",
    attachment: "",
  });
  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      questionCategory: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };
  const handleAttachmentChange = (e) => {
    setFormData({ ...formData, attachment: e.target.value });
  };
  
  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle style={{ textAlign: 'center' }}>Feedback / Bug Report</PageTitle>
            <FeedbackForm onSubmit={handleSubmit}>
              <CustomSelect
                label="Question Category"
                options={options}
                value={formData.questionCategory}
                onChange={handleSelectChange}
              />
              <CustomTextArea
                label="Description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleDescriptionChange}
                required
              />
              <CustomAttachment
                label="Attachment"
                id="attachment"
                name="attachment"
                value={formData.attachment}
                onChange={handleAttachmentChange}
              />
              <FormSubmitButton
                onSubmit={handleSubmit}
                defaultColor={theme.statusGood}
                filledColor={theme.statusGood}
                filled={false}
              >
                Submit
              </FormSubmitButton>
            </FeedbackForm>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
      </ThemeProvider>
  );
};

export default StudentBugReportpage;


