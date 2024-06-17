import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const { formType } = useParams();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRefresh = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/refresh-sheet`
      );
      if (response.status === 200) {
        toast.success("Sheet refreshed successfully!");
      }
    } catch (error) {
      toast.error("Error refreshing sheet.");
    }
  };

  const handleShowSpreadsheet = () => {
    window.open(process.env.REACT_APP_SPREADSHEET_URL, "_blank");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const { name, phoneNumber } = JSON.parse(savedData);
      console.log("Loaded from localStorage:", { name, phoneNumber });
      setName(name);
      setPhoneNumber(phoneNumber);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name.match(/^[A-Za-z\s]+$/)) {
      toast.error(
        "Please enter a valid name. Only alphabetic characters and spaces are allowed."
      );
      return;
    }
    if (!phoneNumber.match(/^\d+$/)) {
      toast.error(
        "Please enter a valid phone number. Only numeric characters are allowed."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/form`,
        {
          formType,
          name,
          phoneNumber,
        }
      );
      if (response.status === 201) {
        toast.success("Data Submitted");
      }
      localStorage.setItem("formData", JSON.stringify({ name, phoneNumber }));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#6b88a5]">
      <div className="bg-gray-300 p-12 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">{`${formType} `}</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Name"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone
            </label>
            <PhoneInput
              country={"in"}
              name="phone"
              id="phone"
              enableSearch={true}
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              containerClass="w-full"
              className="form-control"
              inputStyle={{ width: "100%", backgroundColor: "#F9FAFB" }}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="absolute top-20 right-auto flex space-x-2">
        <button
          onClick={handleRefresh}
          className="text-white  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Refresh SpreadSheet
        </button>
        <button
          onClick={handleShowSpreadsheet}
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Show Spreadsheet
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
