import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddmemberShip = ({handleClose}) => {
  const [inputfield, setInputField] = useState({
    months: "",
    price: "",
  });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({
      ...inputfield,
      [name]: event.target.value,
    });
  };

//   const fetchMembership = async () => {
//     await axios
//       .get("http://127.0.0.1:4000/plans/get-membership", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log(response);
//         setMembership(response.data.membership);
//         toast.success(response.data.membership.length + " Membership Fetched");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Error fetching memberships");
//       });
//   };

const fetchMembership = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No authentication token found. Please log in.");
        // Optionally redirect to login page here
        return;
      }

      await axios
        .get("http://127.0.0.1:4000/plans/get-membership", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        })
        .then((response) => {
          console.log(response);
          setMembership(response.data.membership);
          toast.success(response.data.membership.length + " Membership Fetched");
        })
        .catch((err) => {
          console.log(err);
          // Check if the error is 401 and provide a more specific message
          if (err.response && err.response.status === 401) {
            toast.error("Unauthorized. Please log in again.");
          } else {
            toast.error("Error fetching memberships");
          }
        });
    } catch (error) {
      console.error("Error in fetchMembership:", error);
      toast.error("An unexpected error occurred while fetching memberships.");
    }
  };



  useEffect(() => {
    fetchMembership();
  }, []);


//   const handleAddMembership = async () => {
//     await axios.post('http://127.0.0.1:4000/plans/add-membership', inputfield, {withCredentials: true}).then((response => {
//       console.log(response);
      
//     })).catch((err) => {
//       console.log(err);
//       toast.error("Error Adding Membership");
//     });
//   }
 
const handleAddMembership = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No authentication token found. Please log in.");
        // Optionally redirect to login page here
        return;
      }

      await axios
        .post(
          "http://127.0.0.1:4000/plans/add-membership",
          inputfield,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message); // Assuming your backend sends a message like 'Membership added successfully'
          handleClose(); // Close the modal after adding membership
        //   setInputField({ month: "", price: "" }); // Clear fields after successful add
        //   fetchMembership(); // Re-fetch memberships to show the new one
        })
        .catch((err) => { 
          console.log(err);
          // Check if the error is 401 and provide a more specific message
          if (err.response && err.response.status === 401) {
            toast.error("Unauthorized. Please log in again.");
          } else {
            toast.error("Error Adding Membership");
          }
        });
    } catch (error) {
      console.error("Error in handleAddMembership:", error);
      toast.error("An unexpected error occurred while adding membership.");
    }
  };


  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        
        {
            membership.map((item, index) => {
              return (
                <div className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  <div>{item.months} Month Membership</div>
                  <div>Rs {item.price}</div>
                </div>
              );
            })
        }

      </div>

      <hr className="mt-10 mb-10" />

      <div className="flex gap-10 mb-10">
        <input
          value={inputfield.month}
          onChange={(event) => handleOnChange(event, "months")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add No. of Months"
        />

        <input
          value={inputfield.price}
          onChange={(event) => handleOnChange(event, "price")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add Price"
        />

        <div onClick={()=> {handleAddMembership()}} className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
          Add +
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddmemberShip;
