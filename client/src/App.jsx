import Categories from "./Components/Categories";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Newsletter from "./Components/Newsletter";
import PopularProducts from "./Components/Products";
import Slider from "./Components/Slider";
import Login from "./Pages/Login";
import Product from "./Pages/Product";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Products from "./Components/Products";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Slider />
        <Categories />
        <Products />
        <Newsletter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
