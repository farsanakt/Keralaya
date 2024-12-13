import React, { useState } from "react";
import { GuideRegisteration } from "../../service/guide/guideApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    expertise: "",
    languages: [] as string[],
    password: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false); 

  const expertiseOptions = ["Wildlife", "Historical Sites", "Adventure Sports", "Local Culture"];
  const languageOptions = ["English", "Hindi", "Malayalam", "Tamil", "Kannada"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedLanguages = checked
        ? [...prevState.languages, value]
        : prevState.languages.filter((language) => language !== value);
      return { ...prevState, languages: updatedLanguages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitted(true); 

    try {
      const response = await GuideRegisteration(formData);

      console.log('respo', response);

      if (response.data.message?.message) {
        toast.success(response.data.message.message);
      }
      // navigate('/guide/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
      setIsSubmitted(false); // Reset if registration fails
    }

    console.log("Form Submitted: ", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Guide Registration Form</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col">
            <label htmlFor="experience" className="text-gray-700 font-medium mb-2">Years of Experience</label>
            <input
              type="number"
              name="experience"
              id="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your experience in years"
              required
            />
          </div>

          {/* Expertise */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="expertise" className="text-gray-700 font-medium mb-2">Area of Expertise</label>
            <select
              name="expertise"
              id="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select your expertise</option>
              {expertiseOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Languages Spoken */}
          <div className="flex flex-col col-span-2">
            <label className="text-gray-700 font-medium mb-2">Languages Spoken</label>
            <div className="grid grid-cols-3 gap-4">
              {languageOptions.map((language) => (
                <label key={language} className="flex items-center">
                  <input
                    type="checkbox"
                    value={language}
                    checked={formData.languages.includes(language)}
                    onChange={handleLanguageChange}
                    className="mr-2"
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md focus:outline-none hover:bg-green-700"
              disabled={isSubmitted}
            >
              {isSubmitted ? "Requested" : "Register as Guide"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
