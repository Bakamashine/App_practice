import { Link, useNavigate } from "react-router-dom";

export default function LeftMenu() {
  const navigate = useNavigate();
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
        <div className="leftmenu__button" onClick={() => navigate("/register")}>
          <div className="leftmenu__button__link">Регистрация</div>
        </div>
        <div className="leftmenu__button" onClick={() => navigate("/login")}>
          <div className="leftmenu__button__link">Авторизация</div>
        </div>
      </div>
    </div>
  );
}
