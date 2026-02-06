import React from "react";
import LeftMenu from "../../components/includes/leftmenu";
import { Outlet } from "react-router-dom";
import RightMenu from "../../components/includes/rightmenu";
import NewsRightMenu from "../../components/news/newsRightMenu";

export default function NewsLayout() {
  return (
    <React.StrictMode>
      <div className="main">
        <LeftMenu />
        <main className="main__wrapper">
          <Outlet />
        </main>
        <NewsRightMenu />
      </div>
    </React.StrictMode>
  );
}
