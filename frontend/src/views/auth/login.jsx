import React from "react";
import { userAuthStore } from "../../store/auths";
import { useState, useEffect } from "react";
import { login } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import siteImage from '../../assets/sideimage.png'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const isLoggedIn = userAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()){
            navigate('/login');
        };
    }, []);
    
    const resetForm = () => {
        setEmail("");
        setPassword("");
    }

    const handleForm = (event) => {
       
        event.preventDefault();
        setIsLoading(true);
        const { error } = login(email, password);

        if (error){
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
    };

    return ( 
        <div className="w-[1000px]  mx-auto my-[20px] flex justify-center items-center gap-5">
            <div>
                <img className="h-[500px]" src={siteImage} alt="" />
            </div>

            <div className="max-w[371px] p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-4xl my-2 font-bold">Login in to Exclusive</h2>
                    <p className="font-bold text-sm">Enter your details below</p>   
                </div>

                <div>
                    <form className="flex flex-col gap-2" onSubmit={handleForm}>
                        <input className="border-b p-2 text-lg text-gray-500 focus:outline-none border-gray-400 my-2 py-2" placeholder="Enter your email" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="border-b p-2 text-lg text-gray-500 focus:outline-none border-gray-400 my-2 py-2" placeholder="Enter your password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="bg-red-600 text-white font-bold rounded-lg py-2 my-2" type="submit" disabled={isLoading}>{isLoading? "Loading...": "Login"}</button>
                        <Link className="text-center text-xl hover:text-blue-500 hover:underline" to={'/password-reset'}>Forgot password?</Link>
                    </form>
                </div>
            </div>
          
        </div>
     );
}
 
export default Login;