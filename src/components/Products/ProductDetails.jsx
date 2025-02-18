import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Spin } from "antd";
import ProductPriceDetails from "./ProductPriceDetails";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ProductDetail() {
    const { id, slug } = useParams();
    const [product, setProduct] = useState();
    const [similarProducts, setSimilarProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    console.log(slug);

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

    useEffect(() => {
        axios
            .get(
                `https://gw.texnomart.uz/api/web/v1/product/accessories?id=80619`
            )
            .then((res) => {
                setSimilarProducts(res.data.data.data);
            });
    }, [slug]);

    if (loading)
        return (
            <div className="text-center mt-20">
                <Spin size="large" />
            </div>
        );
    if (error)
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    if (!product)
        return <div className="text-center mt-20">Mahsulot topilmadi</div>;

    if (!similarProducts)
        return <div className="text-center mt-20">Mahsulot topilmadi</div>;

    const aksesuar = similarProducts.slice(0, 1).map((item) => item.products);

    console.log(aksesuar);

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

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">
                    Aksessuarlar
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    {aksesuar[0].map((item, index) => {
                        return (
                            <Link
                                to={`/product/${item.id}`}
                                key={index}
                                className="rounded-[20px] w-[284px] h-[456px] box flex flex-col justify-between"
                            >
                                <div
                                    className="rounded-[20px]  w-[284px] h-[456px] flex flex-col justify-between"
                                >
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
                                                {item.sale_price}{" "}
                                                <span>so'm</span>
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
        </div>
    );
}

export default ProductDetail;
