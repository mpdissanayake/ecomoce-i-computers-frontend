import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Route, Routes,useNavigate } from "react-router-dom";

export default function RegisterPage(){

    const [email,setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [password,setPassword ] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();

    function handleLogin(){
        if(password != confirmPassword){
            toast.error("pasword do not match ")
            return;
        }

        //console.log("API URL:", import.meta.env.VITE_API_URL);

        //console.log("Email:",email);
        //console.log("password: ",password)

        axios.post(import.meta.env.VITE_API_URL+"/users/",{
            email:email,
            password : password,
            firstName : firstName,
            lastName : lastName

        }).then((response)=>{

    //console.log("Login Success Full: ", response.data);
    toast.success("Rejister Successful")
    if(response.data.isAdmin){
    toast.success("Loging Successful");
    navigate("/login");  

    }else{
        //redirect to homepage
        //window.location.href="/"
        navigate("/");
    }
     

    }).catch((error)=>{

    console.log("Login failed: ", error);
    //console.log("Error details: ", error.response?.data); // backend එකෙන් එන error message එක
    //toast.error(error.response.data.message)
    const errorMsg = error.response?.data?.message || "Login failed. Check your network.";
    toast.error(errorMsg);
    alert(errorMsg);


})
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="w-0 lg:w-1/2 h-full ">
        
        </div>

        <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center">
        <div className="w-[400px] h-[500px] backdrop-blur-lg rounded-b-xl shadow-2xl flex flex-col justify-center items-center">
       <h1 className="text-4xl font-bold mb-8 text-secondary"> Sign Up</h1>
       <div className="w-3/4 flex gap-4 mb-6 ">
       <input 
            onChange={
                (e)=>{
                setFirstName(e.target.value)
                }
            }
            value={firstName}     
            placeholder="First Name"            
            className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
            />

        <input 
            onChange={
                (e)=>{
                setLastName(e.target.value)
                }
            }
            value={lastName}     
            placeholder="Last Name"
            className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
       </div>
       
       <input 
       onChange={
        (e)=>{
           setEmail(e.target.value)
        }
       }
       value={email}     
       type="text"
            placeholder="Email" 
            className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
         <input
        onChange={
        (e)=>{
            setPassword(e.target.value)
        }
       }
        value={password} 
        placeholder="Password" 
        className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus-outline-none focus:ring-2 focus:ring-accent"
            />

        <input
        onChange={
        (e)=>{
            setConfirmPassword(e.target.value)
        }
       }
        value={confirmPassword}
        placeholder="Confirm Password" 
        className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus-outline-none focus:ring-2 focus:ring-accent"
            /> 
             
        
        <button onClick={handleLogin}
            className="w-3/4 p-3 mb-6 bg-accent text-white  rounded-lg" >Sign Up 
        </button>
        <p className=" w-3/4 text-center text-white">Already have an account ?<Link to="/register" className="text-accent"> Login </Link> </p>
        </div>
        
                

                
            </div>
            

        

           
        </div>
    )
}
