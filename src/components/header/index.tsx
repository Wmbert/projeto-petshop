import { useContext } from "react";
import logo from "../../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router";

import { CartContext } from "../../contexts/CartContext"

export function Header(){
    const { cartAmount } = useContext(CartContext)

    return(
        <header className="w-full px-1 bg-violet-300 fixed top-0 left-0 right-0">
            
            <nav 
                className="flex flex-row justify-between items-center pt-4 pb-1"
            >

                <Link to="/">
                    <div className="ml-5 flex flex-col items-center">
                        <img
                            className="max-w-22"
                            src={logo}
                            alt="Logo Petshop"
                        />
                        <span className="font-serif italic font-bold text-2xl">
                            Bom Amigo
                        </span>
                    </div>
                </Link>
                
                <Link className="relative mr-5" to="/cart">
                    <FaCartShopping
                        size={35}
                        color="#121212"
                    />

                    {cartAmount > 0 && (
                        <span
                            className="bg-red-600 absolute -right-2 -top-4 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-xl"
                        >
                            {cartAmount}
                        </span>
                    )}

                </Link>

            </nav>
            
        </header>
    )
}