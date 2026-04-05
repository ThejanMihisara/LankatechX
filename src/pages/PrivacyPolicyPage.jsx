export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-[#020b1f] text-white px-4 sm:px-6 lg:px-8 py-10">
			<div className="max-w-5xl mx-auto rounded-[28px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_35px_rgba(0,180,255,0.08)] p-6 sm:p-8 lg:p-10">
				<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
					Legal
				</p>
				<h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
					Privacy Policy
				</h1>

				<div className="space-y-6 text-slate-300/85 leading-8">
					<div>
						<h2 className="text-xl font-bold text-white mb-2">1. Information We Collect</h2>
						<p>
							We may collect your name, email, phone number, delivery address,
							and order details to process purchases and support requests.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">2. How We Use Information</h2>
						<p>
							Your information is used to process orders, provide support,
							improve our services, and communicate important updates.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">3. Data Security</h2>
						<p>
							We take reasonable steps to protect your information, but no online
							system can guarantee complete security.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">4. Third-Party Services</h2>
						<p>
							We may use trusted third-party services for payments, hosting, or
							communication. These providers handle data according to their own
							policies.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">5. Cookies and Site Usage</h2>
						<p>
							We may use basic browser storage or similar tools to improve your
							experience, such as saving cart data and preferences.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-bold text-white mb-2">6. Updates</h2>
						<p>
							This privacy policy may be updated over time. Please review it
							periodically for changes.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}