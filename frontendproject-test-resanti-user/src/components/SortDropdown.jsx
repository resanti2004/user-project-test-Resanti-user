import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "-published_at", label: "Newest" },
    { value: "published_at", label: "Oldest" },
  ];

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">Sort by:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50"
        >
          <span>{selectedOption?.label}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
