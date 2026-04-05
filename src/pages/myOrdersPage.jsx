import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomerViewOrderInfoModal from "../components/customersViewOrderInfoModal";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import LoadingAnimation from "../components/LoadingAnimation";


export default function MyOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			const token = localStorage.getItem("token");

			axios
				.get(
					import.meta.env.VITE_API_URL +
						"/orders/" +
						pageSize +
						"/" +
						pageNumber,
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				)
				.then((response) => {
					setOrders(response.data.orders);
					setTotalPages(response.data.totalPages);
					setLoading(false);
				})
				.catch(() => {
					toast.error("Failed to load orders");
					setLoading(false);
				});
		}
	}, [loading, pageNumber, pageSize]);

	const getStatusStyle = (status) => {
		switch (status?.toLowerCase()) {
			case "pending":
				return "bg-yellow-500/15 text-yellow-300 border border-yellow-500/20";
			case "completed":
			case "delivered":
				return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
			case "cancelled":
				return "bg-red-500/15 text-red-300 border border-red-500/20";
			case "processing":
				return "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20";
			default:
				return "bg-slate-500/15 text-slate-300 border border-slate-500/20";
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 text-white relative pb-36">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_28%)]"></div>

			<div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-6 sm:mb-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs sm:text-sm text-cyan-300 mb-3">
							<span className="w-2 h-2 rounded-full bg-cyan-400"></span>
							Order Control Center
						</div>

						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
							My <span className="text-cyan-400">Orders</span>
						</h1>
						<p className="text-slate-400 mt-2 text-sm sm:text-base">
							Track your purchases, order status, and complete details in one place.
						</p>
					</div>

					{loading ? (
						<div className="w-full min-h-[400px] flex justify-center items-center rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
							<LoadingAnimation />
						</div>
					) : (
						<>
							<div className="hidden md:block rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-2xl">
								<div className="overflow-x-auto">
									<table className="w-full min-w-[1000px] text-sm">
										<thead className="bg-slate-800/90">
											<tr className="border-b border-slate-700">
												<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
													Order ID
												</th>
												<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
													Customer Name
												</th>
												<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
													Email
												</th>
												<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
													Date
												</th>
												<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
													Total Amount
												</th>
												<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
													Status
												</th>
												<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
													Actions
												</th>
											</tr>
										</thead>

										<tbody>
											{orders.map((order) => (
												<tr
													key={order.id}
													className="border-b border-slate-800 hover:bg-slate-800/50 transition"
												>
													<td className="px-5 py-4 text-center text-slate-200">
														{order.orderId}
													</td>
													<td className="px-5 py-4 text-center text-slate-200">
														{order.firstName + " " + order.lastName}
													</td>
													<td className="px-5 py-4 text-center text-slate-300">
														{order.email}
													</td>
													<td className="px-5 py-4 text-center text-slate-300">
														{getFormattedDate(order.date)}
													</td>
													<td className="px-5 py-4 text-center font-semibold text-cyan-300">
														{getFormattedPrice(order.total)}
													</td>
													<td className="px-5 py-4 text-center">
														<span
															className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
																order.status
															)}`}
														>
															{order.status}
														</span>
													</td>
													<td className="px-5 py-6  text-center">
														<CustomerViewOrderInfoModal order={order} />
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 md:hidden">
								{orders.map((order) => (
									<div
										key={order.id}
										className="rounded-2xl border border-slate-800 bg-slate-900/85 backdrop-blur-md shadow-xl p-4"
									>
										<div className="flex items-start justify-between gap-3 mb-4">
											<div>
												<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
													Order ID
												</p>
												<h2 className="text-base font-bold text-white break-all">
													{order.orderId}
												</h2>
											</div>

											<span
												className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
													order.status
												)}`}
											>
												{order.status}
											</span>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-3 py-3">
												<p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
													Customer
												</p>
												<p className="text-sm font-medium text-slate-100">
													{order.firstName + " " + order.lastName}
												</p>
											</div>

											<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-3 py-3">
												<p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
													Date
												</p>
												<p className="text-sm font-medium text-slate-100">
													{getFormattedDate(order.date)}
												</p>
											</div>

											<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-3 py-3 sm:col-span-2">
												<p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
													Email
												</p>
												<p className="text-sm font-medium text-slate-100 break-all">
													{order.email}
												</p>
											</div>

											<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-3 py-3">
												<p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
													Total Amount
												</p>
												<p className="text-base font-bold text-cyan-300">
													{getFormattedPrice(order.total)}
												</p>
											</div>

											<div className="rounded-xl bg-slate-800/70 border border-slate-700 px-3 py-3 flex items-end justify-between">
												<div>
													<p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
														Action
													</p>
													<p className="text-sm font-medium text-slate-100">
														View Details
													</p>
												</div>
												<CustomerViewOrderInfoModal order={order} />
											</div>
										</div>
									</div>
								))}
							</div>

							{orders.length === 0 && (
								<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-400">
									No orders found.
								</div>
							)}
						</>
					)}
				</div>
			</div>

			<div className="fixed bottom-0 left-0 w-full z-30 px-3 sm:px-4 pb-3 sm:pb-4">
				<div className="max-w-3xl mx-auto rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-md shadow-2xl px-3 sm:px-5 py-3">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
						<div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
							<button
								className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-4 py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
								onClick={() => {
									if (pageNumber > 1) {
										setPageNumber(pageNumber - 1);
										setLoading(true);
									} else {
										toast.success("You are on the first page");
									}
								}}
							>
								Previous
							</button>

							<button
								className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-4 py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
								onClick={() => {
									if (pageNumber < totalPages) {
										setPageNumber(pageNumber + 1);
										setLoading(true);
									} else {
										toast.success("You are on the last page");
									}
								}}
							>
								Next
							</button>
						</div>

						<div className="text-sm text-slate-300 font-medium text-center">
							Page <span className="text-cyan-300">{pageNumber}</span> of{" "}
							<span className="text-cyan-300">{totalPages}</span>
						</div>

						<select
							value={pageSize}
							onChange={(e) => {
								setPageSize(parseInt(e.target.value));
								setPageNumber(1);
								setLoading(true);
							}}
							className="w-full sm:w-[140px] border border-slate-700 bg-slate-800 text-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
						>
							<option value={10}>10 per page</option>
							<option value={20}>20 per page</option>
							<option value={50}>50 per page</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}