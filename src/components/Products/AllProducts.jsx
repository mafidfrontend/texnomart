import React, { useEffect, useState } from "react";
import { Button, Checkbox, Collapse } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

function AllProducts() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        axios
            .get(
                "https://gw.texnomart.uz/api/common/v1/search/filters?sort=-order_count&page=1&category_all"
            )
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    if (!products) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <div className="container mx-auto flex justify-between pt-7 pb-6">
                <h3>Xit savdo Toshkentda</h3>
                <p>Tovarlar 20/60</p>
            </div>
            <hr />
            <div className="container mx-auto flex justify-between">
                <div>
                    <Collapse bordered={false} defaultActiveKey={["1"]}>
                        {products.filter.map((item) => (
                            <Collapse.Panel
                                key={item.id}
                                header={
                                    <span>
                                        <span className="font-bold">
                                            {item.name}
                                        </span>
                                        <span className="text-gray-500 ml-2">
                                            {item.count}
                                        </span>
                                    </span>
                                }
                            >
                                {item.values.map((value) => (
                                    <div key={value.id}>
                                        <Checkbox>
                                            {value.value} {value.count}
                                        </Checkbox>
                                    </div>
                                ))}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                </div>
                <div className="w-[75%] overflow-x-auto flex allProducts gap-4" style={{ whiteSpace: "nowrap" }}>
                    {products.products.map((product) => (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="rounded-[20px] box w-[284px] h-[456px] flex flex-col justify-between"
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
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllProducts;
