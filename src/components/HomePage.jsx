import React from "react";
import "./main.scss";
import ProductsXit from "./Products/ProductsXit";
import ProductsNew from "./Products/ProductsNew";

function HomePage() {
    return <>
        <ProductsXit />
        <ProductsNew />
    </>;
}

export default HomePage;