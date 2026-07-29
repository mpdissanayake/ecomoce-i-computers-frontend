import { useState } from "react"

export default function AdminAddProductPage(){
const [productId, setProductId] = useState("");
const [name ,setName] = useState("");
const [price,setPrice] = useState("");
const [labellPrice,setLabelPrice] = useState("");
const [description,setdDscription] = useState("");
const [images,setImages] = useState([]);
const [brand,setBrand] = useState("");
const [model,setModel] = useState("");
const [category,Setcategory] = useState("");
const [isAvallable,setIsAvallable] = useState(true);
const [stock,setStok] = useState(0);



    return(
      <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
        <div className="w-full h-[100px] rounded-lg bg-accent text-white flex items-center justify-between shadow-2xl"> 
            <h1 className="text-2xl font-semibold p-3 "> Add Product </h1>

            
            <div className="h-full flex items-center p-5  "> 
            
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg"> Save </button>
            <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg">Cancel </button>

            
        
        </div>
    </div>
    <div className="w-full flex flex-wrap bg-white shadow-2xl p-5 mt-8 rounded-lg">

        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold "> Product ID</label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={setProductId}
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
             value={name}
             onChange={(e) => setName(e.target.value)}
             
             />
        </div>

        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold ">Price </label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={name}
             onChange={(e) => setPrice(e.target.value)}
             
             />
        </div>

        <div className="w-1/4 p-2">
            <label className="block mb-2 font-semibold ">labelled Price </label>
             <input  className="border border-gray-300 rounded-md p-2 w-full"
             value={name}
             onChange={(e) => setLabelPrice(e.target.value)}
             
             />
        </div>


        <div className="w-1/4 p-2">
        <label className="block mb-2 font-semibold ">Catogary </label>
        <select 
        value={category}
        onChange={
            (e)=>{
                Setcategory(e.target.value)
            }
        } className="border border-gray-300 rounded-md p-2 w-full" >
            <option value="Laptop"> Laptop </option>
            <option value="Mobile"> Mobile </option>
            <option value="Headphones" > Headphones </option>
            <option value="Camera" > Camera</option>
            <option value="Smart Watch" > Smat Watch</option>
            <option value="Others" > Others</option>
        </select>
        </div>

        <div className="w-1/4 p-2">
            {/*images*/}
            <label className="block mb-2 font-semibold ">Images </label>
            <input type="file" multiple={true} className="border border-gray-300 rounded-md p-2 w-full"
            onChange={
                (e)=>{
                    setImages(e.target.files)

                }
            }
            />
        </div>

        <div className="w-full p-2">
            <label className="block mb-2 font-semibold ">Description </label>
             <textarea  className="border border-gray-300 rounded-md p-2 w-full"
             value={description}
             onChange={(e) => setdDscription(e.target.value)}
             
             />
        </div>

        <div className="w-1/4 p-2">
        <label className="block mb-2 font-semibold ">Brand </label>
        <select 
        value={category}
        onChange={
            (e)=>{
                setBrand(e.target.category)
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
            onChange={(e)=>{setStok(e.target.value)}}
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