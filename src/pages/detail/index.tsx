import { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router";
import type { ProductProps } from "../home/index";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import { CartContext } from "../../contexts/CartContext";

export function DetalhesProduto(){
    const {id} = useParams();
    const { addItemCart } = useContext(CartContext);
    const[itemDetail, setItemDetail] = useState<ProductProps>();

    useEffect(() => {

        async function loadItem(){
            const response = await api.get(`/products/${id}`);
            
            setItemDetail(response.data);
        }

        loadItem();

    }, [])

    function handleAddItem(item: ProductProps){
        addItemCart(item);
        toast.success("Item adiconado ao carrinho", {
            style:{
                backgroundColor: "#121212",
                color: "#FFF",
                borderRadius: 10
            }
        })
    }


    return(
        <main className="mt-35 w-full">
            {itemDetail && (
                <section
                    className="flex items-center flex-col justify-center gap-5 py-10 md:items-start md:flex-row"
                >

                    <img
                        className="max-w-60 rounded-full md:max-w-80"
                        src={itemDetail?.cover}
                        alt=""
                    />

                    <div className="flex flex-col items-center justify-center mx-5 m-auto max-w-2xl">
                        <h1 className="font-bold text-2xl mb-5">{itemDetail?.title}</h1>

                        <p>
                            {itemDetail?.description}
                        </p>

                        <div className="flex items-center self-start justify-items-start gap-3 mt-3">
                            <strong>
                                Valor: {itemDetail?.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </strong>

                            <button 
                                className="cursor-pointer"
                                onClick={() => handleAddItem(itemDetail)}
                            >
                                <FaCartPlus
                                    size={25}
                                    color="#121212"
                                />
                            </button>
                        </div>
                    </div>

                </section>
            )}
        </main>
    )
}