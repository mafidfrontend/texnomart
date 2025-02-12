import React, { useState } from "react";
import Navbar from "./Navbar";
import "./main.scss";
import Products from "./Products";

function HomePage() {
    const [cart, setCart] = useState([]); 

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, count: item.count * 2 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, count: 1 }];
            }
        });
    };

    return (
        <>
            <Navbar cart={cart} />
            <Products addToCart={addToCart} />
        </>
    );
}

export default HomePage;
