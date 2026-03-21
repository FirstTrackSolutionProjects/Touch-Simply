import React from "react";
import { Link } from "react-router-dom";

const TemplatesPreview = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "Professional",
      image: "/templates/template1.png",
    },
    {
      id: 2,
      name: "Creative Designer",
      category: "Creative",
      image: "/templates/template2.png",
    },
    {
      id: 3,
      name: "Minimal Clean",
      category: "Simple",
      image: "/templates/template3.png",
    },
    {
      id: 4,
      name: "Corporate Executive",
      category: "Corporate",
      image: "/templates/template4.png",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-white">

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Beautiful Resume Templates
        </h2>
        <p className="text-gray-500 mt-4">
          Choose from professionally designed templates to stand out.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">

        {templates.map((template) => (
          <div
            key={template.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">
                {template.name}
              </h3>
              <p className="text-xs text-gray-500">
                {template.category}
              </p>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
              <Link
                to="/templates"
                className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow transition"
              >
                Use Template
              </Link>
            </div>
          </div>
        ))}

      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <Link
          to="/templates"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
        >
          View All Templates →
        </Link>
      </div>

    </section>
  );
};

export default TemplatesPreview;