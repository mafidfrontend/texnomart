import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import HeaderHero from "./components/Header";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <HeaderHero />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/category=:category" element={<ProductList />} />
            </Routes>
        </>
    );
}

export default App;