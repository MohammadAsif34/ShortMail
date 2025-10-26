import React from "react";
import { motion } from "framer-motion";
import Loader2 from "./loading/Loader2";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bcg-gradient-to-br bg-[url(/bg.png)] bg-cover from-blue-500 to-purple-600 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-center"
      >
        <img src="/logo.png" alt="" className="w-45  mx-auto" />
        <motion.h1
          className="text-blue-600 text-5xl font-bold mb-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          ShortMail
        </motion.h1>

        <motion.p
          className="text-blue-400 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Your Smart & Fast Email Hub
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Loader2 />
          {/* <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
