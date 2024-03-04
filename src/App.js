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
import AdminSettingsPage from "./pages/admin/adminSettings/AdminSettingsPage";
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
import NewPersonnelPage from "./pages/admin/adminPersonnel/NewPersonnelPage";
import Testcall from "./pages/student/testcall";
import Testcall2 from "./pages/student/testcall2";
import TestRecordingpage from "./pages/student/TestRecordingpage";
import AdminExamsPage from "./pages/admin/adminExams/AdminExamsPage";
import AdminExamDetailsPage from "./pages/admin/adminExams/AdminExamDetailsPage";

export const adminRoutes = [
  {
    title: "Admin Home",
    link: "/admin/home",
    element: <AdminHomePage />,
  },
  {
    title: "Admin Settings",
    link: "/admin/settings",
    element: <AdminSettingsPage />,
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
    link: "/admin/exam/:examid",
    element: <AdminExamDetailsPage />,
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
];

export const teacherRoutes = [
  {
    title: "Teacher Dashboard",
    link: "/Instructor/InstructorPage",
    element: <InstructorPage />,
  },
  {
    title: "Teacher Library",
    link: "/Instructor/InstructorLibrary",
    element: <InstructorLibrary />,
  },
  {
    title: "Teacher Exam Page",
    link: "/Instructor/InstructorExamPage",
    element: <InstructorExamPage />,
  },
  {
    title: "Teacher Proctor",
    link: "/Instructor/InstructorProctor",
    element: <InstructorProctorPage />,
  },
  {
    title: "Teacher Contact Admin",
    link: "/Instructor/ContactAdmin",
    element: <ContactAdmin />,
  },
  {
    title: "Teacher Setting",
    link: "/Instructor/InstructorSettings",
    element: <InstructorSettings />,
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
