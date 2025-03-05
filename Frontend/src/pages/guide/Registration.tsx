import React, { useState } from "react";
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name = "Name should only contain letters and spaces";
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
    } else if (formData.district.length < 3) {
      newErrors.district = "District name must be at least 3 characters";
    }

    
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    } else if (parseInt(formData.experience) < 0) {
      newErrors.experience = "Experience cannot be negative";
    } else if (parseInt(formData.experience) > 50) {
      newErrors.experience = "Please enter a valid experience (0-50 years)";
    }

    
    if (!formData.expertise) {
      newErrors.expertise = "Please select your area of expertise";
    }

    
    if (formData.languages.length === 0) {
      newErrors.languages = "Please select at least one language";
    }

    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long";
    }
  
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedLanguages = checked
        ? [...prevState.languages, value]
        : prevState.languages.filter((language) => language !== value);
      return { ...prevState, languages: updatedLanguages };
    });
    
    if (errors.languages) {
      setErrors({ ...errors, languages: "" });
    }
  };

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
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium mb-2">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 
          ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
        {...props}
      /> 
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
            Guide Registration Form
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Join our network of professional guides
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            label="District"
            name="district"
            value={formData.district}
            placeholder="Enter your district"
          />

          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            placeholder="Enter your 10-digit phone number"
          />

          <InputField
            label="Years of Experience"
            name="experience"
            type="number"
            value={formData.experience}
            placeholder="Enter years of experience"
            min="0"
            max="50"
          />

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Area of Expertise<span className="text-red-500">*</span>
            </label>
            <select
              name="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500
                ${errors.expertise ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select your expertise</option>
              {expertiseOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.expertise && (
              <span className="text-red-500 text-sm mt-1">{errors.expertise}</span>
            )}
          </div>

          <div className="flex flex-col col-span-full">
            <label className="text-gray-700 font-medium mb-2">
              Languages Spoken<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languageOptions.map((language) => (
                <label key={language} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={language}
                    checked={formData.languages.includes(language)}
                    onChange={handleLanguageChange}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span>{language}</span>
                </label>
              ))}
            </div>
            {errors.languages && (
              <span className="text-red-500 text-sm mt-1">{errors.languages}</span>
            )}
          </div>

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            placeholder="Enter your password"
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
          />

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitted}
            >
              {isSubmitted ? "Processing..." : "Register as Guide"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;