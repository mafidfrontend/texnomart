import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
    cart: [],
    products: [],
    productsNew: [],
    productTitle: [],
    loading: true,

    fetchProductsXit: async () => {
        const res = await axios.get(
            "https://gw.texnomart.uz/api/web/v1/home/special-products?type=hit_products"
        );
        set({ products: res.data.data.data, loading: false });
    },

    fetchProductsNew: async () => {
        const res = await axios.get(
            "https://gw.texnomart.uz/api/web/v1/home/special-products?type=new_products"
        );
        set({ productsNew: res.data.data.data, loading: false });
    },

    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find(
                (item) => item.id === product.id
            );
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, count: item.count + 1 }
                            : item
                    ),
                };
            } else {
                return { cart: [...state.cart, { ...product, count: 1 }] };
            }
        }),

    updateCartItem: (id, amount) =>
        set((state) => ({
            cart: state.cart
                .map((item) =>
                    item.id === id
                        ? { ...item, count: Math.max(0, item.count + amount) }
                        : item
                )
                .filter((item) => item.count > 0),
        })),
    setProducts: (products) => set({ products }),
    setProductTitle: (productTitle) => set({ productTitle }),
    setLoading: (loading) => set({ loading }),
}));

export default useStore;