import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router";

import { CartContext } from "../../contexts/CartContext";

export interface ProductProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string
}

export function Home(){
    const { addItemCart } = useContext(CartContext);
    const[products, setProducts] = useState<ProductProps[]>([])

    useEffect(() => {

        async function loadItems(){
            const response = await api.get("/products");

            setProducts(response.data);
        }

        loadItems()

    }, [])

    function handleAddCart(newItem: ProductProps){
        addItemCart(newItem);
        toast.success("Produto adicionado no carrinho",{
            style:{
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#FFF"
            }
        });

    }

    return(
        <main className="mt-40">

            <div className="w-full max-w-xl px-4 mx-auto mb-10">
                <h1 className="font-bold text-3xl font-serif italic mb-4 mt-10 text-center">
                    Produtos em alta
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 mb-10 mr-4 ml-4">
                {products.map((product) => (
                    <section
                        key={product.id}
                        className="lg:w-full m-auto border-b-2 w-full h-90"
                    >
                        <Link to={`/detail/${product.id}`}>
                            <img
                                src={product.cover}
                                alt="foto do produto"
                                className="max-w-60 mb-4 m-auto rounded-full"
                            />
                        </Link>


                        <p className="text-center text-xl italic">
                            {product.title}
                        </p>

                        <div className="flex gap-3 mt-3 items-center justify-center">
        
                            <strong className="text-l">
                                {product.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </strong>
                            
                            <button onClick={() => handleAddCart(product)}>
                                <FaCartPlus
                                    size={25}
                                    color="#121212"
                                />
                            </button>
                            

                        </div>

                    </section>
                ))}
            </div>

            

        </main>
    )
}