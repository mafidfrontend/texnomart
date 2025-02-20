import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Spin } from "antd";
import ProductPriceDetails from "./ProductPriceDetails";
import Aksessuarlar from "./Aksessuarlar";
import Loading from "./Loading";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        axios
            .get(`https://gw.texnomart.uz/api/web/v1/product/detail?id=${id}`)
            .then((res) => {
                if (res.data?.data?.data) {
                    setProduct(res.data.data.data);
                } else {
                    setError("Mahsulot topilmadi");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                setLoading(false);
            });
    }, [id]);



    if (loading)
        return <div className="container mx-auto"><Loading /></div>;
    if (!product)
        return <div className="container mx-auto"><Loading /></div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <img
                        className="w-auto rounded-lg shadow-lg h-[500px]"
                        src={
                            product.large_images?.length
                                ? product.large_images[0]
                                : "https://via.placeholder.com/500"
                        }
                        alt={product.name || "Mahsulot nomi yo'q"}
                    />
                </div>
                <div>
                    <Card className="w-[512px] p-6">
                        <h3>Mahsulot haqida qisqacha</h3>
                        <div className="mt-5 mb-4">
                            {product.main_characters?.length ? (
                                product.main_characters.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex text-[#767676] justify-evenly items-end gap-3"
                                    >
                                        <p className="text-[14px] w-full">
                                            {item.name}
                                        </p>
                                        <div className="w-full dotted"></div>
                                        <p className="text-[16px] w-full text-black flex justify-end">
                                            {item.value}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">
                                    Xususiyatlar mavjud emas
                                </p>
                            )}
                        </div>
                        <a href="#">
                            <span className="mt-4">Barcha xususiyatlar</span>
                        </a>
                    </Card>
                </div>
                <ProductPriceDetails product={product} />
            </div>

            <Aksessuarlar />
        </div>
    );
}

export default ProductDetail;
