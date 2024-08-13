import type { Cart, Product } from "$lib/types";
import { writable } from "svelte/store"

const initialState: Cart = {
  items: [],
  total: 0,
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

        state.total += product.price;
        return state;
      })
    ),

    setQuantityOf: (id: number, quantity: number) => (
      update((state) => {
        const index = state.items.findIndex((item) => item.id === id)
        const oldQuantity = state.items[index].quantity;
        if (index !== -1) state.items[index].quantity = quantity;

        state.total = state.total - state.items[index].price * oldQuantity + state.items[index].price * quantity;
        return state;
      })
    ),

    removeItem: (id: number) => (
      update((state) => {
        const index = state.items.findIndex((item) => item.id === id)
        if (index !== -1) {
          state.total -= state.items[index].price;
          state.items[index].quantity -= 1;
        }

        return state
      })
    ),

    deleteItem: (id: number) => (
      update((state) => {
        const index = state.items.findIndex((item) => item.id === id)
        if (index !== -1) {
          state.total -= state.items[index].price * state.items[index].quantity;
          state.items.splice(index, 1);
        }

        return state;
      })
    ),

    clear: () => set(initialState)
  }
}

export const cart = createCart();