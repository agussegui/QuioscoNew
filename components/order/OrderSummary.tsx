"use client"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-actions"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

    const order = useStore((state) => state.order)
    const clearOrder = useStore((state) => state.clearOrder)
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        }
        //validation in the client
        const result = OrderSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return 
        }
        //pass to server 
        const response = await createOrder(data)
        if(response?.errors){
            response.errors.forEach((issue) => {
                toast.error(issue.message)
            })
        }

        toast.success('Pedido Realizado Exitosamente')
        clearOrder()
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center text-white bg-amber-500 font-bold p-3 rounded-md">Mi Pedido</h1>
            {order.length === 0 ? 
                <div className="flex items-center">
                    <p className=" my-10 mx-8 text-xl">El pedido esta vacio </p>
                    <ShoppingCartIcon className="h-12 w-12 mr-4"/>
                </div> 
                : (
                <div className="mt-5">
                    {order.map(item =>(
                        <ProductDetails
                            key={item.id}
                            item={item}
                        />
                    ))}

                    <p className="text-2xl mt-20 text-center">Total a pagar:
                        <span className="font-bold"> {formatCurrency(total)}</span>
                    </p>
                    <form
                        className="w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                    >
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            className="bg-white border border-gray-200 p-2 w-full rounded-md"
                            name="name"
                        />
                        <input 
                            type="submit"
                            className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                            value="Confirmar Pedido"
                        />
                    </form>
                </div>
            )}
        </aside>
    )
}
