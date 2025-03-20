import React from "react";

const QuoteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-blue-600 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
};

const ReviewCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="h-24 w-24 rounded-full object-cover mb-4 border-4 border-blue-100 shadow-lg hover:border-blue-200 transition-all duration-300"
      />
      <QuoteIcon />
      <p className="text-gray-700 italic">"{testimonial.quote}"</p>
      <p className="mt-4 font-semibold text-gray-800">- {testimonial.name}</p>
    </div>
  );
};

export default ReviewCard;
