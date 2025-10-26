import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(name, email, password);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" border-2 border-blue-500 rounded-2xl">
      <h2 className="text-center text-2xl md:text-3xl text-blue-500 my-10 font-bold font-serif ">
        Register for ShortMail
      </h2>
      <form
        onSubmit={handleRegister}
        className="min-w-xs md:w-xl px-8  flex flex-col gap-8"
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full h-10 px-4 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-300"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-10 px-4 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-10 px-4 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 px-4 border border-gray-300 rounded-lg
        bg-blue-500 text-white"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-xs my-6 text-end px-8">
        Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;
