import React, { useState } from 'react'
import './SignUp.css'
import Modal from "../Modal/modal";
import ForgotPassword from '../ForgotPassword/forgotPassword';

const SignUp = () => {
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleClose = () => {
         setForgotPassword(prev => !prev);
    }
    

  return (
    <div className="customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto">
      <div className="font-sans text-white text-center text-3xl">Register Your Gym</div>
      <input type="text" className="w-full my-10 p-2 rounded-lg" placeholder="Enter Email" />
      <input type="text" className="w-full mb-10 p-2 rounded-lg" placeholder="Enter Gym Name" />
      <input type="text" className="w-full mb-10 p-2 rounded-lg" placeholder="Enter User Name" />
      <input type="password" className="w-full mb-10 p-2 rounded-lg" placeholder="Enter password" />
      <input type="file" className="w-full mb-10 p-2 rounded-lg" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8GkVX7HB2NMiwXELav_6K7Sen_3ddFvDzw&s" alt="Product preview" className="mb-10 h-[200px] w-[250px]"/>

      <div className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer">Register</div>
      <div className="p-2 w-[80%] border-2 mt-5 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer" onClick={()=>handleClose()}>Forgot Password</div>
       {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword/>}/>}
    </div>
  );
};

export default SignUp;
