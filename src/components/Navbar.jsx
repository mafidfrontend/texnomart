import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import {
    MenuOutlined,
    HeartOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import Hero from "./Hero";

function Navbar({ cart, updateCartItem }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.sale_price * item.count,
        0
    );

    return (
        <>
            <nav>
                <div className="container py-5">
                    <div className="flex mb-5 items-center">
                        <img src="/heroLogo.svg" alt="" />
                        <Button className="button" icon={<MenuOutlined />}>
                            Katalog
                        </Button>
                        <Input className="input" placeholder="Qidirish" />
                        <div className="flex ml-12 gap-10">
                            <div className="flex flex-col items-center">
                                <UserOutlined />
                                <p>Kirish</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <HeartOutlined />
                                <p>Sevimlilar</p>
                            </div>
                            <div
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <ShoppingCartOutlined />
                                <p>
                                    Savatcha (
                                    {cart.reduce(
                                        (sum, item) => sum + item.count,
                                        0
                                    )}
                                    )
                                </p>
                            </div>
                        </div>
                    </div>
                    <Hero />
                </div>
            </nav>

            <Modal
                title="Savatcha"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                {cart.length === 0 ? (
                    <p>Savatcha bo‘sh</p>
                ) : (
                    <>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-3 border-b"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16"
                                />
                                <p className="text-lg">{item.name}</p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() =>
                                            updateCartItem(item.id, -1)
                                        }
                                    >
                                        -
                                    </Button>
                                    <span>{item.count}</span>
                                    <Button
                                        onClick={() =>
                                            updateCartItem(item.id, 1)
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                                <p>{item.sale_price * item.count} so'm</p>
                            </div>
                        ))}
                        <div className="text-right mt-4">
                            <h3 className="text-xl font-bold">
                                Jami: {totalPrice} so'm
                            </h3>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}

export default Navbar;
