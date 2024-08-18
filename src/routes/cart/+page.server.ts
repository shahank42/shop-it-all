import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getDiscountLocal } from "$lib/utils";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user
  };
};

export const actions: Actions = {
  discount: async (event) => {
    // const discount = getDiscountLocal()
    return {
      
    }
  }
};