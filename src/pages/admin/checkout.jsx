import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart.js"
import getFormattedPrice from "../utils/price-format"
import { useLocation } from "react-router-dom"
import CreateOrderModel from "./createOrderModel.jsx"

export default function CheckoutPage(){
    const location = useLocation()

   const [cart , setCart] =useState(location.state)

    return(
        <div className="w-full min-h-screen flex flex-col p-5  pb-20 items-center gap-4  ">
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.product.productID} className="bg-white w-[500px] h-[150px] rounded-lg shadow-2xl flex p-2 items-center relative " >
                                <img className="w-[100px] h-[100px] object-cover rounded-l-lg" src={item.product.image}/>
                                <div className="h-full w-[400px] ">
                                    <h1 className="text-lg font-semibold ">{item.product.name}</h1>
                                    <p className="text-sm text-gray-500 ">{item.product.productID} </p>
                                    {
                                        item.product.labelledPrice > item.product.price && <span className="text-sm text-gray-500 line-through mt-2">{getFormattedPrice(item.product.labelledPrice)}</span>
                                    }
                                    <p className="text-accent font-semibold text-sm">
                                        {getFormattedPrice(item.product.price)}
                                    </p>
                                    
                                </div>
                                <div className="w-[200px] h-full absolute right-2  flex flex-col justify-end items-end p-2"> 
                                    <div className="w-[100px] h-[30px] border rounded-full flex items-center justify-between px-2">
                                        <button className="text-xl font-bold cursor-pointer hover:text-accent "
                                        onClick={
                                            ()=>{
                                                addToCart(item.product , -1)
                                                setCart(getCart())
                                            }
                                        }>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="text-xl font-bold  cursor-pointer hover:text-accent"
                                        onClick={
                                            ()=>{
                                                addToCart(item.product ,1)
                                                setCart(getCart())
                                            }
                                        }>+</button>

                                    </div>
                                    {/* Total */}
                                    <p className="text-sm text-gray-500 mt-2 "><span className="text-secondary font-semibold ">{getFormattedPrice (item.product.price* item.quantity)} </span>

                                    </p>
                                
                                </div>


                            </div>
                        )
                    }
                )
            }
            <div className="bg-white w-[500px] border rounded-t-lg shadow-2xl flex p-2 items-center justify-between fixed bottom-0" >
                <CreateOrderModel cart = {cart}/>
                <p className=" text-xl font-bold ml-4 ">Total : {getFormattedPrice(getCartTotal(cart))} </p>               
            </div>
            

        </div>
    )
}