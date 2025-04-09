import React from 'react';
import { BsRobot } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function MachinesListPage() {
  const machines = ['Robotic Washing Machine', 'Robotic Cutting Machine'];
  return (
    <div className="grid gap-3 bg-white sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 p-4 min-h-[calc(100vh-10rem)]">
      {machines &&
        machines.map((machine, index) => (
          <Link
            key={index}
            to={`/machine-shop-1/${machine}`}
            className="border border-primary rounded h-24 flex flex-col justify-center items-center"
          >
            <BsRobot size={50} />
            {machine}
          </Link>
        ))}
    </div>
  );
}
