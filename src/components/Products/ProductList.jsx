import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Collapse, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SiderFilterValue from "./SiderFilterValue";
import Loading from "./Loading";

function ProductList() {
    const { slug } = useParams();
    const [products, setProducts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axios
            .get(
                `https://gw.texnomart.uz/api/common/v1/search/filters?sort=-order_count&page=${currentPage}&category_all=${slug}`
            )
            .then((res) => {
                setProducts(res.data.data);
                if (!products) {
                    return <div className="container mx-auto"><Loading /></div>;
                }
                const pagination = products.pagination;
                setTotalPages(
                    Math.ceil(pagination.total_count / pagination.page_size)
                );
            });
    }, [slug, currentPage]);

    if (!products && slug) {
        return <div className="container mx-auto"><Loading /></div>;
    }

    if (!totalPages) {
        return <div className="container mx-auto"><Loading /></div>;
    }

    return (
        <div>
            <div className="flex justify-center mt-6 space-x-2">
                {totalPages > 1 &&
                    Array(totalPages)
                        .fill()
                        .map((_, index) => (
                            <Button
                                key={index}
                                type={
                                    currentPage === index + 1
                                        ? "primary"
                                        : "default"
                                }
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
            </div>
            <div className="container mx-auto flex flex-col">
                <div className="flex">
                    <Collapse
                        bordered={false}
                        defaultActiveKey={["1"]}
                        items={products.filter.map((item) => {
                            return {
                                key: item.id,
                                label: (
                                    <span>
                                        <span className="font-bold">
                                            {item.name}
                                        </span>
                                        <span className="text-gray-500 ml-2">
                                            {item.count}
                                        </span>
                                    </span>
                                ),
                                children: (
                                    <SiderFilterValue values={item.values} />
                                ),
                            };
                        })}
                    />

                    <div className="grid grid-cols-4 gap-4 container mx-auto">
                        {products.products.map((product, i) => (
                            <Link
                                to={`/product/${product.id}`}
                                key={i}
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
                                            {product.sale_price}{" "}
                                            <span>so'm</span>
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
        </div>
    );
}

export default ProductList;
