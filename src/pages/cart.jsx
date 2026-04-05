import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { addToCart, getcart, getcartTotal } from "../utils/cart";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);

    function normalizeCartItems(rawCart) {
        if (!Array.isArray(rawCart)) return [];

        return rawCart
            .map((item) => {
                const product = item?.product || item;

                if (!product || typeof product !== "object") return null;
                if (!product.productId) return null;

                return {
                    product: {
                        ...product,
                        price: Number(product.price || 0),
                        labelledPrice: Number(product.labelledPrice || 0),
                        imageUrl: product.imageUrl || product.imageUrls?.[0] || "",
                    },
                    quantity: Number(item?.quantity || 1),
                };
            })
            .filter((item) => item && item.quantity > 0);
    }

    function refreshCart() {
        const rawCart = getcart();
        const normalizedCart = normalizeCartItems(rawCart);
        setCart(normalizedCart);
        localStorage.setItem("cart", JSON.stringify(normalizedCart));
    }

    useEffect(() => {
        refreshCart();

        function handleCartUpdated() {
            refreshCart();
        }

        window.addEventListener("cartUpdated", handleCartUpdated);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdated);
        };
    }, []);

    function increaseQty(product) {
        addToCart(product, 1);
        refreshCart();
        window.dispatchEvent(new Event("cartUpdated"));
    }

    function decreaseQty(product) {
        addToCart(product, -1);
        refreshCart();
        window.dispatchEvent(new Event("cartUpdated"));
    }

    const total = cart.reduce((sum, item) => {
        return sum + Number(item.product.price || 0) * Number(item.quantity || 0);
    }, 0);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-gray-100 overflow-y-auto">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
                <h1 className="text-3xl font-bold text-gray-800">My Cart</h1>

                {cart.length === 0 ? (
                    <div className="w-full max-w-[800px] bg-white rounded-lg shadow p-10 text-center">
                        <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        {cart.map((cartItem, index) => {
                            const product = cartItem.product;

                            return (
                                <div
                                    key={product.productId + "-" + index}
                                    className="w-full max-w-[800px] min-h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden"
                                >
                                    <img
                                        className="h-[150px] w-[150px] object-cover"
                                        src={product.imageUrl}
                                        alt={product.name}
                                    />

                                    <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                {product.productId}
                                            </p>
                                            <h1 className="text-xl font-bold text-gray-800">
                                                {product.name}
                                            </h1>
                                            <p className="text-lg font-semibold text-green-600">
                                                Rs. {Number(product.price || 0).toLocaleString()}
                                            </p>

                                            {Number(product.labelledPrice || 0) > Number(product.price || 0) && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    Rs. {Number(product.labelledPrice || 0).toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        <div className="w-[210px] h-[50px] border border-accent rounded-full flex overflow-hidden">
                                            <button
                                                onClick={() => {
                                                    decreaseQty(product);
                                                }}
                                                className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent transition"
                                            >
                                                <BiMinus />
                                            </button>

                                            <span className="w-[70px] h-full flex justify-center items-center text-lg font-bold text-gray-700">
                                                {cartItem.quantity}
                                            </span>

                                            <button
                                                onClick={() => {
                                                    increaseQty(product);
                                                }}
                                                className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent transition"
                                            >
                                                <BiPlus />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-[150px] flex flex-col items-end pr-2 justify-center bg-red-100 p-4">
                                        <span className="text-lg font-bold text-red-600 ml-2">
                                            Rs. {(Number(product.price || 0) * Number(cartItem.quantity || 0)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="w-full max-w-[800px] bg-white rounded-lg shadow p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Total</h2>
                            <p className="text-2xl font-bold text-green-600">
                                Rs. {total.toLocaleString()}
                            </p>
                        </div>

                        <Link
                            state={cart}
                            to="/checkout"
                            className="w-full max-w-[800px] bg-green-600 text-white text-lg font-bold py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                        >
                            Proceed to Checkout
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}