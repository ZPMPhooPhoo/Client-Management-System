import { Link, useLocation } from 'react-router-dom';
import logo from '../img/sidebar/logo.png';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const sidebar_routes = [
    {
        path: "/",
        backend_path: "dashboard",
        name: "Dashboard",
        icon: <i className="fa-sharp fa-solid fa-house"></i>
    },
    {
        path: "/client-lists",
        backend_path: "client-lists",
        name: "Client List",
        icon: <i className="fa-solid fa-handshake-simple"></i>,
    },
    {
        path: "/projects",
        backend_path: "projects",
        name: "Projects",
        icon: <i className="fa-solid fa-sheet-plastic"></i>
    },
    {
        path: "/services",
        backend_path: "services",
        name: "Services",
        icon: <i className="fa-solid fa-sliders"></i>
    },
    {
        path: "/users",
        backend_path: "users",
        name: "User List",
        icon: <i className="fa-sharp fa-solid fa-user"></i>
    },
    {
        path: "/roles",
        backend_path: "roles",
        name: "Role List",
        icon: <i className="fa-sharp fa-solid fa-user"></i>
    },
]

export const Sidebar = () => {
    const [role, setRoles] = useState<string[]>([]);
    const role_id = localStorage.getItem("role_id");
    const token = localStorage.getItem("token");
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/roles/${role_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setRoles(response.data.data.rolePermissions);
            } catch (error: any) {

            }
        }
        fetchData();
    }, []);
    const avialable_routes: any[] = useMemo(() => sidebar_routes.filter(route => role.includes(route.backend_path)), [role]);
    return (
        <>
            <div className="sidebar-container">
                <h1> <img src={logo} alt="ACE PLUS LOGO" className='sidebar-logo' /></h1>
                <ul>
                    {
                        avialable_routes.map(route => (
                            <li key={route.path}>
                                <Link
                                    to={route.path}
                                    className={location.pathname === route.path ? "active" : ""}
                                >
                                    {route.icon} {route.name}
                                </Link>

                            </li>
                        ))
                    }
                </ul>
                <div className='system-name'>
                    <h2>CLIENT MANAGEMENT SYSTEM</h2>
                </div>
            </div>
        </>
    )
}
