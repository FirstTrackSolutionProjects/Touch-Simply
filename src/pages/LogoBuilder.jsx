import React, { useState } from "react";
import LogoForm from "../components/logo/LogoForm";
import LogoCanvas from "../components/logo/LogoCanvas";

const LogoBuilder = () => {
  const [data, setData] = useState({
    name: "",
    color: "#000000",
    font: "Arial",
  });

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* LEFT */}
      <div className="p-6 bg-gray-50">
        <LogoForm data={data} setData={setData} />
      </div>

      {/* RIGHT */}
      <div className="bg-gray-200">
        <LogoCanvas data={data} />
      </div>
    </div>
  );
};

export default LogoBuilder;