import { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/root";
import auth from "../../api/auth";
import home from "../../assets/svg/home.svg"
import news from "../../assets/svg/news.png"
import feedback from "../../assets/svg/feedback.png"
import register from "../../assets/svg/register.png"
import login from "../../assets/svg/login.png"
import logout from "../../assets/svg/logout.png"


export default function LeftMenu() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  return (
    <div className="leftmenu menu">
      <div className="menu__wrapper leftmenu__wrapper">
        <div className="leftmenu__button" onClick={() => navigate("/")}>
          <img src={home} className="leftmenu__asset" />
          <div className="leftmenu__button__link">Главная</div>
        </div>

        <div className="leftmenu__button" onClick={() => navigate("/news")}>
          <img src={news} className="leftmenu__asset" />
          <div className="leftmenu__button__link">Новости</div>
        </div>
        <div className="leftmenu__button" onClick={() => navigate("/feedback")}>
          <img src={feedback} className="leftmenu__asset" />
          <div className="leftmenu__button__link">Оставить заявку</div>
        </div>
        {!isAuthenticated ? (
          <>
            <div
              className="leftmenu__button"
              onClick={() => navigate("/register")}
            >
              <img src={register} className="leftmenu__asset" />
              <div className="leftmenu__button__link">Регистрация</div>
            </div>
            <div
              className="leftmenu__button"
              onClick={() => navigate("/login")}
            >
              <img src={login} className="leftmenu__asset" />
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
            <img src={logout} className="leftmenu__asset" />
            <div className="leftmenu__button__link">Выход</div>
          </div>
        )}
      </div>
    </div>
  );
}
