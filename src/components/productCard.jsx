export default function ProductCard(props){
    
    console.log(props)


    return(
<div >
        
         <h1>{props.name}</h1>
         <img src={props.image} alt={"Picture of a "+props.name}/>       
        <p>LKR {props.price}/-</p>
        <button>ADD TO CART </button>


</div>


    )

}