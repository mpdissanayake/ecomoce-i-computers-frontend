
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import ProductsPage from './pages/productsPage'
import TestPage from './pages/testPage'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'


function App() {
  

  return (
    <>
      
        <div className='w-full main-screen border-[6px] flex-col  bg-primary text-secondary' >
          <Toaster position='top-center'/>
          <Routes>
          <Route path='/'element= {<HomePage/>} />
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/products' element={<ProductsPage/>}/>
          <Route path='/test'element= {<TestPage/>} />
          <Route path='/login' element={<LoginPage />} />
          
          

          </Routes>

       
           
          
        
          
                  
          
        </div>
        
    </>
  )
}

export default App
