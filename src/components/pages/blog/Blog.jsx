// src/pages/blog/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import { blogData } from "../../../components/data/blogdata";

const Blog = () => {
  return (
    <div className="px-4 lg:px-20 py-10 bg-[#fdfdfd]">
      <h1 className="text-3xl font-bold text-center mb-4">📝 Blog & Yangiliklar</h1>
      <p className="text-center text-gray-500 mb-10">Foydali maslahatlar, trendlar va mebel yangiliklari</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogData.map((post) => (
          <div key={post.id} className="bg-white shadow rounded p-4">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-block mt-4 text-yellow-600 hover:underline"
            >
              ➡ Batafsil o‘qish
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
