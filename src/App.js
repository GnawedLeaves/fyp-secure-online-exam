import logo from "./logo.svg";
import "./App.css";
import StudentHomepage from "./pages/student/StudentHomePage";
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
