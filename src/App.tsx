import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./routes/Home";
import ScrollTop from "./components/ScrollTop";
import ProductPage from "./routes/ProductPage";
import Cart from "./routes/Cart";
import Category from "./routes/Category";
import Checkout from "./routes/Checkout";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
