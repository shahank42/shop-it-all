import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getDiscountLocal } from "$lib/utils";
import { getCartItemsWithProducts } from "$lib/server/db/queries/cartItems";
import type { CartItem } from "$lib/types";
import { getProducts } from "$lib/server/db/queries/products";

export const load: PageServerLoad = async ({ locals }) => {
  const fetchedCartItems = await getCartItemsWithProducts(locals.user ? locals.user.id : "x");
  const userCartItems: CartItem[] = fetchedCartItems.map(({ products, cart_items }) => ({ ...products, quantity: cart_items.quantity }))

  return {
    user: locals.user,
    productsPromise: getProducts(),
    userCartItems,
  };
};

export const actions: Actions = {
  discount: async (event) => {
    // const discount = getDiscountLocal()
    return {

    }
  }
};