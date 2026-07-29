import { useState } from "react"
import toast from "react-hot-toast";
import uploadMedia from "../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddProductPage(){
const [productId, setProductId] = useState("");
const [name ,setName] = useState("");
const [altNames,setAltNames] = useState("");
const [price,setPrice] = useState("");
const [labellPrice,setLabelPrice] = useState("");
const [description,setDescription] = useState("");
const [images,setImages] = useState([]);
const [brand,setBrand] = useState("");
const [model,setModel] = useState("");
const [category,setCategory] = useState("");
const [isAvallable,setIsAvallable] = useState(true);
const [stock,setStock] = useState(0);

const navigate = useNavigate(); //ehetameheta smoothly yanana danne

async function handleSave(){
    try{
        const token =localStorage.getItem("token");
        if(token== null){
            toast.error("you Must be logged in to perform this action");
            window.location.href="/login";
            return;
        }
        const mediaUploadPromises=[]
        for(let i=0; i<images.length;i++){
            mediaUploadPromises.push(uploadMedia(images[i]))
        }

        const urls= await Promise.all(mediaUploadPromises);//okkoma ganna eka
        //promise.rase -ikamanata resalat ganna eka
        const altNmesArray = altNames.split(",").filter(name => name.trim() !== "");

        const productData={
            productID: productId,  // ✅ productID (ID දෙකම ලොකුයි)
            name :name,
            allNames: altNmesArray,  // ✅ allNames
            price : price,
            labelledPrice: labellPrice,
            description : description,
            images: urls,
            brand : brand,
            model : model,
            category : category,
            isAvallable : isAvallable,
            stock : stock

        }

        const response =await axios.post(import.meta.env.VITE_API_URL+"/products",productData,
            {
            headers :{
               // "Authorization" : "Bearer"+token👌
                  "Authorization": "Bearer " + token 
            }
        })

        toast.success("Products Added Successfully ! ");
        navigate("/admin/products");
        

    }catch(error)
    {
        console.log("Full Error:", error);  // ✅ මෙය add කරන්න
        console.log("Error Response:", error.response);  // ✅ මෙය add කරන්න
        console.log("Error Data:", error.response?.data);  // ✅ මෙය add කරන්න
        toast.error(error?.response?.data?.message || "Faild to add Product .Please try again")


    }

}



    return(
      <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
        <div className="sticky top-0 w-full h-[100px] rounded-lg bg-accent text-white flex items-center justify-between shadow-2xl"> 
            <h1 className="text-2xl font-semibold p-3 "> Add Product </h1>

            
            <div className="h-full flex justify-center items-center p-5"> 
            
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg"> Save </button>
            <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg">Cancel </button>

            
        
        </div>
    </div>
    <div className="w-full flex flex-wrap bg-white shadow-2xl p-5 mt-8 rounded-lg">

        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold "> Product ID</label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={productId}
             //onChange={(e)=setProductId(e.target.value)}
             onChange={(e) => setProductId(e.target.value)}
             />
        </div>
        <div className="w-3/4 p-2">
            <label className="block mb-2 font-semibold "> Name</label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={name}
             onChange={(e) => setName(e.target.value)}

             />
        </div>
        
        <div className="w-full p-2">
            <label className="block mb-2 font-semibold "> Alternative Names (comma separated) </label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={altNames}
             onChange={(e) => setAltNames(e.target.value)}
             
             />
        </div>

        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold ">Price </label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
             
             />
        </div>

        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold ">labelled Price </label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={labellPrice}
             onChange={(e) => setLabelPrice(e.target.value)}
             
             />
        </div>


        <div className="w-1/4 p-2">
        <label className="block mb-2 font-semibold ">Catogary </label>
        <select 
        value={category}
        onChange={
            (e)=>{
                setCategory(e.target.value)
            }
        } className="border border-gray-300 rounded-md p-2 w-full" >
            <option value="Laptop"> Laptop </option>
            <option value="Mobile"> Mobile </option>
            <option value="Headphones" > Headphones </option>
            <option value="Camera" > Camera</option>
            <option value="Smart Watch" > Smat Watch</option>
            <option value="Others" > Others</option>
            {/*Garapic cards , proscessors , SSD , monitors , printers*/}
            <option value="Garapic card" > Garapic card</option>
            <option value="proscessor" > proscessor</option>
            <option value="SSD" > SSD</option>
            <option value="Monitor" > Monitor</option>
            <option value="Printer" > Printer</option>

        </select>
        </div>

        <div className="w-1/4 p-2">
            {/*images*/}
            <label className="block mb-2 font-semibold ">Images </label>
            <input type="file" multiple={true} className="border border-gray-300 rounded-md p-2 w-full"
            onChange={
                (e)=>{
                    setImages(Array.from(e.target.files)) 

                }
            }
            />
        </div>

        <div className="w-full p-2">
            <label className="block mb-2 font-semibold ">Description </label>
             <textarea  className="border border-gray-300 rounded-md p-2 w-full"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             
             />
        </div>

        <div className="w-1/4 p-2">
        <label className="block mb-2 font-semibold ">Brand </label>
        <select 
        value={brand}
        onChange={
            (e)=>{
                setBrand(e.target.value)
            }
        } className="border border-gray-300 rounded-md p-2 w-full" >
            <option value="Laptop"> Apple </option>
            <option value="Mobile"> Samsung </option>
            <option value="Headphones" >Sony </option>
            <option value="Camera" > HP</option>
            <option value="Smart Watch" > Lenovo</option>
            <option value="Smart Watch" >Dell</option>
            <option value="Smart Watch" > Asus</option>
            <option value="Smart Watch" >Accer</option>
            <option value="Nvidia" >Nvidia</option>
            <option value="Amd" >AMD</option>
            <option value="Others" > Others</option>
        </select>
        </div> 
        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold ">Model </label>
            <input className="border border-gray-300 rounded-md p-2 w-full"
            value={model}
            onChange={(e)=>{setModel(e.target.value)}}
            />
        </div>

        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold ">Stock </label>
            <input className="border border-gray-300 rounded-md p-2 w-full"
            value={stock}
            onChange={(e)=>{setStock(e.target.value)}}
            />
        </div>
       {/* <div className="w-1/4 p-2 flex items-center">
            <label className="block mb-2 font-semibold ">Avalable </label>
            <input type="checkbox" checked={isAvallable} className="border border-gray-300 rounded-md p-2 w-full"
            
            onChange={(e)=>{setIsAvallable(e.target.checked)}}
            />
        </div>*/}
        <div className="w-1/4 p-2 ">
            <label className="block mb-2 font-semibold ">Avalability </label>
            <select value={isAvallable} onChange={(e)=>{
                setIsAvallable(e.target.value == "true");
            }
            } className="border border-gray-300 rounded-md p-2 w-full  ">
            <option className="bg-green-400 text-white font-semibold" value={true}> Available</option>
            <option className="bg-red-400 text-white font-semibold" value={false}> Not Available </option>
                
            </select>
           
        </div>
        
           

        
   
    </div>
    
     </div>
    )
}