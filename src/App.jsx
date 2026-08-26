
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
import RegisterPage from './pages/admin/registerPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/admin/forgetPassword'


//134284946239-hgn0dg1t9sbh0r1nt9i670dtbol8e885.apps.googleusercontent.com


function App() {
  

  return (
    <GoogleOAuthProvider clientId="134284946239-hgn0dg1t9sbh0r1nt9i670dtbol8e885.apps.googleusercontent.com" >
    <>
      
        <div className='w-full min-h-screen border-[6px] flex-col  bg-primary text-secondary' >
          <Toaster position='top-center'/>
          <Routes>
          
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/test'element= {<TestPage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          
          
          <Route path='/*'element= {<HomePage/>} />

          
          

          </Routes>

       
           
          
        
          
                  
          
        </div>
        
    </>
    </GoogleOAuthProvider>
  );
}

export default App
