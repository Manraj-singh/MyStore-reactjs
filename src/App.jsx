import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//*Defining our routes
const App = () => {
  const errorP = useSelector((state) => state.product.error);
  const errorC = useSelector((state) => state.category.error);
  if (errorP || errorC) {
    // !show error component
    return <h1>Something went wrong, try refreshing the page</h1>;
  }
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
