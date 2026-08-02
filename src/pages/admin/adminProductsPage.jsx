import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/lodingAnimation";
import ProductDeleteModal from "../../components/productDeleteModal";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const[isProductsAreloded,setIsProductsAreLoaded] = useState(false);
    
    useEffect(() => {


      if(!isProductsAreloded){const token = localStorage.getItem("token");

        axios.get(import.meta.env.VITE_API_URL + "/products", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            setProducts(response.data);
            setIsProductsAreLoaded(true);


        }).catch(
          (error) => {
            console.log(error);
            
        });
      }

        
    }, [isProductsAreloded]);

    return (
        <div className="w-full h-full flex flex-col items-center overflow-y-scroll bg-primary p-6">

            {/* Header */}
            <div className="sticky top-0 w-full bg-accent rounded-xl px-6 py-4 flex items-center justify-between text-white">
                <h1 className="text-2xl font-semibold text-white">Products</h1>
                
            </div>

            {/* Table */}
            {<div className="mt-5 w-full rounded-lg text-secondary">
                <div className="overflow-x-auto">
                  {isProductsAreloded?
                  <table className="w-full text-secondary">
                      <thead className="bg-accent/45 text-white ">
                          <tr>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Image</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Product ID</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Name</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Price</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Labelled Price</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Brand</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Model</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Category</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Availability</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Stock</th>
                              <th className="text-center p-4 text-sm font-semibold text-secondary">Actions</th>
                          </tr>
                      </thead>

                      <tbody>
                          {
                              products.map((item) => {
                                  return (
                                      <tr className="odd:bg-gray-600 even:bg-primary odd:text-white border-t-4 border-primary hover:bg-accent/45 "
                                          key={item.productID} 
                                          
                                      >
                                          <td className="p-3 text-center">
                                              <img 
                                                  src={item.images?.[0]} 
                                                  alt={item.name} 
                                                  className="w-16 h-16 object-cover   border-gray-200 rounded-full"
                                              />
                                          </td>
                                          <td className="text-center text-wrap p-3 ">
                                              {item.productID}
                                          </td>
                                          <td className="text-center text-wrap p-3">
                                              {item.name}
                                          </td>
                                          <td className="text-center text-wrap p-3 text-sm font-semibold">
                                              Rs. {item.price}
                                          </td>
                                          <td className="text-center text-wrap p-3 text-sm">
                                              Rs. {item.labelledPrice}
                                          </td>
                                          <td className="text-center text-wrap p-3 text-sm">
                                              {item.brand}
                                          </td>
                                          <td className="text-center text-wrap p-3 text-sm">
                                              {item.model}
                                          </td>
                                          <td className="text-center text-wrap p-3 text-sm">
                                              
                                                  {item.category}
                                          </td>
                                          <td className="text-center text-wrap p-3 text-sm">
                                              {item.isAvallable ? (
                                                  <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                      Available
                                                  </span>
                                              ) : (
                                                  <span className="px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                      Out of Stock
                                                  </span>
                                              )}
                                          </td>
                                          <td className="text-center text-wrap p-3 text-sm font-medium">
                                              {item.stock}
                                          </td>

                                          <td className="text-center text-wrap p-3 text-sm font-medium">
                                            <ProductDeleteModal product={item} refresh={
                                              ()=>{
                                                setIsProductsAreLoaded(false);
                                              }
                                            } />
                                            
                                            {/*product eka delete karana button eka add kirima call to backend und*/}
                                              {/*<TbTrash className="text-2xl text-red-500 cursor-pointer hover:text-red-700"
                                              onClick={()=>{
                                              toast.success(item.productID)
                                              const token = localStorage.getItem("token");
                                              axios.delete(import.meta.env.VITE_API_URL+"/products/"+item.productID,{
                                                headers :{
                                                  "Authorization": "Bearer " + token
                                                }
                                              }).then(()=>{
                                              toast.success(item.productID +"Product Deleted Successfully ! ")
                                              setProductsAreLoaded(false);

                                              }
                                              ).catch((error)=>{
                                              toast.error("Error deleting product")
                                              console.log( error);
                                              }
                                              )
                                            }}
                                              />*/}

                                            <Link  to="/admin/edit-product" 
                                                state={item}
                                            >
                                                <BiEdit className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700" />
                                            </Link>

                                          </td>

                                      </tr>
                                  );
                              })
                          }
                      </tbody>
                  </table>
                  :
                  <LoadingAnimation />
                  }
                </div>
            </div>}

            {/* Add Product Button */}
            <Link 
                to="/admin/add-product" 
                className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-accent flex items-center justify-center text-white text-3xl rounded-full shadow-xl hover:scale-110 transition-all duration-300"
            >
                <FaPlus />
            </Link>

        </div>
    );
}