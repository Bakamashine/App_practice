import { useNavigate } from "react-router-dom"

interface MenuButtonProps {
    image?: string,
    route?: string,
    text: string,
    callback?: () => void
}
export default function MenuButton({image, route="/", text, callback}: MenuButtonProps) {
    const navigate = useNavigate();
    return (
        <div className="leftmenu__button" onClick={ callback ? callback : () => navigate(route)}>
          {image && <img src={image} className="leftmenu__asset" /> }
          <div className="leftmenu__button__link">{text}</div>
        </div>
    )
}