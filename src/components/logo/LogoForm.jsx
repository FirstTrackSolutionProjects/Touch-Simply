import React from "react";

const LogoForm = ({ data, setData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Logo Settings</h2>

      <input
        type="text"
        placeholder="Brand Name"
        className="border p-2 w-full"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        type="color"
        value={data.color}
        onChange={(e) => setData({ ...data, color: e.target.value })}
      />

      <select
        className="border p-2 w-full"
        value={data.font}
        onChange={(e) => setData({ ...data, font: e.target.value })}
      >
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>
  );
};

export default LogoForm;