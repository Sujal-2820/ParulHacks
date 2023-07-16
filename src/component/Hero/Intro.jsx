import React from "react";
import { motion } from "framer-motion";
const Intro = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1,
        }}
        className="relative isolate px-6 pt-14 lg:px-8 mx-auto max-w-2xl py-2 sm:py-5 lg:py-30"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-grad-2 sm:text-6xl">
            Upload Your Video
          </h1>
          <p className="text-xl py-2 font-normal">
            Identify strengths in candidates before inviting them for an
            interview with our service
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Intro;
