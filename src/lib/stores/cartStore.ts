import type { Cart, Discount, Product } from "$lib/types";
import { getDiscount } from "$lib/utils";
import { writable } from "svelte/store"

const initialState: Cart = {
  items: [],
  subTotal: 0,
  discount: null,
  total: 0,
}

const calculateAndSetDiscount = (cart: Cart) => {
  if (cart.discount) {
    switch (cart.discount.type) {
      case "flat":
        cart.total = Math.max(0, cart.subTotal - cart.discount?.value);
        break;
      case "percentage":
        cart.total = cart.subTotal - cart.subTotal * cart.discount.value / 100;
        break;
    }
  } else {
    cart.total = cart.subTotal
  }
}

const createCart = () => {
  const { subscribe, set, update } = writable<Cart>(initialState);

  return {
    subscribe,

    addItem: (product: Product) => (
      update((state) => {
        const index = state.items.findIndex((item) => item.id === product.id)
        if (index !== -1) state.items[index].quantity += 1;
        else state.items.push({ ...product, quantity: 1 })

        state.subTotal += product.price;
        calculateAndSetDiscount(state);

        return state;
      })
    ),

    setQuantityOf: (id: number, quantity: number) => (
      update((state) => {
        const index = state.items.findIndex((item) => item.id === id)
        const oldQuantity = state.items[index].quantity;
        if (index !== -1) state.items[index].quantity = quantity;

        state.subTotal = state.subTotal - state.items[index].price * oldQuantity + state.items[index].price * quantity;
        calculateAndSetDiscount(state);

        return state;
      })
    ),

    removeItem: (id: number) => (
      update((state) => {
        const index = state.items.findIndex((item) => item.id === id)
        if (index !== -1) {
          state.subTotal -= state.items[index].price;
          state.items[index].quantity -= 1;
        }

        calculateAndSetDiscount(state)

        return state
      })
    ),

    deleteItem: (id: number) => (
      update((state) => {
        const index = state.items.findIndex((item) => item.id === id)
        if (index !== -1) {
          state.subTotal -= state.items[index].price * state.items[index].quantity;
          state.items.splice(index, 1);
        }

        calculateAndSetDiscount(state)

        return state;
      })
    ),

    setDiscount: (code: string) => (
      update((state) => {
        // TODO: refactor this golang-esque thing with proper error handling
        const discount = getDiscount(code);
        if (discount == null)
          return {
            ...state,
            total: state.subTotal,
          };

        state.discount = discount

        calculateAndSetDiscount(state)
        return state;
      })
    ),

    removeDiscount: () => (
      update((state) => {
        state.discount = null;
        state.total = state.subTotal;
        return state;
      })
    ),

    clear: () => set(initialState)
  }
}

export const cart = createCart();