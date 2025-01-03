import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <img
              src="/rholand.png" 
              alt="Company Logo"
              className="h-30 w-60" 
            />
            {/* Company Name */}
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            </h1>
          </div>
        </Link>

        <form className="bg-slate-100 rounded-lg p-3 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser? (
              <img src={currentUser.avatar} className="rounded-full w-10 h-10 object-cover" alt="profile" />
            ):(
              <li className="text-slate-700 hover:underline cursor-pointer">
              Sign In
            </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
