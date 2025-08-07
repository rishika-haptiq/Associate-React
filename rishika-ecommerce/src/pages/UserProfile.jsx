import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { signIn } from "../redux/AuthSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      setFormData(user);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let error = "";
    if (name === "name" && (!value.trim() || value.length < 3)) {
      error = "Name must be at least 3 characters.";
    } else if (name === "phone" && !/^\d{10}$/.test(value)) {
      error = "Phone number must be exactly 10 digits.";
    } else if (name === "address" && (!value.trim() || value.length < 10)) {
      error = "Address must be at least 10 characters.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim() || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.address?.trim() || formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setIsEditing(false);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, ...formData } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(formData));
    dispatch(signIn(formData));

    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-md mt-8 relative">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Your Profile
        </h2>

        {/* Tooltip */}
        {!isEditing && (
          <p className="text-sm text-gray-500 italic mb-4 text-center">
            Click “Edit Profile” to update your details.
          </p>
        )}

        <div
          
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded mt-1 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                disabled
                className="w-full p-2 border rounded mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded mt-1 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="text-gray-600">Address</label>
              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded mt-1 resize-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                rows={3}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(user);
                  setErrors({});
                }}
                className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Cart & Wishlist Cards */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          href="/cart"
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition"
        >
          <FaShoppingCart className="text-[#3C4B51] text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Your Cart</h3>
            <p className="text-sm text-gray-500">
              View products added to your cart
            </p>
          </div>
        </a>

        <a
          href="/wishlist"
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition"
        >
          <FaHeart className="text-pink-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Your Wishlist
            </h3>

          </div>
        </a>
      </div>
    </div>
  );
}
