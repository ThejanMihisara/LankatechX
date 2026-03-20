import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";

export default function Overview() {
    const params=useParams();
    const [product, setProduct] = useState(null);
    

    //fetch product details using params.productId and display them here
useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/products/" + params.productId).then(
        (response) => {
            setProduct(response.data);
        });
},[]);


    return (
        <div className=" h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center bg-gray-100">
          {
            product==null?<LoadingAnimation  />:<div className=" w-full h-full flex">
                <div className="w-[50%] h-full border ">
                    <ImageSlideShow images={product.imageUrls}/>
                    </div>
                    <div className="w-[50%] h-full border">
                    </div>
            </div>
          }
        </div>
    );
}