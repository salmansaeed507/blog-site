import react from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "./authFunc";

export function Home() {

    return (
        <div>This is home</div>        
    );
}