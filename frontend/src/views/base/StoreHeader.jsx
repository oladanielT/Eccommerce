import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";


const StoreHeader = () => {
    return ( 
        <div className="w-full shadow-md mb-[50px]">
        <div className="max-w-[1170px] mx-auto">
            <div className="flex justify-between items-center py-4 ">
                <h1>Exclisive</h1>
                <ul className="flex gap-5 items-center">
                    <li>Home</li>
                    <li>Contact</li>
                    <li>About</li>
                    <li>Sign Up</li>
                </ul>
                <div className="flex gap-5 items-center">
                    <div className="flex bg-gray-100 rounded-sm shadow-sm py-1 px-4 gap-1">
                        <input className="focus:outline-none bg-transparent" type="text" name="" id="" />
                        <IoSearchOutline size={25}/>
                    </div>
                    <ul className="flex gap-5">
                        <li><IoMdHeartEmpty size={25}/></li>
                        <li><HiOutlineShoppingCart size={25} /></li>
                        <li><LuUser size={25}/></li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default StoreHeader;