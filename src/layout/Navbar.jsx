import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.jpg';
import useAuthStore from '../store/useAuthStore.js';
import { BsGear, BsPerson } from 'react-icons/bs';
import { IoLogOutOutline } from 'react-icons/io5';

export default function Navbar({ toggleDrawer }) {
  const { user, logout } = useAuthStore();
  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0" style={{ zIndex: 9990 }}>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Link to="/" className="text-xl">
          <img src={logo} alt="" className="h-8" />
        </Link>
      </div>
      {!user && (
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li className="bg-primary text-primary-content rounded">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  <div className="flex items-center gap-2">
                    <BsPerson />
                    Profile
                  </div>
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <BsGear />
                  Settings
                </div>
              </li>
              <li>
                <div onClick={logout} className="text-red-500 flex items-center gap-2">
                  <IoLogOutOutline />
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
