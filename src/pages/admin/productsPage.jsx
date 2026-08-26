import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import api from "../utils/api";
import toast from "react-hot-toast";


export default function ProductsPage(){
const [products, setProducts] = useState([]);
const [isProductsLoaded, setIsProductsLoaded] = useState(false);
 const [isSearching, setIsSearching] = useState(false);

const [query, setQuery] = useState("");

useEffect(
    () => {
        if(!isProductsLoaded){
            axios.get(import.meta.env.VITE_API_URL + "/products")
            .then((response) => {
                setProducts(response.data);
                setIsProductsLoaded(true);
            }
            ).catch((error) => {
                console.log("Error fetching products:", error);
            });  
        }
    }, [isProductsLoaded]);

     // ✅ handleSearch - නිවැරදි    
    async function handleSearch()  {
        if (!query.trim()) {
            toast.error("Please enter a search term");
            return;
        }
        setIsSearching(true);
        try{
        // ✅ URL එක හරි - encodeURIComponent භාවිතා කරන්න
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/products/search/${encodeURIComponent(query)}`
            );
            setProducts(response.data.products || response.data || []);
            setIsProductsLoaded(true);
            
            if (response.data.products?.length === 0 || response.data.length === 0) {
                toast.info("No products found");
            }

        }catch(error){
            console.log(error);
            toast.error("faild to sucrch Product")

        }finally {
            setIsSearching(false);
        }
    }
    // ✅ All Products Load කරන්න
    function loadAllProducts() {
        setQuery("");
        setIsProductsLoaded(false);   
    }

return(
    <div className="w-full h-full flex justify-center flex-wrap lg:pb-0 pb-[90px] pt-16 relative">
        <div className="w-full absolute top-0 left-0 h-[100px] flex justify-center items-center">
            <input type="text" placeholder="Search Products ...." value={query} onChange={(e) => setQuery(e.target.value)} className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none"></input>
            <button className="ml-4 px-4 py-3 bg-accent text-white rounded-lg hover:bg-primary-dark "onClick={handleSearch}>Search</button>
            
            {/* all products*/}
            <button className="ml-4 px-4 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark"onClick={()=>{setIsProductsLoaded(false)}}>All Products</button>

        </div>
        {
           products.map(
            (item)=>{
                return(
                    <ProductCard key={item.productID || item._id} product={item} />
                )

            }
           )
        }
        <div  className="w-full h-[150px]"></div>

    </div>
)
}