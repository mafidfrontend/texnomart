import React, { useEffect, useState } from "react";
import { Checkbox, Collapse } from "antd";
import axios from "axios";

function AllProducts() {
    const [products, setProducts] = useState();

    useEffect(() => {
        axios
            .get(
                `https://gw.texnomart.uz/api/common/v1/search/filters?sort=-order_count&page=1&category_all`
            )
            .then((res) => {
                setProducts(res.data.data);
            });
    }, []);

    if (!products) {
        return <div>Loading ...</div>;
    }

    console.log(products);
    return (
        <div>
            <div>
                <div className="container mx-auto flex justify-between pt-7 pb-6">
                    <h3>Xit savdo Toshkentda</h3>
                    <p>Tovarlar 20/60</p>
                </div>
                <hr />
            </div>
            <div className="container mx-auto">
                <Collapse
                    bordered={false}
                    defaultActiveKey={["1"]}
                    items={products.filter.map((item) => {
                        return {
                            key: item.id,
                            label: (
                                <span>
                                    <span className="font-bold">
                                        {item.name}
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        {item.count}
                                    </span>
                                </span>
                            ),
                            children: (
                                <div>
                                    {item.values.map((value) => {
                                        return (
                                            <div key={value.id}>
                                                <Checkbox>
                                                    {value.value} {value.count}
                                                </Checkbox>
                                            </div>
                                        );
                                    })}
                                </div>
                            ),
                        };
                    })}
                />
            </div>
        </div>
    );
}

export default AllProducts;
