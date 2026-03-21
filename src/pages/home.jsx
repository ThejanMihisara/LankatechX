import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProdctPage from "./productPage.jsx";
import Overview from "./overview.jsx";
import Cart from "./cart.jsx";




export default function HomePage() {
    return (
        <div className="w-full min-h-screen">
         <Header/>
         <Routes>
            <Route path="/" element={<div>Home Page Content</div>} /> 
            <Route path="/about" element={<div>About Page Content</div>} />
            <Route path="/contact" element={<div>Contact Page Content</div>} />
            <Route path="/products" element={<ProdctPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productoverview/:productId" element={<Overview />} />
            <Route path="/*" element={<div>404 Not Found</div>} />
         </Routes>
        </div>
    )
}