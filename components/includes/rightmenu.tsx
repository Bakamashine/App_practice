import { useContext } from "react";
import user from "../../api/user";
import Clock from "../clock";
import { AuthContext } from "../../app/root";
import { backendUrl } from "../../constants/url";

export default function RightMenu() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="rightmenu menu">
      <div className="menu__wrapper">
        <Clock />
        <a href={backendUrl}>Наш сайт</a>
      </div>
      {isAuthenticated && (
        <div className="menu__wrapper mt-3">
          <p>Добро пожаловать!</p>
          <p>Ваше имя: </p>
          <p>{user.getName()}</p>
          <p>Ваша почта: </p>
          <p>{user.getEmail()}</p>
        </div>
      )}
    </div>
  );
}
