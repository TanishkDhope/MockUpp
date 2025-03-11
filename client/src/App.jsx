import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/products/ProductPage";
import MyScene from "./pages/MyScene";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/myScene" element={<MyScene />} />
    </Routes>
  );
}

export default App;
