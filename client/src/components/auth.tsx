import { Outlet,Navigate } from "react-router-dom";
export default function Auth(){
    const tok = localStorage.getItem("token")
    return tok ? <Outlet /> :<Navigate to="/login" />
}