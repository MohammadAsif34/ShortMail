import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/authApi";
import { login } from "../../../redux/authSlice";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      console.log(data);
      if (data.status == "success") {
        dispatch(login(data.data.token));
        navigate("/");
      } else {
        setError("Invalid Credential!!");
      }
    } catch (err) {
      setError(err?.messsage || "Login failed? Invalid Credential");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl border-2 border-blue-300 rounded-2xl">
      <div className="w-fit mx-auto m-2 py-1 px-6 text-amber-40 text-orange-500 bg-white border rounded-xl flex gap-4 cursor-default">
        Temporary Credentials{" "}
        <button
          className="cursor-pointer"
          onMouseEnter={() => setView(true)}
          onMouseLeave={() => setView(false)}
        >
          {view ? <Eye /> : <EyeClosed />}
        </button>
      </div>
      {view && (
        <div className="absolute top-12 right-0 p-2 px-4 text-sm bg-blue-400 rounded-2xl">
          {/* <p>Email: guest@shortmail.com</p>
          <p>Password: guest123</p> */}
          <p>Email: temporary@shortmail.com</p>
          <p>Password: temporary123</p>
        </div>
      )}
      <h2 className="text-center text-2xl md:text-3xl text-blue-500 my-10 font-bold font-serif ">
        Login At ShortMail
      </h2>
      <form
        onSubmit={handleLogin}
        className="min-w-xs md:w-xl px-8  flex flex-col gap-2"
      >
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label className="text-gray-700 mt-2 px-2">Email </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full h-10 px-4 border bg-gray-100/50 border-blue-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-400"
        />
        <label className="text-gray-700 mt-2 px-2">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="password"
          className="w-full h-10 px-4 border bg-gray-100/50 border-blue-300 rounded-lg outline-0 focus:ring-2 focus ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 px-4 mt-4 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition duration-300 ease-in-out disabled:cursor-progress"
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
