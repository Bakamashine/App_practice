import React from "react";
import LeftMenu from "../../components/includes/leftmenu";
import { Outlet } from "react-router-dom";
import RightMenu from "../../components/includes/rightmenu";

export default function AuthLayout() {
  return (
    <React.StrictMode>
      <div className="main main-auth">
        <LeftMenu />
        <main className="d-grid main__wrapper-auth">
          <div className="form-component default-background">
            <Outlet />
          </div>
        </main>
        <RightMenu />
      </div>
    </React.StrictMode>
  );
}
