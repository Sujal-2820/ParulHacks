import React from "react";
import { Link } from "react-router-dom";

const Tooltip = ({ children, href, text = "tooltip✨" }) => {
  return (
    <div className="flex justify-center group w-max p-3">
      <Link to={href}>{children}</Link>
      {/* <div className=" flex justify-center p-2 mt-9  transition-all  absolute scale-0  origin-left group-hover:scale-100">
        <div className="w-2 h-2 mt-[-7px] rotate-45 bg-slate-700 absolute  origin-left  "></div>
        <span className=" bg-slate-700 p-2 z-[60]  rounded-md text-lime-400">
          {text}
        </span>
      </div> */}
    </div>
  );
};

export default Tooltip;
