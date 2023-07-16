import React from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

const FooterNew = () => {
  return (
    <div className="relative left-0 bottom-0 py-1 mt-[35vh] text-lg bg-grad-shivam flex-row-reverse text-white w-full justify-between px-10 flex items-center">
      <div className="flex pb-2 pt-1">
        <AiFillInstagram
          size={34}
          className="cursor-pointer mx-2"
          color="white"
        />
        <AiFillTwitterCircle
          size={34}
          className="cursor-pointer mx-2"
          color="white"
        />
        <AiFillLinkedin
          size={34}
          className="cursor-pointer mx-2"
          color="white"
        />
        <AiFillGithub size={34} className="cursor-pointer mx-2" color="white" />
      </div>
      <div className="text-white flex items-center font-semibold">
        HIREXA made by Unstoppables with{" "}
        <span className="text-3xl ml-1.5">&#9829;</span>
      </div>
    </div>
  );
};

export default FooterNew;
