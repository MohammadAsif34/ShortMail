import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

const Loading = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.8)", // optional overlay
            zIndex: 9999,
          }}
        >
          <Loader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
