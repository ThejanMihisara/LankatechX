import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart, getcart } from "../utils/cart";
import { label } from "framer-motion/client";

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
                <div className="w-[50%] h-full flex justify-center items-center">
                    <ImageSlideShow images={product.imageUrls}/>
                    </div>
                    <div className="w-[50%] h-full p-5 flex justify-center flex-col">
                        <h1 className="text-4xl font-bold mb-4">{product.name}
                            
                                {
                                    product.altNames.map((altName, index) => {
                                        return (
                                            <span key={index} className=" text-gray-500 font-medium">
                                                | {altName}
                                            </span>
                                        );
                                    })
                                }
                            
                        </h1>
                        {/* brand and model if available */}
                        {
                            (product.brand || product.model) && 
                            <p className="text-lg font-medium mb-2">
                                <span>{product.brand || ""}</span>
                                <span> - </span>
                                <span>{product.model || ""}</span>
                            </p>
                        }

                        {/* product id*/}
                        <p className="text-sm text-gray-500 mb-4">Product ID: {product.productId}</p>

                       

                        {/* product price*/}
                        <p className="text-lg font-bold mb-4">{getFormattedPrice(product.price)}</p>

                        {/*labelled price if available*/}
                        {
                            product.labelledPrice && 
                            <p className="text-md text-gray-500 mb-4  line-through">{getFormattedPrice(product.labelledPrice)}</p>
                        }

                          {/* product description*/}
                         <p className="text-md text-gray-700 mb-4">{product.description}</p>

                        <div className="w-full h-[100px] flex justify-start items-center text-white font-bold text-xl">
                        <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition mr-4 cursor-pointer" onClick={
                            ()=>{
                                addToCart(product,1)
                                toast.success(product.name + " Product added to cart");
                            }
                            }>Add to Cart</button>
                           <Link className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition cursor-pointer"
                           state={
                            [
                                {
                                    product:{
                                        name: product.name,
                                        price: product.price,
                                        labelledPrice: product.labelledPrice,
                                        imageUrl: product.imageUrls[0],
                                        productId: product.productId
                                    },
                                    quantity: 1
                                    

                                }
                            ]
                           }   to="/checkout">Buy Now
                           </Link>
                        </div>
                    </div>
            </div>
          }
        </div>
    );
}