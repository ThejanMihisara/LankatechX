import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

import ImageSlideShow from "../components/imageSlideShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart, getcart } from "../utils/cart";
import LoadingAnimation from "../components/LoadingAnimation";

export default function Overview() {
    const params = useParams();
    const [product, setProduct] = useState(null);

    //fetch product details using params.productId and display them here
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products/" + params.productId).then(
            (response) => {
                setProduct(response.data);
            });
    }, []);

    return (
        <div className="min-h-[calc(100vh-100px)] w-full bg-[#020b1f] relative overflow-hidden px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,180,255,0.08),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.08),_transparent_30%)] pointer-events-none"></div>

            <div className="relative z-10 w-full h-full">
                {product == null ? (
                    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto rounded-[24px] sm:rounded-[28px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_35px_rgba(0,180,255,0.08)] overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            <div className="bg-gradient-to-br from-[#041a2d] to-[#052c3a] border-b lg:border-b-0 lg:border-r border-cyan-500/15 flex justify-center items-center p-3 sm:p-5 lg:p-6">
                                <div className="w-full max-w-[560px] rounded-[20px] sm:rounded-[24px] border border-cyan-400/15 bg-[#d8e2e8] shadow-[0_0_30px_rgba(0,0,0,0.18)] p-2 sm:p-4 overflow-hidden">
                                    
                                    {/* Mobile view: hide thumbnail section by showing only main image */}
                                    <div className="block md:hidden">
                                        <div className="w-full h-[260px] sm:h-[320px] flex items-center justify-center rounded-[18px] bg-[#d8e2e8] overflow-hidden">
                                            <img
                                                src={product.imageUrls?.[0]}
                                                alt={product.name}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Tablet/Desktop view: keep full slideshow */}
                                    <div className="hidden md:block">
                                        <ImageSlideShow images={product.imageUrls} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-10 flex justify-center flex-col">
                                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
                                    Product Overview
                                </p>

                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 break-words">
                                    {product.name}
                                </h1>

                                {product.altNames?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.altNames.map((altName, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                                                >
                                                    {altName}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}

                                {(product.brand || product.model) && (
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {product.brand && (
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-sm">
                                                {product.brand}
                                            </span>
                                        )}
                                        {product.model && (
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-sm break-words">
                                                {product.model}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <p className="text-xs sm:text-sm text-slate-400 mb-5 sm:mb-6 break-all">
                                    Product ID: <span className="text-slate-200">{product.productId}</span>
                                </p>

                                <div className="flex flex-wrap items-end gap-3 sm:gap-4 mb-5 sm:mb-6">
                                    <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
                                        {getFormattedPrice(product.price)}
                                    </p>

                                    {product.labelledPrice && (
                                        <p className="text-base sm:text-lg text-slate-500 line-through pb-1">
                                            {getFormattedPrice(product.labelledPrice)}
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-[18px] sm:rounded-[20px] border border-white/10 bg-white/[0.03] p-4 sm:p-5 mb-6 sm:mb-8">
                                    <h2 className="text-base sm:text-lg font-semibold text-white mb-3">
                                        Description
                                    </h2>
                                    <p className="text-slate-300 leading-7 sm:leading-8 text-sm sm:text-base break-words">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 text-white font-bold text-base sm:text-lg">
                                    <button
                                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl hover:opacity-90 transition cursor-pointer shadow-[0_10px_25px_rgba(34,197,94,0.25)]"
                                        onClick={() => {
                                            addToCart(product, 1);
                                            window.dispatchEvent(new Event("cartUpdated"));
                                            toast.success(product.name + " Product added to cart");
                                        }}
                                    >
                                        Add to Cart
                                    </button>

                                    <Link
                                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl hover:opacity-90 transition cursor-pointer text-center shadow-[0_10px_25px_rgba(14,165,233,0.25)]"
                                        state={[
                                            {
                                                product: {
                                                    name: product.name,
                                                    price: product.price,
                                                    labelledPrice: product.labelledPrice,
                                                    imageUrl: product.imageUrls[0],
                                                    productId: product.productId
                                                },
                                                quantity: 1
                                            }
                                        ]}
                                        to="/checkout"
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}