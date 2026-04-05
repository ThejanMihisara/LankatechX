import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";

export default function CategoryProductsPage() {
	const { slug } = useParams();
	const location = useLocation();

	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setLoading(true);

		axios
			.get(import.meta.env.VITE_API_URL + "/products")
			.then((response) => {
				setProducts(response.data || []);
				setLoading(false);
			})
			.catch(() => {
				toast.error("Failed to fetch products");
				setLoading(false);
			});
	}, []);

	function normalize(value) {
		return String(value || "")
			.toLowerCase()
			.replace(/&/g, "and")
			.replace(/-/g, " ")
			.replace(/\s+/g, " ")
			.trim();
	}

	function titleCase(value) {
		return String(value || "")
			.split(/[-\s]+/)
			.map((word) =>
				word ? word.charAt(0).toUpperCase() + word.slice(1) : ""
			)
			.join(" ");
	}

	const pageConfig = useMemo(() => {
		const path = location.pathname.toLowerCase();

		const routeMap = {
			"/products": {
				title: "Laptop",
				categoryValue: "laptops",
			},
			"/products/desktop": {
				title: "Desktop",
				categoryValue: "desktops",
			},
			"/products/older-products": {
				title: "Older Products",
				categoryValue: "older products",
			},

			"/brands/apple": {
				title: "Apple",
				categoryValue: "apple",
			},
			"/brands/hp": {
				title: "HP",
				categoryValue: "hp",
			},
			"/brands/dell": {
				title: "Dell",
				categoryValue: "dell",
			},
			"/brands/asus": {
				title: "Asus",
				categoryValue: "asus",
			},
			"/brands/msi": {
				title: "MSI",
				categoryValue: "msi",
			},
			"/brands/lenovo": {
				title: "Lenovo",
				categoryValue: "lenovo",
			},
			"/brands/acer": {
				title: "Acer",
				categoryValue: "acer",
			},

			"/accessories/bag-cases": {
				title: "Bag & Cases",
				categoryValue: "bag cases",
			},
			"/accessories/battery": {
				title: "Battery",
				categoryValue: "battery",
			},
			"/accessories/keyboard-mouse": {
				title: "Keyboard & Mouse",
				categoryValue: "keyboard mouse",
			},
            "/accessories/other-accessories": {
                title: "Other Accessories",
                categoryValue: "other accessories",
            },

			"/components/vga-cards": {
				title: "VGA Cards",
				categoryValue: "vga cards",
			},
			"/components/motherboards": {
				title: "Motherboards",
				categoryValue: "motherboards",
			},
			"/components/power-supply": {
				title: "Power Supply",
				categoryValue: "power supply",
			},
			"/components/processors": {
				title: "Processors",
				categoryValue: "processors",
			},
			"/components/ram": {
				title: "RAM",
				categoryValue: "ram",
			},
			"/components/computer-cases": {
				title: "Computer Cases",
				categoryValue: "computer cases",
			},
		};

		if (routeMap[path]) return routeMap[path];

		return {
			title: titleCase(slug || "Products"),
			categoryValue: "",
		};
	}, [location.pathname, slug]);

	useEffect(() => {
		let result = [...products];

		if (pageConfig.categoryValue !== "") {
			result = result.filter(
				(item) => normalize(item.category) === normalize(pageConfig.categoryValue)
			);
		}

		if (searchQuery.trim() !== "") {
			const query = normalize(searchQuery);
			result = result.filter((item) =>
				normalize(item.category).includes(query)
			);
		}

		setFilteredProducts(result);
	}, [products, pageConfig, searchQuery]);

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			{loading && (
				<div className="flex justify-center flex-wrap bg-primary relative pt-[80px]">
					<LoadingAnimation />
				</div>
			)}

			<div className="w-full h-[60px] backdrop-blur-sm fixed top-[100px] z-30 flex justify-center items-center gap-4">
				<input
					type="text"
					placeholder={`Search in ${pageConfig.title} category...`}
					className="w-[400px] h-[40px] rounded-full px-4 border border-secondary outline-none"
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
					}}
				/>

				<button
					className="ml-4 px-4 py-2 rounded-full bg-secondary text-white"
					onClick={() => {
						setSearchQuery("");
					}}
				>
					Get all {pageConfig.title}
				</button>
			</div>

			{!loading && (
				<div className="max-w-7xl mx-auto pt-[90px]">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-secondary">
							{pageConfig.title}
						</h1>
						<p className="text-secondary/70 mt-2">
							Showing {filteredProducts.length} product
							{filteredProducts.length !== 1 ? "s" : ""}
						</p>
					</div>

					{filteredProducts.length === 0 ? (
						<div className="w-full bg-white rounded-2xl shadow p-10 text-center mt-6">
							<h2 className="text-2xl font-bold text-secondary mb-2">
								No products found
							</h2>
							<p className="text-secondary/70">
								No matching products available in this category.
							</p>
						</div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6 }}
							className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
						>
							{filteredProducts.map((item) => (
								<ProductCard key={item._id || item.productId} product={item} />
							))}
						</motion.div>
					)}
				</div>
			)}
		</div>
	);
}