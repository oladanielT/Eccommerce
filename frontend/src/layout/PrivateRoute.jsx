import { userAuthStore } from "../store/auths";
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const loggedIn = userAuthStore((state) => { state.isLoggedIn});
    return ( 
        <>{loggedIn? children : <Navigate to='/login'/>}</>
     );
}
 
export default PrivateRoute;
