// src/pages/checkout.jsx
import { useEffect, useState } from "react";
import { getcartTotal } from "../utils/cart";
import { BiMinus, BiPlus } from "react-icons/bi";
import getFormattedPrice from "../utils/price-format";
import { useLocation, useNavigate } from "react-router-dom";
import CheckOutDetailsModal from "../components/checkoutDetailsModal";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState(location.state || []);

    useEffect(() => {
        if (location.state == null) {
            navigate("/products");
        }
    }, [location.state, navigate]);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-[#020b1f] relative overflow-y-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,180,255,0.08),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.08),_transparent_30%)] pointer-events-none"></div>

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-[28px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_35px_rgba(0,180,255,0.08)] overflow-hidden">
                        <div className="flex items-center justify-between gap-3 px-6 py-5 bg-[#052c3a] border-b border-cyan-400/20">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-1">
                                    Order Checkout
                                </p>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                    Review & Checkout
                                </h1>
                                <p className="text-sm text-slate-300/80 mt-1">
                                    Check your items and confirm your order
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
                            <div className="flex flex-col gap-4">
                                {cart.map((cartItem, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="w-full rounded-[24px] border border-cyan-400/15 bg-[#d8e2e8] shadow-[0_0_30px_rgba(0,0,0,0.18)] overflow-hidden"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-full md:w-[180px] h-[220px] md:h-[180px] bg-[#eef3f6] flex items-center justify-center border-b md:border-b-0 md:border-r border-cyan-900/10">
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        src={cartItem.product.imageUrl}
                                                        alt={cartItem.product.name}
                                                    />
                                                </div>

                                                <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-[0.18em] text-[#5a7b8f] mb-2">
                                                            {cartItem.product.productId}
                                                        </p>

                                                        <h1 className="text-xl sm:text-2xl font-bold text-[#05394a] break-words">
                                                            {cartItem.product.name}
                                                        </h1>
                                                    </div>

                                                    <div className="w-[210px] h-[50px] border border-cyan-500/20 bg-[#03192d] rounded-full flex overflow-hidden">
                                                        <button
                                                            onClick={() => {
                                                                setCart((prevCart) =>
                                                                    prevCart
                                                                        .map((item, i) =>
                                                                            i === index
                                                                                ? {
                                                                                      ...item,
                                                                                      quantity:
                                                                                          item.quantity - 1,
                                                                                  }
                                                                                : item
                                                                        )
                                                                        .filter(
                                                                            (item) =>
                                                                                item.quantity > 0
                                                                        )
                                                                );
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
                                                                setCart((prevCart) =>
                                                                    prevCart.map((item, i) =>
                                                                        i === index
                                                                            ? {
                                                                                  ...item,
                                                                                  quantity:
                                                                                      item.quantity + 1,
                                                                              }
                                                                            : item
                                                                    )
                                                                );
                                                            }}
                                                            className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-cyan-300 hover:bg-cyan-500/10 transition"
                                                        >
                                                            <BiPlus />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="w-full md:w-[200px] p-5 md:p-4 flex flex-col justify-center items-start md:items-end bg-[#eef3f6] border-t md:border-t-0 md:border-l border-cyan-900/10">
                                                    {cartItem.product.labelledPrice >
                                                        cartItem.product.price && (
                                                        <span className="text-sm text-[#6d8797] line-through">
                                                            {getFormattedPrice(
                                                                cartItem.product.labelledPrice
                                                            )}
                                                        </span>
                                                    )}

                                                    <span className="text-sm text-[#35566a] font-semibold">
                                                        {getFormattedPrice(cartItem.product.price)}
                                                    </span>

                                                    <span className="text-xl text-[#05394a] font-bold">
                                                        {getFormattedPrice(
                                                            cartItem.product.price *
                                                                cartItem.quantity
                                                        )}
                                                    </span>
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

                                <span className="text-3xl font-extrabold text-cyan-300">
                                    {getFormattedPrice(getcartTotal(cart))}
                                </span>
                            </div>

                            <div className="mt-5 rounded-[24px] border border-cyan-400/15 bg-[#03192d] shadow-[0_0_30px_rgba(0,0,0,0.18)] p-4 sm:p-5 flex items-center justify-center">
                                <CheckOutDetailsModal
                                    cart={cart}
                                    onOrderSuccess={() => setCart([])}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}