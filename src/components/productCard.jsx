export default function ProductCard(props){
    
    console.log(props)


    return(
<div className ="product-card border w-100">
        
        <img src={props.image} alt={"Picture of a "+props.name}/>
        <h1>{props.name}</h1>
        <p>LKR {props.price}/-</p>
        <button>Buy Now</button>


</div>


    )

}