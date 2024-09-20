import { useState } from "react";
import sideImage from '../../assets/sideimage.png';
import apiInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleReset = () => {
        setEmail("")
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiInstance.get(`/user/password-reset/${email}/`).then((res) => {
            alert("An email has been sent to you.")
            
        });
        handleReset();
        } catch (error) {
            alert("Email does not exist.")
            
        }
      
    }
    return ( 

        <div className="w-[1000px]  mx-auto my-[20px] flex justify-center items-center gap-10">
            <div>
                <img className="h-[500px]" src={sideImage} alt="" />
            </div>

            <div className="max-w[371px] p-4 flex flex-col gap-10">
                <h1 className="text-4xl font-bold my-[15px]">Reset your password</h1>
                <div className="flex flex-col">
                    <input className=" border-black border-b p-2 my-5 focus:outline-none" placeholder="Enter your email" type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />
                    <button className="border p-2 bg-red-500 text-white font-bold" type="submit" onClick={handleSubmit}>Reset Password</button>
                </div>
            </div>
        
        </div>
     );
}
 
export default ForgotPassword;