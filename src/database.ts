export type Author = {
    id: number;
    name: string;
};

export type Book = {
    id: number;
    title: string;
    author_id: number;
};

const authors: Author[] = [
    {
        id: 1,
        name: "F. Scott Fitzgerald",
    },
    {
        id: 2,
        name: "J.D. Salinger",
    },
];

const books: Book[] = [
    {
        id: 1,
        title: "The Great Gatsby",
        author_id: 1,
    },
    {
        id: 2,
        title: "The Catcher in the Rye",
        author_id: 2,
    },
];

export function getAuthors(): Author[] {
    return authors;
}

export function getAuthorById(id: number): Author | null {
    const author = authors.find((author) => author.id === id);
    return author ?? null;
}

export function getBooks(): Book[] {
    return books;
}

export function getBookById(id: number): Book | null {
    const book = books.find((book) => book.id === id);
    return book ?? null;
}

export function getBooksByAuthorId(id: number): Book[] {
    return books.filter((book) => book.author_id === id);
}
