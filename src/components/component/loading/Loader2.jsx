import React from "react";

const Loader = ({ className = " w-[100px] h-[100px]" }) => {
  return (
    <div
      className={`loader flex gap-2 justify-center items-center ${className}`}
    >
      {" "}
      <style>{`
            @keyframes scale {
                0%, 50%, 100% { transform: scaleY(0.05); }
                20% { transform: scaleY(1); }
                }
                .loader span {
                    width: 4px;
                    height: 30px;
                    background-color: #4c86f9;
                    border-radius:5px;
                    animation: scale 0.8s ease-in-out infinite;
                    display: inline-block;
                    }
                    .loader span:nth-child(1) { background-color: #49a84c; animation-delay: -0.4s; }
                    .loader span:nth-child(2) { background-color: #f6bb02; animation-delay: -0.3s; }
                    .loader span:nth-child(3) { background-color: #f6bb02; animation-delay: -0.2s; }
                    .loader span:nth-child(4) { background-color: #2196f3; animation-delay: -0.1s; }
                    `}</style>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;
