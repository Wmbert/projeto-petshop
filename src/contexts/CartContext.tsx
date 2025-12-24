import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react"
import type { ProductProps } from "../pages/home"

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItem: (product: CartProps) => void;
    totalPrice: (items: CartProps[]) => void;
    total: string;
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);


export default function CartProvider({children}: CartProviderProps){
    const[cart, setCart] = useState<CartProps[]>([]);
    const[total, setTotal] = useState("");


    useEffect(() => {
        const meuCarrinho = localStorage.getItem("@carrinho");
        const meuTotal = localStorage.getItem("@total");

        if(meuCarrinho){
            setCart(JSON.parse(meuCarrinho));
        }

        if(meuTotal){
            setTotal(meuTotal);
        }
        
    }, [])

    function addItemCart(newItem: ProductProps){
        //retorna o index do item, se não existir retorna -1
        const indexItem = cart.findIndex(product => product.id === newItem.id);

        //caso tenha o item no carrinho
        if(indexItem !== -1){
            let cartList = cart;

            //recebe o amount mais um
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            //recebe o valor da quantidade 
            cartList[indexItem].total = cartList[indexItem].price * cartList[indexItem].amount;

            setCart(cartList);
            totalPrice(cartList);
            localStorage.setItem("@carrinho", JSON.stringify(cartList));
            return;
        }
        //pega todos os dados do newItem e acrescenta quantidade e o total
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        //adicona no carrinho todos os itens que ja tinham no carrinho e o novo item
        setCart(cartItems => [...cartItems, data]);
        totalPrice([...cart, data]);
        localStorage.setItem("@carrinho", JSON.stringify([...cart, data]));
    }

    function removeItem(product: CartProps){
        //acha o index no cart
       const indexItem = cart.findIndex(item => item.id === product.id);

       //remove apenas um no amount
       if(cart[indexItem].amount > 1){
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalPrice(cartList);
            localStorage.setItem("@carrinho", JSON.stringify(cartList));
            return;
       }

       const removeItem = cart.filter(item => item.id !== product.id);
       setCart(removeItem);
       totalPrice(removeItem);
       localStorage.setItem("@carrinho", JSON.stringify(removeItem));
    }

    function totalPrice(items: CartProps[]){
        //carrinho completo
        let myCart = items;

        //soma todas as propriedades total que existem no array
        let result = myCart.reduce((acumulador, objeto) => {return acumulador + objeto.total}, 0);
        let resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        setTotal(resultFormated);
        localStorage.setItem("@total", resultFormated);
    }

    return(
        <CartContext.Provider value={{
            cart,
            cartAmount: cart.length,
            addItemCart,
            totalPrice,
            total,
            removeItem
        }}>
            {children}
        </CartContext.Provider>
    )
}