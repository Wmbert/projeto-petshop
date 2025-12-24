import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../../contexts/CartContext";

export function Cart(){
    const { total, cart, addItemCart, removeItem } = useContext(CartContext);

    return(
        <main className="mt-38">
            {cart.length === 0 && (
                <section className="w-full flex items-center justify-center flex-col">
                    <p className="font-bold">Ops, seu carrinho está vázio...</p>

                    <Link 
                        className="bg-slate-500 px-3 py-1 rounded mt-2 text-white font-bold" 
                        to="/"
                    >
                        Acessar Produtos
                    </Link>


                </section>
            )}

            {cart.map((product) => (
                <section key={product.id} className="w-full">

                    <div
                        className="flex items-center justify-between self-center mr-5 ml-5 mb-3 pb-3 border-b-2 border-b-gray-300"
                    >
                        <Link to={`/detail/${product.id}`}>
                            <img
                                src={product.cover}
                                alt="foto produto"
                                className="w-25 rounded-full"
                            />
                        </Link>

                        <div
                            className="max-w-xl flex items-center justify-between gap-4"
                        >

                            <button
                                onClick={() =>  removeItem(product)}
                                className="bg-slate-500 px-2 rounded font-bold text-white flex items-center justify-center"
                            >
                                -
                            </button>


                            <span className="text-2xl font-medium italic">
                                {product.amount}
                            </span>

                            <button
                                onClick={() => addItemCart(product)}
                                className="bg-slate-500 px-2 rounded text-white font-bold flex items-center justify-center"
                            >
                                +
                            </button>


                        </div>

                        <span className="text-xl float-right italic">
                            {product.total.toLocaleString("pt-BR",{
                                style: "currency",
                                currency: "BRL"
                            })}
                        </span>

                    </div>

                </section>
            ))}

            
            {cart.length !== 0 && (
                <span className="ml-5 font-bold italic">
                    Total: {total}
                </span>
            )}

            
        </main>
    )
}