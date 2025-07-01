import React from 'react'
import Login from '../../Components/Login/login'
import SignUp from '../../Components/SignUp/signup'

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
        {/* header  */}
        <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl text-center shadow-md'>
            Welcome To Gym Management System 
        </div>
        
        {/* Background image */}
        <div className='w-full bg-cover flex justify-center h-[100%] bg-[url("https://static.vecteezy.com/system/resources/previews/037/170/421/non_2x/ai-generated-a-gym-with-dark-exercise-equipment-free-photo.jpg")]'>
            {/* creating login side */}
            <div className='w-full lg:flex gap-32'>
                <Login /> 
                <SignUp />
            </div>
        </div>
    </div>
  )
}

export default Home