import { createClient } from "@supabase/supabase-js";


let url="https://havjlcbomxeahdbvorjm.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhdmpsY2JvbXhlYWhkYnZvcmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTQ3NDksImV4cCI6MjEwMDM5MDc0OX0.Zd0uqhuDYh2OWM6Tth1XlqcW9cFx1L997bN5P8lP0JE"

const supabase=createClient(url, key);
export default function uplordMedia(file){

    return new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No File selcted")
            }else{
                const timeStamp = new Date().getTime();
                const fileName = timeStamp+ "-"+file.name;
         supabase.storage.from("project_images").upload(fileName,file,
            {
            upsert: false,
            cacheControl : "3600",
        })
        .then(()=>{
           

            const {data} =supabase.storage.from("project_images")
            .getPublicUrl(fileNamee);
        resolve(publicUrl);
            console.log(data.publicUrl);

        }).catch((error)=>{
            reject(error);
            console.log(error);
        })
            }
        }
    )

}
uplordMedia(file).then((publicUrl)=>{
    console.log(publicUrl);

}).catch((error)=>{
    console.log(error);
})