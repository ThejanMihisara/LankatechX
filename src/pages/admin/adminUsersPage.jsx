import axios from "axios";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import LoadingAnimation from "../../components/LoadingAnimation";



export default function AdminUsersPage() {
	const [users, setUsers] = useState([]);
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
						"/users/all/" +
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
					setUsers(response.data.users);
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
					<h2 className="text-2xl font-bold text-white">Users</h2>
					<p className="text-sm text-slate-300/80 mt-1">
						Manage your users at a glance
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
										
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Email
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										First Name
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Last Name
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Role
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Email Verification
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Account Status
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Block Control
									</th>
									<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#c7dde7]">
										Role Control
									</th>
								</tr>
							</thead>

							<tbody>
								{users.map((user, index) => (
									<tr
										key={user.email}
										className={`border-b border-slate-300/40 hover:bg-cyan-100/30 transition duration-300 ${
											index % 2 === 0 ? "bg-[#d1dde4]" : "bg-[#e3e7ea]"
										}`}
									>
										<td className="px-5 py-4 text-center">
											<div className="flex justify-center">
												<div className="p-[2px] rounded-full bg-gradient-to-br from-cyan-500/50 to-sky-500/30">
													<img
														referrerPolicy="no-referrer"
														src={user.image}
														className="w-[52px] h-[52px] object-cover rounded-full bg-slate-200"
													/>
												</div>
											</div>
										</td>

										<td className="px-5 py-4 text-center text-[#002f4a] font-medium">
											{user.email}
										</td>

										<td className="px-5 py-4 text-center text-[#05394a] font-semibold">
											{user.firstName}
										</td>

										<td className="px-5 py-4 text-center text-[#05394a] font-semibold">
											{user.lastName}
										</td>

										<td className="px-5 py-4 text-center">
											<span
												className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
													user.role === "admin"
														? "bg-cyan-500/15 text-[#005d8f] border border-cyan-500/20"
														: "bg-slate-500/10 text-[#35566a] border border-slate-500/20"
												}`}
											>
												{user.role}
											</span>
										</td>

										<td className="px-5 py-4 text-center">
											<span
												className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
													user.isEmailVerified
														? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/20"
														: "bg-yellow-500/15 text-yellow-700 border border-yellow-500/20"
												}`}
											>
												{user.isEmailVerified ? "Verified" : "Not Verified"}
											</span>
										</td>

										<td className="px-5 py-4 text-center">
											<span
												className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
													user.isBlocked
														? "bg-red-500/15 text-red-700 border border-red-500/20"
														: "bg-emerald-500/15 text-emerald-700 border border-emerald-500/20"
												}`}
											>
												{user.isBlocked ? "Blocked" : "Active"}
											</span>
										</td>

										<td className="px-5 py-4 text-center">
											<button
												className={`px-4 py-2 rounded-full text-white font-medium shadow-md transition ${
													user.isBlocked
														? "bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90"
														: "bg-gradient-to-r from-red-500 to-rose-500 hover:opacity-90"
												}`}
												onClick={() => {
													axios
														.post(
															import.meta.env.VITE_API_URL + "/users/toggle-block",
															{
																email: user.email,
															},
															{
																headers: {
																	Authorization:
																		"Bearer " + localStorage.getItem("token"),
																},
															},
														)
														.then((response) => {
															toast.success(response.data.message);
															setLoading(true);
														})
														.catch((err) => {
															toast.error(
																err?.response?.data?.message ||
																	"Failed to toggle block status",
															);
														});
												}}
											>
												{user.isBlocked ? "Unblock" : "Block"}
											</button>
										</td>

										<td className="px-5 py-4 text-center">
											<button
												className={`px-2 py-2 rounded-full text-white font-medium shadow-md transition ${
													user.role === "admin"
														? "bg-gradient-to-r from-slate-500 to-slate-600 hover:opacity-90"
														: "bg-gradient-to-r from-cyan-500 to-sky-500 hover:opacity-90"
												}`}
												onClick={() => {
													axios
														.post(
															import.meta.env.VITE_API_URL + "/users/toggle-role",
															{
																email: user.email,
															},
															{
																headers: {
																	Authorization:
																		"Bearer " + localStorage.getItem("token"),
																},
															},
														)
														.then((response) => {
															toast.success(response.data.message);
															setLoading(true);
														})
														.catch((err) => {
															toast.error(
																err?.response?.data?.message ||
																	"Failed to toggle block status",
															);
														});
												}}
											>
												{user.role === "admin" ? "Make Customer" : "Make Admin"}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			<div className=" relative  bottom-5 left-1/2 -translate-x-1/2 z-50 h-[56px] flex justify-center items-center">
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