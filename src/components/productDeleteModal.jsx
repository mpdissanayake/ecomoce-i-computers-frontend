import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbTrash } from "react-icons/tb";

export default function ProductDeleteModal(props ){
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const product = props.product;
    const refresh = props.refresh;
    function handleDelete(){
         
                const token = localStorage.getItem("token")
                axios.delete(import.meta.env.VITE_API_URL+"/products/"+product.productID,{
                    headers:{
                        'Authorization': "Bearer "+token
                    }
                }).then(
                    ()=>{
                        toast.success(product.productID+" Product Deleted Successfully !")
                    }
                ).catch(
                    (error)=>{
                        console.log("Error Details: ", error.response?.data)
                        toast.error(error.response?.data?.message || "Failed to delete product. Please try again.")
                    }
                ).finally(
                    ()=>{
                        refresh();
                    }
                )
    }
    return (
        <>
        
        <TbTrash className="text-2xl text-red-500 cursor-pointer hover:text-red-700"
            onClick={
                ()=>{
                    setIsModalOpen(true);
                }
            }

            />
            {isModalOpen && 
            <div className="w-screen h-screen fixed bg-black/30 top-0 left-0 flex justify-center items-center text-secondary"> 
                <div className="w-[500px] h-[200px] bg-white flex flex-col justify-center items-center rounded-lg p-4">
                    <h1 className="text-xl font-bold mb-4 ">Are you sure you want to delete product with ID: {product.productID}?

                    </h1>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        onClick={
                            ()=>{
                                handleDelete();
                                setIsModalOpen(false);
                            }
                        }>
                            Yes, Delete
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                        onClick={
                            ()=>{
                                setIsModalOpen(false);
                            }
                        }>
                            Cancel
                        </button>
                    </div>


                </div>
            </div>}

        </>
    )
}