import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';

export default function Sidebar({ isDrawerOpen, toggleDrawer }) {
  const { user } = useAuthStore();
  return (
    <div className="drawer" style={{ zIndex: 10000 }}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggleDrawer} />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          //   onClick={toggleDrawer} // Close the drawer when clicking outside
        ></label>
        {user && (
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tag-configuration">Tag Configuration</Link>
            </li>
            <li>
              <Link to="/hd">HD</Link>
            </li>
          </ul>
        )}
        {!user && (
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
