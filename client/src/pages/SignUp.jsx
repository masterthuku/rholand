import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OAuth from "../components/Oauth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setIsloading(false);
        return;
      }
      setIsloading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setIsloading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChange}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle type
            placeholder="Password"
            className="border p-3 rounded-lg focus:outline-none w-full"
            id="password"
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-600" />
            ) : (
              <FaEye className="text-gray-600" />
            )}
          </span>
        </div>
        <button
          disabled={isloading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-70"
        >
          {isloading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
