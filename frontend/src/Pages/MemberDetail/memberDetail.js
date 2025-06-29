import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [membership, setMembership] = useState([]);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [planMember, setPlanMember] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

const fetchMembership = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }
    await axios.get("http://127.0.0.1:4000/plans/get-membership", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // Handle the response data
        setMembership(response.data.membership);
        setPlanMember(response.data.membership[0]._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch membership details. Please try again later.");
      });
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }
    await axios
      .get(`http://127.0.0.1:4000/members/get-member/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response data
        console.log(response);
        setData(response.data.member);
        setStatus(response.data.member.status);
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch member details. Please try again later.");
      });
  };

  const handleSwitchBtn = async() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }
    let statuss = status === "active" ? "Pending" : "active";
    await axios.post(`http://127.0.0.1:4000/members/change-status/${id}`,{status: statuss},{
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      toast.success("Status changed successfully.");
    }).catch((err) => {
      console.log(err);
      toast.error("Failed to change status. Please try again later.");
    });
    setStatus(statuss);
  };

  const isDateInPast = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < today;
  };

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setPlanMember(value);
  }


  const handleRenewSaveBtn = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }

    await axios.put(`http://127.0.0.1:4000/members/update-member-plan/${id}`, {membership: planMember}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setData(response.data.member);
      toast.success("Membership plan updated successfully.");
    }).catch((err) => {
      console.log(err);
      toast.error("Failed to update membership plan. Please try again later.");
    });
  }
  return (
    <div className="w-3/4 text-black p-5">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
      >
        <ArrowBackIcon /> Go Back
      </div>
      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3  mx-auto">
            <img
              src={data?.profilePic}
              className="w-full  mx-auto"
              alt="Profile"
            />
          </div>
          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name: {data?.name}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile: {data?.mobileNo}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address: {data?.address}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date :{" "}
              {data?.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date :{" "}
              {data?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">
              {" "}
              Status :{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "active"}
                onChange={() => {
                  handleSwitchBtn();
                }}
              />
            </div>

            {isDateInPast(data?.nextBillDate) && (
              <div
                onClick={() => {
                  setRenew((prev) => !prev);
                }}
                className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center ${
                  renew && status === "active"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    : null
                }  w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
              >
                Renew
              </div>
            )}

            {renew && status === "active" ? (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 md:w-[100%]">
                <div className="w-full">
                  <div className="my-5">
                    <div>Membership </div>
                    <select value={planMember} onChange={handleOnChangeSelect} className="w-full p-2 rounded-lg border-2">
                      {
                        membership.map((item, index) => {
                          return ( 
                            <option value={item._id}>
                              {item.months} Months Membership
                            </option> 
                          );
                        })
                      }
                    </select>
                    <div onClick={() => {handleRenewSaveBtn()}}
                      className={`mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MemberDetail;
