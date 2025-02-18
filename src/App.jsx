import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import HeaderHero from "./components/Header";
import ProductList from "./components/Products/ProductList";
import Navbar from "./components/Navbar";
import "./App.css";
import ProductDetails from "./components/Products/ProductDetails";
import AllProducts from "./components/Products/AllProducts";

function App() {
    return (
        <>
            <HeaderHero />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories/:slug" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/allProducts" element={<AllProducts />} />
            </Routes>
        </>
    );
}

export default App;
