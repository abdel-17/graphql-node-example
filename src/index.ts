import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { join } from "node:path";
import { createSchema, createYoga } from "graphql-yoga";
import { Database } from "./database";
import type { Resolvers } from "./schema.types";
import { assert } from "./utils";

const databasePath = join(__dirname, "..", "database", "database.db");
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
			assert(id !== undefined, "id is undefined");
			return database.getBooksByAuthorId(id);
		},
	},
	Mutation: {
		insertAuthor(_, args) {
			return database.insertAuthor(args.name);
		},
		deleteAuthor(_, args) {
			return database.deleteAuthorById(args.id);
		},
		insertBook(_, args) {
			return database.insertBook(args.title, args.authorId);
		},
		deleteBook(_, args) {
			return database.deleteBookById(args.id);
		},
	},
};

const schema = createSchema({ typeDefs, resolvers });
const yoga = createYoga({ schema });
const server = createServer(yoga);

const port = 3000;
server.listen(port);
console.log(`Server is running on http://localhost:${port}`);
