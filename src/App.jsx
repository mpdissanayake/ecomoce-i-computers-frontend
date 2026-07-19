
import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'

function App() {
  

  return (
    <>
      
        <div className='w-[700px] h-[700px] border-[6px] flex justify-center items-center  relative' >

          <div className='w-[600px] h-[600px] bg-yellow-500 flex-col items-center justify-center' >

            <div className='w-[70px] h-[70px] bg-red-700' >
            </div>
            <div className='w-[70px] h-[70px] bg-blue-600' >
            </div>
            <div className='w-[70px] h-[70px] bg-green-600 fixed bottom-[50px] right-[50px]' >
            </div>
            <div className='w-[70px] h-[70px] bg-orange-600 absolute top-[30px] right-[30px]' >
            </div>
            <div className='w-[70px] h-[70px] bg-white' >
            </div>
            <div className='w-[70px] h-[70px] bg-pink-400' >
            </div>

          </div>

        
          
                  
          
        </div>
        
    </>
  )
}

export default App
