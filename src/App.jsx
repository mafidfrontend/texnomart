import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import HeaderHero from "./components/Header";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails"; 
import './App.css'

function App() {
    return (
        <>
            <HeaderHero />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories/:slug" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} /> 
            </Routes>
        </>
    );
}

export default App;