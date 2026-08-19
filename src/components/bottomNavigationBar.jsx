import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function BottomNavigationBar(){

    return (
        <div className=" flex lg:hidden w-full h-[80px] p-2 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.15)] fixed bottom-0 justify-evenly">
            <Link to="/" className="h-full aspect-square flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl">
                <GoHome />
            </Link>
            <Link to="/products" className="h-full aspect-square flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl">
                <CiSearch />
            </Link>
            <Link to="/cart" className="h-full aspect-square flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl">
                <CiShoppingCart />
            </Link>
            <UserData className="h-full aspect-square flex justify-center items-center rounded-lg  text-accent shadow-2xl shadow-accent text-3xl" />


        </div>
    )

}