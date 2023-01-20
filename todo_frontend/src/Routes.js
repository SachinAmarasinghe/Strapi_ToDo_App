import React from 'react'
import { createBrowserRouter, redirect } from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Todopage from './components/todopage';

const routeGuard = async () => {
    const token = sessionStorage.getItem("token")
    if (!token) {
        return redirect("/login")
    } else {
        return null
    }
}

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Todopage />,
        loader: routeGuard
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <Signup />,
    }
]);

export default Routes;