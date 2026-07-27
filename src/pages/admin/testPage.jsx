import { createClient } from "@supabase/supabase-js";
import { useState } from "react"
import { FaRegUserCircle } from "react-icons/fa";
import uploadMedia from "../utils/mediaUpload.js";

let url="https://havjlcbomxeahdbvorjm.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhdmpsY2JvbXhlYWhkYnZvcmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTQ3NDksImV4cCI6MjEwMDM5MDc0OX0.Zd0uqhuDYh2OWM6Tth1XlqcW9cFx1L997bN5P8lP0JE"

const supabase=createClient(url, key);

export default function TestPage(){
    
    const [file,setFile]= useState(null)
 
async function handleUpload() {

     if (!file) {  
        
        alert("Please select a file!");
        return;
    }

        try{
            const url = await uploadMedia(file);
            console.log(url)

        }catch(error){
            console.log(error)
        }
    }

           
    return(
        <div className=" w-full  h-screen flex flex-col justify-center items-center bg-primary text-secondary">
            
            <input onChange={
                (e)=>{

                    setFile(e.target.files[0])
                   
                    
                }
            } type="file"/>

            <button onClick={handleUpload}
            className="bg-secondary text-primary px-4 py-2 rounded">Uplord

            </button>
                  
            
            
        </div>
    )

}