import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Institute from "./pages/Institute";
import Admin from "./pages/Admin";
import Verify from "./pages/Verify";
import Admin_login from "./pages/Admin_login";
import Company_login from "./pages/company_login";
import PageNotFound from "./pages/PageNotFound";
import Email from "./pages/Email";
import Help from "./pages/Help";
import Notify from "./components/Notify";
import About from "./pages/About";

function App() {
  return (
    <div className="app ">
      <Routes>
        <Route path="/skillchain" element={<HomePage />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/admin_login" element={<Admin_login />} />
        <Route path="/company_login" element={<Company_login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/mail" element={<Email />} />
        <Route path="/help" element={<Help />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/newslater" element={<Notify />} />
      </Routes>
    </div>
  );
}

export default App;
