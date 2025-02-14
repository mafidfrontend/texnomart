import React, { useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useStore from "./store";
import { Link } from "react-router-dom";

function Products({ addToCart }) {
    const { products, fetchProducts, loading } = useStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    console.log(products)

    return (
        <div className="grid grid-cols-4 w-full container pt-10">
            {products.map((product, i) => (
                <Link
                    to={`/product/${product.id}`}
                    key={i}
                    className="rounded-[20px] w-[284px] h-[456px] box flex flex-col justify-between"
                >
                    <div
                        key={i}
                        className="rounded-[20px]  w-[284px] h-[456px] flex flex-col justify-between"
                    >
                        <div>
                            <img
                                className="object-center p-5 h-[278px] bg-gray-200 rounded-lg"
                                src={product.image}
                                alt={product.name}
                            />
                            <h3 className="text-[16px] mt-4 mb-4">
                                {product.name}
                            </h3>
                        </div>
                        <div>
                            <span className="bg-[#f4f4f4] p-1 rounded-2xl text-[13px]">
                                {product.axiom_monthly_price}
                            </span>
                            <div className="flex justify-between items-center mt-1">
                                <p>
                                    {product.sale_price} <span>so'm</span>
                                </p>
                                <Button
                                    icon={<ShoppingCartOutlined />}
                                    onClick={() => addToCart(product)}
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Products;
