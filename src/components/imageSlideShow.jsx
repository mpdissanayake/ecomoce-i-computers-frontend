import { useState } from "react"

export default function ImagesSlideShow(props){
    const[asctiveImage ,setActiveImage]= useState(0)
    const  images =props.images || []
    return(
        <div className="w-[700px] lg:h-[900px] flex flex-col">
            <img className=" w-full aspect-square object-cover" src={images[asctiveImage]}/>
            <div className=" h-[100px] w-full   flex items-center justify-center gap-4">
                {
                    images.map(
                        (item , index)=>{
                            return(
                                <img className={"w-[90px] h-[90px] cursor-pointer rounded-xl "+(index == asctiveImage ? "border-4 border-accent": "")}
                                onClick={
                                    ()=>{
                                        setActiveImage(index)
                                    }
                                }
                                src={item} key={index}/>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}