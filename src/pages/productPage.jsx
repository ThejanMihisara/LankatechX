import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";

import { motion } from "framer-motion";
import LoadingAnimation from "../components/LoadingAnimation";

export default function ProdctPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery , setSearchQuery] = useState("")

    useEffect(
        () => {
            if(loading){
               let url = import.meta.env.VITE_API_URL + "/products/"
                if(searchQuery!=""){
                    url = import.meta.env.VITE_API_URL + "/products/search/" + searchQuery
                }
                axios.get(url)
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
     <div className="flex justify-center flex-wrap bg-primary relative pt-[80px]">
      <LoadingAnimation />
    </div>
  )}
 <div className="w-full h-[60px] backdrop-blur-sm fixed top-[100px] z-99 flex justify-center items-center">
                <input type="text" placeholder="Search for products..." className="w-[400px] h-[40px] rounded-full px-4 border border-secondary outline-none"
                onChange={
                    (e)=>{
                        setSearchQuery(e.target.value)
                        setLoading(true)
                    }
                }/>
                {/* get all products button */}
                <button className="ml-4 px-4 py-2 rounded-full bg-secondary text-white"
                onClick={
                    ()=>{
                        setSearchQuery("")
                        setLoading(true)
                    }
                }
                >
                    Get all products
                </button>
            </div>
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