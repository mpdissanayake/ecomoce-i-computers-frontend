
const exampleCart =[
    {
        product : {
            productID :"1234567890",
            name : "Example Product" ,
            image :"https://via.placeholder.com/150",
            labelledPrice : 100,
            price : 810,

        },
    }
]
export function getCart(){
     
const cartString =localStorage.getItem("cart")

if (cartString == null){
    localStorage.setItem("cart" , "[]")
        return []
}else{
    const cart = JSON.parse(cartString);

    return cart;
}

}

export function addToCart(product ,quantity){
    const cart = getCart()
    const existingProductIndex =cart.findIndex(
        (item)=>{

         return item.product.productID ==product.productID   

        }
        
    )// if not found minus retun(-1)
    if(existingProductIndex == -1){

        if(quantity >0 ){
            cart.push(
                {
                    product :{
                        productID : product.productID,
                        name : product.name,
                        image : product.images[0],
                        labelledPrice : product.labelledPrice,
                        price :product.price

                    },
                    quantity : quantity
            

                }
            )
        }

    }else{
        const newQty = cart[existingProductIndex].quantity + quantity;
        if(newQty>0){
            cart[existingProductIndex].quantity = newQty;
        }else{
            cart.splice(existingProductIndex , 1)
        }
    }
    const cartstring = JSON.stringify(cart);
    localStorage.setItem("cart" , cartstring)

}