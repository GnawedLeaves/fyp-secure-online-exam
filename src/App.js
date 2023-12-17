import logo from "./logo.svg";
import "./App.css";
import StudentHomepage from "./pages/student/StudentHomepage";
import StudentSystemCheckPage from "./pages/student/StudentSystemCheckpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loginpage from "./pages/common/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/student" element={<StudentHomepage />} />
          <Route path="/student/systemcheck" element={<StudentSystemCheckPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
