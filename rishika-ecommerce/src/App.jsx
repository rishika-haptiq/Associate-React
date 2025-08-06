
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Router from "./router/Router";

function App() {
 return(
  <div>
    <Router/>
    <ToastContainer position="top-right" autoClose={2000} />
  </div>
 )
}

export default App;
