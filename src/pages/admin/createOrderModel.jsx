import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function CreateOrderModel(props){

        /*fristName : user.fristName,  
        lastName : user.lastName,     
        addressLineOne : req.body.addressLineOne,
        addressLineTwo :req.body.addressLineTwo,
        city : req.body.city, 
        state :req.body.state, 
        postalCode :req.body.postalCode,
        phoneNumber : req.body.phoneNumber,*/
        
    const [isModelOpen ,setIsModelOpen]= useState(false) 
    const [firstName,setFristName] = useState("")
    const [lastName , setLastName] = useState("")
    const [addressLineOne,setAddressLineOne] = useState("")
    const [addressLineTwo,setAddressLineTwo] = useState("")
    const [city  , setCity ] = useState("")
    const [state , setState] = useState("")
    const [postalCode , setPostalCode] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")

    const cart  = props.cart;
    async function createOrder() {

        try{
            const token = localStorage.getItem("token") 
           
            // ✅ Debugging: Token එක Console එකේ පෙන්වන්න (මේකෙන් Token එක තියෙනවද බලාගන්න)
            console.log("Token being sent:", token);

            // 🔥 ගැටළුව විසඳන කොටස: "Bearer " සහ token අතර ඉඩක් අනිවාර්යයි
            if (!token) {
                toast.error("You are not logged in. Please login again.");
                return;
            }

            // Cart එකේ මුළු මුදල ගණනය කිරීම
            const totalAmount = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
            const data ={
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phoneNumber,
                total: totalAmount,
                items : []
            }
            for(let i=0; i<cart.length;i++){
                const item = cart[i]
                data.items.push(
                    {
                        productID : item.product.productID,
                        quantity : item.quantity
                    }
                )
            }

            const result = await api.post("/orders",data,{
                headers :{
                   // Authorization : "Bearer" + token 
                   Authorization: `Bearer ${token}`  // මෙතන `Bearer ` සහ token අතර Space එකක් ඇත
                }
            })
            alert(result.data.message)

            toast.success("Order Created successfully")
            setIsModelOpen(false)

        }catch(error){
            // 🔥 ඇත්ත Error එක කුමක්දැයි Console එකේ බලන්න
            //console.error("Order Error:", error); 
            //toast.error(error?.response?.data?.message || "An error occurred while creating the order.")
            // 🔥 Backend එකෙන් එන සම්පූර්ණ Response එක Console එකේ පෙන්වන්න
         console.log("Full Error Response:", error.response); 
    
        // 🔥 Backend එකෙන් එන හරියටම පණිවිඩය පෙන්වන්න
        console.log("Backend Message:", error.response?.data);
    
        toast.error(error?.response?.data?.message || "An error occurred while creating the order.")

        }

        
    }
    return (

        <>
        <button className=" bg-accent text-white px-4 py-2 rounded-lg font-semibold "onClick={()=> setIsModelOpen(true)}> Order now</button>
        {
            isModelOpen && 
            <div className="fixed bg-black/70 w-screen h-screen top-0 left-0 flex justify-center items-center  ">
                <div className="w-[400px] bg-white rounded-lg p-5 flex flex-col gap-4">
                    <h1 className=" text-2xl font-bold ">Shipping Details </h1>
                    <input type="text" placeholder="FirstName " className="w-full border p-2 rounded " value={firstName}onChange={(e)=> setFristName (e.target.value )} />
                    <input type="text" placeholder="lastName " className="w-full border p-2 rounded " value={lastName}onChange={(e)=> setLastName (e.target.value )} />
                    <input type="text" placeholder="addressLineOne " className="w-full border p-2 rounded " value={addressLineOne}onChange={(e)=> setAddressLineOne (e.target.value )} />
                    <input type="text" placeholder="addressLineTwo" className="w-full border p-2 rounded " value={addressLineTwo}onChange={(e)=> setAddressLineTwo (e.target.value )} />
                    <input type="text" placeholder="City " className="w-full border p-2 rounded " value={city}onChange={(e)=> setCity (e.target.value )} />
                    <input type="text" placeholder="State" className="w-full border p-2 rounded " value={state}onChange={(e)=> setState (e.target.value )} />
                    <input type="text" placeholder="Postal Code" className="w-full border p-2 rounded " value={postalCode}onChange={(e)=> setPostalCode (e.target.value )} />
                    <input type="text" placeholder="Phone Number " className="w-full border p-2 rounded " value={phoneNumber}onChange={(e)=> setPhoneNumber (e.target.value )} />
                    <div className="w-full flex flex-row justify-between items-center">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold "onClick={()=> setIsModelOpen(false)}>Cancel</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold "onClick={createOrder}>
                        Place Order
                        </button>

                    </div>
                </div>

            </div>
        }
        </>

    )
}