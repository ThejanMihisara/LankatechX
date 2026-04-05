import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [existingImageUrl, setExistingImageUrl] = useState("");
	const [file, setFile] = useState(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(true);
	const [updatingProfile, setUpdatingProfile] = useState(false);
	const [changingPassword, setChangingPassword] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			window.location.href = "/login";
			return;
		}

		axios
			.get(import.meta.env.VITE_API_URL + "/users/profile", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setFirstName(response.data.firstName || "");
				setLastName(response.data.lastName || "");
				setExistingImageUrl(response.data.image || "");
			})
			.catch(() => {
				localStorage.removeItem("token");
				window.location.href = "/login";
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	async function updateProfile() {
		try {
			setUpdatingProfile(true);

			const token = localStorage.getItem("token");

			const updatedInfo = {
				firstName,
				lastName,
				image: existingImageUrl,
			};

			if (file) {
				updatedInfo.image = await uploadFile(file);
			}

			const response = await axios.put(
				import.meta.env.VITE_API_URL + "/users/",
				updatedInfo,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			localStorage.setItem("token", response.data.token);
			toast.success("Profile updated successfully");
			window.location.reload();
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			setUpdatingProfile(false);
		}
	}

	async function changePassword() {
		try {
			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
				return;
			}

			if (password.length < 6) {
				toast.error("Password must be at least 6 characters");
				return;
			}

			setChangingPassword(true);

			const token = localStorage.getItem("token");

			await axios.post(
				import.meta.env.VITE_API_URL + "/users/update-password",
				{
					password,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success("Password changed successfully");
			window.location.reload();
		} catch (error) {
			toast.error("Failed to change password");
		} finally {
			setChangingPassword(false);
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
				<div className="text-center">
					<div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-slate-300 text-sm sm:text-base">
						Loading your settings...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.15),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_30%)]"></div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
				<div className="mb-8 sm:mb-10">
					<div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs sm:text-sm text-cyan-300 mb-4">
						<span className="w-2 h-2 rounded-full bg-cyan-400"></span>
						LankatechX Account Center
					</div>

					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
						Manage Your <span className="text-cyan-400">Tech Profile</span>
					</h1>

					<p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base">
						Update your personal details, profile image, and security settings
						from one modern dashboard built for your computer shop experience.
					</p>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
					<div className="xl:col-span-1">
						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-2xl p-6 h-full">
							<div className="flex flex-col items-center text-center">
								<div className="relative mb-4">
									<div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.25)] bg-slate-800">
										{existingImageUrl ? (
											<img
												src={existingImageUrl}
												alt="Profile"
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-3xl font-bold text-cyan-300 bg-gradient-to-br from-slate-800 to-slate-900">
												{firstName?.[0] || "U"}
											</div>
										)}
									</div>
									<div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-cyan-400 border-4 border-slate-900"></div>
								</div>

								<h2 className="text-xl font-bold">
									{firstName || "Your"} {lastName || "Account"}
								</h2>
								<p className="text-slate-400 text-sm mt-1">
									Keep your profile fresh and secure
								</p>

								<div className="mt-6 w-full space-y-3">
									<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3 text-left">
										<p className="text-xs text-slate-400 uppercase tracking-wide">
											Profile Status
										</p>
										<p className="text-sm text-cyan-300 font-medium mt-1">
											Active
										</p>
									</div>

									<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3 text-left">
										<p className="text-xs text-slate-400 uppercase tracking-wide">
											Account Security
										</p>
										<p className="text-sm text-emerald-300 font-medium mt-1">
											Protected Access
										</p>
									</div>

									<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3 text-left">
										<p className="text-xs text-slate-400 uppercase tracking-wide">
											Store Experience
										</p>
										<p className="text-sm text-slate-200 font-medium mt-1">
											Optimized for desktop & mobile
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-2xl p-5 sm:p-6">
							<div className="mb-6">
								<h2 className="text-xl sm:text-2xl font-bold text-white">
									Account Settings
								</h2>
								<p className="text-slate-400 text-sm mt-1">
									Update your name and profile image
								</p>
							</div>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										First Name
									</label>
									<input
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className="w-full h-12 sm:h-14 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
										placeholder="Enter first name"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Last Name
									</label>
									<input
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="w-full h-12 sm:h-14 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
										placeholder="Enter last name"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Profile Picture
									</label>
									<input
										type="file"
										accept="image/*"
										onChange={(e) => setFile(e.target.files?.[0] || null)}
										className="w-full h-12 sm:h-14 px-4 py-3 rounded-xl border border-dashed border-slate-600 bg-slate-800/70 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950 hover:file:bg-cyan-400 transition"
									/>
								</div>

								<button
									className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60"
									onClick={updateProfile}
									disabled={updatingProfile}
								>
									{updatingProfile ? "Updating..." : "Update Profile"}
								</button>
							</div>
						</div>

						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-2xl p-5 sm:p-6">
							<div className="mb-6">
								<h2 className="text-xl sm:text-2xl font-bold text-white">
									Change Password
								</h2>
								<p className="text-slate-400 text-sm mt-1">
									Keep your account secure with a strong password
								</p>
							</div>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										New Password
									</label>
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full h-12 sm:h-14 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
										placeholder="Enter new password"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Confirm New Password
									</label>
									<input
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full h-12 sm:h-14 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
										placeholder="Confirm new password"
									/>
								</div>

								<div className="rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-sm text-slate-400">
									Use a strong password with letters, numbers, and symbols for
									better protection.
								</div>

								<button
									className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-bold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60"
									onClick={changePassword}
									disabled={changingPassword}
								>
									{changingPassword ? "Changing..." : "Change Password"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}