import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';

export default function Sidebar({ isDrawerOpen, toggleDrawer }) {
  const { user } = useAuthStore();
  return (
    <div className="drawer" style={{ zIndex: 10000 }}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggleDrawer} />

      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Top-level items */}
          <li>
            <Link to="/" onClick={toggleDrawer}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/cbmdashboard" onClick={toggleDrawer}>
              CBM Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={toggleDrawer}>
              Alerts Dashboard
            </Link>
          </li>

          {/* CBM Group */}
          <li>
            <details>
              <summary>CBM</summary>
              <ul>
                <li>
                  <Link to="/hd" onClick={toggleDrawer}>
                    HD
                  </Link>
                </li>
                <li>
                  <Link to="/lmd" onClick={toggleDrawer}>
                    LMD
                  </Link>
                </li>
                <li>
                  <Link to="/machine-shop-1" onClick={toggleDrawer}>
                    Machine Shop 1
                  </Link>
                </li>
                <li>
                  <Link to="/machine-shop-2" onClick={toggleDrawer}>
                    Machine Shop 2
                  </Link>
                </li>
                <li>
                  <Link to="/engine" onClick={toggleDrawer}>
                    Engine
                  </Link>
                </li>
                <li>
                  <Link to="/paintshop" onClick={toggleDrawer}>
                    Paintshop
                  </Link>
                </li>
                <li>
                  <Link to="/andon" onClick={toggleDrawer}>
                    Andon
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
