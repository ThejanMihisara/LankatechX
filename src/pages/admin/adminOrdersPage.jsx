import axios from "axios";
import { useEffect, useState } from "react";

import getFormattedPrice from "../../utils/price-format";
import getFormattedDate from "../../utils/date-format";
import toast from "react-hot-toast";
import ViewOrderInfoModal from "../../components/viewOrderInfoModal";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function AdminOrdersPage() {
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
					},
				)
				.then((response) => {
					setOrders(response.data.orders);
					setTotalPages(response.data.totalPages);
					setLoading(false);
				});
		}
	}, [loading]);

	return (
		<div className="w-full h-full overflow-y-scroll relative bg-[#020b1f] rounded-[24px] border border-cyan-500/20 shadow-[0_0_35px_rgba(0,180,255,0.08)]">
			<div className="flex items-center justify-between gap-3 px-6 py-5 bg-[#052c3a] border-b border-cyan-400/20">
				<div>
					<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-1">
						Admin Control
					</p>
					<h2 className="text-2xl font-bold text-white">Orders</h2>
					<p className="text-sm text-slate-300/80 mt-1">
						Manage your orders at a glance
					</p>
				</div>

				<div className="px-4 py-2 rounded-2xl border border-cyan-400/15 bg-[#03192d] text-right shadow-[0_0_20px_rgba(0,180,255,0.05)]">
					<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
						Total Pages
					</p>
					<p className="text-lg font-bold text-cyan-300">{totalPages}</p>
				</div>
			</div>

			{loading ? (
				<div className="w-full h-full flex justify-center items-center">
					<LoadingAnimation />
				</div>
			) : (
				<div className="p-4">
					<div className="rounded-[24px] border border-cyan-400/15 bg-[#d8e2e8] shadow-[0_0_30px_rgba(0,0,0,0.18)] overflow-hidden">
						<table className="min-w-[1100px] w-full text-sm relative">
							<thead className="sticky top-0 z-10 bg-[#05394a]">
								<tr className="border-b border-cyan-900/20">
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Order ID
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Customer Name
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Email
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Date
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Total Amount
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Status
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Actions
									</th>
								</tr>
							</thead>

							<tbody>
								{orders.map((order, index) => (
									<tr
										key={order.id}
										className={`border-b border-slate-300/40 hover:bg-cyan-100/30 transition duration-300 ${
											index % 2 === 0 ? "bg-[#d1dde4]" : "bg-[#e3e7ea]"
										}`}
									>
										<td className="px-5 py-4 text-center text-[#05394a] font-semibold">
											{order.orderId}
										</td>

										<td className="px-5 py-4 text-center text-[#05394a] font-medium">
											{order.firstName + " " + order.lastName}
										</td>

										<td className="px-5 py-4 text-center text-[#002f4a] font-medium">
											{order.email}
										</td>

										<td className="px-5 py-4 text-center text-[#35566a]">
											{getFormattedDate(order.date)}
										</td>

										<td className="px-5 py-4 text-center font-bold text-[#00a8ff]">
											{getFormattedPrice(order.total)}
										</td>

										<td className="px-5 py-4 text-center">
											<span
												className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
													order.status?.toLowerCase() === "pending"
														? "bg-yellow-500/15 text-yellow-700 border border-yellow-500/20"
														: order.status?.toLowerCase() === "shipped" ||
														  order.status?.toLowerCase() === "delivered" ||
														  order.status?.toLowerCase() === "completed"
														? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/20"
														: order.status?.toLowerCase() === "cancelled"
														? "bg-red-500/15 text-red-700 border border-red-500/20"
														: "bg-cyan-500/15 text-[#005d8f] border border-cyan-500/20"
												}`}
											>
												{order.status}
											</span>
										</td>

										<td className="px-5 py-4 text-center">
											<div className="flex justify-center">
												<ViewOrderInfoModal order={order} />
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			<div className=" bottom-5 relative left-1/2 -translate-x-1/2 h-[56px] flex justify-center items-center ">
	<div className="w-[560px] h-full border border-cyan-500/20 bg-[#03192d] shadow-[0_0_30px_rgba(0,0,0,0.28)] rounded-full flex items-center justify-center px-3 backdrop-blur-md">
		<button
			className="bg-gradient-to-r from-cyan-500 to-sky-500 w-[110px] text-white p-2 rounded-full cursor-pointer hover:opacity-90 font-medium transition"
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

		<span className="text-sm text-slate-200 w-[130px] text-center font-medium">
			Page <span className="text-cyan-300">{pageNumber}</span> of{" "}
			<span className="text-cyan-300">{totalPages}</span>
		</span>

		<button
			className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white p-2 rounded-full w-[110px] cursor-pointer hover:opacity-90 font-medium transition"
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

		<select
			value={pageSize}
			onChange={(e) => {
				setPageSize(parseInt(e.target.value));
				setLoading(true);
			}}
			className="ml-5 border border-cyan-500/20 bg-[#052c3a] text-slate-200 rounded-full px-4 py-2 text-sm outline-none"
		>
			<option value={10}>10 per page</option>
			<option value={20}>20 per page</option>
			<option value={50}>50 per page</option>
		</select>
	</div>
</div>
		</div>
	);
}