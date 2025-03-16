import React, { useState, useCallback } from "react";
import { GuideRegisteration } from "../../service/guide/guideApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import swalLib from 'sweetalert';

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
    district: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const expertiseOptions = ["Wildlife", "Historical Sites", "Adventure Sports", "Local Culture"];
  const languageOptions = ["English", "Hindi", "Malayalam", "Tamil", "Kannada"];

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    // Validation logic remains the same
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.district) {
      newErrors.district = "District is required";
    }

    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    }

    if (!formData.expertise) {
      newErrors.expertise = "Please select your area of expertise";
    }

    if (formData.languages.length === 0) {
      newErrors.languages = "Please select at least one language";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
   
    setFormData(prevState => ({ 
      ...prevState, 
      [name]: value 
    }));
    
  
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));
  }, []);

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedLanguages = checked
        ? [...prevState.languages, value]
        : prevState.languages.filter((language) => language !== value);
      return { ...prevState, languages: updatedLanguages };
    });
    
    // Clear language error
    setErrors(prevErrors => ({
      ...prevErrors,
      languages: ""
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitted(true);

    try {
      const response = await GuideRegisteration(formData);
      
      if (response.data.message.success) {
        toast.success('Registration successful');
        swalLib({
          title: "Registration Successful!",
          text: "You will be notified with further updates.",
          icon: "success",
          buttons: ["Cancel", "Proceed"],
        }).then(() => {
          navigate('/guide/login');
        });
      }
    } catch (error: any) {
      console.error("Error details:", error);
      toast.error(error.response?.data?.message || "Registration failed!");
      setIsSubmitted(false);
    }
  };

  const InputField = ({ label, name, type = "text", value, placeholder, ...props }: any) => (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 
          ${errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
        placeholder={placeholder}
        {...props}
      /> 
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1 block">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Guide Registration</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              placeholder="Enter your full name"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email address"
            />

            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              placeholder="Enter 10-digit phone number"
            />

            <InputField
              label="District"
              name="district"
              value={formData.district}
              placeholder="Enter your district"
            />

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area of Expertise
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 
                  ${errors.expertise ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
              >
                <option value="">Select expertise</option>
                {expertiseOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.expertise && (
                <span className="text-red-500 text-xs mt-1 block">{errors.expertise}</span>
              )}
            </div>

            <InputField
              label="Years of Experience"
              name="experience"
              type="number"
              value={formData.experience}
              placeholder="Enter years of experience"
              min="0"
              max="50"
            />

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages Spoken
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {languageOptions.map((language) => (
                  <label key={language} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={language}
                      checked={formData.languages.includes(language)}
                      onChange={handleLanguageChange}
                      className="form-checkbox h-4 w-4 text-black rounded"
                    />
                    <span className="ml-2 text-sm">{language}</span>
                  </label>
                ))}
              </div>
              {errors.languages && (
                <span className="text-red-500 text-xs mt-1 block">{errors.languages}</span>
              )}
            </div>

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter password"
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitted}
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            {isSubmitted ? "Processing..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;