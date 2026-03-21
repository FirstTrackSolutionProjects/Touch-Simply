import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();

  const templates = [
    {
      name: "Minimal",
      key: "minimal",
      image: "/templates/template1.png",
      tag: "Popular",
    },
    {
      name: "Modern",
      key: "modern",
      image: "/templates/template2.png",
      tag: "Recommended",
    },
    {
      name: "Professional",
      key: "professional",
      image: "/templates/template3.png",
    },
    {
      name: "Creative",
      key: "creative",
      image: "/templates/template4.png",
    },
  ];

  const handleUseTemplate = (key) => {
    // ✅ temporary storage (later connect context/backend)
    localStorage.setItem("selectedTemplate", key);
    navigate("/editor");
  };

  return (
    <section className="py-16 px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Choose Your Resume Template
        </h1>
        <p className="text-gray-500 mt-3">
          Pick a design that fits your style and start building instantly
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {templates.map((t) => (
          <div
            key={t.key}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative overflow-hidden">

              {/* Badge */}
              {t.tag && (
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full z-10">
                  {t.tag}
                </span>
              )}

              <img
                src={t.image}
                alt={t.name}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">

                <button
                  onClick={() => handleUseTemplate(t.key)}
                  className="bg-white text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Use Template
                </button>

                <button
                  className="border border-white text-white px-5 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
                >
                  Preview
                </button>

              </div>
            </div>

            {/* Info */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {t.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Clean & professional design
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-4">
          Not sure which to choose?
        </p>
        <button
          onClick={() => handleUseTemplate("modern")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          Start with Recommended Template 🚀
        </button>
      </div>

    </section>
  );
};

export default Templates;