import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
    const { product } = props;
    const handleApprove = (orderId) => {
        props.isOk(product);
    }
    return (
        <PayPalButtons
        style={{
            color: "silver",
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: "pill",
        }}

        createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: product.precio,
                                },
                            },
                        ],
                    });
                }}

        onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            handleApprove(data.orderID);
        }}

        onError={(err) => {
            // setError(err);
            console.error("PayPal Checkout onError", err);
        }}
        />
    );
}

export default PaypalCheckoutButton