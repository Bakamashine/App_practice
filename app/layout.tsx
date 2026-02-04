import React from "react";
import LeftMenu from "../components/includes/leftmenu";
import { Outlet } from "react-router-dom";
import RightMenu from "../components/includes/rightmenu";

export default function Layout() {
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