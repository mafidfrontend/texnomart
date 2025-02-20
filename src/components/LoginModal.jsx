import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function LoginModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [firstPageLogin, setFirstPageLogin] = useState("first");
    function onSubmit(data) {
        console.log(data.phone);
        setUserNumber(data.phone);
        setLoading(true);
        axios
            .post(
                "https://gateway.texnomart.uz/api/common/v1/user/register",
                data
            )
            .then((res) => {
                console.log(res.data);
                message.success("Ishladi");
                setLoading(false);
            })
            .catch(() => {
                message.error("Api bilan xatolik");
            });
    }
    // setTimeout(() => {
    //     setFirstPageLogin("first");
    // }, 60000);
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
                {firstPageLogin === "first" ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-4 flex flex-col">
                            <h2 className="text-2xl font-bold text-center mb-2">
                                Kirish yoki Ro'yxatdan o'tish
                            </h2>
                        </div>
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
                                {...register("first_name", { required: true })}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button
                                size="large"
                                loading={loading}
                                className="mt-2 text-lg"
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                    setFirstPageLogin("second");
                                }}
                            >
                                Kodni olish
                            </Button>
                        </div>
                    </form>
                ) : (
                    <form>
                        <div className="p-4 flex flex-col">
                            <h2 className="text-2xl font-bold text-center mb-2">
                                SMS kodni kiriting
                            </h2>
                            <p className="text-m text-center mb-2">
                                Raqamga kod yuborildi
                            </p>
                            <p className="text-m text-center mb-2">
                            </p>
                            <input
                                className="block border border-gray-400 p-2 rounded"
                                size="large"
                                type="number"
                            />
                            <Button icon={<ArrowLeftOutlined />} onClick={() => {
                                setFirstPageLogin("first")
                            }} className="relative top-[-130px]" />
                        </div>
                    </form>
                )}
            </Modal>
        </>
    );
}

export default LoginModal;
