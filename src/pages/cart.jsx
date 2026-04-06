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
        <div className="w-full min-h-[calc(100vh-100px)] bg-[#020b1f] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,180,255,0.08),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.08),_transparent_30%)] pointer-events-none"></div>

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-[28px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_35px_rgba(0,180,255,0.08)] overflow-hidden">
                        <div className="flex items-center justify-between gap-3 px-6 py-5 bg-[#052c3a] border-b border-cyan-400/20">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-1">
                                    Shopping Cart
                                </p>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                    My Cart
                                </h1>
                                <p className="text-sm text-slate-300/80 mt-1">
                                    Review your selected products before checkout
                                </p>
                            </div>

                            <div className="px-4 py-2 rounded-2xl border border-cyan-400/15 bg-[#03192d] text-right shadow-[0_0_20px_rgba(0,180,255,0.05)]">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Items
                                </p>
                                <p className="text-lg font-bold text-cyan-300">{cart.length}</p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5">
                            {cart.length === 0 ? (
                                <div className="rounded-[24px] border border-cyan-400/15 bg-[#d8e2e8] shadow-[0_0_30px_rgba(0,0,0,0.18)] p-10 text-center">
                                    <p className="text-2xl font-bold text-[#05394a] mb-2">
                                        Your cart is empty
                                    </p>
                                    <p className="text-[#35566a]">
                                        Add products to continue shopping.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-4">
                                        {cart.map((cartItem, index) => {
                                            const product = cartItem.product;

                                            return (
                                                <div
                                                    key={product.productId + "-" + index}
                                                    className="w-full rounded-[24px] border border-cyan-400/15 bg-[#d8e2e8] shadow-[0_0_30px_rgba(0,0,0,0.18)] overflow-hidden"
                                                >
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="w-full md:w-[180px] h-[220px] md:h-[180px] bg-[#eef3f6] flex items-center justify-center border-b md:border-b-0 md:border-r border-cyan-900/10">
                                                            <img
                                                                className="h-full w-full object-cover"
                                                                src={product.imageUrl}
                                                                alt={product.name}
                                                            />
                                                        </div>

                                                        <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                                                            <div>
                                                                <p className="text-xs uppercase tracking-[0.18em] text-[#5a7b8f] mb-2">
                                                                    {product.productId}
                                                                </p>

                                                                <h1 className="text-xl sm:text-2xl font-bold text-[#05394a] break-words">
                                                                    {product.name}
                                                                </h1>

                                                                <div className="mt-3 flex flex-wrap items-end gap-3">
                                                                    <p className="text-xl font-bold text-[#00a8ff]">
                                                                        Rs. {Number(product.price || 0).toLocaleString()}
                                                                    </p>

                                                                    {Number(product.labelledPrice || 0) > Number(product.price || 0) && (
                                                                        <span className="text-sm text-[#6d8797] line-through">
                                                                            Rs. {Number(product.labelledPrice || 0).toLocaleString()}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                                <div className="w-[210px] h-[50px] border border-cyan-500/20 bg-[#03192d] rounded-full flex overflow-hidden">
                                                                    <button
                                                                        onClick={() => {
                                                                            decreaseQty(product);
                                                                        }}
                                                                        className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-cyan-300 hover:bg-cyan-500/10 transition"
                                                                    >
                                                                        <BiMinus />
                                                                    </button>

                                                                    <span className="w-[70px] h-full flex justify-center items-center text-lg font-bold text-white">
                                                                        {cartItem.quantity}
                                                                    </span>

                                                                    <button
                                                                        onClick={() => {
                                                                            increaseQty(product);
                                                                        }}
                                                                        className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-cyan-300 hover:bg-cyan-500/10 transition"
                                                                    >
                                                                        <BiPlus />
                                                                    </button>
                                                                </div>

                                                                <div className="text-left sm:text-right">
                                                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#5a7b8f] mb-1">
                                                                        Subtotal
                                                                    </p>
                                                                    <span className="text-xl font-bold text-[#05394a]">
                                                                        Rs. {(Number(product.price || 0) * Number(cartItem.quantity || 0)).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-5 rounded-[24px] border border-cyan-400/15 bg-[#052c3a] shadow-[0_0_30px_rgba(0,0,0,0.18)] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-1">
                                                Order Summary
                                            </p>
                                            <h2 className="text-2xl font-bold text-white">Total</h2>
                                        </div>

                                        <p className="text-3xl font-extrabold text-cyan-300">
                                            Rs. {total.toLocaleString()}
                                        </p>
                                    </div>

                                    <Link
                                        state={cart}
                                        to="/checkout"
                                        className="mt-5 w-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-lg font-bold py-4 rounded-[20px] hover:opacity-90 transition flex items-center justify-center shadow-[0_10px_25px_rgba(14,165,233,0.25)]"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}