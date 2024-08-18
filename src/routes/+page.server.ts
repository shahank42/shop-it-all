import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { lucia } from '$lib/server/auth';
import { getProducts } from '$lib/server/db/queries/products';
import { getCartItemsWithProducts } from '$lib/server/db/queries/cartItems';
import type { CartItem } from '$lib/types';

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
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	}
};