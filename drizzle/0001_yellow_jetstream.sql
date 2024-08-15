CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`price` real NOT NULL,
	`currency` text NOT NULL,
	`image` text NOT NULL,
	`stock` integer NOT NULL
);
