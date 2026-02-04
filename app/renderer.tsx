import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./main";
import LeftMenu from "../components/includes/leftmenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";
import RightMenu from "../components/includes/rightmenu";
import NewsPage from "./news";
import Register from "./auth/register";
import Login from "./auth/login";

export default function App() {
  return (
    <React.StrictMode>
      <div className="main">
        <LeftMenu />
        <main className="main__wrapper default-background">
          <Outlet />
        </main>
        <RightMenu />
      </div>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
