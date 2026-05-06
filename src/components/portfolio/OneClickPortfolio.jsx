import React from "react";
import ModernPortfolio from "../../templates/ModernPortfolio";
import MinimalPortfolio from "../../templates/MinimalPortfolio";
import CreativePortfolio from "../../templates/CreativePortfolio";

const OneClickPortfolio = ({ data, template = "modern" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalPortfolio data={data} />;
      case "creative":
        return <CreativePortfolio data={data} />;
      default:
        return <ModernPortfolio data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {renderTemplate()}
    </div>
  );
};

export default OneClickPortfolio;