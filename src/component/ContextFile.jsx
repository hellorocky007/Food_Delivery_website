import React, { createContext, useContext, useReducer } from 'react'
const startCartContext = createContext();
const despachCartContext = createContext();

const reducer = (state,action)=>{
 switch(action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
    case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index,1);
        return newArr;
    case "UPDATE" :
        let arr = state.map(food => {
            if (food.id === action.id) {
                console.log(food.qty, parseInt(action.qty), action.price + food.price);
                return {...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price};
            }
            return food;
        });
        return arr;
    case "DROP" :
        let empArray =[];
        return empArray
        default:
            console.log("Error in Reducer");
 }
}
export const CartProvider=({children}) =>{
    const [state,dispatch]=useReducer(reducer,[]);
  return (
    <despachCartContext.Provider value={dispatch}>
        <startCartContext.Provider value={state} >{children}</startCartContext.Provider>
    </despachCartContext.Provider>
  )
}
export const useCart = () => useContext(startCartContext);
export const useDispatchCart = () =>useContext(despachCartContext);
