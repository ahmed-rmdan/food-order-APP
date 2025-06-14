import React, { useReducer } from "react";
import type { meal,cartmeal } from "../components/global/type";

export const Contextcart=React.createContext<{cartitems:{items:cartmeal[]},dispatchcartitems:(action:actiontype)=>void}>
({ 
    cartitems:{items:[]},
    dispatchcartitems:()=>{}
})
type actiontype={
    type:string,
    payload:meal
}
function dispatchfunction(state:{items:cartmeal[]},action:actiontype){
if(action.type==='add-item'){
    
    const newitem:cartmeal={...action.payload,quantity:1}
return{
items:[...state.items,newitem]
}
}
if(action.type==='remove-item'){
    
    const newcartmeals=[...state.items].filter(elm=>elm.id!==action.payload.id)
 
    return{
        items:newcartmeals
    }
}
if(action.type==='increase'){
    
    const newmealsitem=[...state.items]
    const itemindex:number=newmealsitem.findIndex(elm=>elm.id===action.payload.id)
  
    newmealsitem[itemindex].quantity=newmealsitem[itemindex].quantity+1
    return{
        items:newmealsitem
    }
}if(action.type==='decrease'){
     const newmealsitem=[...state.items]
    const itemindex:number=newmealsitem.findIndex(elm=>elm.id===action.payload.id)
    if(newmealsitem[itemindex].quantity===1){
        return{
            items:state.items
        }
    }
      newmealsitem[itemindex].quantity=newmealsitem[itemindex].quantity-1
    return{
        items:newmealsitem
    }
}

else{
    return{...state}
}

}
export const Contextcartprovider:React.FC<{children:React.ReactNode}>=(props)=>{
const [cartitems,dispatchcartitems]=useReducer(dispatchfunction,{items:[]})

const contextvalue={cartitems,dispatchcartitems}
    return(
        <Contextcart value={contextvalue}>
            {props.children}
        </Contextcart>

    )
}