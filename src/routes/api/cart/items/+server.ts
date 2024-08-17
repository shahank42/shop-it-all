import { addProductToCart, deleteItemFromCart, removeItemFromCart } from '$lib/server/db/queries/cartItems.js';
import type { CartItem } from '$lib/types.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const body = await request.json()
  const userId: string = body.userId;
  const item: CartItem = body.item;
  const quantity: number = body.quantity;

  addProductToCart(userId, item)

  return json({ success: true })
}

export async function DELETE({ request }) {
  const body = await request.json()
  const userId: string = body.userId;
  const item: CartItem = body.item;
  const deleteItem: boolean = body.deleteItem;

  if (deleteItem) deleteItemFromCart(userId, item.id)
  else removeItemFromCart(userId, item.id)

  return json({ success: true })
}