import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const getMonthlyJoined = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No authentication token found. Please log in.");
    return;
  }
  try {
    const response = await axios.get(
      "http://127.0.0.1:4000/members/monthly-member",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data; // Assuming the API returns an array of members
  } catch (error) {
    console.error("Error fetching monthly joined members:", error);
    throw error;
  }
};

const threeDayExpire = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No authentication token found. Please log in.");
    return;
  }
  try {
    const response = await axios.get(
      "http://127.0.0.1:4000/members/within-3-days-expiring",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching three day expiring members:", error);
    throw error;
  }
};

const fourToSevenDaysExpire = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No authentication token found. Please log in.");
    return;
  }
  try {
    const response = await axios.get(
      "http://127.0.0.1:4000/members/within-4-7-days-expiring",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching four to seven days expiring members:", error);
    throw error;
  }
};

const expired = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        toast.error("No authentication token found. Please log in.");
        return;
    }
    try {
        const response = await axios.get(
        "http://127.0.0.1:4000/members/expired-member",
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expired members:", error);
    throw error;
  }
};

const inActiveMembers = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        toast.error("No authentication token found. Please log in.");
        return;
    }
    try {
        const response = await axios.get(
        "http://127.0.0.1:4000/members/inactive-member",
        {   
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching inactive members:", error);
    throw error;
  }
};



const toastContainer = () => {
  return <ToastContainer />;
};

export { getMonthlyJoined, threeDayExpire, fourToSevenDaysExpire, expired, inActiveMembers, toastContainer };
