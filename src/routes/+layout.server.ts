import { getCartItemsWithProducts } from "$lib/server/db/queries/cartItems";
import { getProducts } from "$lib/server/db/queries/products";
import type { CartItem } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const fetchedCartItems = await getCartItemsWithProducts(locals.user ? locals.user.id : "x");
  const userCartItems: CartItem[] = fetchedCartItems.map(({ products, cart_items }) => ({ ...products, quantity: cart_items.quantity }))

  return {
    user: locals.user,
    products: await getProducts(),
    userCartItems,
  };
};