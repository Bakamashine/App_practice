import { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/root";
import auth from "../../api/auth";

export default function LeftMenu() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  return (
    <div className="leftmenu menu">
      <div className="menu__wrapper leftmenu__wrapper">
        <div className="leftmenu__button" onClick={() => navigate("/")}>
          <img src="assets/svg/home.svg" className="leftmenu__asset" />
          <div className="leftmenu__button__link">Главная</div>
        </div>

        <div className="leftmenu__button" onClick={() => navigate("/news")}>
          <img src="assets/svg/news.png" className="leftmenu__asset" />
          <div className="leftmenu__button__link">Новости</div>
        </div>
        <div className="leftmenu__button" onClick={() => navigate("/feedback")}>
          <img src="assets/svg/feedback.png" className="leftmenu__asset" />
          <div className="leftmenu__button__link">Оставить заявку</div>
        </div>
        {!isAuthenticated ? (
          <>
            <div
              className="leftmenu__button"
              onClick={() => navigate("/register")}
            >
              <img src="assets/svg/register.png" className="leftmenu__asset" />
              <div className="leftmenu__button__link">Регистрация</div>
            </div>
            <div
              className="leftmenu__button"
              onClick={() => navigate("/login")}
            >
              <img src="assets/svg/login.png" className="leftmenu__asset" />
              <div className="leftmenu__button__link">Авторизация</div>
            </div>
          </>
        ) : (
          <div
            className="leftmenu__button"
            onClick={() => {
              auth.Logout();
              setAuth(false);
            }}
          >
            <img src="assets/svg/logout.png" className="leftmenu__asset" />
            <div className="leftmenu__button__link">Выход</div>
          </div>
        )}
      </div>
    </div>
  );
}
