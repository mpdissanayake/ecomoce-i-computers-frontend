import { useState } from "react"

export default function TestPage(){
    const [bulb,setBulb]= useState("💡")
    

    

    return(
        <div className=" w-full h-screen flex flex-col justify-center items-center">
            
            <div className="w-[200px] h-[200px] border-4 m-2 p-1"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque deleniti ad consectetur rem. Laborum temporibus doloribus, odio sed sint debitis?</div>
            <div className="w-[100px] h-[100px] bg-green-900 "> </div>            
            
            
        </div>
    )

}