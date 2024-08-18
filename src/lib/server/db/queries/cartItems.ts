import type { CartItem } from "$lib/types"
import { and, eq, sql } from "drizzle-orm";
import { db } from "../db"
import { cartItemsTable } from "../schemas/cartItems"
import { productsTable } from "../schemas/products";

const getCartItem = async (userId: string, productId: number) => {
  return db.select()
    .from(cartItemsTable)
    .where(
      and(
        eq(cartItemsTable.userId, userId),
        eq(cartItemsTable.productId, productId)
      )
    )
}

export const addProductToCart = async (userId: string, cartItem: CartItem) => {
  const retrievedCartItem = (await getCartItem(userId, cartItem.id))[0];

  if (retrievedCartItem) {
    return db.run(sql`
      UPDATE ${cartItemsTable}
      SET quantity = ${cartItem.quantity}
      WHERE user_id = ${userId} AND product_id = ${cartItem.id}
    `);
  }
  else {
    return db.run(sql`
      INSERT INTO ${cartItemsTable} (user_id, product_id, quantity)
      VALUES (${userId}, ${cartItem.id}, ${cartItem.quantity})
    `);
  }
}

export const deleteItemFromCart = async (userId: string, productId: number) => {
  return db.run(sql`
      DELETE FROM ${cartItemsTable}
      WHERE user_id = ${userId} AND product_id = ${productId}
    `);
}
export const removeItemFromCart = async (userId: string, productId: number) => {
  const retrievedCartItem = (await getCartItem(userId, productId))[0];

  if (retrievedCartItem && retrievedCartItem.quantity > 1) {
    return db.run(sql`
      UPDATE ${cartItemsTable}
      SET quantity = quantity - 1
      WHERE user_id = ${userId} AND product_id = ${productId}
    `);
  } else {
    return deleteItemFromCart(userId, productId)
  }
}

export const getCartItemsWithProducts = async (userId: string) => {
  return db
    .select()
    .from(cartItemsTable)
    .innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
    .where(eq(cartItemsTable.userId, userId))

}