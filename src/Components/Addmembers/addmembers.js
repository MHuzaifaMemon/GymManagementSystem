import React from 'react'

const Addmembers = () => {
  return (
    <div className='text-black>'>
        <div className='grid gap-5 grid-cols-2 text-lg'>

            <input type="text" className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' placeholder='Name of the Joinee' />
            <input type="text" className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' placeholder='Mobile No' />
            <input type="text" className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' placeholder='Ender Address ' />
            <input type="date" className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

            <select className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
                <option>1 Month Membership</option>
                <option>2 Month Membership</option>

            </select>

            <input type="file"/> 

            <div className='w-1/4'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&s" className='w-full h-full rounded-full' alt="Profile" />

            </div>

            <div className='p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Register</div>

        </div>

    </div>
  )
}

export default Addmembers