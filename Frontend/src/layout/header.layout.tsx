import { Dropdown } from "./dropdown"
import { Burger } from "../components/burger.component"
import { Link } from "react-router-dom"
type props = {
    clickHandler: () => void;
    text: string
}


export const Header = ({ text }: props) => {
    return (
        <>
            <div className="header-container">
                <div className="title">
                    <div>
                        <Burger />
                    </div>
                    <Link to='/'> <i className="fa-sharp fa-solid fa-house"></i> </Link>
                    <h3>/ {text} </h3>
                </div>
                <div className="user-name">
                    <Dropdown />
                </div>

            </div>
        </>
    )
}