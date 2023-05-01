import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//*Defining our routes
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/category/:category">
          <ProductList />
        </Route>
        <Route path="/product/:productName">
          <Product />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
