import {
  pgTable,
  text,
  serial,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
});

export const bottle = pgTable(
  "bottle",
  {
    id: serial("id").primaryKey(),
    message: text("message").notNull(),
    senderName: text("sender_name"),
    senderUsername: text("sender_username").references(() => user.username, {
      onDelete: "set null",
    }),
    driftTime: integer("drift_time").notNull(),
    isDelivered: boolean("is_delivered").default(false).notNull(),
    receiverUsername: text("receiver_username").references(
      () => user.username,
      { onDelete: "set null" },
    ),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deliveredAt: timestamp("delivered_at"),
  },
  (table) => [
    index("bottle_sender_idx").on(table.senderUsername),
    index("bottle_receiver_idx").on(table.receiverUsername),
    index("bottle_is_delivered_idx").on(table.isDelivered),
  ],
);

export const bottleReply = pgTable("bottle_reply", {
  id: serial("id").primaryKey(),
  bottleId: integer("bottle_id")
    .notNull()
    .references(() => bottle.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  senderUsername: text("sender_username").references(() => user.username, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const schema = {
  user,
  session,
  account,
  verification,
  bottle,
  bottleReply,
};
