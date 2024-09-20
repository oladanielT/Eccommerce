import React, { useEffect } from "react";
import { logout } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        logout();
      
    }, [])
    return ( 
        <div>
            <h1>You are logged out</h1>
            <Link to={'/login'}>Login</Link>
        </div>
     );
}
 
export default Logout;