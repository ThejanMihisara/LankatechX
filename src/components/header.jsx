import {
    BiShoppingBag,
    BiMenu,
    BiX,
    BiChevronDown,
    BiChevronRight,
    BiGift,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserData from "./userData";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
    const [mobileActiveCategory, setMobileActiveCategory] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const categoryItems = [
        {
            name: "Brands",
            children: [
                { name: "Apple", path: "/brands/apple" },
                { name: "HP", path: "/brands/hp" },
                { name: "Dell", path: "/brands/dell" },
                { name: "Asus", path: "/brands/asus" },
                { name: "MSI", path: "/brands/msi" },
                { name: "Lenovo", path: "/brands/lenovo" },
                { name: "Acer", path: "/brands/acer" },
            ],
        },
        {
            name: "Laptops & Desktops",
            children: [
                { name: "Laptop", path: "/products" },
                { name: "Desktop", path: "/products/desktop" },
                { name: "Older Products", path: "/products/older-products" },
            ],
        },
        {
            name: "Accessories",
            children: [
                { name: "Bag & Cases", path: "/accessories/bag-cases" },
                { name: "Battery", path: "/accessories/battery" },
                { name: "Keyboard & Mouse", path: "/accessories/keyboard-mouse" },
                { name: "Other Accessories", path: "/accessories/other-accessories" },
            ],
        },
        {
            name: "Components",
            children: [
                { name: "VGA Cards", path: "/components/vga-cards" },
                { name: "Motherboards", path: "/components/motherboards" },
                { name: "Power Supply", path: "/components/power-supply" },
                { name: "Processors", path: "/components/processors" },
                { name: "RAM", path: "/components/ram" },
                { name: "Computer Cases", path: "/components/computer-cases" },
            ],
        },
    ];

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setMobileCategoriesOpen(false);
        setMobileActiveCategory(null);
    };

useEffect(() => {
	function updateCartCount() {
		try {
			const cart = JSON.parse(localStorage.getItem("cart")) || [];
			setCartCount(Array.isArray(cart) ? cart.length : 0);
		} catch {
			setCartCount(0);
		}
	}

	updateCartCount();
    

	window.addEventListener("storage", updateCartCount);
	window.addEventListener("cartUpdated", updateCartCount);

	return () => {
		window.removeEventListener("storage", updateCartCount);
		window.removeEventListener("cartUpdated", updateCartCount);
	};
}, []);

    return (
        <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 shadow-lg">
            <div className="w-full h-[72px] sm:h-[80px] md:h-[90px] px-3 sm:px-4 md:px-5 flex items-center justify-between">
                <div className="flex items-center justify-start min-w-0">
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
                        <div className="relative flex items-center justify-center h-[60px] sm:h-[70px] md:h-[90px] min-w-[72px] sm:min-w-[90px] md:min-w-[110px]">
                            <img
                                src="/logo.png"
                                alt="LankatechX Logo"
                                className="h-[54px] sm:h-[64px] md:h-[82px] w-auto object-contain group-hover:scale-105 transition duration-300 drop-shadow-[0_8px_22px_rgba(0,0,0,0.35)]"
                            />
                        </div>

                        <div className="leading-tight min-w-0">
                            <h1 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent truncate">
                                LankatechX
                            </h1>
                            <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-300 tracking-[0.18em] sm:tracking-[0.25em] uppercase">
                                Computer Store
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-slate-200 hover:text-cyan-300 font-medium transition"
                    >
                        Home
                    </Link>

                    <div
                        className="relative"
                        onMouseEnter={() => {
                            setCategoriesOpen(true);
                            setActiveCategory(null);
                        }}
                        onMouseLeave={() => {
                            setCategoriesOpen(false);
                            setActiveCategory(null);
                        }}
                    >
                        <button
                            className="flex items-center gap-2 text-slate-200 hover:text-cyan-300 font-semibold transition"
                            onClick={() => {
                                setCategoriesOpen((prev) => !prev);
                                if (!categoriesOpen) setActiveCategory(null);
                            }}
                        >
                            Categories
                            <BiChevronDown size={20} />
                        </button>

                        {categoriesOpen && (
                            <div className="absolute top-full left-0 w-[300px] bg-[#e9e9e9] text-slate-700 shadow-2xl border-t-2 border-red-500 z-50">
                                {categoryItems.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="relative"
                                        onMouseEnter={() => setActiveCategory(index)}
                                    >
                                        <div className="flex items-center justify-between px-7 py-4 text-[17px] border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                                            <span>{item.name}</span>
                                            <BiChevronRight
                                                size={22}
                                                className="text-gray-400"
                                            />
                                        </div>

                                        {activeCategory === index && (
                                            <div className="absolute top-0 left-full min-w-[260px] bg-white shadow-2xl border border-gray-200 z-50">
                                                {item.children.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        to={subItem.path}
                                                        className="block px-5 py-3 text-[15px] text-slate-700 border-b border-gray-200 last:border-b-0 hover:bg-cyan-50 hover:text-cyan-700"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        to="/offers"
                        className="flex items-center gap-2 text-slate-200 hover:text-cyan-300 font-medium transition"
                    >
                        <BiGift size={20} />
                        Special Offers
                    </Link>

                    <Link
                        to="/about"
                        className="text-slate-200 hover:text-cyan-300 font-medium transition"
                    >
                        About Us
                    </Link>

                    <Link
                        to="/contact"
                        className="text-slate-200 hover:text-cyan-300 font-medium transition"
                    >
                        Contact Us
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/cart"
                        className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:scale-105 transition duration-300 shadow-md"
                    >
                        <BiShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-bold flex items-center justify-center shadow-md">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <div className="pl-1">
                        <UserData />
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <Link
                        to="/cart"
                        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white"
                    >
                        <BiShoppingBag size={22} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-md">
                                {cartCount}
                            </span>
                            
                        )}
                    </Link>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="text-white bg-white/10 p-2 rounded-lg border border-white/10"
                    >
                        {mobileOpen ? <BiX size={26} /> : <BiMenu size={26} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-2">
                    <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="block text-slate-200 hover:text-cyan-300 font-medium py-3 border-b border-white/5"
                    >
                        Home
                    </Link>

                    <div className="border-b border-white/5">
                        <button
                            onClick={() =>
                                setMobileCategoriesOpen(!mobileCategoriesOpen)
                            }
                            className="w-full flex items-center justify-between text-slate-200 hover:text-cyan-300 font-medium py-3"
                        >
                            <span>Categories</span>
                            <BiChevronDown
                                size={20}
                                className={`transition-transform ${
                                    mobileCategoriesOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {mobileCategoriesOpen && (
                            <div className="pb-3 space-y-2">
                                {categoryItems.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="rounded-lg bg-white/5 border border-white/5 overflow-hidden"
                                    >
                                        <button
                                            onClick={() =>
                                                setMobileActiveCategory(
                                                    mobileActiveCategory === index
                                                        ? null
                                                        : index
                                                )
                                            }
                                            className="w-full flex items-center justify-between px-3 py-3 text-left text-slate-200"
                                        >
                                            <span className="text-sm font-medium">
                                                {item.name}
                                            </span>
                                            <BiChevronRight
                                                size={18}
                                                className={`transition-transform ${
                                                    mobileActiveCategory === index
                                                        ? "rotate-90"
                                                        : ""
                                                }`}
                                            />
                                        </button>

                                        {mobileActiveCategory === index && (
                                            <div className="px-3 pb-3 space-y-1">
                                                {item.children.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        to={subItem.path}
                                                        onClick={closeMobileMenu}
                                                        className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        to="/offers"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 text-slate-200 hover:text-cyan-300 font-medium py-3 border-b border-white/5"
                    >
                        <BiGift size={18} />
                        Special Offers
                    </Link>

                    <Link
                        to="/about"
                        onClick={closeMobileMenu}
                        className="block text-slate-200 hover:text-cyan-300 font-medium py-3 border-b border-white/5"
                    >
                        About Us
                    </Link>

                    <Link
                        to="/contact"
                        onClick={closeMobileMenu}
                        className="block text-slate-200 hover:text-cyan-300 font-medium py-3 border-b border-white/5"
                    >
                        Contact Us
                    </Link>

                    <div className="pt-3">
                        <UserData />
                    </div>
                </div>
            )}
        </header>
    );
}