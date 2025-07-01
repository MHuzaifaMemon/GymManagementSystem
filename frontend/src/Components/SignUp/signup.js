import React, { useState } from 'react'
import './SignUp.css'
import Modal from "../Modal/modal";
import ForgotPassword from '../ForgotPassword/forgotPassword';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { toast,ToastContainer } from 'react-toastify';

const SignUp = () => {
    const [forgotPassword, setForgotPassword] = useState(false);
    const [inputFields, setInputFields] = useState({
        gymName: '',
        email: '',
        userName: '',
        password: '',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8GkVX7HB2NMiwXELav_6K7Sen_3ddFvDzw&s'
    });
    const [loaderImage, setLoaderImage] = useState(false);

    const handleClose = () => {
         setForgotPassword(prev => !prev);
    }

    const handleOnChange = (event, name) => {
        setInputFields({
            ...inputFields,
            [name]: event.target.value
        })
    }

    const uploadImage = async (event) => {
        setLoaderImage(true);
        console.log("Inside uploadImage");
        const file = event.target.files;
        const data = new FormData();
        data.append('file', file[0]);
        // dfkik66ns
       
        data.append('upload_preset', 'gym-management');
        try{
            const response =await axios.post('https://api.cloudinary.com/v1_1/dfkik66ns/image/upload', data);
            console.log(response);
            const imageUrl = response.data.url;
            setLoaderImage(false);
            setInputFields({
                ...inputFields,
                ['profilePic']: imageUrl
            });
          }catch(err){
          console.error(err);
          setLoaderImage(false);

        }
    }


    const handleRegister = async () => {
      await axios.post('http://127.0.0.1:4000/auth/register', inputFields).then((response) => {
        const successMsg = response.data.message;
        toast.success(successMsg);
        
      }).catch(err=>{
            const errorMessage = err.response.data.error
            toast.error(errorMessage)
          })
    }

  return (
    <div className="customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto">
      <div className="font-sans text-white text-center text-3xl">Register Your Gym</div>
      <input type="text" value={inputFields.email} onChange={(event) => handleOnChange(event,"email")} className="w-full my-10 p-2 rounded-lg" placeholder="Enter Email" />
      <input type="text" value={inputFields.gymName} onChange={(event) => handleOnChange(event,"gymName")} className="w-full mb-10 p-2 rounded-lg" placeholder="Enter Gym Name" />
      <input type="text" value={inputFields.userName} onChange={(event) => handleOnChange(event,"userName")} className="w-full mb-10 p-2 rounded-lg" placeholder="Enter User Name" />
      <input type="password" value={inputFields.password} onChange={(event) => handleOnChange(event,"password")} className="w-full mb-10 p-2 rounded-lg" placeholder="Enter password" />
      
      <input type="file" onChange={(e)=>{uploadImage(e)}} className="w-full mb-10 p-2 rounded-lg" />
      
      {
        loaderImage && <Stack sx={{ width: '100%', color: 'gray.500' }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      }

      <img src={inputFields.profilePic} alt="Product preview" className="mb-10 h-[200px] w-[250px]"/>

      <div className="p-2 w-[80%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 mx-auto rounded-xl text-white text-center text-lg font-bold cursor-pointer shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300" onClick={()=>handleRegister()}>Register</div>
      <div className="p-2 w-[80%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 mx-auto rounded-xl text-white text-center text-lg font-bold cursor-pointer shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 mt-5" onClick={()=>handleClose()}>Forgot Password</div>
       {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword/>}/>}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
