import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import SignInAndsignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import checkoutPage from "./pages/checkout/checkout.component";

class App extends React.Component {
  // AUTHENTICATION USING OBSERVER
  // unsubscribeFromAuth = null;
  // componentDidMount() {
  // const { setCurrentUser } = this.props;

  // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //   if (userAuth) {
  //     const userRef = await createUserProfileDocument(userAuth);

  //     onSnapshot(userRef, (snapshot) => {
  //       setCurrentUser({
  //         id: snapshot.id,
  //         ...snapshot.data(),
  //       });
  //     });
  //   } else {
  //     setCurrentUser(userAuth);
  //   }
  // });
  // }

  // componentWillUnmount() {
  //   // this.unsubscribeFromAuth();
  // }

  render() {
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
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndsignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
