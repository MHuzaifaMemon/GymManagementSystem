import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';

const AddmemberShip = () => {
    const [inputfield, setInputField] = useState({
        month: "",  
        price: ""
    });
    const [membership, setMembership] = useState([]);

    const handleOnChange = (event, name) => {
        setInputField({             
            ...inputfield,
            [name]: event.target.value      
        });
    }

    const fetchMembership = async () => {
        await axios.get("http://127.0.0.1:4000/plans/get-membership",{withCredentials: true}).then((response) => {
            
            console.log(response);
            setMembership(response.data.membership);
            toast.success(response.data.membership.length+ " Membership Fetched");;
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchMembership()
    }, []);

    return (
        <div className='text-black'>
            <div className='flex flex-wrap gap-5 items-center justify-center'>
                {
                    membership.map((item, index) => {
                        return (
                            <div className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                                <div>{item.months} Month Membership</div>
                                <div>Rs {item.price}</div>
                            </div>
                        );
                    })
                }
                
 
            </div>

            <hr className='mt-10 mb-10'/>

            <div className='flex gap-10 mb-10'>
                <input value={inputfield.month} onChange={(event) => handleOnChange(event, "month")} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder='Add No. of Months' />

                <input value={inputfield.price} onChange={(event) => handleOnChange(event, "price")} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder='Add Price' />

                <div className='text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>Add +</div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default AddmemberShip