import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadfile from "../../utils/mediaUpload.js";

/*

    
        isVisible : {
            type : Boolean,
            default : true,
            required : true
        },
*/
export default function AdminAddProductPage(){

    
    const [productId , setProductId] = useState("");
    const [name , setName] = useState("");
    const [description , setDescription] = useState("");
    const [altNames , setAltNames] = useState("");
    const [price , setPrice] = useState("");
    const [labelledPrice , setLabelledPrice] = useState("");
    const [category , setCategory] = useState("");
    const [brand , setBrand] = useState("");
    const [model , setModel] = useState("");
    const [isVisible , setIsVisible] = useState(true);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    async function handleAddProduct(){
        if(productId===""){
            toast.error("Product ID is required.");
            return;
        }
        
// if(files.length > 5){
//     toast.error("You can upload a maximum of 5 images.");
//     return;
// }

        
        if(name===""){
            toast.error("Product name is required.");
            return;
        }
        if(description===""){
            toast.error("Product description is required.");
            return;
        }
        if(price===""){
            toast.error("Product price is required.");
            return;
        }
       
        if(altNames===""){
            toast.error("Alternative names are required.");
            return;
        }
        if(files.length === 0){
            toast.error("At least one product image is required.");
            return;
        }
        if(category===""){
            toast.error("Product category is required.");
            return;
        }
        if(brand===""){
            toast.error("Product brand is required.");
            return;
        }
        if(model===""){
            toast.error("Product model is required.");
            return;
        }
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

        const imageUrls = await Promise.all(fileUploadPromises);  
        
        
           await axios.post(import.meta.env.VITE_API_URL + "/products", {
            productId : productId,
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

           toast.success("Product added successfully."); 
              navigate("/admin/products");     

       }catch(err){
        toast.error(err?.response?.data?.message || "Failed to add product. Please try again.");
        return;
       }
    }
    
    return(
        <div className="w-full max-h-screen flex flex-wrap items-start overflow-y-scroll bg-[#020b1f] rounded-[24px] border border-cyan-500/20 shadow-[0_0_35px_rgba(0,180,255,0.08)] pb-16">
            <div className="w-full sticky top-0 z-20 px-6 py-5 bg-[#052c3a] border-b border-cyan-400/20">
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/70 mb-1">
                    Admin Control
                </p>
                <h1 className="text-2xl font-bold text-white">Add New Product</h1>
                <p className="text-sm text-slate-300/80 mt-1">
                    Create a new product entry for your inventory
                </p>
            </div>

            <div className="w-full p-5 flex flex-wrap">
                <div className="w-[50%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Product ID</label>
                    <input
                        value={productId}
                        onChange={(e)=>{setProductId(e.target.value)}}
                        placeholder="Ex: ID001"
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                </div>

                <div className="w-[50%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Product Name</label>
                    <input
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        placeholder="Ex: Laptop"
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                </div>

                <div className="w-full h-[170px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                        placeholder="Ex: Laptop"
                        className="h-[110px] p-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
                    />
                </div>

                <div className="w-full h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Product Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e)=>{setFiles(e.target.files)}}
                        className="h-[52px] p-2 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] shadow-sm outline-none file:mr-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-cyan-500 file:to-sky-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                    />
                </div>

                <div className="w-full h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Alternative Names (Comma Separated)</label>
                    <input
                        value={altNames}
                        onChange={(e)=>{setAltNames(e.target.value)}}
                        placeholder="Ex: Laptop, Notebook, Portable Computer"
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                </div>

                <div className="w-[50%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Price</label>
                    <input
                        value={price}
                        onChange={(e)=>{setPrice(e.target.value)}}
                        type="number"
                        placeholder="Ex: 50000"
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                </div>

                <div className="w-[50%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Labelled Price</label>
                    <input
                        value={labelledPrice}
                        onChange={(e)=>{setLabelledPrice(e.target.value)}}
                        type="number"
                        placeholder="Ex: 60000"
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Categories</label>
                    <select
                        value={category}
                        onChange={(e)=>{setCategory(e.target.value)}}
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    >
                        <option value="" disabled>Select Category</option>

                        <option value="Laptops">Laptops</option>
                        <option value="Desktops">Desktops</option>
                        <option value="Older Products">Older Products</option>

                        <option value="Apple">Apple</option>
                        <option value="HP">HP</option>
                        <option value="Dell">Dell</option>
                        <option value="Asus">Asus</option>
                        <option value="MSI">MSI</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Acer">Acer</option>

                        <option value="Bag & Cases">Bag & Cases</option>
                        <option value="Battery">Battery</option>
                        <option value="Keyboard & Mouse">Keyboard & Mouse</option>

                        <option value="VGA Cards">VGA Cards</option>
                        <option value="Motherboards">Motherboards</option>
                        <option value="Power Supply">Power Supply</option>
                        <option value="Processors">Processors</option>
                        <option value="RAM">RAM</option>
                        <option value="Computer Cases">Computer Cases</option>

                        <option value="other-accessories">Other Accessories</option>
                    </select>
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Brand</label>
                    <select
                        value={brand}
                        onChange={(e)=>{setBrand(e.target.value)}}
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    >
                       <option value="" disabled>Select Brand</option>
                        <option value="Generic">Generic</option>
                        <option value="Apple">Apple</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value="Acer">Acer</option>
                        <option value="MSI">MSI</option>
                        <option value="Logitech">Logitech</option>
                        <option value="Corsair">Corsair</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Intel">Intel</option>
                        <option value="AMD">AMD</option>
                        <option value="NVIDIA">NVIDIA</option>
                        <option value="Gigabyte">Gigabyte</option>
                        <option value="Kingston">Kingston</option>
                        <option value="Crucial">Crucial</option>
                        <option value="Cooler Master">Cooler Master</option>
                    </select>
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Model</label>
                    <input
                        value={model}
                        onChange={(e)=>{setModel(e.target.value)}}
                        placeholder="Ex: Inspiron 15"
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="font-semibold text-[#c7dde7] ml-2 mb-1">Is Visible</label>
                    <select
                        value={isVisible}
                        onChange={(e) => setIsVisible(e.target.value === "true")}
                        className="h-[52px] px-4 mx-2 rounded-[14px] border border-cyan-400/20 bg-[#dbe4e9] text-[#05394a] shadow-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>

            <div className="w-[50px] relative bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center">
                <div className="w-[420px] h-[60px] border border-cyan-500/20 bg-[#03192d] shadow-[0_0_30px_rgba(0,0,0,0.28)] rounded-full flex justify-end items-center px-4 gap-4 backdrop-blur-md">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-full h-[42px] w-[130px] hover:opacity-90 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddProduct}
                        className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold rounded-full h-[42px] w-[150px] hover:opacity-90 transition"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    )
}