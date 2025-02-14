import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useMyStore from "./store";

function Hero() {
    const { products, setProducts, loading, setLoading } = useMyStore(); 

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://gw.texnomart.uz/api/web/v1/header/top-categories")
            .then((res) => {
                setProducts(res.data.data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <div className="flex items-center p-4 justify-between container m-auto">
                {products.map((item, index) => (
                    <Link to={`/categories/${item.slug}`} key={index}>
                        <div>
                            <p>{item.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Hero;