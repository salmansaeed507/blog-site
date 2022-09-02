import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./authFunc";


export function PrivateRoute(props: any){
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return props.children
};