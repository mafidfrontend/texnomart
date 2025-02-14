import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        axios
            .get(`https://gw.texnomart.uz/api/web/v1/product/detail?id=${id}`)
            .then((res) => {
                setProduct(res.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    if (!product) return <div>Loading...</div>;

    console.log(product);

    return (
        <div className="container mx-auto p-4 flex md:flex-row justify-between">
            <div className="w-full md:w-1/2">
                <img
                    className="w-auto rounded-lg shadow-lg h-[500px]"
                    src={product.large_images.slice(0, 1).map((item) => item)}
                    alt={product.name}
                />
            </div>
            <div className="w-full md:w-1/2">
                <Card className="p-6">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-500">
                        Hajmi: <span className="font-semibold">1.7L</span>
                    </p>
                    <p className="text-gray-500">
                        Max Yuk:{" "}
                        <span className="font-semibold">
                            {product.main_characters
                                .slice(1, 2)
                                .map((item) => item.value)}
                        </span>
                    </p>
                    <p className="text-xl font-semibold mt-4">
                        {product.sale_price}
                    </p>
                    <p className="text-sm text-gray-500">
                        Muddati to'lov:{" "}
                        <span className="text-blue-500">
                            {product.minimal_loan_price.min_monthly_price} / {product.minimal_loan_price.month_number} oy
                        </span>
                    </p>
                    <div className="flex gap-4 mt-6">
                        <Button
                            type="primary"
                            className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
                            icon={<ShoppingCartOutlined />}
                        >
                            Savatchaga
                        </Button>
                        <Button className="bg-gray-300 px-6 py-2 rounded-lg">
                            Birgina klik orqali harid
                        </Button>
                    </div>
                    <p className="text-green-500 mt-4">
                        Do‘kondan olib ketish bepul ({product.is_can_loan_order}{" "}
                        ta do‘konda mavjud)
                    </p>
                    <p className="text-gray-500 text-sm">
                        Kafolat: {product.guarantee}
                    </p>
                </Card>
            </div>
        </div>
    );
}

export default ProductDetail;
