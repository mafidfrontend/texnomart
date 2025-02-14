import React from "react";
import "./main.scss";
import Products from "./Products";
import useStore from "./store";

function HomePage() {
    const addToCart = useStore((state) => state.addToCart);

    return <Products addToCart={addToCart} />;
}

export default HomePage;