import React, { useEffect, useState } from "react";
import { register } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import sideImage from '../../assets/sideimage.png';
import { userAuthStore } from "../../store/auths";

const SignUp = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = userAuthStore((state) => state.isLoggedIn)

    useEffect(() => {
        // if (isLoggedIn){
        //     navigate('/')
        // }

    }, []);

    const refreshForm = () => {
        setEmail("");
        setFullname("");
        setPhone("");
        setPassword("");
        setPassword2("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const {error} = register(fullname, email, phone, password, password2);
        if (error){
            alert(JSON.stringify(error))
        } else {
            navigate('/');
            refreshForm();
        }
    }
    return ( 
        <div className="w-[1000px]  mx-auto my-[20px] flex justify-center items-center gap-5">
            <div>
                <img className="h-[500px]" src={sideImage} alt="" />
            </div>

            <div className="max-w[371px] p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-4xl my-2 font-bold">Create an account</h2>
                    <p className="font-bold text-sm">Enter your details below</p>   
                </div>

                <div>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input className="border-b p-2 text-lg text-gray-500 focus:outline-none border-gray-400 my-2 py-2" placeholder="Enter your full name" type="text" name="fullname" id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        <input className="border-b p-2 text-lg text-gray-500 focus:outline-none border-gray-400 my-2 py-2" placeholder="Enter your email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="border-b p-2 text-lg text-gray-500 focus:outline-none border-gray-400 my-2 py-2" placeholder="Enter your phone" type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input className="border-b p-2 text-lg text-gray-500 focus:outline-none border-gray-400 my-2 py-2" placeholder="Enter your password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input className="border-b p-2 text-lg text-gray-500 focus:outline-none border-gray-400 my-2 py-2" placeholder="Enter your password again" type="password" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        <button className="bg-red-600 text-white font-bold rounded-md py-3 my-2" type="submit" disabled={isLoading}>{isLoading? "Loading...": "Create Account"}</button>
                    </form>
                </div>
            </div>
          
        </div>
     );
}
 
export default SignUp;