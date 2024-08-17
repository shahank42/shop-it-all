import { getCartItemsWithProducts } from '$lib/server/db/queries/cartItems.js';
import { json } from '@sveltejs/kit'

export async function GET({ locals }) {
  const cartItems = (await getCartItemsWithProducts("hiezle67ak7sv2w7"));
  return json({ success: true, userId: locals.user ? locals.user.id : "", cartItems })
}