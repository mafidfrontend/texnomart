import React from "react";
import { Button, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import useStore from "../store";

function ProductPriceDetails({ product }) {
    const addToCart = useStore((state) => state.addToCart);

    if (!product) {
        return <div className="text-center text-gray-500">Mahsulot ma'lumotlari yuklanmadi</div>;
    }

    return (
        <div>
            <Card className="w-[344px] p-6">
                <h2 className="text-3xl">{product.sale_price || "Narx mavjud emas"}</h2>
                <p className="py-2 mt-6 mb-4 px-3 text-[16px] bg-gray-300 rounded-md">
                    Muddatli to'lov {" "}
                    <span className="bg-blue-400 p-2 rounded-md text-white font-bold">
                        {product.minimal_loan_price?.min_monthly_price || "Ma'lumot yo'q"} so'm
                    </span> {" "}
                    24 / oy
                </p>
                <p>
                    Buyurtmani rasmiylashtirishda 12 oydan 24 oygacha muddatli
                    to‘lovni tanlashingiz mumkin
                </p>
                <div className="flex mt-4 pb-4 mb-4 justify-between items-center productListBtns">
                    <Button
                        icon={<ShoppingCartOutlined />}
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        Savatchaga
                    </Button>
                    <Button>1 klikda xarid qilish</Button>
                </div>
                <p>
                    Muddatli to'lov rasmiylashtirayotganingizda bizdan va
                    hamkorlardan eng ma'qul takliflarga ega bo'ling.
                </p>
            </Card>
        </div>
    );
}

export default ProductPriceDetails;