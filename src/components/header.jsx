import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent relative flex items-center justify-center flex-shrink-0" >
            <Link to="/" className="w-[200px] h-full absolute  lg:left-10  flex items-center justify-center ">
                <img src="/logo.png" alt="Logo" className=" h-[70px] mr-2" />
                
            </Link>
            <div className="h-full hidden lg:flex justify-center items-center gap-10">
            
            <Link to="/" className=" text-white text-lg font-semibold ">HOME</Link>
            <Link to="/products" className=" text-white text-lg font-semibold ">Products</Link>
            <Link to="/contact-us" className=" text-white text-lg font-semibold ">Contact Us</Link>

            </div>

           <div className="h-[50px] hidden lg:flex absolute right-10  items-center gap-6">

                {/* User Data */}

                <UserData />


                {/* Cart */}

                <Link
                    to="/cart"
                    className="w-[50px] h-[50px] hidden lg:flex justify-center items-center"
                >
                    <BiCart className="text-white text-3xl" />
                </Link>

            </div>
           

        </header>
    );
}