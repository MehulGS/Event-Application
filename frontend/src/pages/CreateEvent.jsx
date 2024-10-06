import React, { useState } from "react";
import api from "../api/api"; // Assuming your axios instance is correctly configured
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const [image, setImage] = useState(null); // For storing the selected image file
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handles the input fields change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handles file change event
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file in the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for all fields
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.date ||
      !eventData.location ||
      !eventData.maxAttendees
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Create FormData to handle text inputs and image upload
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("maxAttendees", eventData.maxAttendees);
    if (image) {
      formData.append("image", image); // Append the image file only if it exists
    }

    try {
      const response = await api.post("/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart data is set
        },
      });
      console.log("Event created successfully:", response.data);
      navigate("/my-events"); // Redirect to "My Events" page after creation
    } catch (error) {
      console.error("Error creating event:", error.response || error.message);
      setError(
        error.response?.data?.message ||
        "An error occurred while creating the event."
      );
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white shadow-lg rounded-lg space-y-6">
        <h2 className="text-3xl font-bold text-[#dc363c] text-center">Create Event</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc363c]"
              placeholder="Enter event title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Event Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc363c]"
              placeholder="Enter event description"
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Event Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc363c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc363c]"
                placeholder="Enter location"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Max Attendees</label>
            <input
              type="number"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc363c]"
              placeholder="Enter max attendees"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Event Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc363c]"
              accept="image/*"
            />
          </div>
          <button class="cursor-pointer w-full transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
