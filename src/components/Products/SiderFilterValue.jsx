import { CaretUpOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import React, { useState } from "react";

function SiderFilterValue({ values }) {
    const [expended, setExpended] = useState(false);
    return (
        <div>
            {values.length > 10 && expended === false ? (
                <div>
                    {values.slice(0, 10).map((value) => {
                        return (
                            <div key={value.id}>
                                <Checkbox>
                                    {value.value} {value.count}
                                </Checkbox>
                            </div>
                        );
                    })}
                </div>
            ) : (
                values.map((value) => {
                    return (
                        <div key={value.id}>
                            <Checkbox>
                                {value.value} {value.count}
                            </Checkbox>
                        </div>
                    );
                })
            )}
            {values.length > 10 ? (
                <Button
                    onClick={() => {
                        setExpended(!expended);
                    }}
                    icon={
                        expended ? <CaretUpOutlined /> : <CaretDownOutlined />
                    }
                >
                    {expended ? "Yopish" : "Ko'proq ko'rsatish"}
                </Button>
            ) : (
                ""
            )}
        </div>
    );
}

export default SiderFilterValue;
