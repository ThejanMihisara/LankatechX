import axios from "axios";
import { useEffect, useState } from "react";
import {
	BiLaptop,
	BiChip,
	BiSupport,
	BiShield,
	BiStore,
	BiCart,
} from "react-icons/bi";

export default function AboutUsPage() {
	const [stats, setStats] = useState({
		happyCustomers: 0,
		productsAvailable: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + "/stats")
			.then((response) => {
				setStats({
					happyCustomers: response.data.happyCustomers || 0,
					productsAvailable: response.data.productsAvailable || 0,
				});
				setLoading(false);
			})
			.catch((error) => {
				console.log("Failed to load stats", error);
				setLoading(false);
			});
	}, []);

	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.10),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_30%)] pointer-events-none"></div>

			<div className="relative z-10">
				<section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
					<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
						<div>
							<p className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs sm:text-sm mb-4">
								<span className="w-2 h-2 rounded-full bg-cyan-400"></span>
								Trusted Computer Shop
							</p>

							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
								About <span className="text-cyan-400">LankatechX</span>
							</h1>

							<p className="mt-4 text-slate-300 text-sm sm:text-base leading-7 max-w-2xl">
								We are a modern computer shop focused on laptops, desktops,
								components, accessories, gaming gear, and reliable customer
								service. Our goal is to help students, professionals, creators,
								and gamers find the right technology at the right price.
							</p>

							<div className="mt-6 flex flex-col sm:flex-row gap-3">
								<a
									href="/products"
									className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold text-center hover:opacity-90 transition"
								>
									Explore Products
								</a>

								<a
									href="/contact"
									className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white font-semibold text-center hover:border-cyan-400/40 hover:text-cyan-300 transition"
								>
									Contact Us
								</a>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
							<img
								src="/about-computer-shop.jpg"
								alt="Computer shop"
								className="w-full h-[220px] sm:h-[300px] lg:h-[360px] object-cover rounded-2xl"
							/>
						</div>
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 pb-12">
					<div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-xl">
							<h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
								5+
							</h2>
							<p className="text-slate-300 text-sm mt-2">Years Experience</p>
						</div>

						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-xl">
							<h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
								{loading ? "..." : `${stats.happyCustomers}+`}
							</h2>
							<p className="text-slate-300 text-sm mt-2">Happy Customers</p>
						</div>

						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-xl">
							<h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
								{loading ? "..." : `${stats.productsAvailable}+`}
							</h2>
							<p className="text-slate-300 text-sm mt-2">Products Available</p>
						</div>

						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-xl">
							<h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
								24/7
							</h2>
							<p className="text-slate-300 text-sm mt-2">Support Service</p>
						</div>
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 py-12">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-10">
							<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
								Why Choose <span className="text-cyan-400">Us</span>
							</h2>
							<p className="text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
								We combine quality products, expert guidance, and a premium
								shopping experience for every customer.
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
								<BiLaptop className="text-cyan-400 text-3xl mb-4" />
								<h3 className="text-lg font-semibold text-white">Latest Laptops</h3>
								<p className="text-slate-400 mt-3 text-sm leading-6">
									Explore laptops and desktops from trusted brands for study,
									work, gaming, and creative performance.
								</p>
							</div>

							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
								<BiChip className="text-cyan-400 text-3xl mb-4" />
								<h3 className="text-lg font-semibold text-white">
									Components & Upgrades
								</h3>
								<p className="text-slate-400 mt-3 text-sm leading-6">
									Find processors, RAM, storage, motherboards, power supplies,
									and other components for every build.
								</p>
							</div>

							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
								<BiSupport className="text-cyan-400 text-3xl mb-4" />
								<h3 className="text-lg font-semibold text-white">Friendly Support</h3>
								<p className="text-slate-400 mt-3 text-sm leading-6">
									We help you choose the right product based on your needs,
									budget, and long-term use.
								</p>
							</div>

							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
								<BiShield className="text-cyan-400 text-3xl mb-4" />
								<h3 className="text-lg font-semibold text-white">Reliable Quality</h3>
								<p className="text-slate-400 mt-3 text-sm leading-6">
									We focus on dependable technology products and customer
									satisfaction you can trust.
								</p>
							</div>

							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
								<BiStore className="text-cyan-400 text-3xl mb-4" />
								<h3 className="text-lg font-semibold text-white">Modern Store</h3>
								<p className="text-slate-400 mt-3 text-sm leading-6">
									A clean shopping experience for customers looking for real tech
									value and a smooth buying process.
								</p>
							</div>

							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
								<BiCart className="text-cyan-400 text-3xl mb-4" />
								<h3 className="text-lg font-semibold text-white">
									Competitive Pricing
								</h3>
								<p className="text-slate-400 mt-3 text-sm leading-6">
									Get strong value on laptops, accessories, gaming gear, and
									system upgrades.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 py-12">
					<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
							<h2 className="text-2xl font-bold text-cyan-400">Our Mission</h2>
							<p className="text-slate-300 mt-4 text-sm sm:text-base leading-7">
								To provide reliable, high-performance technology solutions with
								honest guidance, fair pricing, and dependable service for every
								customer.
							</p>
						</div>

						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
							<h2 className="text-2xl font-bold text-cyan-400">Our Vision</h2>
							<p className="text-slate-300 mt-4 text-sm sm:text-base leading-7">
								To become a leading computer shop known for quality, trust,
								innovation, and a modern digital shopping experience.
							</p>
						</div>
					</div>
				</section>

				<section className="px-4 sm:px-6 lg:px-8 py-12 pb-16">
					<div className="max-w-7xl mx-auto rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 p-6 sm:p-8 lg:p-10 text-center shadow-2xl">
						<h2 className="text-2xl sm:text-3xl font-bold">
							Ready to Upgrade Your Setup?
						</h2>
						<p className="text-slate-300 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
							Visit our store or browse online to discover laptops, gaming
							accessories, components, and performance-ready devices built for
							your needs.
						</p>

						<div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
							<a
								href="/products"
								className="px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 font-semibold hover:opacity-90 transition"
							>
								Explore Products
							</a>
							<a
								href="/contact"
								className="px-5 py-3 rounded-xl border border-slate-600 text-white font-semibold hover:border-cyan-400/40 hover:text-cyan-300 transition"
							>
								Get in Touch
							</a>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}