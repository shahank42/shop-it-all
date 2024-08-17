import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user
  };
};

export const actions: Actions = {
  discount: async (event) => {
    return {
      event
    }
  }
};