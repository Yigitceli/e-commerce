import Categories from "./Components/Categories";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Newsletter from "./Components/Newsletter";
import Slider from "./Components/Slider";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Pages/Product";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import Products from "./Components/Products";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider />
                <Categories />
                <Products />
                <Newsletter />
              </>
            }
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path={`/products`} element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
