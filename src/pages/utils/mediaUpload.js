import { createClient } from "@supabase/supabase-js";


let url="https://havjlcbomxeahdbvorjm.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhdmpsY2JvbXhlYWhkYnZvcmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTQ3NDksImV4cCI6MjEwMDM5MDc0OX0.Zd0uqhuDYh2OWM6Tth1XlqcW9cFx1L997bN5P8lP0JE"

const supabase=createClient(url, key);

export default function uploadMedia(file){

    return new Promise(
        (resolve,reject)=>{
            if(file== null){
                reject("no file selected ")
            }else{

                const timeStamp=new Date().getTime();
             // const fileName = timeStamp + "_" + fileName;
                 const fileName = timeStamp + "_" + file.name;

                supabase.storage
                .from("project_images")
                .upload(fileName, file,{
                     upsert: false,
                     cacheControl : "3600",
        })
        .then((response)=>{
           
            const publicUrl=supabase.storage.from("project_images")
            .getPublicUrl(fileName).data.publicUrl;


      resolve(publicUrl);

     

        }).catch((error)=>{
            reject(error)
            
        });
            }

        } );

}
