import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductsPage(){
const [products, setProducts] = useState([]);
const [isProductsLoaded, setIsProductsLoaded] = useState(false);

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
            } 
        );  
        }
    }, [isProductsLoaded]);

return(
    <div className="w-full h-full flex justify-center flex-wrap lg:pb-0 pb-[90px]">
        {
           products.map(
            (item)=>{
                return(
                    <ProductCard key={item.productId} product={item} />
                )

            }
           )
        }
        <div  className="w-full h-[150]"></div>

    </div>
)
}