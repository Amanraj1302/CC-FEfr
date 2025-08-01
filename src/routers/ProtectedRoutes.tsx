import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Dashboard } from "../Pages/Dashboard";
import {ProfilePage} from "../destinationPage/artistProfile";

export const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        if (!isLoggedIn) {
            console.log("User is not logged in, redirecting to signIn");
            console.log("🚀 ~ navigate:", navigate)
            navigate("/signIn");
        }
    }, []);

    return (
        <Routes>
            <Route path="dashboard/:step" element={<Dashboard />} />
            <Route path="artistProfile/:email" element={< ProfilePage/>} />
        </Routes>

    )
}