import { Link, useNavigate } from "react-router-dom";
import {
	BiMap,
	BiPhone,
	BiEnvelope,
	BiTime,
	BiLaptop,
	BiDesktop,
	BiChip,
	BiHeadphone,
	BiRightArrowAlt,
} from "react-icons/bi";

export default function Footer() {
	const navigate = useNavigate();

	function goToPage(path) {
		navigate(path);
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	return (
		<footer className="relative mt-10 border-t border-cyan-500/20 bg-gradient-to-b from-[#03192d] via-[#021325] to-[#020b1f] text-white overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,180,255,0.08),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.08),_transparent_30%)] pointer-events-none"></div>

			<div className="relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
						<div>
							<div className="mb-5">
								<h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
									LankatechX
								</h2>
								<p className="text-[11px] uppercase tracking-[0.25em] text-slate-300 mt-1">
									Computer Store
								</p>
							</div>

							<p className="text-slate-300/80 leading-7 text-sm">
								Your trusted destination for laptops, desktops, accessories,
								components, and the latest computer shop deals. Built for gamers,
								students, creators, and professionals.
							</p>

							<div className="mt-6 flex items-center gap-3">
								<div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
									<BiLaptop size={22} />
								</div>
								<div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
									<BiDesktop size={22} />
								</div>
								<div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
									<BiChip size={22} />
								</div>
								<div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
									<BiHeadphone size={22} />
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-bold text-white mb-5">Quick Links</h3>
							<div className="space-y-3">
								<button
									onClick={() => goToPage("/")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Home
								</button>

								<button
									onClick={() => goToPage("/products")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Products
								</button>

								<button
									onClick={() => goToPage("/offers")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Special Offers
								</button>

								<button
									onClick={() => goToPage("/about")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									About Us
								</button>

								<button
									onClick={() => goToPage("/contact")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Contact Us
								</button>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-bold text-white mb-5">Shop Categories</h3>
							<div className="space-y-3">
								<button
									onClick={() => goToPage("/products")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Laptops
								</button>

								<button
									onClick={() => goToPage("/products/desktop")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Desktops
								</button>

								<button
									onClick={() => goToPage("/components/ram")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Components
								</button>

								<button
									onClick={() => goToPage("/accessories/keyboard-mouse")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Accessories
								</button>

								<button
									onClick={() => goToPage("/brands/apple")}
									className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
								>
									<BiRightArrowAlt size={20} />
									Top Brands
								</button>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-bold text-white mb-5">Contact Info</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 shrink-0">
										<BiMap size={20} />
									</div>
									<p className="text-slate-300/80 text-sm leading-6">
										123 Main Street, Colombo, Sri Lanka
									</p>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 shrink-0">
										<BiPhone size={20} />
									</div>
									<p className="text-slate-300/80 text-sm leading-6">
										+94 77 123 4567
									</p>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 shrink-0">
										<BiEnvelope size={20} />
									</div>
									<p className="text-slate-300/80 text-sm leading-6">
										support@lankatechx.com
									</p>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 shrink-0">
										<BiTime size={20} />
									</div>
									<p className="text-slate-300/80 text-sm leading-6">
										Mon - Sat : 9.00 AM - 7.00 PM
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-sm text-slate-400 text-center md:text-left">
							© 2026 LankatechX. All rights reserved.
						</p>

						<div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400">
							<Link to="/about" className="hover:text-cyan-300 transition">
								About
							</Link>
							<Link to="/contact" className="hover:text-cyan-300 transition">
								Contact
							</Link>
							<Link to="/offers" className="hover:text-cyan-300 transition">
								Offers
							</Link>
							<Link to="/terms-of-service" className="hover:text-cyan-300 transition">
								Terms of Service
							</Link>
							<Link to="/privacy-policy" className="hover:text-cyan-300 transition">
								Privacy Policy
							</Link>
							<Link to="/warranty" className="hover:text-cyan-300 transition">
								Warranty
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}