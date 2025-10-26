import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/authApi";
import { login } from "../../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(mail, password);
      console.log(data);
      if (data.status == "success") {
        dispatch(login(data.data.token));
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" border-2 border-blue-500 rounded-2xl">
      <h2 className="text-center text-2xl md:text-3xl text-blue-500 my-10 font-bold font-serif ">
        Login to ShortMail
      </h2>
      <form
        onSubmit={handleLogin}
        className="min-w-xs md:w-xl px-8  flex flex-col gap-8"
      >
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          autoComplete="email"
          className="w-full h-10 px-4 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="password"
          className="w-full h-10 px-4 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 px-4 border border-gray-300 rounded-lg bg-blue-500 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-xs my-6 text-end px-8">
        Don’t have an account?{" "}
        <Link to={"/register"} className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
