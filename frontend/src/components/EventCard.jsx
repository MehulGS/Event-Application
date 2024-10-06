import React from "react";
import { useNavigate } from "react-router-dom";
import { HiCalendar, HiUserGroup, HiBadgeCheck } from "react-icons/hi"; // React Icons

// Base URL for the backend
const BASE_URL = "https://event.onrender.com"; // Ensure this matches your backend's URL

const EventCard = ({
  id,
  title,
  date,
  location,
  imageUrl,
  attendeesCount,
  isFree,
}) => {
  const navigate = useNavigate();
  const fullImageUrl = `${BASE_URL}${imageUrl}`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleViewDetails = () => {
    if (id) {
      navigate(`/event/${id}`);
    } else {
      console.error(
        "Event ID is undefined. Check if the ID is passed correctly."
      );
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer overflow-hidden"
      onClick={handleViewDetails}
    >
      {imageUrl && (
        <img
          src={fullImageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2 truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          Hosted by:{" "}
          <span className="font-medium text-red-600">
            Chennai Tisax Automotive Cybersecurity Meetup Group
          </span>
        </p>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <HiCalendar className="mr-2 text-gray-700" />
          <p>
            {formattedDate} - {location}
          </p>
        </div>

        <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
          <div className="flex items-center">
            <HiUserGroup className="mr-1 text-gray-700" />
            <p>{attendeesCount} going</p>
          </div>
          <div className="flex items-center">
            <HiBadgeCheck
              className={`mr-1 ${isFree ? "text-green-500" : "text-yellow-500"}`}
            />
            <p>{isFree ? "Free" : "Paid"}</p>
          </div>
        </div>


<button
  type="submit"
  class="flex justify-center gap-2 w-full items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
>
  Explore
  <svg
    class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
    viewBox="0 0 16 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      class="fill-gray-800 group-hover:fill-gray-800"
    ></path>
  </svg>
</button>



      </div>
    </div>
  );
};

export default EventCard;
