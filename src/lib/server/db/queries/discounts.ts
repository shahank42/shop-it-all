import { eq } from "drizzle-orm";
import { db } from "../db";
import { discountsTable } from "../schemas/discounts";
import type { Discount, DiscountType } from "$lib/types";

export const getDiscount = async (code: string): Promise<Discount | null> => {
  const discountQuery = await db.select().from(discountsTable).where(eq(discountsTable.code, code))
  if (discountQuery.length === 0) return null;
  const discount = discountQuery[0];

  return {
    ...discount,
    type: discount.type as DiscountType,
  }
}