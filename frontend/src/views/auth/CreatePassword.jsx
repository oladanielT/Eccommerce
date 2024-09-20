import { useState } from 'react';
import sideImage from '../../assets/sideimage.png';
import apiInstance from '../../utils/axios';
import { useSearchParams, useNavigate } from 'react-router-dom';


const CreatePassword = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [searchParams] = useSearchParams()

    const otp = searchParams.get("otp")
    const uidb64 = searchParams.get("uidb64")
    

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== passwordConfirm){
            alert("Password does not match")
        } else {
            
            try {
                const formData = new FormData()
                formData.append('otp', otp);
                formData.append('uidb64', uidb64);
                formData.append('password', password);
                const res = await apiInstance.post('user/password-change/', formData);
                console.log(otp, uidb64);
                
                navigate("/login")
                
            } catch (error) {
                console.error(error);
                alert("Error while trying to change your password")
            }

        }
        


      
    }



    return ( 
        <div className="w-[1000px]  mx-auto my-[20px] flex justify-center items-center gap-10">
            <div>
                <img className="h-[500px]" src={sideImage} alt="" />
            </div>

            <div className="max-w[371px] p-4 flex flex-col gap-10">
                <h1 className="text-4xl font-bold my-[15px]">Create new password</h1>
                <div className="flex flex-col">
                    <input className=" border-black border-b p-2 my-5 focus:outline-none" placeholder="Enter a new password" type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="" />
                    <input className=" border-black border-b p-2 my-5 focus:outline-none" placeholder="Confirm the new password" type="password" onChange={(e) => setPasswordConfirm(e.target.value)} name="password2" id="" />
                    <button className="border p-2 bg-red-500 text-white font-bold" onClick={handleSubmit} type="submit">Reset Password</button>
                </div>
            </div>
        
        </div>
     );
}
 
export default CreatePassword;