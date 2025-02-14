import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://gw.texnomart.uz/api/web/v1/products/${id}`)
            .then((res) => {
                setProduct(res.data.data); 
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!product) return <div>Product not found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center">
                <img
                    className="w-full md:w-1/2 rounded-lg"
                    src={product.image}
                    alt={product.name}
                />
                <div className="md:ml-8 mt-4 md:mt-0">
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-700 mb-4">
                        {product.description}
                    </p>
                    <p className="text-xl font-semibold mb-4">
                        Price: {product.sale_price} so'm
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;