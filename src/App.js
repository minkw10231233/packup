import './styles/Home.css';
import './styles/Global.css';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Consult from "./pages/Consult";
import Complete from "./pages/Complete";
import ServiceDetail from "./pages/ServiceDetail";
import Estimate from "./pages/Estimate";
import AdminConsults from "./pages/AdminConsults";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/admin" element={<AdminConsults />} />

        {/* 기존 주소로 들어와도 새 상세 페이지로 이동하게 유지 */}
        <Route path="/only-drive" element={<Navigate to="/service/only-drive" replace />} />
        <Route path="/one-help" element={<Navigate to="/service/one-help" replace />} />
        <Route path="/two-help" element={<Navigate to="/service/two-help" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
