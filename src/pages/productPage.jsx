import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { motion } from "framer-motion";

export default function ProdctPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            if(loading){
                axios.get(import.meta.env.VITE_API_URL + "/products")
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                }).catch(
                    (error) => {
                   toast.error("Failed to fetch products");
                    setLoading(false);
                })
            }
        },[loading]
    )
   return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
  {loading && (
    <div className="flex justify-center items-center h-[300px]">
      <LoadingAnimation />
    </div>
  )}

  {!loading && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
      
    </motion.div>
    
  )}
</div>
);

}