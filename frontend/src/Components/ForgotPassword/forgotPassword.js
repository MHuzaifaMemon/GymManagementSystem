import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate,setOtpValidate] = useState(false);
  const [loader, setLoader] = useState(false);

  const [contentVal,setContentValue] = useState("Submit Your Email")
  const [inputValue, setInputValue] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const handleSubmit = () => {
    if (!emailSubmit) {
      
      sendOtp();
    }else if(emailSubmit && !otpValidate){
       
        verifyOtp();
    }else{
      changePassword();
    }
  }

  const changePassword = async () => {
    setLoader(true);
    await axios.post("http://127.0.0.1:4000/auth/reset-password", {email: inputValue.email, newPassword: inputValue.newPassword}).then((response) => {
      toast.success(response.data.message);
      setLoader(false);
    }).catch(err => {
      toast.error("Something went wrong, please try again later");
      console.log(err);
      setLoader(false);

    });
  }

  const verifyOtp = async () => {
    setLoader(true);
    await axios.post("http://127.0.0.1:4000/auth/reset-password/checkOtp",{email: inputValue.email, otp: inputValue.otp}).then((response) => {
      setOtpValidate(true)
      setContentValue("Submit Your New Password")
      toast.success(response.data.message);
      setLoader(false);

    }).catch(err => {
      toast.error("Something went wrong, please try again later");
      console.log(err);
      setLoader(false);

    });
  }

  

  const sendOtp = async () => {
    setLoader(true);
    await axios.post("http://127.0.0.1:4000/auth/reset-password/sendOtp", {email: inputValue.email}).then((response) => {  
      setEmailSubmit(true)
      setContentValue("Submit Your OTP")
      toast.success(response.data.message);
      setLoader(false);
    }).catch(err => {
      toast.error("Something went wrong, please try again later");
      console.log(err);
      setLoader(false);

    });
  }

  const handleOnChange = (event, name) => {     
    setInputValue({
        ...inputValue,
        [name]: event.target.value
      });
  }
  console.log(inputValue);

  return (
    <div className="w-full">
      <div className="w-full mb-5">
        <div>Enter Your Email</div>
        <input
          value={inputValue.email}
          onChange={(event) => {handleOnChange(event, "email")}}
          type="text"
          className="w-1/2 p-2 rounded-lg border-2 border-slate-400 "
          placeholder="Enter Email"
        />
      </div>

      {emailSubmit && (
        <div className="w-full mb-5">
          <div>Enter Your OTP</div>
          <input
            value={inputValue.otp}
            onChange={(event) => {handleOnChange(event, "otp")}}
            type="text"
            className="w-1/2 p-2 rounded-lg border-2 border-slate-400 "
            placeholder="Enter OTP"
          />
        </div>
      )}

      {otpValidate && (
        <div className="w-full mb-5">
          <div>Enter Your New Password</div>
          <input
            value={inputValue.newPassword}
            onChange={(event) => {handleOnChange(event, "newPassword")}}
            type="password"
            className="w-1/2 p-2 rounded-lg border-2 border-slate-400 "
            placeholder="Enter New Password"
          />
        </div>
      )}
      <div className="p-2 w-2/3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 mx-auto rounded-xl text-white text-center text-lg font-bold cursor-pointer shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 mt-5" onClick={() => handleSubmit()}> {contentVal}</div>
      {loader && <Loader/>}
      <ToastContainer /> 
</div>
  ); 
};

export default ForgotPassword;
