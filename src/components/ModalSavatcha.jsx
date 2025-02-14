import React from "react";
import { Button, Modal } from "antd";
import useStore from "./store.js";

function ModalSavatcha({ setIsModalOpen, isModalOpen }) {
    const { cart, updateCartItem } = useStore();
    return (
        <Modal
            title="Savatcha"
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width="80%"
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
                                    onClick={() => updateCartItem(item.id, -1)}
                                >
                                    -
                                </Button>
                                <span>{item.count}</span>
                                <Button
                                    onClick={() => updateCartItem(item.id, 1)}
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
    );
}

export default ModalSavatcha;
