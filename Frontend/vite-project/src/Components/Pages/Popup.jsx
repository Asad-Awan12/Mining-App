// components/Popup.jsx
import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black rounded-lg p-6 w-11/12 max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 cursor-pointer right-2 text-5xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
