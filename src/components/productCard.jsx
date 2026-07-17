/*export default function ProductCard(props){
    
    console.log(props)


    return(
        <div className="bg-amber-600 border w-[319px]  text-white">        
         <h1 className="text-[#87CEEB] text-[40px]">{props.name}</h1>
         <img src={props.image} alt={"Picture of a "+props.name}/>       
        <p>LKR {props.price}/-</p>
        <button>ADD TO CART </button>
        </div>


    )

}*/
export default function ProductCard(props) {
  return (
    <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">

      {/* Product Image */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={props.image}
          alt={`Picture of ${props.name}`}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Product Name */}
        <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
          {props.name}
        </h2>

        {/* Price */}
        <div className="mt-3">
          <span className="text-3xl font-bold text-indigo-600">
            LKR {props.price}
          </span>
          <span className="text-gray-500 text-sm"> /-</span>
        </div>

        {/* Button */}
        <button className="mt-5 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95">
          🛒 Add to Cart
        </button>

      </div>

    </div>
  );
}