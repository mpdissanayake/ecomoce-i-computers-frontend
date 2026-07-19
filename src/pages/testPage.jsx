import { useState } from "react"

export default function TestPage(){
    const [bulb,setBulb]= useState("💡")
    

    

    return(
        <div className=" w-full h-screen flex flex-col justify-center items-center bg-primary text-secondary">
            
            <div className="w-[300px] h-[300px] border-[6px] flex justify-center items-center text-5xl">
            {bulb}
            
            </div>
           
            <div className="w-[300px] flex flex-row justify-center gap-1">

            <button onClick={
                ()=>{
                       setBulb ("💡")
                       console.log(bulb)
                }
                
            } className="bg-accent w-[70px] h-[30px] text-white border-primary">Light</button>
            
            <button onClick={
                ()=>{
                  setBulb ("😒")
                  console.log(bulb)
                }
            } className="bg-accent w-[70px] h-[30px] text-white border-primary">Dark</button>
            <button onClick={
                ()=>{
                 setBulb ("😁")
                 console.log(bulb)
                }
            } className="bg-accent w-[70px] h-[30px] text-white border-primary">Bright</button>

           
            </div>
            

        </div>
    )

}