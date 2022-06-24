import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import SignInAndsignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import checkoutPage from "./pages/checkout/checkout.component";
import { checkUserSession } from "./redux/user/user.actions";

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={checkoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndsignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
