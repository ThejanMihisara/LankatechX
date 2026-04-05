import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
	BiEnvelope,
	BiLockAlt,
	BiShieldQuarter,
	BiCheck,
	BiX,
} from "react-icons/bi";

export default function ForgetPassword() {
	const [email, setEmail] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [secondsLeft, setSecondsLeft] = useState(600);
	const [buttonState, setButtonState] = useState("idle"); // idle | loading | success | error
	const navigate = useNavigate();
	const otpInputRef = useRef(null);

	useEffect(() => {
		if (!otpSent) return;
		if (secondsLeft <= 0) return;

		const timer = setInterval(() => {
			setSecondsLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [otpSent, secondsLeft]);

	function formatTime(seconds) {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	}

	async function sendOtp() {
		setOtpSent(true);
		try {
			await axios.post(import.meta.env.VITE_API_URL + "/users/send-otp", {
				email: email,
			});
			setSecondsLeft(600);
			toast.success("OTP sent to your email. Please check your inbox.");
		} catch (err) {
			toast.error(
				err?.response?.data?.message ||
					"Failed to send OTP. Please try again."
			);
			setOtpSent(false);
		}
	}

	async function resendOtp() {
		try {
			await axios.post(import.meta.env.VITE_API_URL + "/users/send-otp", {
				email: email,
			});
			setSecondsLeft(600);
			setOtp("");
			setButtonState("idle");
			toast.success("OTP resent successfully.");
		} catch (err) {
			toast.error(
				err?.response?.data?.message ||
					"Failed to resend OTP. Please try again."
			);
		}
	}

	async function resetPassword() {
		if (newPassword !== confirmPassword) {
			setButtonState("error");
			toast.error("Passwords do not match. Please try again.");
			setTimeout(() => setButtonState("idle"), 1200);
			return;
		}

		if (otp.length !== 5) {
			setButtonState("error");
			toast.error("Please enter the full 5-digit OTP.");
			setTimeout(() => setButtonState("idle"), 1200);
			return;
		}

		try {
			setButtonState("loading");

			await axios.post(import.meta.env.VITE_API_URL + "/users/verify-otp", {
				email: email,
				otp: otp,
				newPassword: newPassword,
			});

			setButtonState("success");
			toast.success(
				"Password reset successful. You can now log in with your new password."
			);

			setTimeout(() => {
				navigate("/login");
			}, 1200);
		} catch (err) {
			setButtonState("error");
			toast.error(
				err?.response?.data?.message ||
					"Failed to reset password. Please try again."
			);

			setTimeout(() => {
				setButtonState("idle");
			}, 1200);
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
						Isuri Computers
					</h1>

					<p className="text-center text-slate-300/80 mt-5 text-lg leading-8">
						Recover your account securely and get back to your laptops,
						components, accessories, and computer shop experience.
					</p>

					<div className="grid grid-cols-3 gap-4 mt-10">
						<div className="rounded-2xl border border-cyan-500/15 bg-[#03192d] p-4 text-center">
							<h3 className="text-cyan-300 font-bold text-lg">Secure</h3>
							<p className="text-slate-400 text-sm mt-1">OTP verification</p>
						</div>

						<div className="rounded-2xl border border-cyan-500/15 bg-[#03192d] p-4 text-center">
							<h3 className="text-cyan-300 font-bold text-lg">Fast</h3>
							<p className="text-slate-400 text-sm mt-1">Quick recovery</p>
						</div>

						<div className="rounded-2xl border border-cyan-500/15 bg-[#03192d] p-4 text-center">
							<h3 className="text-cyan-300 font-bold text-lg">Reliable</h3>
							<p className="text-slate-400 text-sm mt-1">Safe access</p>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full lg:w-[50%] min-h-screen flex justify-center items-center relative z-10 px-4 py-8">
				{!otpSent && (
					<div className="w-full max-w-[440px] rounded-[30px] border border-cyan-500/20 bg-[#03192d]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,180,255,0.08)] px-6 sm:px-8 py-10">
						<div className="lg:hidden flex flex-col items-center mb-8">
							<img src="/logo.png" className="w-[120px] mb-4" />
							<h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent text-center">
								Isuri Computers
							</h1>
						</div>

						<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2 text-center">
							Account Recovery
						</p>
						<h1 className="text-3xl font-bold text-white text-center mb-2">
							Forgot Password
						</h1>
						<p className="text-slate-400 text-center mb-8">
							Enter your email to receive a one-time password
						</p>

						<div className="space-y-5">
							<div className="relative">
								<BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
								<input
									type="email"
									placeholder="Enter your email"
									className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>

							<button
								onClick={sendOtp}
								className="w-full h-[54px] bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
							>
								<BiShieldQuarter className="text-xl" />
								Send OTP
							</button>
						</div>
					</div>
				)}

				{otpSent && (
					<div className="w-full max-w-[460px] rounded-[30px] border border-cyan-500/20 bg-[#03192d]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,180,255,0.08)] px-6 sm:px-8 py-10">
						<div className="lg:hidden flex flex-col items-center mb-8">
							<img src="/logo.png" className="w-[120px] mb-4" />
							<h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent text-center">
								Isuri Computers
							</h1>
						</div>

						<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2 text-center">
							Verification
						</p>
						<h1 className="text-3xl font-bold text-white text-center mb-2">
							OTP Verification
						</h1>
						<p className="text-slate-400 text-center mb-2">
							We have sent a verification code to your email
						</p>
						<p className="text-cyan-300 text-center text-sm mb-8 break-all">
							{email}
						</p>

						<div className="space-y-5">
							<div className="flex justify-center">
								<div
									className="relative w-full max-w-[360px]"
									onClick={() => otpInputRef.current?.focus()}
								>
									<input
										ref={otpInputRef}
										type="text"
										inputMode="numeric"
										maxLength={5}
										value={otp}
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, "").slice(0, 5);
											setOtp(value);
											if (buttonState !== "idle") {
												setButtonState("idle");
											}
										}}
										className="absolute inset-0 opacity-0 pointer-events-none"
									/>

									<div className="flex justify-center gap-3">
										{Array.from({ length: 5 }).map((_, index) => {
											const char = otp[index] || "";
											const isFilled = !!char;

											return (
												<div
													key={index}
													className={`w-12 h-14 sm:w-14 sm:h-14 rounded-2xl border text-xl font-bold flex items-center justify-center transition-all duration-300 ${
														buttonState === "error"
															? "border-rose-400 text-white shadow-[0_0_0_1px_rgba(251,113,133,0.5)]"
															: buttonState === "success"
															? "border-emerald-400 text-white shadow-[0_0_0_1px_rgba(52,211,153,0.4)]"
															: isFilled
															? "border-cyan-400 text-white bg-white/[0.03]"
															: "border-white/10 text-slate-500 bg-white/[0.02]"
													}`}
												>
													{char}
												</div>
											);
										})}
									</div>
								</div>
							</div>

							<div className="text-center">
								{buttonState === "error" && (
									<p className="text-rose-400 text-sm mb-1">
										Wrong code, please try again
									</p>
								)}

								{buttonState === "success" && (
									<p className="text-emerald-400 text-sm mb-1">
										Verified successfully
									</p>
								)}

								<p className="text-slate-400 text-sm">
									The code will expire in{" "}
									<span className="text-white font-semibold">
										{formatTime(secondsLeft)}
									</span>
								</p>
							</div>

							<div className="relative">
								<BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
								<input
									type="password"
									placeholder="Enter new password"
									className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
									onChange={(e) => {
										setNewPassword(e.target.value);
									}}
								/>
							</div>

							<div className="relative">
								<BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl" />
								<input
									type="password"
									placeholder="Confirm new password"
									className="w-full h-[54px] pl-12 pr-4 rounded-2xl border border-cyan-500/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/30"
									onChange={(e) => {
										setConfirmPassword(e.target.value);
									}}
								/>
							</div>

							<div className="flex justify-center pt-2">
								<button
									onClick={resetPassword}
									disabled={buttonState === "loading"}
									className={`relative overflow-hidden w-full h-[56px] rounded-2xl text-white font-bold transition-all duration-500 ${
										buttonState === "success"
											? "bg-emerald-500 shadow-[0_0_30px_rgba(34,197,94,0.35)]"
											: buttonState === "error"
											? "bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.35)]"
											: "bg-gradient-to-r from-cyan-500 to-sky-500 shadow-[0_10px_30px_rgba(14,165,233,0.28)] hover:scale-[1.01]"
									} ${buttonState === "loading" ? "cursor-not-allowed" : "cursor-pointer"}`}
								>
									<span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition"></span>

									<span className="relative z-10 flex items-center justify-center gap-2">
										{buttonState === "loading" && (
											<span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
										)}

										{buttonState === "success" && <BiCheck className="text-2xl" />}
										{buttonState === "error" && <BiX className="text-2xl" />}
										{buttonState === "idle" && (
											<>
												<BiShieldQuarter className="text-xl" />
												Reset Password
											</>
										)}
										{buttonState === "loading" && "Verifying"}
										{buttonState === "success" && "Verified"}
										{buttonState === "error" && "Try Again"}
									</span>
								</button>
							</div>

							<div className="text-center pt-2">
								<p className="text-slate-400 text-sm">
									If you didn't receive a code?{" "}
									<button
										onClick={resendOtp}
										disabled={secondsLeft > 0}
										className={`font-semibold transition ${
											secondsLeft > 0
												? "text-slate-500 cursor-not-allowed"
												: "text-cyan-300 hover:text-cyan-200 cursor-pointer"
										}`}
									>
										Resend
									</button>
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}