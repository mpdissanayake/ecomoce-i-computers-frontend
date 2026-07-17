export default function ProductCard(props){
    
    console.log(props)


    return(
        <div className="bg-amber-600 border w-[319px]  text-white">        
         <h1 className="text-[#87CEEB] text-[40px]">{props.name}</h1>
         <img src={props.image} alt={"Picture of a "+props.name}/>       
        <p>LKR {props.price}/-</p>
        <button>ADD TO CART </button>
        </div>


    )

}