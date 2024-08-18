import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
import { productsTable } from "./products";

export const cartItemsTable = sqliteTable('cart_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => usersTable.id),
  productId: integer('product_id').references(() => productsTable.id),
  quantity: integer('quantity').notNull().default(1),
  addedAt: text('added_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => ({
  userProductUnique: unique().on(table.userId, table.productId)
}))