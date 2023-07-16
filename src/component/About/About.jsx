import React from "react";

const About = () => {
  return (
    <div className="text-gray relative mt-10 backdrop-blur-3xl flex-col flex justify-center items-center font-semibold text-black ">
      <h1 className="text-grad-2 text-5xl mb-2 uppercase font-bold">About us</h1>
      <div className="text-lg w-[50vw] mb-6 font-normal">
        Hirexa offers an innovative approach to assessing soft skills during the
        hiring process. It involves recording a candidate's responses to
        questions or scenarios designed to evaluate soft skills, and then
        analyzing the video recording using a rating scale that assesses
        specific behaviors and communication styles associated with the soft
        skills being evaluated.
        <br />
        <br />
        Our approach provides a more objective and comprehensive view of the
        candidate's behavior and communication style, allowing for a more
        accurate assessment of their potential for success in the workplace.
        Additionally, our video analysis method can be conducted remotely,
        providing greater flexibility in the hiring process.
      </div>
    </div>
  );
};

export default About;
