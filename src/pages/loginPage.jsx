import axios from "axios";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function LoginPage(){

    const [email,setEmail] = useState("");
    const [password,setPassword ] = useState("");

    function handleLogin(){
        console.log("Email:",email);
        console.log("password: ",password)

        axios.post("http://localhost:3000/api/users/login",{
            email:email,
            password : password
        }).then((response)=>{
    console.log("Login Success Full: ", response.data);
}).catch((error)=>{
    console.log("Login failed: ", error);
    console.log("Error details: ", error.response?.data); 
})
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="w-1/2 h-full ">
        
        </div>

        <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[400px] h-[700px] backdrop-blur-lg rounded-b-xl shadow-2xl flex flex-col justify-center items-center">
       <h1 className="text-4xl font-bold mb-8 text-secondary"> Sign in</h1>
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
        type="password" placeholder="Password" 
        className="w-3/4 p-3  rounded-lg border border-gray-400 focus-outline-none focus:ring-2 focus:ring-accent"
            /> 
            <p className="mb-6 w-3/4 text-right text-white">Froget password? <Link to ="/froget-password" className="text-accent hover:underline">Click here</Link></p>
        
        <button onClick={handleLogin}
            className="w-3/4 p-3 mb-6 bg-accent text-white  rounded-lg" >Sign in 

        </button>
        <p className="w-3/4 text-center text-white">Don't have an account ?<Link to="/register" className="text-accent"> Rgister </Link> </p>
        </div>
        
                

                
            </div>
            

        

           
        </div>
    )
}
