import { useEffect, useState } from "react"
import { Link,useParams } from "react-router-dom"
import api from "../utils/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../../components/lodingAnimation"
import ImagesSlideShow from "../../components/imageSlideShow"
import getFormattedPrice from "../utils/price-format"
import { addToCart,} from "../utils/cart"

export default function ProductOverviewPage(){
    const parameters = useParams()
   
    //console.log(parmeters)

    const[product,setProduct] =useState(null)
    //loading,success,error awastha thunak thiyenawa page ekata
    const[status , setStatus] =useState("loading")

    useEffect(
        ()=>{
            let isMounted = true;
            console.log("Fetching ,parameters.productID")

            //axios.get(import.meta.env.VITE_API_URI +"products.productID")paranaeka insepata ekak 
            api.get("/products/"+parameters.productID)
            .then((response)=>{
                if(isMounted){         

                
            console.log(response.data)// එන දත්ත ප්‍රින්ට් කරගන්න ඕනි නම්
            setProduct(response.data)
            setStatus("success")

                }   

            }
        ).catch((error)=>{
            if(isMounted){

                toast.error(error?.response?.data?.message || "An error occurred while fetching product details.")
                setStatus("error")
            }
            

        })

        return () => {
            isMounted = false; 
        }
    }, [parameters.productID]) 

    
   
    return(
        <div className="w-full h-screen flex justify-center items-center">
            {   status== "loading"&& <LoadingAnimation/>
            }
            {
                status == "error"&& <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold ">Faild to Lord product details.... </h1>
                <Link to="/products" className="px-4 py-2 bg-accent  text-white rounded">Back to Product</Link>

                </div>        
            }
            {
                status == "success" && <div className="w-full h-full flex lg:flex-row flex-col  ">
                                       
                    <div className="w-full lg:w-1/2  h-full flex justify-center items-center"> 
                    <ImagesSlideShow images={product.images}/>

                    </div>

                <div className="w-full lg:w-1/2 h-full flex flex-col p-[20px] "> 

                    <h1 className=" text-3xl font-bold ">
                    {product.name}
                    {product.allNames.map(
                    (alternativeName, index) => { 
                    return (
                    <span key={index} className=" text-gray-500  ">| {alternativeName}</span>
                );
            }
            )}
                    </h1>
                    <h2 className="text-sm text-gray-500 mt-">{product.productID}</h2>
                    <div className="w-full  mt-5 flex flex-col "> 
                        
                        <p className="text-accent font-semibold text-4xl">
                        {
                            getFormattedPrice(product.price, product.LabelPrice)
                        }
                                                
                        </p>
                        {
                            product.labelledPrice > product.price && 
                            <span className="text-xl text-gray-500 line-through ml-4" >
                                {
                                    getFormattedPrice(product.labelledPrice)
                                }

                            </span>
                        }


                    </div>
                    {/*Brand and model */}
                    <div className=" w-full mt-5 flex gap-10">
                        <span className="text-lg text-gray-500 "> Brand: <span className="text-black font font-semibold ">{product.brand}</span>
                        </span>
                        <span className="text-lg text-gray-500 ">  Model: <span className="text-black font font-semibold ">{product.model}</span>
                        </span>

                    </div> 
                    <div className=" w-full mt-5 flex gap-10">
                        <span className="text-lg text-gray-500 "> category: <span className="text-black font font-semibold ">{product.category}</span>
                        </span>
                       
                    </div> 


                    <p className=" text-lg mt-5 mb-[150px] lg:mb-0">
                        {
                            product.description
                        }

                    </p>
                    <div className="flex mt-5 gap-5 fixed lg:static bottom-[82px] right-0 p-2 backdrop:backdrop-blur-2xl w-full lg:backdrop-blur-none">
                    <button className="w-62.5 h-17.5 bg-green-500 text-white text-xl font-semibold  rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300 " 
                    onClick={
                        ()=>{
                            // add to cart
                            console.log("Add to cart clicked for:", product);
                            addToCart(product, 1)
                            toast.success(`${product.name} added to cart!`);
                        
                        
                        }

                    }> Add To cart </button>
                    <Link to ="/checkout"
                   state={
                        [
                            {
                                product :{
                                    productID : product.productID,
                                    name : product.name,
                                    image : product.images[0],
                                    labelledPrice : product.labelledPrice,
                                    price : product.price,

                                },
                                quantity : 1
                            }
                        ]
                    

                   }
                    
                    className="w-62.5 h-17.5 bg-blue-500 text-white text-xl font-semibold   rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center"> BUY NOW  </Link>

                    </div>
                </div>

                    </div>
            }

        </div>
    )
}