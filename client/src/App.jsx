import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/products/ProductPage";
import MyScene from "./pages/MyScene";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/myScene" element={<MyScene />} />
    </Routes>
  );
}

export default App;
