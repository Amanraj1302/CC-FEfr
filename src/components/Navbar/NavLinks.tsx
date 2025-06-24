import {useAuth} from '../../context/AuthContext'
export const NavLinks = () => {
    const {isLoggedIn} = useAuth();
    return (
        <ul className="flex space-x-16 font-semibold text-gray-600 ml-24">
            <li><a className="hover:text-red-500" href="/home">Home</a></li>
            <li><a className="hover:text-red-500" href="/about">About us</a></li>
            <li><a className="hover:text-red-500" href="/contact">Contact</a></li>
            {isLoggedIn && 
            <li><a className="hover:text-red-500" href="/projects">Projects</a></li>}
        </ul>
    );
};