"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

//With (unkown) we don't know what´s going to happen but something will come and you have to check it out with schema
export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data);

    //If the server detects errors, it returns them to the client and the client renders them. 
    if(!result.success){
        return {
            errors: result.error.issues
        }
    }

    try {
        console.log(data)
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: { 
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}