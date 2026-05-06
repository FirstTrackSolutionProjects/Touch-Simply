import React from "react";
import OneClickPortfolio from "../components/portfolio/OneClickPortfolio";

const OneClickPage = () => {
  const storedData = localStorage.getItem("portfolioData");

  const data = storedData ? JSON.parse(storedData) : null;

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        No Portfolio Data Found ⚠️
      </div>
    );
  }

  return <OneClickPortfolio data={data} template="modern" />;
};

export default OneClickPage;