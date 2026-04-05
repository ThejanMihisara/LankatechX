export default function WarrantyPage() {
	return (
		<div className="min-h-screen bg-[#020b1f] text-white px-4 sm:px-6 lg:px-8 py-10">
			<div className="max-w-5xl mx-auto rounded-[28px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_35px_rgba(0,180,255,0.08)] p-6 sm:p-8 lg:p-10">
				<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
					Support
				</p>
				<h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
					Warranty Policy
				</h1>

				<div className="space-y-6 text-slate-300/85 leading-8">
					<div>
						<h2 className="text-xl font-bold text-white mb-2">1. Warranty Coverage</h2>
						<p>
							Warranty coverage depends on the product brand, manufacturer, and
							product type. Warranty terms may vary from item to item.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">2. Valid Warranty Claims</h2>
						<p>
							Warranty applies to manufacturer defects and hardware faults under
							normal use during the warranty period.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">3. Not Covered</h2>
						<p>
							Physical damage, liquid damage, misuse, unauthorized repairs, power
							surges, and accidental damage are generally not covered.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">4. Claim Process</h2>
						<p>
							To request warranty service, contact our support team with your
							order details and proof of purchase.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">5. Inspection</h2>
						<p>
							Products may be inspected before approval of repair, replacement,
							or service under warranty.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">6. Final Decision</h2>
						<p>
							Warranty approvals are subject to product inspection and the
							applicable brand or store policy.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}