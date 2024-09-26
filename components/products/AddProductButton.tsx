"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder)

    return (
        <button
            type="button"
            className="bg-gray-700 hover:bg-gray-900 text-white w-full mt-5 p-3  font-bold rounded-md cursor-pointer hover:transition-all"
            onClick={() => addToOrder(product)}
        >
            Agregar
        </button>
    )
}
