// src/pages/blog/SinglePost.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogData } from "../../../components/data/blogdata";

const SinglePost = () => {
  const { slug } = useParams();
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl">Maqola topilmadi</h2>
        <Link to="/blog" className="text-yellow-600 underline mt-4 block">🔙 Blogga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-20 py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
      <p className="text-lg leading-8 text-gray-700 whitespace-pre-line">{post.content}</p>
    </div>
  );
};

export default SinglePost;
