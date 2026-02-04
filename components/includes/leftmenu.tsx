import { Link } from "react-router-dom";

export default function LeftMenu() {
  return (
    <div className="leftmenu menu">
      <div className="leftmenu__button">
        <img src="assets/svg/home.svg" className="leftmenu__asset" />
        <Link className="" to={"/"}>
          Главная
        </Link>
      </div>
      <div className="leftmenu__button">
        <Link className="" to={"/news"}>
          Новости
        </Link>
      </div>
    </div>
  );
}
