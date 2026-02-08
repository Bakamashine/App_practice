import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/root";
import auth from "../../api/auth";
import home from "../../assets/svg/home.svg";
import news from "../../assets/svg/news.png";
import feedback from "../../assets/svg/feedback.png";
import register from "../../assets/svg/register.png";
import login from "../../assets/svg/login.png";
import logout from "../../assets/svg/logout.png";
import MenuButton from "../menuButton";
import categories from "../../assets/svg/categories.png"

export default function LeftMenu() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  return (
    <div className="leftmenu menu">
      <div className="menu__wrapper leftmenu__wrapper">
        <MenuButton route="/" text="Главная" image={home} />
        <MenuButton route="/news" text="Новости" image={news} />
        <MenuButton route="/feedback" text="Оставить заявку" image={feedback} />
        <MenuButton route="/category" text="Категории" image={categories} />
        {!isAuthenticated ? (
          <>
            <MenuButton route="/register" image={register} text="Регистрация" />
            <MenuButton route="/login" image={login} text="Авторизация" />
          </>
        ) : (
          <MenuButton
            callback={() => {
              auth.Logout();
              setAuth(false);
            }}
            text="Выход"
            image={logout}
          />
        )}
      </div>
    </div>
  );
}
