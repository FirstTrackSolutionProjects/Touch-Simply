import React, { useState } from "react";

const Blog = () => {
  const [view, setView] = useState("grid");

  const posts = [
    {
      title: "How to Write a Perfect Resume",
      desc: "Learn step-by-step how to create a powerful resume that stands out.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      date: "March 10, 2026",
      author: "Admin",
    },
    {
      title: "Top Resume Mistakes",
      desc: "Avoid these common mistakes that can cost you your dream job.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      date: "March 12, 2026",
      author: "Admin",
    },
    {
      title: "Best Resume Templates 2026",
      desc: "Explore modern resume templates that recruiters love.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      date: "March 15, 2026",
      author: "Admin",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-16 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Blog</h1>

        {/* Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded ${
              view === "list" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">
                  {post.date} • {post.author}
                </p>

                <h2 className="text-lg font-semibold mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm mb-3">
                  {post.desc}
                </p>

                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-64 h-48 object-cover"
              />

              <div className="p-5 flex flex-col justify-between">
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
                </div>

                <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Blog;