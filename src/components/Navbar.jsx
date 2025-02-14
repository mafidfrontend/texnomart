import React, { useState } from "react";
import { Button, Input } from "antd";
import {
    MenuOutlined,
    HeartOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import useStore from "./store";
import ModalSavatcha from "./ModalSavatcha";

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cart } = useStore();

    const totalPrice = cart.reduce((sum, item) => sum + item.sale_price * item.count, 0);

    return (
        <>
            <nav>
                <div className="container py-5">
                    <div className="flex mb-5 items-center">
                        <Link to={'/'}><img src="/heroLogo.svg" alt="" /></Link>
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
                                    Savatcha ({cart.reduce((sum, item) => sum + item.count, 0)})
                                </p>
                            </div>
                        </div>
                    </div>
                    <Hero />
                </div>
            </nav>

            <ModalSavatcha setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
}

export default Navbar;