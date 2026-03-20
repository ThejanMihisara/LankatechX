import { useState } from "react";

export default function ImageSlideShow(props){
    const images=props.images;
    const [activeImage, setActiveImage]=useState(0);

    return(
        <div className="w-[500px] h-[600px]">
            <img src={images[activeImage]} alt="Product Image" className="w-full h-[500px] object-cover"/>
            <div className="mt-4 w-full h-[100px]  flex flex-row px-4 gap-4 justify-center">
                {
                    images.map((img,index)=>{
                        return <img 
                        onClick={()=>{
                            setActiveImage(index);
                        }}
                        key={index} src={img} alt={"Thumbnail "+index} className=" w-[100px] h-[100px] object-contain rounded-[20px] border-4 border-accent cursor-pointer"/>;
                    })
                }
            </div>
        </div>
    )
}
