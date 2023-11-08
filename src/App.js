import logo from "./logo.svg";
import "./App.css";
import StudentHomepage from "./pages/student/StudentHomepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<StudentHomepage />} />
          <Route path="/studentHome" element={<StudentHomepage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
