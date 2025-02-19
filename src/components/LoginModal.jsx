import { UserOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function LoginModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <UserOutlined />
                <p>Kirish</p>
            </div>
            <Modal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                footer={false}
            >
                <div className="p-4 flex flex-col">
                    <h2 className="text-2xl font-bold text-center mb-2">
                        Kirish yoki Ro'yxatdan o'tish
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-lg flex flex-col gap-2">
                        <label>Telefon</label>
                        <input
                            className="block border border-gray-400 p-2 rounded"
                            size="large"
                            type="number"
                            {...register("phone")}
                        />
                    </div>
                    <div className="text-lg flex flex-col gap-2">
                        <label>Ism</label>
                        <input
                            className="block border border-gray-400 p-2 rounded"
                            size="large"
                            {...register("name", { required: true })}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button htmlType="submit" className="mt-2 text-lg" type="primary">
                            Kodni olish
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default LoginModal;
