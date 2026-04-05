import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEnvelope, BiPhone, BiTrash, BiUser, BiMessageDetail } from "react-icons/bi";

export function AdminContactMessagesPage() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadMessages();
	}, []);

	function loadMessages() {
		axios
			.get(import.meta.env.VITE_API_URL + "/contact")
			.then((response) => {
				setMessages(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				toast.error("Failed to load messages");
				setLoading(false);
			});
	}

	async function deleteMessage(id) {
		try {
			await axios.delete(import.meta.env.VITE_API_URL + "/contact/" + id);
			toast.success("Message deleted successfully");
			loadMessages();
		} catch (error) {
			console.log(error);
			toast.error("Failed to delete message");
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.10),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_30%)] pointer-events-none"></div>

			<div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-6 sm:mb-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs sm:text-sm text-cyan-300 mb-3">
							<span className="w-2 h-2 rounded-full bg-cyan-400"></span>
							Admin Support Inbox
						</div>

						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
							Customer <span className="text-cyan-400">Messages</span>
						</h1>

						<p className="text-slate-400 mt-2 text-sm sm:text-base">
							View customer inquiries, support requests, and store contact messages.
						</p>
					</div>

					{loading ? (
						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-10 text-center text-slate-400">
							Loading messages...
						</div>
					) : messages.length === 0 ? (
						<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-10 text-center text-slate-400">
							No messages found.
						</div>
					) : (
						<div className="grid grid-cols-1 gap-4">
							{messages.map((msg) => (
								<div
									key={msg._id}
									className="rounded-2xl border border-slate-800 bg-slate-900/85 backdrop-blur-md shadow-xl p-4 sm:p-5 lg:p-6"
								>
									<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
												<div>
													<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
														Subject
													</p>
													<h2 className="text-lg sm:text-xl font-bold text-white break-words">
														{msg.subject}
													</h2>
												</div>

												<p className="text-xs sm:text-sm text-slate-400">
													{new Date(msg.createdAt).toLocaleString()}
												</p>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
												<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3">
													<div className="flex items-center gap-2 text-cyan-300 mb-1">
														<BiUser />
														<span className="text-xs uppercase tracking-wide">Name</span>
													</div>
													<p className="text-sm text-slate-100 break-words">{msg.name}</p>
												</div>

												<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3">
													<div className="flex items-center gap-2 text-cyan-300 mb-1">
														<BiEnvelope />
														<span className="text-xs uppercase tracking-wide">Email</span>
													</div>
													<p className="text-sm text-slate-100 break-all">{msg.email}</p>
												</div>

												<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3 md:col-span-2">
													<div className="flex items-center gap-2 text-cyan-300 mb-1">
														<BiPhone />
														<span className="text-xs uppercase tracking-wide">Phone</span>
													</div>
													<p className="text-sm text-slate-100 break-words">
														{msg.phone || "No phone number"}
													</p>
												</div>
											</div>

											<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-4">
												<div className="flex items-center gap-2 text-cyan-300 mb-2">
													<BiMessageDetail />
													<span className="text-xs uppercase tracking-wide">Message</span>
												</div>
												<p className="text-sm sm:text-base text-slate-200 leading-7 break-words whitespace-pre-wrap">
													{msg.message}
												</p>
											</div>
										</div>

										<div className="lg:w-auto">
											<button
												onClick={() => deleteMessage(msg._id)}
												className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/15 border border-red-500/20 px-4 py-3 text-red-300 font-medium hover:bg-red-500/25 transition"
											>
												<BiTrash />
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}