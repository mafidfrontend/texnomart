import { UserOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";

function LoginModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                title="Login Modal"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                Log in Modal
            </Modal>
        </>
    );
}

export default LoginModal;
