import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEventData(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setError("Error fetching event details");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("maxAttendees", eventData.maxAttendees);
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.put(`/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event updated successfully");
      navigate("/my-events");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Error updating event");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md px-8 py-6 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-[#dc363c] mb-6">Edit Event</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="title">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="description">
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter event description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="date">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="maxAttendees">
              Max Attendees
            </label>
            <input
              type="number"
              id="maxAttendees"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter max attendees"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="image">
              Event Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              accept="image/*"
            />
          </div>
          <button class="cursor-pointer w-full transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
