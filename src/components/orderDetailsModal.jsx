import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import getFormattedPrice from "../pages/utils/price-format";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";

export default function OrderDitailsModal(props ){
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const order = props.order;
    const refresh = props.refresh;

    // Debugging - Console එකේ Data බලන්න
    console.log("Order Items:", order.items);
    
    return (
        <>
        
        <FaEye className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={
                ()=>{
                    setIsModalOpen(true);
                }
            }

            />
        {
            isModalOpen&& 
            <div className="w-screen h-screen fixed bg-black/30 top-0 left-0 flex justify-center items-center text-secondary z-99"> 
                <div className="w-[800px]  bg-white flex flex-col justify-center items-center rounded-lg p-4 relative">
                    <h1 className=" text-xl font-bold mb-4 "> Order Details </h1>
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-red-700 cursor-pointer" onClick={()=> setIsModalOpen(false)}>X</button>
                    
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            {order.orderId}
                        </span>
                        <span className=" text--lg font-semibold text-gray-500  ml-2">{order.email}</span>
                        <div className=" flex flex-col gap-2">

                        <span className=" ml-10 text-gray-500 flex justify-center items-center gap-2 "><FaPhoneAlt />{order.phoneNumber}</span>
                        </div>

                    </div> 
                    
                    <div className="w-full flex justify-between items-center mt-2">
                        <div className=" flex justify-center items-center gap-2">
                            <MdHome />                            
                            <p className=" font-semibold text-gray-800 "><span className="font-semibold text-accent"> {order.firstName} {order.lastName} </span>, {order.addressLineOne} , {order.addressLineTwo}, {order.city}, {order.state}. </p>
                        </div>                   
                    
                    </div>                    
                  
                </div>
                <div className="w-full h-[400px]  flex flex-col overflow-y-scroll items-center p-4">
                    {
                        order.items.map(
                            (item,index)=>{
                                return(
                                    <div key={index} 
                                    className="w-full flex  justify-between items-center bg-gray-100 rounded-lg p-2 mb-2">
                                        <div className="flex items-center gap-4">
                                            <img className="w-[80px] h-[80px] object-cover rounded-lg "src={item.product?.image || item.image}
                                                alt= {item.product?.name || item.name} 
                                            />
                                            


                                                <div className="flex- flex-col gap-1">
                                                     <span className="=font font-semibold text-gray-800 ">{item.name}</span>
                                                    <span className="=font font-semibold text-gray-500 ">Quantity{item.quantity}</span>
                                                    <span className="=font font-semibold text-gray-500 ">Price {getFormattedPrice(item.product?.price || item.price)}</span>
                                                </div>
                                        </div>
                                        <div className="text-lg font-semibold text-gray-800">
                                             { getFormattedPrice((item.product?.price || item.price) * item.quantity)}

                                        </div>                                            
                                    </div>
                                )
                            }

                        )
                    }
                </div>
                 <div className="w-full flex justify-end items-center bg-gray-100 rounded-lg p-4 m-2">
                    <span className="text-lg font-semibold text-gray-800 ">Total : {getFormattedPrice(order.total)} </span>
                </div>   
                                  
                </div>
            </div>
        }

        </>
    )
}