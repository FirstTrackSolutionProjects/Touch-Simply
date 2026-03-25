import React, { useState } from "react";
import ModernLogo from "../../templates/ModernLogo";
import MinimalLogo from "../../templates/MinimalLogo";

const LogoCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");

  return (
    <div className="h-full">
      
      {/* Template Switch */}
      <div className="p-4 flex gap-3">
        <button onClick={() => setTemplate("modern")}>Modern</button>
        <button onClick={() => setTemplate("minimal")}>Minimal</button>
      </div>

      {/* Template Render */}
      <div className="h-[90%]">
        {template === "modern" && <ModernLogo data={data} />}
        {template === "minimal" && <MinimalLogo data={data} />}
      </div>
    </div>
  );
};

export default LogoCanvas;