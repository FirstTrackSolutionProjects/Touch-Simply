import React from "react";

const LogoForm = ({ data, setData }) => {
  return (
    <div className="space-y-5">

      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-800">
        Logo Settings
      </h2>

      {/* Brand Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 font-medium">
          Brand Name
        </label>
        <input
          type="text"
          placeholder="Enter your brand name"
          className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-purple-500 outline-none"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>

      {/* Color Picker */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 font-medium">
          Brand Color
        </label>

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={data.color}
            onChange={(e) => setData({ ...data, color: e.target.value })}
            className="w-12 h-10 border rounded cursor-pointer"
          />

          <span className="text-sm text-gray-500">
            {data.color}
          </span>
        </div>
      </div>

      {/* Font Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 font-medium">
          Font Style
        </label>

        <select
          className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-purple-500 outline-none"
          value={data.font}
          onChange={(e) => setData({ ...data, font: e.target.value })}
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Live Tip */}
      <div className="text-xs text-gray-400 bg-gray-100 p-3 rounded-lg">
        💡 Tip: Try different fonts & colors to match your brand identity
      </div>

    </div>
  );
};

export default LogoForm;