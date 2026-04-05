import { Link, Route, Routes, useLocation } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { BiEnvelope } from "react-icons/bi";
import { HiOutlinePlusCircle } from "react-icons/hi";

import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";

import { AdminContactMessagesPage } from "./admin/AdminContactMessagesPage";
import AdminUsersPage from "./admin/adminUserspage";

export default function AdminPage() {
	const location = useLocation();

	const navItems = [
		{
			name: "Orders",
			path: "/admin/",
			icon: <FaRegListAlt className="text-[20px]" />,
		},
		{
			name: "Products",
			path: "/admin/products",
			icon: <MdOutlineInventory2 className="text-[22px]" />,
		},
		{
			name: "Users",
			path: "/admin/users",
			icon: <LuUsersRound className="text-[21px]" />,
		},
		{
			name: "Messages",
			path: "/admin/contact-messages",
			icon: <BiEnvelope className="text-[21px]" />,
		},
		{
			name: "Add Product",
			path: "/admin/add-product",
			icon: <HiOutlinePlusCircle className="text-[22px]" />,
		},
	];

	return (
		<div className="w-full h-full flex bg-slate-950 p-4 gap-4">
			<div className="w-[300px] h-full rounded-[28px] border border-cyan-500/20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_0_30px_rgba(34,211,238,0.08)] overflow-hidden">
				<div className="px-6 py-7 border-b border-white/10 bg-white/[0.03]">
					<p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80 mb-2">
						Control Center
					</p>
					<h1 className="text-3xl font-extrabold tracking-tight">
						Admin <span className="text-cyan-400">Panel</span>
					</h1>
					<p className="text-sm text-slate-400 mt-2 leading-6">
						Manage products, orders, users, and customer messages.
					</p>
				</div>

				<div className="p-4">
					<div className="mb-3 px-3">
						<p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
							Navigation
						</p>
					</div>

					<div className="space-y-2">
						{navItems.map((item) => {
							const isActive = location.pathname === item.path;

							return (
								<Link
									key={item.path}
									to={item.path}
									className={`group relative flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
										isActive
											? "bg-gradient-to-r from-cyan-400/15 to-blue-500/15 text-cyan-300 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
											: "text-slate-300 hover:bg-white/[0.05] hover:text-cyan-300 border border-transparent"
									}`}
								>
									<div
										className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
											isActive
												? "bg-cyan-400/15 text-cyan-300"
												: "bg-white/[0.04] text-slate-300 group-hover:bg-cyan-400/10 group-hover:text-cyan-300"
										}`}
									>
										{item.icon}
									</div>

									<div className="flex flex-col">
										<span className="text-[16px] font-semibold leading-none">
											{item.name}
										</span>
										<span
											className={`text-xs mt-1 ${
												isActive ? "text-cyan-200/70" : "text-slate-500"
											}`}
										>
											Open {item.name.toLowerCase()}
										</span>
									</div>

									{isActive && (
										<div className="absolute right-4 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"></div>
									)}
								</Link>
							);
						})}
					</div>
				</div>

			
			</div>

			<div className="flex-1 h-full rounded-[28px] border border-cyan-500/10 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] overflow-hidden">
				<Routes>
					<Route path="/" element={<AdminOrdersPage />} />
					<Route path="/products" element={<AdminProductsPage />} />
					<Route path="/users" element={<AdminUsersPage />} />
					<Route path="/add-product" element={<AdminAddProductPage />} />
					<Route path="/contact-messages" element={<AdminContactMessagesPage />} />
					<Route path="/update-product" element={<AdminUpdateProductPage />} />
				</Routes>
			</div>
		</div>
	);
}
//instead of w-[calc(100%-300px)] you can use flex-1