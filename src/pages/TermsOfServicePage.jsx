export default function TermsOfServicePage() {
	return (
		<div className="min-h-screen bg-[#020b1f] text-white px-4 sm:px-6 lg:px-8 py-10">
			<div className="max-w-5xl mx-auto rounded-[28px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_35px_rgba(0,180,255,0.08)] p-6 sm:p-8 lg:p-10">
				<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
					Legal
				</p>
				<h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
					Terms of Service
				</h1>

				<div className="space-y-6 text-slate-300/85 leading-8">
					<div>
						<h2 className="text-xl font-bold text-white mb-2">1. General</h2>
						<p>
							By using LankatechX, you agree to follow our store policies, website
							rules, and all applicable laws and regulations.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">2. Products and Pricing</h2>
						<p>
							All products are subject to availability. Prices, promotions, and
							product details may change without prior notice.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">3. Orders</h2>
						<p>
							Orders may be confirmed only after successful processing. We reserve
							the right to cancel or reject orders in case of stock issues,
							incorrect pricing, or suspicious activity.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">4. User Responsibility</h2>
						<p>
							You are responsible for providing accurate personal, billing, and
							delivery details when placing an order.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">5. Account Use</h2>
						<p>
							Users must keep their account credentials safe. Any activity under
							your account is your responsibility.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">6. Changes</h2>
						<p>
							LankatechX may update these terms at any time. Continued use of the
							site means you accept the updated terms.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}