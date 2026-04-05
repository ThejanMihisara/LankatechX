import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import { CgClose } from "react-icons/cg";

export default function CustomerViewOrderInfoModal(props) {
	const [isVisible, setIsVisible] = useState(false);
	const order = props.order;

	return (
		<>
			<button
	            className="hidden lg:inline-block bg-accent text-white px-3 py-1 rounded hover:bg-accent/80 transition"
	            onClick={() => setIsVisible(true)}
            >
	              View Details
             </button>

			{isVisible && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 overflow-y-auto">
					<div className="w-[600px] h-[600px] bg-slate-950 rounded-md relative border border-cyan-500/20 shadow-2xl overflow-hidden">
						<button
							className="absolute w-10 h-10 text-red-400 text-2xl rounded-full border border-red-500/40 bg-slate-900 hover:bg-red-600 hover:text-white cursor-pointer flex justify-center items-center right-3 top-3 z-20 transition"
							onClick={() => setIsVisible(false)}
						>
							<CgClose />
						</button>

						<div className="w-full h-[230px] bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 rounded-t-md border-b border-cyan-500/20 px-5 py-4">
							<div className="w-full min-h-[40px] flex items-start justify-between gap-4 pr-12">
								<h1 className="text-2xl font-semibold text-white break-all">
									{order.orderId}
								</h1>
								<h2 className="text-sm font-light text-slate-200 text-right leading-5 max-w-[220px]">
									{getFormattedDate(order.date)}
								</h2>
							</div>

							<div className="w-full mt-4 grid grid-cols-2 gap-3">
								<div className="bg-white/5 border border-white/10 rounded-lg p-3 min-w-0">
									<p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">
										Customer
									</p>
									<h1 className="text-sm font-semibold text-white break-words">
										{order.firstName + " " + order.lastName}
									</h1>
								</div>

								<div className="bg-white/5 border border-white/10 rounded-lg p-3 min-w-0">
									<p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">
										Email
									</p>
									<h2 className="text-xs font-light text-slate-200 break-all leading-5">
										{order.email}
									</h2>
								</div>

								<div className="bg-white/5 border border-white/10 rounded-lg p-3 min-w-0">
									<p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">
										Total
									</p>
									<h1 className="text-base font-semibold text-cyan-300">
										{getFormattedPrice(order.total)}
									</h1>
								</div>

								<div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 min-w-0">
									<p className="text-[11px] uppercase tracking-wide text-slate-400 mb-0.5">
										Notes
									</p>
									<p className="text-xs text-slate-300 break-words leading-4 line-clamp-2">
										{order.notes || "No additional notes"}
									</p>
								</div>
							</div>
						</div>

						<div className="w-full h-[370px] p-5 overflow-y-auto bg-slate-950">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold text-white">Order Items</h2>
								<span className="text-sm text-slate-400">
									{order.items.length} item{order.items.length > 1 ? "s" : ""}
								</span>
							</div>

							{order.items.map((item, index) => {
								return (
									<div
										key={index}
										className="w-full h-auto flex items-center justify-between gap-3 mb-3 p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-900 transition"
									>
										<div className="flex items-center gap-3 min-w-0 flex-1">
											<img
												src={item.image}
												alt={item.name}
												className="h-[60px] w-[60px] object-cover rounded-lg border border-slate-700 bg-white flex-shrink-0"
											/>

											<div className="flex flex-col min-w-0">
												<span className="text-sm font-semibold text-white break-words">
													{item.name}
												</span>
												<span className="text-xs text-slate-400 mt-1">
													Qty: {item.quantity}
												</span>
											</div>
										</div>

										<div className="text-right flex-shrink-0">
											<p className="text-[10px] uppercase tracking-wide text-slate-500">
												Price
											</p>
											<span className="text-sm font-semibold text-cyan-300">
												{getFormattedPrice(item.price)}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
}