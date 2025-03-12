import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const BlogCards = ({ blogs }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} className="p-5 shadow-lg rounded cursor-pointer">
          <div>
            {/* Ensure the `imageUrl` field exists in your Firestore data */}
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer">{blog.title}</h3>
            {/* Handle cases where `blog.author` is a string or an object */}
            <p className="mb-2 text-gray-400">
              <FaUser className="inline-flex items-center mr-2" />
              {blog.authorName.name}
            </p>
            {/* Ensure the `timestamp` field exists in your Firestore data */}
            <p className="text-sm text-gray-500">
              Published: {blog.timestamp?.toDate().toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogCards;