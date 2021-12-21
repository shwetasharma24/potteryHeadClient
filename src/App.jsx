import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import ProductsList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./ScrollToTop";
import Success from "../src/pages/Success";
import TermsAndConditions from "../src/pages/TermsAndConditions";
import Wishlist from "../src/pages/Wishlist";
import Orders from "../src/pages/Orders";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom";
import { useSelector } from "react-redux";


function App() {

  const user = useSelector((state) => state.user.currentUser);
  // console.log("USER: ", user);

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/login" /> }
        </Route>
        <Route path="/products">
          <ProductsList />
        </Route>
        <Route path="/products/:category">
          <ProductsList />
        </Route>
        <Route path="/product/:id">
          <SingleProduct />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/tandc">
          <TermsAndConditions />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
