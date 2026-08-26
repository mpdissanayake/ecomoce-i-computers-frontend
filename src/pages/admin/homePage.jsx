import { Route, Routes } from "react-router-dom"
import Header from "../../components/header"
import ProductsPage from "./productsPage"
import ProductOverviewPage from "./productOverviewPage"
import CartPage from "./cart"
import CheckoutPage from "./checkout"
import CustomerOrdersPage from "./customerMyOrdersPage"
import SettingsPage from "./settings"
import BottomNavigationBar from "../../components/bottomNavigationBar"
import NotFoundPage from "./notFoundPage"


export default function HomePage(){
return(
    <div className="w-full min-h-screen flex flex-col ">        
       <Header/>
       <div className="w-full h-[calc(100%-100px)] border overflow-y-scroll">
        <Routes>
        <Route path="/" element={<h1>Home Page</h1>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/contact-us" element={<h1>Contact Us Page</h1>}/>
        <Route path="/overview/:productID" element={<ProductOverviewPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/my-orders" element={<CustomerOrdersPage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/*" element={<NotFoundPage/>} />

          

        </Routes>
        <BottomNavigationBar/>

        </div>
    </div>
)
}






