import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Blog = () => {
  const [view, setView] = useState("grid");
  const [activePost, setActivePost] = useState(null);

  const posts = [
    {
      title: "How to Write a Perfect Resume",
      desc: "Learn step-by-step how to create a powerful resume that stands out.",
      full: "A perfect resume highlights your skills, achievements, and experience in a clear and concise way. Focus on measurable results, clean formatting, and tailoring your resume for each job.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      date: "March 10, 2026",
      author: "Admin",
    },
    {
      title: "Top Resume Mistakes",
      desc: "Avoid these common mistakes that can cost you your dream job.",
      full: "Common mistakes include spelling errors, too much text, lack of achievements, and poor formatting. Always proofread and keep it simple and impactful.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      date: "March 12, 2026",
      author: "Admin",
    },
    {
      title: "Best Resume Templates 2026",
      desc: "Explore modern resume templates that recruiters love.",
      full: "Modern templates focus on readability, minimalism, and ATS compatibility. Choose a clean layout with proper spacing and hierarchy.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      date: "March 15, 2026",
      author: "Admin",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-6 md:px-16 py-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Our Blog
        </h1>

        <div className="flex bg-white border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 text-sm ${
              view === "grid"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 text-sm ${
              view === "list"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden cursor-pointer"
              onClick={() =>
                setActivePost(activePost === index ? null : index)
              }
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-xs text-gray-400 mb-1">
                  {post.date} • {post.author}
                </p>

                <h2 className="text-lg font-semibold mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {post.desc}
                </p>

                {/* 🔥 INLINE EXPAND */}
                <AnimatePresence>
                  {activePost === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-sm text-gray-700"
                    >
                      {post.full}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePost(null);
                        }}
                        className="block mt-3 text-blue-600 font-medium"
                      >
                        Show Less ↑
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePost(index);
                  }}
                  className="mt-3 text-blue-600 text-sm font-medium hover:underline"
                >
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
              onClick={() =>
                setActivePost(activePost === index ? null : index)
              }
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-64 h-48 object-cover"
              />

              <div className="p-5 flex flex-col justify-between w-full">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    {post.date} • {post.author}
                  </p>

                  <h2 className="text-xl font-semibold mb-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm">
                    {post.desc}
                  </p>

                  {/* EXPAND */}
                  <AnimatePresence>
                    {activePost === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-sm text-gray-700"
                      >
                        {post.full}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePost(null);
                          }}
                          className="block mt-3 text-blue-600 font-medium"
                        >
                          Show Less ↑
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePost(index);
                  }}
                  className="mt-4 text-blue-600 text-sm font-medium hover:underline"
                >
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;