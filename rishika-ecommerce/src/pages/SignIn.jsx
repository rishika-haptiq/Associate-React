import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/AuthSlice";
import { restoreCart } from "../redux/CartSlice";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Live validation
  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  const validate = () => {
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (matchedUser) {
      dispatch(signIn(matchedUser));

      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${matchedUser.email}`)) || [];
      dispatch(restoreCart(savedCart));

      navigate("/");
    } else {
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h2 className="text-3xl text-purple-700 font-bold mb-6">Sign in</h2>

          {errors.general && (
            <p className="text-red-500 text-sm mb-2">{errors.general}</p>
          )}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={credentials.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              value={credentials.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-pink-500 hover:bg-purple-500 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
          >
            SIGN IN
          </button>
        </div>

        {/* Right Side (Banner) */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white flex flex-col justify-center items-center p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hello, Friend!</h2>
          <p className="mb-6 text-sm md:text-base">
            Enter your details
          </p>
          <Link
            to="/signup"
            className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-pink-500 transition"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
