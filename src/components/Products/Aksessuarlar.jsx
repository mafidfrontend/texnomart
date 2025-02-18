import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

function Aksessuarlar() {
    const [similarProducts, setSimilarProducts] = useState();

    useEffect(() => {
        axios
            .get(
                `https://gw.texnomart.uz/api/web/v1/product/accessories?id=80619`
            )
            .then((res) => {
                setSimilarProducts(res.data.data.data);
            });
    }, []);

    if(!similarProducts) {
        return <div>Loading ...</div>
    }

    const aksesuar = similarProducts.slice(0, 1).map((item) => item.products);
    console.log(similarProducts)

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Aksessuarlar</h2>
            <div className="grid grid-cols-4 gap-4">
                {aksesuar[0].map((item, index) => {
                    return (
                        <Link
                            to={`/product/${item.id}`}
                            key={index}
                            className="rounded-[20px] w-[284px] h-[456px] box flex flex-col justify-between"
                        >
                            <div className="rounded-[20px]  w-[284px] h-[456px] flex flex-col justify-between">
                                <div>
                                    <img
                                        className="object-center p-5 h-[278px] bg-gray-200 rounded-lg"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <h3 className="text-[16px] mt-4 mb-4">
                                        {item.name}
                                    </h3>
                                </div>
                                <div>
                                    <span className="bg-[#f4f4f4] p-1 rounded-2xl text-[13px]">
                                        {item.axiom_monthly_price}
                                    </span>
                                    <div className="flex justify-between items-center mt-1">
                                        <p>
                                            {item.sale_price} <span>so'm</span>
                                        </p>
                                        <Button
                                            icon={<ShoppingCartOutlined />}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(item);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Aksessuarlar;
