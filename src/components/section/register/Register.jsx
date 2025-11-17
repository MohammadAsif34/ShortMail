import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await registerUser(fullname, email, password);
      if (res.status === "success") {
        setSuccess(res.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl border-2 border-blue-300 rounded-2xl">
      <h2 className="text-center text-2xl md:text-3xl text-blue-500 my-10 font-bold font-serif ">
        Register at ShortMail
      </h2>
      <form
        onSubmit={handleRegister}
        className="min-w-xs md:w-xl px-8  flex flex-col gap-2"
      >
        <div className="min-h-6 text-center">
          {success && (
            <p className="text-green-500 font-semibold ">
              {success} <br /> <span>redirecting...</span>
            </p>
          )}
          {error && <p className="text-red-500 ">{error}</p>}
        </div>
        <label className="text-gray-700 mt-2 px-2">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          className="w-full h-10 px-4 bg-gray-100/50 border border-blue-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-400"
        />
        <label className="text-gray-700 mt-2 px-2">New Email</label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-10 px-4 bg-gray-100/50 border border-blue-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-400"
          // className="w-full h-10 px-4 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-300"
        />
        <label className="text-gray-700 mt-2 px-2">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-10 px-4 bg-gray-100/50 border border-blue-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-400"
          // className="w-full h-10 px-4 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 mt-4 px-4 rounded-lg
        bg-blue-400 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-xs my-6 text-end px-8">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
