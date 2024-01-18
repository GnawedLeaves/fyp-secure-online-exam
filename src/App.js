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
import TempNavbar from "./components/Navbar/TempNavbar/TempNavbar";
import AdminHomePage from "./pages/admin/AdminHomePage";
import Navbar from "./components/Navbar/Navbar";
import AdminSettingsPage from "./pages/admin/adminSettings/AdminSettingsPage";
import AdminMessagesPage from "./pages/admin/adminMessages/AdminMessages";

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
];

export const studentRoutes = [
  {
    title: "Student Home",
    link: "/student/dashboard",
    element: <StudentHomepage />,
  },
  {
    title: "Student System Check",
    link: "/student/systemcheck",
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
    link: "/student/exam/exam_detail",
    element: <StudentExamDetailPage />,
  },
  {
    title: "Student Exam Question",
    link: "/student/exam/question",
    element: <StudentExamQuestionPage />,
  },
];

export const teacherRoutes = [{}];

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
