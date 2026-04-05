import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
	BiChevronLeft,
	BiChevronRight,
	BiLaptop,
	BiChip,
	BiHeadphone,
	BiDesktop,
	BiShield,
	BiSupport,
	BiRocket,
	BiSolidOffer,
	BiRightArrowAlt,
} from "react-icons/bi";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/LoadingAnimation";
import Footer from "../components/Footer";

export default function HomePageCustomer() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentSlide, setCurrentSlide] = useState(0);
	const navigate = useNavigate();

	const heroSlides = [
		{
			id: 1,
			title: "Build Your Dream Setup",
			subtitle: "High-performance laptops, desktops, components, and accessories for every need.",
			image:
				"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1400&q=80",
			buttonText: "Shop Now",
			buttonLink: "/products",
		},
		{
			id: 2,
			title: "Special Offers on Top Tech",
			subtitle: "Discover limited-time deals on premium products with the best prices.",
			image:
				"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
			buttonText: "View Offers",
			buttonLink: "/offers",
		},
		{
			id: 3,
			title: "Trusted Computer Store",
			subtitle: "From gaming gear to office essentials, find quality products with confidence.",
			image:
				"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=80",
			buttonText: "Explore Products",
			buttonLink: "/products",
		},
	];

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + "/products")
			.then((response) => {
				setProducts(response.data || []);
				setLoading(false);
			})
			.catch(() => {
				toast.error("Failed to fetch products");
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [heroSlides.length]);

	function goToPage(path) {
		navigate(path);
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	const specialOffers = useMemo(() => {
		return products
			.filter((item) => Number(item.price) < Number(item.labelledPrice))
			.slice(0, 4);
	}, [products]);

	const latestProducts = useMemo(() => {
		return [...products].slice(0, 8);
	}, [products]);

	const categories = [
		{
			name: "Laptops",
			icon: <BiLaptop size={28} />,
			link: "/products",
			description: "Portable performance",
		},
		{
			name: "Desktops",
			icon: <BiDesktop size={28} />,
			link: "/products/desktop",
			description: "Powerful workstations",
		},
		{
			name: "Components",
			icon: <BiChip size={28} />,
			link: "/components/ram",
			description: "Upgrade your build",
		},
		{
			name: "Accessories",
			icon: <BiHeadphone size={28} />,
			link: "/accessories/keyboard-mouse",
			description: "Complete your setup",
		},
	];

	const currentHero = heroSlides[currentSlide];

	return (
		<div className="min-h-screen bg-[#020b1f] text-white overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,180,255,0.08),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.08),_transparent_30%)] pointer-events-none"></div>

			<div className="relative z-10">
				<section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12">
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2">
								<div className="relative h-[480px] rounded-[30px] overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(0,180,255,0.08)]">
									<AnimatePresence mode="wait">
										<motion.div
											key={currentHero.id}
											initial={{ opacity: 0, scale: 1.03 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.6 }}
											className="absolute inset-0"
										>
											<img
												src={currentHero.image}
												alt={currentHero.title}
												className="w-full h-full object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20"></div>

											<div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-center max-w-[700px]">
												<p className="inline-flex w-fit items-center gap-2 px-4 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm mb-5">
													<BiRocket />
													Latest Technology Deals
												</p>

												<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
													{currentHero.title}
												</h1>

												<p className="text-slate-200/90 text-base sm:text-lg leading-8 max-w-[580px] mb-7">
													{currentHero.subtitle}
												</p>

												<div className="flex items-center gap-4">
													<button
														onClick={() => goToPage(currentHero.buttonLink)}
														className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:opacity-90 transition cursor-pointer"
													>
														{currentHero.buttonText}
													</button>

													<button
														onClick={() => goToPage("/contact")}
														className="px-6 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/15 transition cursor-pointer"
													>
														Contact Us
													</button>
												</div>
											</div>
										</motion.div>
									</AnimatePresence>

									<button
										onClick={() =>
											setCurrentSlide(
												(prev) => (prev - 1 + heroSlides.length) % heroSlides.length
											)
										}
										className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 border border-white/10 text-white flex items-center justify-center hover:bg-cyan-500 transition"
									>
										<BiChevronLeft size={24} />
									</button>

									<button
										onClick={() =>
											setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
										}
										className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 border border-white/10 text-white flex items-center justify-center hover:bg-cyan-500 transition"
									>
										<BiChevronRight size={24} />
									</button>

									<div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
										{heroSlides.map((slide, index) => (
											<button
												key={slide.id}
												onClick={() => setCurrentSlide(index)}
												className={`h-2.5 rounded-full transition-all duration-300 ${
													index === currentSlide
														? "w-8 bg-cyan-400"
														: "w-2.5 bg-white/50"
												}`}
											></button>
										))}
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-6">
								<div className="rounded-[28px] border border-cyan-500/20 bg-[#052c3a] p-6 shadow-[0_0_35px_rgba(0,180,255,0.08)]">
									<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
										Why LankatechX
									</p>
									<h2 className="text-2xl font-bold text-white mb-4">
										Trusted Tech, Great Service
									</h2>
									<div className="space-y-4">
										<div className="flex items-start gap-3">
											<div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
												<BiShield size={22} />
											</div>
											<div>
												<h3 className="font-semibold text-white">Trusted Quality</h3>
												<p className="text-sm text-slate-300/80">
													Quality products from top brands.
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
												<BiSupport size={22} />
											</div>
											<div>
												<h3 className="font-semibold text-white">Support & Advice</h3>
												<p className="text-sm text-slate-300/80">
													Get expert guidance before buying.
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
												<BiSolidOffer size={22} />
											</div>
											<div>
												<h3 className="font-semibold text-white">Best Deals</h3>
												<p className="text-sm text-slate-300/80">
													Find discounts on selected products.
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="rounded-[28px] border border-cyan-500/20 bg-[#03192d] p-6 shadow-[0_0_30px_rgba(0,0,0,0.20)]">
									<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
										Special Deal
									</p>
									<h2 className="text-2xl font-bold text-white mb-3">
										Save More Today
									</h2>
									<p className="text-slate-300/80 text-sm leading-7 mb-5">
										Explore discounted laptops, accessories, and hardware chosen for value and performance.
									</p>
									<button
										onClick={() => goToPage("/offers")}
										className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:opacity-90 transition cursor-pointer"
									>
										View Offers
										<BiRightArrowAlt size={22} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 pb-12">
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{categories.map((item) => (
								<button
									key={item.name}
									onClick={() => goToPage(item.link)}
									className="group text-left rounded-[24px] border border-cyan-500/15 bg-[#03192d] p-6 hover:-translate-y-1 transition duration-300 shadow-[0_0_25px_rgba(0,0,0,0.15)] cursor-pointer"
								>
									<div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 mb-4 group-hover:bg-cyan-500 group-hover:text-white transition">
										{item.icon}
									</div>
									<h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
									<p className="text-slate-300/75 text-sm">{item.description}</p>
								</button>
							))}
						</div>
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 pb-14">
					<div className="max-w-7xl mx-auto">
						<div className="flex items-center justify-between mb-8">
							<div>
								<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
									Top Deals
								</p>
								<h2 className="text-3xl font-bold text-white">Special Offers</h2>
							</div>

							<button
								onClick={() => goToPage("/offers")}
								className="text-cyan-300 font-semibold hover:text-cyan-200 transition cursor-pointer"
							>
								View All
							</button>
						</div>

						{loading ? (
							<div className="flex justify-center items-center min-h-[250px]">
								<LoadingAnimation />
							</div>
						) : specialOffers.length === 0 ? (
							<div className="rounded-[24px] bg-[#03192d] border border-cyan-500/15 p-12 text-center">
								<h3 className="text-2xl font-bold text-white mb-2">
									No Special Offers Right Now
								</h3>
								<p className="text-slate-400">
									Check back soon for exciting deals.
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
								{specialOffers.map((item) => (
									<ProductCard key={item._id || item.productId} product={item} />
								))}
							</div>
						)}
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 pb-14">
					<div className="max-w-7xl mx-auto">
						<div className="flex items-center justify-between mb-8">
							<div>
								<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
									New Arrivals
								</p>
								<h2 className="text-3xl font-bold text-white">Latest Products</h2>
							</div>

							<button
								onClick={() => goToPage("/products")}
								className="text-cyan-300 font-semibold hover:text-cyan-200 transition cursor-pointer"
							>
								View All Products
							</button>
						</div>

						{loading ? (
							<div className="flex justify-center items-center min-h-[250px]">
								<LoadingAnimation />
							</div>
						) : latestProducts.length === 0 ? (
							<div className="rounded-[24px] bg-[#03192d] border border-cyan-500/15 p-12 text-center">
								<h3 className="text-2xl font-bold text-white mb-2">
									No Products Available
								</h3>
								<p className="text-slate-400">
									Please add products from the admin panel.
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
								{latestProducts.map((item) => (
									<ProductCard key={item._id || item.productId} product={item} />
								))}
							</div>
						)}
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 pb-20">
					<div className="max-w-7xl mx-auto rounded-[32px] border border-cyan-500/20 bg-gradient-to-r from-[#03192d] via-[#052c3a] to-[#03192d] p-8 sm:p-10 shadow-[0_0_35px_rgba(0,180,255,0.08)]">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
							<div>
								<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
									Need Help
								</p>
								<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
									Looking for the Right Product?
								</h2>
								<p className="text-slate-300/85 leading-8 max-w-xl">
									Whether you need a gaming laptop, a business desktop, or high-performance accessories, we’re here to help you find the perfect setup.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
								<button
									onClick={() => goToPage("/products")}
									className="px-6 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold text-center hover:opacity-90 transition cursor-pointer"
								>
									Explore Products
								</button>

								<button
									onClick={() => goToPage("/contact")}
									className="px-6 py-4 rounded-full border border-white/15 bg-white/10 text-white font-semibold text-center hover:bg-white/15 transition cursor-pointer"
								>
									Contact Support
								</button>
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</div>
		</div>
	);
}