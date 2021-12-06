import Categories from "./Components/Categories";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Newsletter from "./Components/Newsletter";
import Slider from "./Components/Slider";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Pages/Product";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import Products from "./Components/Products";
import { Button, IconButton, Snackbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Close } from "@material-ui/icons";

function App() {
  const { notifications, success, data } = useSelector((state) => state.user);
  const [snackMsg, setSnackMsg] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(success);
  }, [success]);

  useEffect(() => {
    setSnackMsg(notifications);
  }, [notifications]);

  const handleClose = () => {
    setOpen(false);
  };

  const AuthenticateWrapper = ({ children, data }) => {
    if (!data) {
      setOpen(true);
      setSnackMsg("You must log in first!");
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
          <Route
            path="/cart"
            element={
              <AuthenticateWrapper data={data}>
                <Cart />
              </AuthenticateWrapper>
            }
          />
        </Routes>
        <Footer />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackMsg}
          action={action}
        />
      </div>
    </Router>
  );
}

export default App;
