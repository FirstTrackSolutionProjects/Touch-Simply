import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PortfolioForm from "../components/portfolio/PortfolioForm";
import PortfolioCanvas from "../components/portfolio/PortfolioCanvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PortfolioBuilder = () => {
  const location = useLocation();
  const [data, setData] = useState({
  name: "",
  email: "",
  phone: "",
  dob: "",
  city: "",
  state: "",
  pincode: "",

  github: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  youtube: "",

  education: [
    {
      degree: "",
      college: "",
      startYear: "",
      endYear: "",
      isPresent: false,
    },
  ],

  projects: [
    {
      title: "",
      desc: "",
      github: "",
      image: "",
    },
  ],
});

useEffect(() => {
  if (location.state?.editData?.rawData) {
    setData(location.state.editData.rawData);
  }
}, [location.state]);

const downloadPDF = async () => {
  const element = document.getElementById("portfolio-preview");

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",

      onclone: (doc) => {
        // 🔥 REMOVE ALL OKLCH COLORS
        const all = doc.querySelectorAll("*");
        all.forEach((el) => {
          el.style.color = "#000000";
          el.style.backgroundColor = "#ffffff";
          el.style.borderColor = "#dddddd";
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("portfolio.pdf");

  } catch (err) {
    console.error("PDF ERROR:", err);
    alert("Download failed");
  }
};

  return (
    <div className=" flex flex-col md:flex-row bg-gradient-to-br from-purple-950 via-indigo-950 to-gray-950">

      {/* LEFT */}
      <div className="md:w-1/2 p-6">
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <PortfolioForm data={data} setData={setData} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="md:w-1/2 p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="flex justify-between px-4 py-2 border-b items-center">
          <h2>Live Preview</h2>

            <div className="flex gap-2">

              <button
                onClick={() => {
                  localStorage.setItem("portfolioData", JSON.stringify(data));
                  window.open("/portfolio/view", "_blank");
                }}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Open Portfolio 🚀
              </button>
            </div>
          </div>

          <div id="portfolio-preview" className="p-4">
            <PortfolioCanvas data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;