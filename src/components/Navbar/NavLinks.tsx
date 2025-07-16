import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

 export const NavLinks = () => {
    const { isLoggedIn } = useAuth();

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `hover:text-red-500 ${isActive ? "text-red-500" : "text-gray-600"}`;

    return (
        <ul className="flex space-x-16 font-semibold ml-24">
            <li>
                <NavLink to="/home" className={linkClasses}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className={linkClasses}>
                    About us
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={linkClasses}>
                    Contact
                </NavLink>
            </li>
            {isLoggedIn && (
                <li>
                    <NavLink to="/projectPage" className={linkClasses}>
                        Projects
                    </NavLink>
                </li>
            )}
        </ul>
    );
};

 


