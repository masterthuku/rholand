import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";
import OAuth from "../components/Oauth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
