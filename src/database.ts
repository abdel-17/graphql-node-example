import SQLiteDatabase from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import type { DB } from "./database.types";
import { assert } from "./utils";

export class Database {
	readonly #database: Kysely<DB>;

	constructor(filename: string) {
		const database = new SQLiteDatabase(filename);

		// Enable WAL mode for better performance
		database.pragma("journal_mode = WAL");

		this.#database = new Kysely<DB>({
			dialect: new SqliteDialect({ database }),
		});
	}

	getAuthors() {
		return this.#database.selectFrom("authors").selectAll().execute();
	}

	async getAuthorById(id: number) {
		const author = await this.#database
			.selectFrom("authors")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();

		return author ?? null;
	}

	async insertAuthor(name: string) {
		const { insertId } = await this.#database
			.insertInto("authors")
			.values({ name })
			.executeTakeFirst();

		assert(insertId !== undefined, "insertId is undefined");

		return {
			id: Number(insertId),
		};
	}

	async deleteAuthorById(id: number) {
		const { numDeletedRows } = await this.#database
			.deleteFrom("authors")
			.where("id", "=", id)
			.executeTakeFirst();

		return {
			exists: numDeletedRows !== 0n,
		};
	}

	getBooks() {
		return this.#database.selectFrom("books").selectAll().execute();
	}

	async getBookById(id: number) {
		const book = await this.#database
			.selectFrom("books")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();

		return book ?? null;
	}

	getBooksByAuthorId(authorId: number) {
		return this.#database
			.selectFrom("books")
			.selectAll()
			.where("author_id", "=", authorId)
			.execute();
	}

	async insertBook(title: string, author_id: number) {
		const { insertId } = await this.#database
			.insertInto("books")
			.values({ title, author_id })
			.executeTakeFirst();

		assert(insertId !== undefined, "insertId is undefined");

		return {
			id: Number(insertId),
		};
	}

	async deleteBookById(id: number) {
		const { numDeletedRows } = await this.#database
			.deleteFrom("books")
			.where("id", "=", id)
			.executeTakeFirst();

		return {
			exists: numDeletedRows !== 0n,
		};
	}
}
