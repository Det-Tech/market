import React from 'react';

const TabButton = ({ label, isActive, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-1 rounded-full font-medium text-sm transition-colors ${
        isActive
          ? 'bg-black text-white'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
