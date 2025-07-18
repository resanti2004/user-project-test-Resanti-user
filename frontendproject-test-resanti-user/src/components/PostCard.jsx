import React from "react";
import LazyImage from "./LazyImage";

const PostCard = ({ idea }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <LazyImage
        src={idea.small_image}
        alt={idea.title}
        className="w-full h-48"
      />
      <div className="p-4">
        <p className="text-gray-500 text-sm">
          {new Date(idea.published_at).toLocaleDateString()}
        </p>
        <h3
          className="text-gray-800 font-semibold leading-tight line-clamp-3  mt-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {idea.title}
        </h3>
      </div>
    </div>
  );
};

export default PostCard;
