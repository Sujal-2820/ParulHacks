import React from "react";

const Admin = () => {
  return (
    <div className="">
      <h1 className="text-center text-3xl font-bold my-3 text-[#404040]">
        React Js Developer
      </h1>
      <div className="grid grid-cols-3 w-[80vw] m-auto">
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </div>
    </div>
  );
};

const Component = () => {
  return (
    <div className="border border-[#404040] mx-2 my-1.5 py-2 text-center rounded-md">
      <h1 className="text-xl font-semibold underline">Akash Chopra</h1>
    </div>
  );
};

export default Admin;
