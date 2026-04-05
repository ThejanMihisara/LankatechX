import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {
	BiPhone,
	BiEnvelope,
	BiMap,
	BiTimeFive,
	BiSupport,
	BiLaptop,
} from "react-icons/bi";

export function ContactUsPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.subject || !formData.message) {
			toast.error("Please fill all required fields");
			return;
		}

		try {
			setLoading(true);

			await axios.post(import.meta.env.VITE_API_URL + "/contact", formData);

			toast.success("Message sent successfully");

			setFormData({
				name: "",
				email: "",
				phone: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			console.log(error);
			toast.error("Failed to send message");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.10),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_30%)] pointer-events-none"></div>

			<div className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-10 sm:mb-14">
						<div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs sm:text-sm mb-4">
							<span className="w-2 h-2 rounded-full bg-cyan-400"></span>
							LankatechX Support
						</div>

						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
							Contact <span className="text-cyan-400">Us</span>
						</h1>

						<p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-7">
							Need help with laptops, desktops, accessories, upgrades, or repairs?
							Send us a message and our team will get back to you.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
						<div className="lg:col-span-1 space-y-5">
							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-5 shadow-xl">
								<h2 className="text-xl font-bold text-white mb-5">
									Store Information
								</h2>

								<div className="space-y-4">
									<div className="flex items-start gap-3">
										<div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
											<BiPhone size={22} />
										</div>
										<div>
											<h3 className="font-semibold">Phone</h3>
											<p className="text-slate-400 text-sm">+94 77 123 4567</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
											<BiEnvelope size={22} />
										</div>
										<div>
											<h3 className="font-semibold">Email</h3>
											<p className="text-slate-400 text-sm">support@lankatechx.com</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
											<BiMap size={22} />
										</div>
										<div>
											<h3 className="font-semibold">Address</h3>
											<p className="text-slate-400 text-sm">
												123 Main Street, Colombo, Sri Lanka
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
											<BiTimeFive size={22} />
										</div>
										<div>
											<h3 className="font-semibold">Working Hours</h3>
											<p className="text-slate-400 text-sm">
												Mon - Sat: 9.00 AM - 7.00 PM
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-5 shadow-xl">
								<h2 className="text-lg font-bold mb-4">Why Contact Us?</h2>

								<div className="space-y-3">
									<div className="flex items-center gap-3 text-sm text-slate-300">
										<BiLaptop className="text-cyan-400 text-xl" />
										Laptop & desktop recommendations
									</div>
									<div className="flex items-center gap-3 text-sm text-slate-300">
										<BiSupport className="text-cyan-400 text-xl" />
										Technical support and product help
									</div>
									<div className="flex items-center gap-3 text-sm text-slate-300">
										<BiLaptop className="text-cyan-400 text-xl" />
										Gaming accessories and upgrades
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-5 sm:p-6 lg:p-8 shadow-2xl">
							<h2 className="text-2xl font-bold mb-6">
								Send Us a <span className="text-cyan-400">Message</span>
							</h2>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="Your Name *"
										className="w-full h-12 sm:h-14 rounded-xl border border-slate-700 bg-slate-800/80 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
									/>

									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="Your Email *"
										className="w-full h-12 sm:h-14 rounded-xl border border-slate-700 bg-slate-800/80 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
									/>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<input
										type="text"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										placeholder="Phone Number"
										className="w-full h-12 sm:h-14 rounded-xl border border-slate-700 bg-slate-800/80 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
									/>

									<input
										type="text"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										placeholder="Subject *"
										className="w-full h-12 sm:h-14 rounded-xl border border-slate-700 bg-slate-800/80 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
									/>
								</div>

								<textarea
									name="message"
									value={formData.message}
									onChange={handleChange}
									placeholder="Your Message *"
									rows="6"
									className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
								></textarea>

								<button
									type="submit"
									disabled={loading}
									className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold hover:opacity-90 transition disabled:opacity-60"
								>
									{loading ? "Sending..." : "Send Message"}
								</button>
							</form>
						</div>
					</div>

					<div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6 shadow-xl">
						<h2 className="text-xl font-bold mb-4">Find Our Store</h2>
						<div className="rounded-xl overflow-hidden border border-slate-800">
							<iframe
								title="Store Location"
								src="https://www.google.com/maps?q=Colombo,Sri%20Lanka&output=embed"
								className="w-full h-[250px] sm:h-[350px]"
								loading="lazy"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}