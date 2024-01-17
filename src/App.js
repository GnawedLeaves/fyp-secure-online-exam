import logo from "./logo.svg";
import "./App.css";
import StudentNavbar from "./components/Navbar/StudentNavbar";
import StudentHomepage from "./pages/student/StudentHomepage";
import StudentSystemCheckPage from "./pages/student/StudentSystemCheckpage";
import StudentExamPage from "./pages/student/StudentExampage";
import StudentBugReportPage from "./pages/student/StudentBugReportpage";
import StudentExamDetailPage from "./pages/student/StudentExamDetailpage";
import StudentExamQuestionPage from "./pages/student/StudentExamQuestionpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loginpage from "./pages/common/LoginPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import Navbar from "./components/Navbar/Navbar";
import AdminExamDetailsPage from "./pages/admin/AdminExamDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/student/dashboard" element={<StudentHomepage />} />
          <Route
            path="/student/systemcheck"
            element={<StudentSystemCheckPage />}
          />
          <Route path="/student/exam" element={<StudentExamPage />} />
          <Route
            path="/student/bug_report"
            element={<StudentBugReportPage />}
          />
          <Route
            path="/student/exam/exam_detail"
            element={<StudentExamDetailPage />}
          />
          <Route
            path="/student/exam/question"
            element={<StudentExamQuestionPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
