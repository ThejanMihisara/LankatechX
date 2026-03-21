import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadfile from "../../utils/mediaUpload.js";
import { a } from "framer-motion/client";
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
    const [category , setCategory] = useState("Others");
    const [brand , setBrand] = useState("Standard");
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
        if(labelledPrice===""){
            toast.error("Product labelled price is required.");
            return;
        }
        if(altNames===""){
            toast.error("Alternative names are required.");
            return;
        }
        if(imageUrls===""){
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
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track">
            <h1 className="w-full text-3xl font-bold mb-4 sticky top-0 bg-primary">Add New Product</h1>
            <div className="w-[50%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Product ID</label>
                <input value={productId} onChange={(e)=>{setProductId(e.target.value)}}  placeholder="Ex: ID001" className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
            </div>
            <div className="w-[50%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Product Name</label>
                <input value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder="Ex: Laptop" className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
            </div>
            <div className="w-full h-[170px] flex flex-col">
                <label className="font-bold ml-2">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}  placeholder="Ex: Laptop" className="border-4 border-accent rounded-[10px] h-[100px] p-2 m-2 focus:outline-white"/>
            </div>
             <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold ml-2">Product Images</label>
                <input type="file" multiple onChange={(e)=>{setFiles(e.target.files)}} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
             </div>

            <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold ml-2">Alternative Names (Comma Separated)</label>
                <input value={altNames} onChange={(e)=>{setAltNames(e.target.value)}}  placeholder="Ex: Laptop, Notebook, Portable Computer" className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
            </div>
            <div className="w-[50%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Price</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" placeholder="Ex: 50000" className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
            </div>
            <div className="w-[50%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Labelled Price</label>
                <input value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} type="number" placeholder="Ex: 60000" className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
            </div>
            <div className="w-[25%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Categories</label>
                <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white">
                    <option value="Others">Others</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Components">Components</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Peripherals">Peripherals</option>
                </select>
            </div>
            <div className="w-[25%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Brand</label>
                <select value={brand} onChange={(e)=>{setBrand(e.target.value)}} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white">
                    <option value="Generic">Generic</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Asus">Asus</option>
                    <option value="Acer">Acer</option>
                    <option value="Apple">Apple</option>
                </select>
            </div>
            <div className="w-[25%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Model</label>
                <input value={model} onChange={(e)=>{setModel(e.target.value)}} placeholder="Ex: Inspiron 15" className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
            </div>
            <div className="w-[25%]  h-[120px] flex flex-col">
                <label className="font-bold ml-2">Is Visible</label>
            <select
                  value={isVisible}
               onChange={(e) => setIsVisible(e.target.value === "true")}
               className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"
            >
                   <option value="true">Yes</option>
                   <option value="false">No</option>
            </select>

            </div>
            <div className="w-full h-20 bg-white sticky bottom-0 rounded-b-2xl flex justify-end items-center p-4 gap-4">
                 <button onClick={() => window.history.back()} className="bg-red-600 text-white font-bold rounded-[10px] h-[50px] w-[150px] ml-4 hover:bg-red-700">Cancel</button>
                <button onClick={handleAddProduct} className="bg-accent text-white font-bold rounded-[10px] h-[50px] w-[150px] hover:bg-accentHover">Add Product</button>
               
                </div>
        </div>
    )
}