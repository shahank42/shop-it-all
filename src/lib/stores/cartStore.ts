import type { Cart, Product, Discount, CartItem } from "$lib/types";
import { getDiscountLocal } from "$lib/utils";
import { writable } from "svelte/store";

const CART_STORAGE_KEY = 'cart';

const initialState: Cart = {
  items: [],
  subTotal: 0,
  discount: null,
  total: 0,
};

const calculateAndSetDiscount = (cart: Cart) => {
  if (cart.discount) {
    switch (cart.discount.type) {
      case "flat":
        cart.total = Math.max(0, cart.subTotal - cart.discount.value);
        break;
      case "percentage":
        cart.total = cart.subTotal - (cart.subTotal * cart.discount.value) / 100;
        break;
    }
  } else {
    cart.total = cart.subTotal;
  }
};

const getInitialState = (): Cart => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : initialState;
  }
  return initialState;
};

const createCart = () => {
  const { subscribe, set, update } = writable<Cart>(getInitialState());

  // Thank you Claude :-)
  const updateAndPersist = (updater: (state: Cart) => Cart) => {
    update((state) => {
      const newState = updater(state);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      }
      return newState;
    });
  };

  return {
    subscribe,

    addItem: (product: Product) =>
      updateAndPersist((state) => {
        let item: CartItem = {} as CartItem;
        const index = state.items.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          item.quantity = state.items[index].quantity;
          item.quantity += 1;
        }
        else {
          item = { ...product, quantity: 1 }
          state.items.push(item)
        };

        state.subTotal += product.price;
        console.log(state.subTotal)
        calculateAndSetDiscount(state);

        return state;
      }),

    setQuantityOf: (id: number, quantity: number) =>
      updateAndPersist((state) => {
        const index = state.items.findIndex((item) => item.id === id);
        const oldQuantity = state.items[index].quantity;
        if (index !== -1) state.items[index].quantity = quantity;

        state.subTotal = state.subTotal - state.items[index].price * oldQuantity + state.items[index].price * quantity;
        calculateAndSetDiscount(state);

        return state;
      }),

    removeItem: (id: number) =>
      updateAndPersist((state) => {
        const index = state.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.subTotal -= state.items[index].price;
          state.items[index].quantity -= 1;
        }

        calculateAndSetDiscount(state);

        return state;
      }),

    deleteItem: (id: number) =>
      updateAndPersist((state) => {
        const index = state.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.subTotal -= state.items[index].price * state.items[index].quantity;
          state.items.splice(index, 1);
        }

        calculateAndSetDiscount(state);

        return state;
      }),

    setDiscount: (code: string) =>
      updateAndPersist((state) => {
        const discount = getDiscountLocal(code);
        if (discount == null) {
          return {
            ...state,
            total: state.subTotal,
          };
        }

        state.discount = discount;
        calculateAndSetDiscount(state);
        return state;
      }),

    removeDiscount: () =>
      updateAndPersist((state) => {
        state.discount = null;
        state.total = state.subTotal;
        return state;
      }),

    clear: () => {
      set(initialState);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  };
};

export const cart = createCart();