import React from 'react';

const FullPageLoader = () => {
  return (
    <div
      className="bubble-loader fixed bg-transparent"
      style={{
        zIndex: 100000,
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default FullPageLoader;
