import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settings"
import AboutUsPage from "./AboutUsPage.jsx";
import { ContactUsPage } from "./ContactUsPage.jsx";
import SpecialOffersPage from "./SpecialOffersPage.jsx";
import CategoryProductsPage from "./CategoryProductsPage.jsx";
import HomePageCustomer from "./HomePageCustomer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import TermsOfServicePage from "./TermsOfServicePage.jsx";
import PrivacyPolicyPage from "./PrivacyPolicyPage.jsx";
import WarrantyPage from "./WarrantyPage.jsx";
export default function HomePage(){
    return(
        <div className="w-full min-h-screen">
            <Header/>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePageCustomer />} />
                <Route path="/about" element={<AboutUsPage/>} />
                <Route path="/contact" element={<ContactUsPage/>} />
                <Route path="/offers" element={<SpecialOffersPage />} />
                {/* products */}
                <Route path="/products" element={<CategoryProductsPage />} />
                <Route path="/products/desktop" element={<CategoryProductsPage />} />
                <Route path="/products/older-products" element={<CategoryProductsPage />} />

                <Route path="/brands/:slug" element={<CategoryProductsPage />} />
                <Route path="/components/:slug" element={<CategoryProductsPage />} />
                <Route path="/accessories/:slug" element={<CategoryProductsPage />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/overview/:productId" element={<Overview/>} />
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/my-orders" element={<MyOrdersPage/>} />
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/warranty" element={<WarrantyPage />} />
                <Route path="/*" element={<div>404 Not Found</div>} />
            </Routes>
        </div>
    )
}