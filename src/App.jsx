
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'
import HomePage from './pages/admin/homePage'
import AdminPage from './pages/admin/adminPage'
import ProductsPage from './pages/admin/productsPage'
import TestPage from './pages/admin/testPage'
import LoginPage from './pages/admin/loginPage'
import { Toaster } from 'react-hot-toast'


function App() {
  

  return (
    <>
      
        <div className='w-full main-screen border-[6px] flex-col  bg-primary text-secondary' >
          <Toaster position='top-center'/>
          <Routes>
          <Route path='/*'element= {<HomePage/>} />
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/test'element= {<TestPage/>} />
          <Route path='/login' element={<LoginPage />} />
          
          

          </Routes>

       
           
          
        
          
                  
          
        </div>
        
    </>
  )
}

export default App
