import Categories from "./Components/Categories";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Newsletter from "./Components/Newsletter";
import PopularProducts from "./Components/Products";
import Slider from "./Components/Slider";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Products from "./Pages/ProductList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Cart />
        <Newsletter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
