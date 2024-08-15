import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const discountsTable = sqliteTable('discounts', {
  code: text('code').primaryKey().notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  value: integer('value').notNull(),
})