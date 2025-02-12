import React, { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import { Button, Input } from "antd";
import {
    MenuOutlined,
    HeartOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";

function Navbar({ cart }) {
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <Header />
            <div>
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
                                    className="relative flex flex-col items-center"
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
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
                                    {hovered && cart.length > 0 && (
                                        <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-64 p-4">
                                            {cart.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-3 mb-2"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-10 h-10"
                                                    />
                                                    <span className="text-sm">
                                                        {item.name}{" "}
                                                        <b>({item.count}x)</b>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Hero />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
