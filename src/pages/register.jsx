import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import {
	BiUser,
	BiEnvelope,
	BiLockAlt,
	BiUserPlus,
} from "react-icons/bi";

export default function RegisterPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const googleLogin = useGoogleLogin({
		onSuccess: (response) => {
			axios
				.post(import.meta.env.VITE_API_URL + "/users/google-login", {
					token: response.access_token,
				})
				.then((response) => {
					toast.success("Login Successful");
					localStorage.setItem("token", response.data.token);
					if (response.data.role == "admin") {
						navigate("/admin/");
					} else {
						navigate("/");
					}
				})
				.catch((err) => {
					toast.error(
						err?.response?.data?.message ||
							"Google login failed. Please try again."
					);
				});
		},
		onError: () => {
			toast.error("Google login failed. Please try again.");
		},
	});

	async function signup() {
		if (password != confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			const response = await axios.post(import.meta.env.VITE_API_URL + "/users/", {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			});
			console.log(response);
			toast.success("Signed up Successfully");

			navigate("/login");
		} catch (err) {
			toast.error(err?.response?.data?.message || "Failed to sign up");
		}
	}

	return (
		<div className="w-full min-h-screen bg-[#020b1f] relative overflow-hidden flex">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,180,255,0.10),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.10),_transparent_30%)] pointer-events-none"></div>

			<div className="w-[50%] h-screen hidden lg:flex justify-center items-center flex-col relative z-10 px-10">
				<div className="max-w-[520px]">
					<div className="flex justify-center mb-6">
						<img
							src="/logo.png"
							className="w-[220px] drop-shadow-[0_0_30px_rgba(0,180,255,0.12)]"
						/>
					</div>

					<h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
						LankatechX
					</h1>

					<p className="text-center text-slate-300/80 mt-5 text-lg leading-8">
						Create your account and join a modern computer shop experience for
						laptops, desktops, accessories, and premium tech products.
					</p>

					<div className="grid grid-cols-3 gap-4 mt-10">
						<div className="rounded-2xl border border-cyan-500/15 bg-[#03192d] p-4 text-center">
							<h3 className="text-cyan-300 font-bold text-lg">Fast Signup</h3>
							<p className="text-slate-400 text-sm mt-1">Start quickly</p>
						</div>

						<div className="rounded-2xl border border-cyan-500/15 bg-[#03192d] p-4 text-center">
							<h3 className="text-cyan-300 font-bold text-lg">Best Deals</h3>
							<p className="text-slate-400 text-sm mt-1">Exclusive offers</p>
						</div>

						<div className="rounded-2xl border border-cyan-500/15 bg-[#03192d] p-4 text-center">
							<h3 className="text-cyan-300 font-bold text-lg">Secure Access</h3>
							<p className="text-slate-400 text-sm mt-1">Safe and easy</p>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full lg:w-[50%] min-h-screen flex justify-center items-center relative z-10 px-4 py-8">
				<div className="w-full max-w-[480px] rounded-[30px] border border-cyan-500/20 bg-[#03192d]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,180,255,0.08)] px-6 sm:px-8 py-10">
					<div className="lg:hidden flex flex-col items-center mb-8">
						<img src="/logo.png" className="w-[120px] mb-4" />
						<h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent text-center">
							LankatechX
						</h1>
					</div>

					<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2 text-center">
						Create Account
					</p>
					<h2 className="text-3xl font-bold text-white text-center mb-2">
						Join With Us
					</h2>
					<p className="text-slate-400 text-center mb-8">
						Create your account to continue shopping
					</p>

					<div className="space-y-5">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="relative">
								<BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
								<input
									value={firstName}
									onChange={(e) => {
										setFirstName(e.target.value);
									}}
									className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
									type="text"
									placeholder="First Name"
								/>
							</div>

							<div className="relative">
								<BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
								<input
									value={lastName}
									onChange={(e) => {
										setLastName(e.target.value);
									}}
									className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
									type="text"
									placeholder="Last Name"
								/>
							</div>
						</div>

						<div className="relative">
							<BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
							<input
								type="email"
								placeholder="Email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
							/>
						</div>

						<div className="relative">
							<BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
							<input
								type="password"
								placeholder="Password"
								className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>

						<div className="relative">
							<BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
							<input
								type="password"
								placeholder="Confirm Password"
								className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
							/>
						</div>

						<button
							onClick={signup}
							className="w-full h-[54px] bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
						>
							<BiUserPlus className="text-xl" />
							Sign up
						</button>

						<button
							onClick={googleLogin}
							className="w-full h-[54px] border border-cyan-500/20 rounded-2xl text-white font-bold bg-white/5 hover:bg-white/10 transition"
						>
							Sign up with Google
						</button>

						<p className="w-full text-center text-sm text-slate-300 pt-2">
							Already have an account?{" "}
							<Link to="/login" className="text-cyan-300 hover:text-cyan-200">
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}