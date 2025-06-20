import React from "react";
import CircleIcon from '@mui/icons-material/Circle'
import { Link } from "react-router-dom";


const MemberCard = ({ item }) => {
  return (
    
    <Link to={'/member/123'} className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white cursor-pointers">
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full ">
        <img
          className="w-full h-full rounded-full"
          src="https://w0.peakpx.com/wallpaper/560/825/HD-wallpaper-bodybuilder-gym-hard-healthy-life-happy-thumbnail.jpg"
          alt="Profile Pic"
        />
        <CircleIcon
          className=" absolute top-0 left-0"
          sx={{ color: "greenyellow" }}
        />
      </div>
      <div className="mx-auto mt-5 text-center text-xl font-semibold font-mono ">
        {"Muhammad Huzaifa"}
      </div>
      <div className="mx-auto mt-2 text-center text-xl font-mono">
        {"+92" + " 314 7780058"}
      </div>
      <div className="mx-auto mt-2 text-center text-xl font-mono">
        Next Bill Date: {" 31-2-2025"}
      </div>
    </Link>
  );
};

export default MemberCard;
