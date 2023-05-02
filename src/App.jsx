import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import { useHistory } from "react-router-dom";

import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//*Defining our routes
const App = () => {
  const errorP = useSelector((state) => state.product.error);
  const errorC = useSelector((state) => state.category.error);
  const history = useHistory();
  if (errorP || errorC) {
    // !show error component
    alert("Something went wrong !!");
    history.push("/");
  }
  return (
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
  );
};

export default App;
