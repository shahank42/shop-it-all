import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users"

export const sessionsTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: integer("expires_at").notNull()
});
