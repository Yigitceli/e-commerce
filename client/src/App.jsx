import Categories from "./Components/Categories";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Newsletter from "./Components/Newsletter";
import PopularProducts from "./Components/PopularProducts";
import Slider from "./Components/Slider";
import Products from "./Pages/Products";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Products/>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
