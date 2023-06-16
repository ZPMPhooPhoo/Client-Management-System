import { Link } from "react-router-dom";
const name = localStorage.getItem('name');


export const Dropdown = () => {
    const handleLougout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("project_id");
        window.location.reload();
        window.location.href = '/';

    }
    return (
        <>

            <label className="dropdown">

                <div className="dd-button">
                    {name} &nbsp;
                </div>
                <input type="checkbox" className="dd-input" id="test" />

                <ul className="dd-menu">
                    <li><Link to="/user-profile">My account</Link></li>
                    <li onClick={handleLougout}><a>Logout</a></li>
                </ul>

            </label>

        </>
    )
}

