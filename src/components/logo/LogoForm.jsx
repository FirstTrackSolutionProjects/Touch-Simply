import React from "react";
import * as Icons from "react-icons/fa";

const iconList = ["FaRocket", "FaCode", "FaCrown", "FaShoppingCart"];

const colors = ["#7c3aed", "#6366f1", "#ec4899", "#22c55e", "#f59e0b"];

const LogoForm = ({ data, setData }) => {
  return (
    <div className="space-y-5">

      {/* NAME */}
      <input
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder="Brand Name"
        className="w-full p-3 border rounded-lg"
      />

      {/* COLOR PICKER */}
      <div>
        <p className="text-sm mb-2">Choose Color</p>
        <div className="flex gap-2">
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => setData({ ...data, color: c })}
              className="w-8 h-8 rounded-full cursor-pointer border-2"
              style={{
                background: c,
                borderColor: data.color === c ? "black" : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      {/* ICON PICKER */}
      <div>
        <p className="text-sm mb-2">Select Icon</p>
        <div className="grid grid-cols-4 gap-3">
          {iconList.map((icon) => {
            const Icon = Icons[icon];
            return (
              <div
                key={icon}
                onClick={() => setData({ ...data, icon })}
                className={`p-3 rounded-lg cursor-pointer border flex justify-center ${
                  data.icon === icon
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                <Icon />
              </div>
            );
          })}
        </div>
      </div>

      {/* FONT */}
      <select
        value={data.font}
        onChange={(e) => setData({ ...data, font: e.target.value })}
        className="w-full p-3 border rounded-lg"
      >
        <option>Poppins</option>
        <option>Montserrat</option>
        <option>Playfair Display</option>
      </select>

      {/* LAYOUT */}
      <select
        value={data.layout}
        onChange={(e) => setData({ ...data, layout: e.target.value })}
        className="w-full p-3 border rounded-lg"
      >
        <option value="horizontal">Horizontal</option>
        <option value="stacked">Stacked</option>
        <option value="icon">Icon Only</option>
      </select>

    </div>
  );
};

export default LogoForm;