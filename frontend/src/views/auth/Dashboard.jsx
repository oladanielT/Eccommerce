import React, { useEffect, useState } from "react";
import { userAuthStore } from "../../store/auths";
// import { logout } from "../../utils/auth";

import { Link } from "react-router-dom";

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = userAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])
 
    
    return ( 
        <div>
            {
            isLoggedIn()?
            <div>
                <h1>Dashboard</h1>
                <Link to={'/logout'}>Logout</Link>
            </div>
            :
            <div>
                <h1>Homepage</h1>
                <Link to={'/register'}>Register</Link>
                <Link to={'/login'}>Login</Link>
            </div>
            }
        </div>
     );
}
 
export default Dashboard;