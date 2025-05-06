import React, { useState } from 'react';
import { BsRobot, BsGear, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function MachinesListPage() {
  const runningMachines = [
    'Robotic Washing Machine',
    'Robotic Washing Machine Head Line',
    'Machine Panel Temperature',
  ];
  const stoppedMachines = [
    'Lorem Ipsum',
    'Lorem Ipsum 2',
  ];

  // helper: turn "Foo Bar" → "Foo-Bar"
  const slugify = (name) => name.trim().replace(/\s+/g, '-');

  const cardClasses = `
    block card card-bordered rounded-xl shadow-xl
    transition-transform transform hover:scale-105
  `;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="stat stat-vertical">
          <div className="stat-title text-lg">Total Machines</div>
          <div className="stat-value text-4xl text-gray-800 font-semibold">
            {runningMachines.length + stoppedMachines.length}
          </div>
        </div>
        <div className="stat stat-vertical">
          <div className="stat-title text-lg">Running Machines</div>
          <div className="stat-value text-4xl text-green-500 font-semibold">
            {runningMachines.length}
          </div>
        </div>
        <div className="stat stat-vertical">
          <div className="stat-title text-lg">Stopped Machines</div>
          <div className="stat-value text-4xl text-red-500 font-semibold">
            {stoppedMachines.length}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search machines…"
          className="input input-bordered input-lg w-2/3 md:w-1/2 rounded-xl shadow-md"
        />
      </div>

      {/* Running Machines */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-500 mb-6">
          Running Machines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {runningMachines.map((machine) => {
            const slug = slugify(machine);
            return (
              <Link
                key={slug}
                to={`/machine-shop-1/${slug}`}
                className={`${cardClasses} bg-gradient-to-r from-blue-300 to-blue-600 text-white`}
              >
                <div className="card-body p-6">
                  <div className="flex justify-center mb-4">
                    <BsRobot size={40} />
                  </div>
                  <h3 className="card-title text-xl font-semibold">
                    {machine}
                  </h3>
                  <p className="text-gray-100">Type: {/* insert type here */}</p>
                  <p className="text-gray-100">Added: {/* insert date */}</p>
                  <div className="flex justify-between mt-4">
                    <button className="btn btn-sm btn-primary rounded-full hover:bg-blue-500 transition-colors">
                      <BsGear size={18} />
                    </button>
                    <button className="btn btn-sm btn-secondary rounded-full hover:bg-gray-500 transition-colors">
                      <BsEyeSlash size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stopped Machines */}
      <section>
        <h2 className="text-2xl font-semibold text-red-500 mb-6">
          Stopped Machines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stoppedMachines.map((machine) => {
            const slug = slugify(machine);
            return (
              <Link
                key={slug}
                to={`/machine-shop-1/${slug}`}
                className={`${cardClasses} bg-gradient-to-r from-red-300 to-red-600 text-white`}
              >
                <div className="card-body p-6">
                  <div className="flex justify-center mb-4">
                    <BsRobot size={40} />
                  </div>
                  <h3 className="card-title text-xl font-semibold">
                    {machine}
                  </h3>
                  <p className="text-gray-100">Type: {/* insert type here */}</p>
                  <p className="text-gray-100">Added: {/* insert date */}</p>
                  <div className="flex justify-between mt-4">
                    <button className="btn btn-sm btn-primary rounded-full hover:bg-blue-500 transition-colors">
                      <BsGear size={18} />
                    </button>
                    <button className="btn btn-sm btn-secondary rounded-full hover:bg-gray-500 transition-colors">
                      <BsEyeSlash size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
