import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductList() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let categoryFilter = category ? `&category_all=${category}` : "";
        axios
            .get(
                `https://gw.texnomart.uz/api/common/v1/search/filters?sort=-order_count&page=1${categoryFilter}`
            )
            .then((res) => {
                setProducts(res.data.products);
            });
    }, [category]);

    return (
        <div>
            <h2>Mahsulotlar ro‘yxati: {category ? category : "Barcha kategoriyalar"}</h2>
            <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                        <h3>{product.name}</h3>
                        <p>{product.sale_price} so‘m</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;