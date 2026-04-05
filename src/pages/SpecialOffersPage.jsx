import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiShoppingBag, BiSolidOffer } from "react-icons/bi";
import getFormattedPrice from "../utils/price-format";
import { Link } from "react-router-dom";

export default function SpecialOffersPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + "/products")
			.then((response) => {
				const allProducts = response.data || [];

				const specialOfferProducts = allProducts.filter(
					(item) =>
						Number(item.price) < Number(item.labelledPrice)
				);

				setProducts(specialOfferProducts);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				toast.error("Failed to load special offers");
				setLoading(false);
			});
	}, []);

	function addToCart(product, qty = 1) {
		const cart = JSON.parse(localStorage.getItem("cart")) || [];

		const existingProductIndex = cart.findIndex(
			(item) => item.productId === product.productId
		);

		if (existingProductIndex >= 0) {
			cart[existingProductIndex].quantity =
				(cart[existingProductIndex].quantity || 1) + qty;
		} else {
			cart.push({
				...product,
				quantity: qty,
			});
		}

		localStorage.setItem("cart", JSON.stringify(cart));
		window.dispatchEvent(new Event("cartUpdated"));
	}

	function getDiscountPercentage(price, labelledPrice) {
		const currentPrice = Number(price);
		const oldPrice = Number(labelledPrice);

		if (!oldPrice || oldPrice <= currentPrice) return 0;

		return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
	}

	return (
		<div className="min-h-screen bg-[#020b1f] text-white relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,180,255,0.10),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.10),_transparent_30%)] pointer-events-none"></div>

			<div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8 sm:mb-10 rounded-[24px] border border-cyan-500/20 bg-[#052c3a] px-6 py-6 shadow-[0_0_35px_rgba(0,180,255,0.08)]">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 text-2xl">
								<BiSolidOffer />
							</div>
							<div>
								<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-1">
									Store Deals
								</p>
								<h1 className="text-3xl sm:text-4xl font-extrabold text-white">
									Special <span className="text-cyan-300">Offers</span>
								</h1>
							</div>
						</div>

						<p className="text-slate-300/85 text-sm sm:text-base max-w-3xl leading-7">
							Discover discounted laptops, desktops, accessories, and components.
						</p>
					</div>

					{loading ? (
						<div className="rounded-[24px] border border-cyan-500/15 bg-[#03192d] min-h-[300px] flex items-center justify-center">
							<p className="text-cyan-300 text-lg font-medium">Loading offers...</p>
						</div>
					) : products.length === 0 ? (
						<div className="rounded-[24px] border border-cyan-500/15 bg-[#03192d] min-h-[300px] flex flex-col items-center justify-center text-center px-6">
							<div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 text-3xl mb-4">
								<BiSolidOffer />
							</div>
							<h2 className="text-2xl font-bold text-white mb-2">
								No Offers Available
							</h2>
							<p className="text-slate-400 max-w-xl">
								Products with discounted prices will appear here automatically.
							</p>
						</div>
					) : (
						<>
							<div className="mb-5 flex items-center justify-between">
								<p className="text-slate-300 text-sm sm:text-base">
									Showing <span className="text-cyan-300 font-semibold">{products.length}</span> special offer products
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{products.map((product) => {
									const discount = getDiscountPercentage(
										product.price,
										product.labelledPrice
									);

									return (
										<div
											key={product.productId}
											className="group rounded-[24px] border border-cyan-500/15 bg-[#d8e2e8] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition duration-300"
										>
											<div className="relative bg-[#e7edf1] h-[240px] flex items-center justify-center overflow-hidden">
												<img
													src={product.imageUrls?.[0]}
													alt={product.name}
													className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
												/>

												<div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-md">
													-{discount}%
												</div>

												<div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#05394a] text-[#c7dde7] text-xs font-semibold shadow-md">
													Offer
												</div>
											</div>

											<div className="p-5">
												<p className="text-xs uppercase tracking-[0.18em] text-[#35566a] mb-2">
													{product.category || "Uncategorized"}
												</p>

												<h2 className="text-lg font-bold text-[#05394a] leading-6 min-h-[52px]">
													{product.name}
												</h2>

												<p className="text-sm text-[#35566a] mt-1">
													{product.brand || "Brand"} {product.model ? `• ${product.model}` : ""}
												</p>

												<div className="mt-4 flex items-end gap-3">
													<span className="text-2xl font-extrabold text-[#00a8ff]">
														{getFormattedPrice(product.price)}
													</span>
													<span className="text-sm text-slate-500 line-through pb-1">
														{getFormattedPrice(product.labelledPrice)}
													</span>
												</div>

												<p className="mt-2 text-sm font-medium text-emerald-700">
													You save{" "}
													{getFormattedPrice(
														Number(product.labelledPrice) - Number(product.price)
													)}
												</p>

												<div className="mt-5 flex gap-3">
													<Link
														className="flex px-4 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-xl hover:opacity-90 transition font-semibold cursor-pointer"
														state={
                                                              [
                                                                {
                                                                      product:{
                                                                           name: product.name,
                                                                           price: product.price,
                                                                           labelledPrice: product.labelledPrice,
                                                                           imageUrl: product.imageUrls[0],
                                                                           productId: product.productId
                                                                },
                                                                      quantity: 1
                                    

                                                                }
                                                               ]
                                                                }   to="/checkout">Buy Now
													
													</Link>

													<button
														className="w-[52px] h-[52px] rounded-xl bg-[#05394a] text-[#c7dde7] flex items-center justify-center hover:bg-cyan-600 hover:text-white transition"
														onClick={() => {
															addToCart(product, 1);
															toast.success(product.name + " Product added to cart");
														}}
													>
														<BiShoppingBag size={22} />
													</button>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}