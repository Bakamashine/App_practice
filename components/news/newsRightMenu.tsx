import { useEffect, useState } from "react";
import LeftMenu from "../includes/leftmenu";
import RightMenu from "../includes/rightmenu";
import DateCustomClass from "../../helper/date";
import { Link } from "react-router-dom";

export default function NewsRightMenu() {
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    setYears(DateCustomClass.GenerateYears({ count: 20 }));
  }, []);
  return (
    <>
      <div className="menu__wrapper">
        <h1 className="text-center">Годы</h1>
        {years.map((item) => (
          <div key={item} className="years">
            <Link to={`/news/year/${item}`} className="link">
              {item}
            </Link>
          </div>
        ))}
      </div>
      <RightMenu />
    </>
  );
}
