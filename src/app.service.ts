import { Injectable } from '@nestjs/common';
import { Book, books } from './FakeDatabase';

@Injectable()
export class BooksService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  getAllBooks(): Book[] {
    return books;
  }
  findById(bookId: number): Book | undefined {
    return books.find((book) => book.id === bookId);
  }
  createBook(book: Partial<Book>): Book {
    const newId = books[books.length - 1].id + 1;

    const newBook: Book = {
      id: newId,
      author: book.author ?? '',
      title: book.title ?? '',
      publicationYear: book.publicationYear ?? 0,
    };

    books.push(newBook);

    return newBook;
  }
  updateBook(
    bookId: number,
    updateBookFields: Partial<Book>,
  ): Book | undefined {
    const currentBook = books.find((book) => book.id === bookId);
    const updatedBook = {
      id: bookId,
      title: updateBookFields.title ?? currentBook.title,
      author: updateBookFields.author ?? currentBook.author,
      publicationYear:
        updateBookFields.publicationYear ?? currentBook.publicationYear,
    };

    books[bookId - 1] = updatedBook;

    return updatedBook;
  }
  deleteBook(bookId: number) {
    books.splice(bookId - 1, 1);
    return books;
  }
}
