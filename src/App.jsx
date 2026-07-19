
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import ProductsPage from './pages/productsPage'

function App() {
  

  return (
    <>
      
        <div className='w-full main-screen border-[6px] flex-col  bg-primary text-secondary' >
          <Routes>
          <Route path='/'element= {<HomePage/>} />
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/products' element={<ProductsPage/>}/>  

          </Routes>

       
           
          
        
          
                  
          
        </div>
        
    </>
  )
}

export default App
