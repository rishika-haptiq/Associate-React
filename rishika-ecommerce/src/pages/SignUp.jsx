import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let message = "";

    if (name === "name") {
      if (!value.trim()) message = "Name is required";
      else if (value.trim().length < 2)
        message = "Name must be at least 2 characters";
    }

    if (name === "email") {
      if (!value.trim()) message = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        message = "Enter a valid email";
    }

    if (name === "password") {
      if (!value.trim()) message = "Password is required";
      else if (value.length < 6)
        message = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSignUp = () => {

    Object.entries(formData).forEach(([key, value]) =>
      validateField(key, value)
    );
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      setErrors((prev) => ({ ...prev, email: "User with this email already exists" }));
      return;
    }

    localStorage.setItem("users", JSON.stringify([...users, formData]));
    toast.success("Account Created");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white flex flex-col justify-center items-center p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h2>
          <p className="mb-6 text-center text-sm">
            please login
          </p>
          <Link
            to="/signin"
            className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-pink-500 transition text-sm"
          >
            SIGN IN
          </Link>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 w-full p-8 md:p-10">
          <h2 className="text-3xl text-purple-700 font-bold mb-4">Create Account</h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="mb-1 px-4 py-2 border w-full rounded-full"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-1 px-4 py-2 border w-full rounded-full"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-1 px-4 py-2 border w-full rounded-full"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

          <button
            onClick={handleSignUp}
            className="bg-pink-500 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-semibold w-full"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
