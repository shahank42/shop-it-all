import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable('products', {
  id: integer('id').primaryKey().notNull(),
  title: text('title').notNull(),
  price: real('price').notNull(),
  currency: text('currency').notNull(),
  image: text('image').notNull(),
  stock: integer('stock').notNull(),
})