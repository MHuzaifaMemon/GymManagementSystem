import React from "react";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  const handleLogin =()=>{
          sessionStorage.setItem("isLogin",true)
          navigate('/dashboard')

        // .       
            // .
            // Please Watch the youtube video for full code 
            // .
            // .
            // .
    }


  return (
    <div className="w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-fit">
      <div className="font-sans text-white text-center text-3xl">Login</div>
      <input
        type="text"
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter User Name"
      />
      <input
        type="password"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter password"
      />
      <div className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer" onClick={()=>{handleLogin()}}>
        Login
      </div>
    </div>
  );
};

export default Login;
