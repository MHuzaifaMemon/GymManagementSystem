import React from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MemberCard from '../../Components/MemberCard/memberCard';
// import Modal from '../../Components/Modal/modal';
// import AddmemberShip from '../../Components/Addmembership/addmemberShip';
// import Addmembers from '../../Components/Addmembers/addmembers';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
const Member = () => {
    
    return (
        <div className='text-black p-5 w-3/4 h-[100vh]'>

            {/* block for banner */}
            <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>

                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' >Add Member <FitnessCenterIcon /> </div>
                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>Membership <AddIcon /> </div>

            </div>

            {/* block for back to dashboard button */}
            <Link to={'/dashboard'}><ArrowBackIcon /> Back to Dashboard </Link>

            <div className='mt-5 w-1/2 flex gap-2'>
                <input type='text' className='border-2 w-full p-2 rounded-lg' placeholder='Search By Name or Mobile No' />
                <div className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'><SearchIcon /></div>
            </div>

            <div className='mt-5 text-xl flex justify-between text-slate-900'>
                <div>Total Members</div>
                    <div className='flex gap-5'>
                        <div> 1-9 of 52 of Members</div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}><ChevronLeftIcon /></div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}><ChevronRightIcon /></div>
                    </div> 
                
            </div>
            <div className='bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]'>
                {/* div for Member card */}
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />





 
            </div>

        </div>
    )
}

export default Member