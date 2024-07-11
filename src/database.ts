import SQLiteDatabase from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import type { DB } from "./database.types";

export class Database {
	#database: Kysely<DB>;

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
}
