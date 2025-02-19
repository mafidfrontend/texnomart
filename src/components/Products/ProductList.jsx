import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductList() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        axios
            .get(`https://gw.texnomart.uz/api/common/v1/search/filters`, {
                params: {
                    sort: "-order_count",
                    page: currentPage,
                    category_all: slug,
                    page_size: pageSize,
                },
            })
            .then((res) => {
                const data = res.data.data;
                setProducts(data.products);

                if (data.total_count && pageSize) {
                    setTotalPages(Math.ceil(data.total_count / pageSize));
                } else {
                    setTotalPages(1);
                }
                console.log(data)
            })
            .catch((err) => {
                console.error("API Error:", err);
            });
    }, [slug, currentPage]);

    if (!products.length) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-center mt-6">
                <Pagination
                    current={currentPage}
                    total={totalPages}
                    pageSize={1}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
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
    );
}

export default ProductList;
