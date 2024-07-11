import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;

export interface Authors {
	id: Generated<number>;
	name: string;
}

export interface Books {
	author_id: number | null;
	id: Generated<number>;
	title: string;
}

export interface DB {
	authors: Authors;
	books: Books;
}
