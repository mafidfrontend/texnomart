import React, { useEffect } from "react";
import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useStore from "../store";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function ProductsXit() {
    const { products, fetchProductsXit, loading } = useStore();
    const addToCart = useStore((state) => state.addToCart);

    useEffect(() => {
        fetchProductsXit();
    }, []);

    if (loading) return <div className="container mx-auto"><Loading /></div>;

    return (
        <div className="container mx-auto relative">
            <div className="absolute right-0 top-3 text-[20px] p-4">
                {products.length > 4 ? (
                    <Link to={'/allProducts'}>
                        <Button>
                            Barchasini ko'rish <ArrowRightOutlined />
                        </Button>
                    </Link>
                ) : (
                    ""
                )}
            </div>
            <div className="absolute left-0 font-bold top-3 text-2xl p-4">
                Xit Savdo
            </div>
            <div className="grid grid-cols-4 w-full container pt-20">
                {products.slice(0, 4).map((product, i) => (
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductsXit;
