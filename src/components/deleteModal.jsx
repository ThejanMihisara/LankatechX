import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";

export default function DeleteModal(props) {
        const [isVisible, setIsVisible] = useState(false);
        const product = props.product;
        const setLoading = props.setLoading;


    return(
        <div>
            <CiTrash className={"hover:text-red-600 cursor-pointer"} onClick={() => {setIsVisible(true)}}/>
            {isVisible && (<div className="fixed z-100 bg-black/50 w-screen h-screen top-0 left-0 flex justify-center items-center">
            <div className="w-[400px] h-[200px] bg-white rounded-lg p-6 flex flex-col justify-center items-center relative">
                <button className="w-10 h-10 bg-red-600 text-white absolute right-0 top-0 text-sm font-bold hover:bg-red-800 cursor-pointer" onClick={() => {setIsVisible(false)}}>X</button>
                <p className="text-center">
                    Are you sure you want to delete <br />
                    <strong>{product.name} (ID: {product.productId})</strong>?
                </p>

                <div className="flex gap-4 mt-6">
                    <button className="bg-gray-300 text-gray-700 font-bold rounded-[10px] h-[30px] w-[70px] hover:bg-gray-400 text-sm" onClick={() => {setIsVisible(false)}}>Cancel</button>
                    <button className="bg-red-600 text-white font-bold rounded-[10px] h-[30px] w-[70px] hover:bg-red-800 text-sm" onClick={() => { const token = localStorage.getItem("token");
                    axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productId, {
                      headers: {
                        Authorization: "Bearer " + token,
                      },
                    })
                      .then((response) => {
                        toast.success("Product deleted successfully.");
                        setIsVisible(false);
                        setLoading(true);
                      })
                      .catch((error) => {
                        toast.error(error?.response?.data?.message || "Delete Failed");
                        setIsVisible(false);
                      });
                    }}>Delete</button>
                </div>
            </div>
            
            </div>)}
        </div>
    )
}