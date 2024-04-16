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

import TempNavbar from "./components/Navbar/TempNavbar/TempNavbar";
import AdminHomePage from "./pages/admin/AdminHomePage";
import Navbar from "./components/Navbar/Navbar";
import AdminMessagesPage from "./pages/admin/adminMessages/AdminMessages";
import AdminPersonnelPage from "./pages/admin/adminPersonnel/AdminPersonnelPage";
import Loginpage from "./pages/common/loginPage/LoginPage";
import StudentExamReviewpage from "./pages/student/StudentExamReviewpage";
import StudentFaceRegistrationpage from "./pages/student/StudentFaceRegistrationpage";
import StudentProfilepage from "./pages/student/StudentProfilepage";
import InstructorProctorPage from "./pages/Instructor/InstructorProctor";
import InstructorExamPage from "./pages/Instructor/InstructorExamPage";
import ContactAdmin from "./pages/Instructor/ContactAdmin";
import InstructorSettings from "./pages/Instructor/InstructorSettings";
import InstructorPage from "./pages/Instructor/InstructorPage";
import InstructorLibrary from "./pages/Instructor/InstructorLibrary";
import Proctoring from "./pages/Instructor/Proctoring";
import NewPersonnelPage from "./pages/admin/adminPersonnel/NewPersonnelPage";
import Testcall from "./pages/student/testcall";
import Testcall2 from "./pages/student/testcall2";
import TestRecordingpage from "./pages/student/TestRecordingpage";
import AdminExamDetailsPage from "./pages/admin/adminExams/AdminExamDetailsPage";
import AdminExamsPage from "./pages/admin/adminExams/AdminExamsPage";
import StudentExamDemoQuestionpage from "./pages/student/StudentExamDemoQuestion";
import StudentExamDemoDetailpage from "./pages/student/StudentExamDemoDetailpage";
import AdminModulesPage from "./pages/admin/adminModules/AdminModulesPage";
import AdminPersonnelDetailsPage from "./pages/admin/adminPersonnel/AdminPersonnelDetails";
import StudentCardVerificationpage from "./pages/student/StudentCardVerificationpage";
import AdminExamDetailsPage2 from "./pages/admin/adminExams/AdminExamDetailsPage2";

export const adminRoutes = [
  {
    title: "Admin Home",
    link: "/admin/home",
    element: <AdminHomePage />,
  },
  {
    title: "Admin Settings",
    link: "/admin/modules",
    element: <AdminModulesPage />,
  },
  {
    title: "Admin Messages",
    link: "/admin/messages",
    element: <AdminMessagesPage />,
  },
  {
    title: "Admin Personnel",
    link: "/admin/personnel",
    element: <AdminPersonnelPage />,
  },
  {
    title: "Admin Exams",
    link: "/admin/exams",
    element: <AdminExamsPage />,
  },
  {
    title: "Admin Exam Details",
    link: "/admin/exams/:examid",
    element: <AdminExamDetailsPage2 />,
  },
  {
    title: "Admin Personnel Details",
    link: "/admin/personnel/:userId",
    element: <AdminPersonnelDetailsPage />,
  },
  {
    title: "Admin New Personnel",
    link: "/admin/personnel/newuser",
    element: <NewPersonnelPage />,
  },
];

export const studentRoutes = [
  {
    title: "Student Home",
    link: "/student/home",
    element: <StudentHomepage />,
  },
  {
    title: "Student System Check",
    link: "/student/home/system_check",
    element: <StudentSystemCheckPage />,
  },
  {
    title: "Student Exam",
    link: "/student/exam",
    element: <StudentExamPage />,
  },
  {
    title: "Student Bug Report",
    link: "/student/bug_report",
    element: <StudentBugReportPage />,
  },
  {
    title: "Student Exam Detail",
    link: "/student/exam/:examId",
    element: <StudentExamDetailPage />,
  },
  {
    title: "Student Exam Question",
    link: "/student/exam/:examId/:questionNo",
    element: <StudentExamQuestionPage />,
  },
  {
    title: "Student Exam Review",
    link: "/student/exam/submission/:examId",
    element: <StudentExamReviewpage />,
  },
  {
    title: "Student Face Registration",
    link: "/student/home/face_registration",
    element: <StudentFaceRegistrationpage />,
  },
  {
    title: "Student Profile",
    link: "/student/profile",
    element: <StudentProfilepage />,
  },
  {
    title: "Student Exam demo",
    link: "/student/home/:examId/:questionNo",
    element: <StudentExamDemoQuestionpage />,
  },
  {
    title: "Student Exam Demo Detail",
    link: "/student/home/:examId",
    element: <StudentExamDemoDetailpage />,
  },
  {
    title: "call test",
    link: "/student/test",
    element: <Testcall />,
  },
  {
    title: "call test student",
    link: "/student/test2",
    element: <Testcall2 />,
  },
  {
    title: "test recoring",
    link: "/student/testrecord",
    element: <TestRecordingpage />,
  },
  {
    title: "card verification",
    link: "student/exam/:examId/cardVerify",
    element: <StudentCardVerificationpage />,
  },
];

export const teacherRoutes = [
  {
    title: "Instructor Dashboard",
    link: "/Instructor/InstructorPage",
    element: <InstructorPage />,
  },
  {
    title: "Instructor Library",
    link: "/Instructor/InstructorLibrary",
    element: <InstructorLibrary />,
  },
  {
    title: "Instructor Exam Page",
    link: "/Instructor/InstructorExamPage",
    element: <InstructorExamPage />,
  },
  {
    title: "Instructor Proctor",
    link: "/Instructor/InstructorProctor",
    element: <InstructorProctorPage />,
  },
  {
    title: "Instructor Contact Admin",
    link: "/Instructor/ContactAdmin",
    element: <ContactAdmin />,
  },
  {
    title: "Instructor Proctoring",
    link: "/Instructor/Proctoring",
    element: <Proctoring />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <TempNavbar />

      <Suspense>
        <Routes>
          <Route path="/*" element={<Loginpage />} />
          {adminRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.link} element={route.element} />
            );
          })}

          {studentRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.link} element={route.element} />
            );
          })}

          {teacherRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.link} element={route.element} />
            );
          })}
          <Route
            path="/Instructor/InstructorProctor/:courseId/:examId"
            element={<Proctoring />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
