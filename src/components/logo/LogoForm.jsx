import React from "react";

const LogoForm = ({ data, setData }) => {
  return (
    <div className="space-y-5">

      <h2 className="text-xl font-bold text-gray-800">
        Logo Settings
      </h2>

      {/* Brand Name */}
      <input
        placeholder="Brand Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="border px-3 py-2 rounded-lg w-full"
      />

      {/* Color */}
      <div className="flex gap-3 items-center">
        <input
          type="color"
          value={data.color}
          onChange={(e) => setData({ ...data, color: e.target.value })}
        />
        <label className="text-sm">Primary Color</label>
      </div>

      {/* Gradient Toggle */}
      <label className="flex gap-2 text-sm">
        <input
          type="checkbox"
          checked={data.gradient}
          onChange={(e) =>
            setData({ ...data, gradient: e.target.checked })
          }
        />
        Enable Gradient
      </label>

      {/* Font */}
      <select
        value={data.font}
        onChange={(e) => setData({ ...data, font: e.target.value })}
        className="border px-3 py-2 rounded-lg w-full"
      >
        <option>Poppins</option>
        <option>Montserrat</option>
        <option>Playfair Display</option>
        <option>Roboto</option>
      </select>

      {/* Icon */}
      <select
        value={data.icon}
        onChange={(e) => setData({ ...data, icon: e.target.value })}
        className="border px-3 py-2 rounded-lg w-full"
      >
        <option value="FaRocket">🚀 Startup</option>
        <option value="FaShoppingCart">🛒 Ecommerce</option>
        <option value="FaCode">💻 Tech</option>
        <option value="FaCrown">👑 Premium</option>
      </select>

      {/* Layout */}
      <select
        value={data.layout}
        onChange={(e) => setData({ ...data, layout: e.target.value })}
        className="border px-3 py-2 rounded-lg w-full"
      >
        <option value="horizontal">Horizontal</option>
        <option value="stacked">Stacked</option>
        <option value="icon">Icon Only</option>
      </select>

    </div>
  );
};

export default LogoForm;