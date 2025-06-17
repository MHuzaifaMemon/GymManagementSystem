import React from 'react'
// import Login from '../../Components/Login/login'
// import SignUp from '../../Components/Signup/signUp'

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
        {/* header  */}
        <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl'>
            Welcome To Gym Management System 
        </div>
        {/* Background image */}
        <div className='w-full bg-cover flex justify-center h-[100%] bg-[url("https://img.freepik.com/free-photo/view-gym-room-training-sports_23-2151699540.jpg?semt=ais_hybrid&w=740")]'>
            {/* creating login side */}
            <div className='w-full lg:flex gap-32'>

                <div className='w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-fit'>
                    <div className='font-sans text-white text-center text-3xl'>Login</div>
                    <input type='text' className='w-full my-10 p-2 rounded-lg' placeholder='Enter User Name'/>
                    <input type='password' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter password'/>
                    <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer'>Login</div>
                </div>

                <div className='w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto'>
                    <div className='font-sans text-white text-center text-3xl'>Register Your Gym</div>
                    <input type='text' className='w-full my-10 p-2 rounded-lg' placeholder='Enter Email'/>
                    <input type='text' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Gym Name'/>
                    <input type='text' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter User Name'/>
                    <input type='password' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter password'/>
                    <input type='file' className='w-full mb-10 p-2 rounded-lg' />
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8GkVX7HB2NMiwXELav_6K7Sen_3ddFvDzw&s' alt='Product preview' className='mb-10 h-[200px] w-[250px]'/>

                    <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer'>Register</div>
                    <div className='p-2 w-[80%] border-2 mt-5 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer'>Forgot Password</div>

                </div>



            </div>

            
        </div>
    </div>
  )
}

export default Home