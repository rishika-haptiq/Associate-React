import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  decrementQuantity,
  addToCart,
  clearCart,
} from "../redux/CartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const handleCheckout = () => {
    if (isLoggedIn) {
      // Proceed to checkout or payment page
      navigate("/"); // You can change this to the actual checkout route
    } else {
      // Redirect to login
      navigate("/signin");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-4 text-gray-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right space-y-4">
            <p className="text-xl font-semibold">
              Total: ₹{getTotal().toFixed(2)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-purple-500 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition-colors"
              >
                Check Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
