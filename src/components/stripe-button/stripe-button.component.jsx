import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  // CENT TO DOLLAR CONVERSION
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51LCfGpSHxnEKg2qb6HKrUJy2quDGmAHDSao8aPRnzd8wIv7k8UnwYWcWaCHcEkS1aRjBLqRcv6BTvusEQwYcMxJc00zoEnSUGF";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Shopify"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
