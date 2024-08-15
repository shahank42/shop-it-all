import type { Product } from "$lib/types"
import { db } from "../db"
import { productsTable } from "../schemas/products"

export const getProducts = async (): Promise<Product[]> => db.select().from(productsTable)
