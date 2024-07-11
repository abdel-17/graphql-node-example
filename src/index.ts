import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { join } from "node:path";
import { createSchema, createYoga } from "graphql-yoga";
import { Database } from "./database";
import type { Resolvers } from "./schema.types";

const databasePath = join(__dirname, "database.db");
const database = new Database(databasePath);

const schemaPath = join(__dirname, "schema.graphql");
const typeDefs = readFileSync(schemaPath, "utf-8");

const resolvers: Resolvers = {
	Query: {
		authors() {
			return database.getAuthors();
		},
		author(_, args) {
			return database.getAuthorById(args.id);
		},
		books() {
			return database.getBooks();
		},
		book(_, args) {
			return database.getBookById(args.id);
		},
	},
	Author: {
		books(author) {
			const { id } = author;
			if (id === undefined) {
				throw new Error("author.id is undefined");
			}
			return database.getBooksByAuthorId(id);
		},
	},
};

const schema = createSchema({ typeDefs, resolvers });
const yoga = createYoga({ schema });
const server = createServer(yoga);

const port = 3000;
server.listen(port);
console.log(`Server is running on http://localhost:${port}`);
