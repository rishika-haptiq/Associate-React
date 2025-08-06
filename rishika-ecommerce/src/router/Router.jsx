import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages";
import Products from "../pages/Products";
import Categories from "../components/Categories";
import About from "../components/About";
import CategoryProduct from "../components/CategoryProduct";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import UserProfile from "../pages/UserProfile";
import AppLayout from "../layout/AppLayout";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import SearchResults from "../components/SearchResult";

const Router =()=>{
     const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <AppLayout />
        </>
      ),
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/products", element: <Products /> },
        { path: "/cart", element: <Cart/> },
        { path: "/wishlist", element: <Wishlist/> },
        { path: "/about", element: <About /> },
        { path: "/categories", element: <Categories /> },
        {path:"/search", element: <SearchResults/>},

       
        { path: "/category/:categoryName", element: <CategoryProduct /> },
      ],
    },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/profile", element: <UserProfile /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default Router;