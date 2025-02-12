import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Products({ addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("https://gw.texnomart.uz/api/web/v1/home/special-products?type=hit_products")
            .then((response) => {
                setProducts(response.data.data.data);
            });
    }, []);

    return (
        <div className="grid grid-cols-4 w-full container pt-10">
            {products.map((product) => (
                <div key={product.id} className="rounded-[20px] box w-[284px] h-[456px] flex flex-col justify-between">
                    <div>
                        <img className="object-center p-5" src={product.image} alt={product.name} />
                        <h3 className="text-[16px] mt-4 mb-4">{product.name}</h3>
                    </div>
                    <div>
                        <span className="bg-[#f4f4f4] p-1 rounded-2xl text-[13px]">{product.axiom_monthly_price}</span>
                        <div className="flex justify-between items-center mt-1">
                            <p>{product.sale_price} <span>so'm</span></p>
                            <Button icon={<ShoppingCartOutlined />} onClick={() => addToCart(product)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Products;