import { Outlet } from "react-router-dom";
import AuthNavbar from "./AuthNavbar";

export default function LoginLayout() {
    return (
        <div>
            <AuthNavbar/>
            <Outlet />
        </div>
    )
}

