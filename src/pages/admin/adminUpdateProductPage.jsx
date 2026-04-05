import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadfile from "../../utils/mediaUpload.js";
/*

    
        isVisible : {
            type : Boolean,
            default : true,
            required : true
        },
*/
export default function AdminUpdateProductPage(){

    const location = useLocation();
    const [productId , setProductId] = useState(location.state.productId);
    const [name , setName] = useState(location.state.name);
    const [description , setDescription] = useState(location.state.description);
    const [altNames , setAltNames] = useState(location.state.altNames.join(","));
    const [price , setPrice] = useState(location.state.price);
    const [labelledPrice , setLabelledPrice] = useState(location.state.labelledPrice);
    const [category , setCategory] = useState(location.state.category);
    const [brand , setBrand] = useState(location.state.brand);
    const [model , setModel] = useState(location.state.model);
    const [isVisible , setIsVisible] = useState(location.state.isVisible);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    async function handleUpdateProduct(){
       try{
        const token = localStorage.getItem("token");
        if(token === null){
            toast.error("You are not authorized to perform this action.");
            window.location.href = "/login";
            return;
        }

        const fileUploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            fileUploadPromises[i] = uploadfile(files[i]);
        }

        let imageUrls = await Promise.all(fileUploadPromises);
        if(imageUrls.length === 0){
            imageUrls = location.state.imageUrls;
        }else{
            imageUrls = imageUrls.flat();
        }  
        
        
           await axios.put(import.meta.env.VITE_API_URL + "/products/" + productId, {
            name : name,            
            description : description,
            altNames : altNames.split(","),
            imageUrls:imageUrls,
            price : price,
            labelledPrice : labelledPrice,
            category : category,
            brand : brand,
            model : model,
            isVisible : isVisible
           },{
            headers : {
                Authorization : "Bearer " +token
            }
           });

           toast.success("Product updated successfully."); 
              navigate("/admin/products");     

       }catch(err){
        toast.error(err?.response?.data?.message || "Failed to update product. Please try again.");
        return;
       }
    }
    
    return(
        <div className="w-full h-full overflow-y-scroll bg-[#020b1f] rounded-[24px] border border-cyan-500/20 shadow-[0_0_35px_rgba(0,180,255,0.08)] pb-28">
            <div className="sticky top-0 z-20 px-6 py-5 bg-[#052c3a] border-b border-cyan-400/20 rounded-t-[24px]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-1">
                    Admin Control
                </p>
                <h1 className="text-2xl font-bold text-white">Update Product</h1>
                <p className="text-sm text-slate-300/80 mt-1">
                    Edit your existing product information and inventory details
                </p>
            </div>

            <div className="p-5">
                <div className="rounded-[24px] border border-cyan-400/15 bg-[#d8e2e8] shadow-[0_0_30px_rgba(0,0,0,0.18)] p-4">
                    <div className="w-full flex flex-wrap items-start">
                        <div className="w-[50%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Product ID
                            </label>
                            <input
                                value={productId}
                                disabled
                                onChange={(e)=>{setProductId(e.target.value)}}
                                placeholder="Ex: ID001"
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] placeholder:text-slate-500 rounded-[14px] h-[54px] px-4 m-2 outline-none opacity-80 cursor-not-allowed"
                            />
                        </div>

                        <div className="w-[50%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Product Name
                            </label>
                            <input
                                value={name}
                                onChange={(e)=>{setName(e.target.value)}}
                                placeholder="Ex: Laptop"
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] placeholder:text-slate-500 rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            />
                        </div>

                        <div className="w-full h-[170px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e)=>{setDescription(e.target.value)}}
                                placeholder="Ex: Laptop"
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] placeholder:text-slate-500 rounded-[14px] h-[110px] px-4 py-3 m-2 outline-none resize-none focus:ring-2 focus:ring-cyan-500/25"
                            />
                        </div>

                        <div className="w-full h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Product Images
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={(e)=>{setFiles(e.target.files)}}
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] rounded-[14px] h-[54px] p-2 m-2 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-cyan-500 file:to-sky-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                            />
                        </div>

                        <div className="w-full h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Alternative Names (Comma Separated)
                            </label>
                            <input
                                value={altNames}
                                onChange={(e)=>{setAltNames(e.target.value)}}
                                placeholder="Ex: Laptop, Notebook, Portable Computer"
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] placeholder:text-slate-500 rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            />
                        </div>

                        <div className="w-[50%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Price
                            </label>
                            <input
                                value={price}
                                onChange={(e)=>{setPrice(e.target.value)}}
                                type="number"
                                placeholder="Ex: 50000"
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] placeholder:text-slate-500 rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            />
                        </div>

                        <div className="w-[50%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Labelled Price
                            </label>
                            <input
                                value={labelledPrice}
                                onChange={(e)=>{setLabelledPrice(e.target.value)}}
                                type="number"
                                placeholder="Ex: 60000"
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] placeholder:text-slate-500 rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            />
                        </div>

                        <div className="w-[25%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Categories
                            </label>
                            <select
                                value={category}
                                onChange={(e)=>{setCategory(e.target.value)}}
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            >
                                <option value="Others">Others</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Desktops">Desktops</option>
                                <option value="Components">Components</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Peripherals">Peripherals</option>
                            </select>
                        </div>

                        <div className="w-[25%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Brand
                            </label>
                            <select
                                value={brand}
                                onChange={(e)=>{setBrand(e.target.value)}}
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            >
                                <option value="Generic">Generic</option>
                                <option value="Dell">Dell</option>
                                <option value="HP">HP</option>
                                <option value="Lenovo">Lenovo</option>
                                <option value="Asus">Asus</option>
                                <option value="Acer">Acer</option>
                                <option value="Apple">Apple</option>
                            </select>
                        </div>

                        <div className="w-[25%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Model
                            </label>
                            <input
                                value={model}
                                onChange={(e)=>{setModel(e.target.value)}}
                                placeholder="Ex: Inspiron 15"
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] placeholder:text-slate-500 rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            />
                        </div>

                        <div className="w-[25%] h-[120px] flex flex-col">
                            <label className="font-semibold text-[#05394a] ml-2 mb-2">
                                Is Visible
                            </label>
                            <select
                                value={isVisible}
                                onChange={(e) => setIsVisible(e.target.value === "true")}
                                className="border border-cyan-700/15 bg-[#eef3f6] text-[#05394a] rounded-[14px] h-[54px] px-4 m-2 outline-none focus:ring-2 focus:ring-cyan-500/25"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

           <div className="w-[50px] relative bottom-[-50px] left-1/2 -translate-x-1/2 flex justify-center items-center">
                <div className="w-[420px] h-[60px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_30px_rgba(0,0,0,0.28)] rounded-full flex justify-end items-center px-4 gap-4 backdrop-blur-md">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-full h-[42px] w-[130px] hover:opacity-90 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateProduct}
                        className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold rounded-full h-[42px] w-[160px] hover:opacity-90 transition"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    )
}