import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ItemsPerPageDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [10, 20, 50];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">Show per page:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50"
        >
          <span>{value}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsPerPageDropdown;
