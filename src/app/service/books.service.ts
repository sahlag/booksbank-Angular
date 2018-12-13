import { Injectable } from '@angular/core';
import { Book } from '../Models/books.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
   }

  // emmetre la liste des  livre dans le subject

  emitBooks() {
    this.booksSubject.next(this.books);

  }

  // enregistrer la liste dans la base de données

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
      }

  // récuperer la liste des livres

  getBooks() {
    firebase.database().ref('/books')
    .on('value', (data) => {
      this.books = data.val() ?  data.val() : [];
      this.emitBooks();
    });
  }
  // récuperer un seul livre

  getsingelBook(id: number) {
      return new  Promise(
        (resolve, reject) => {
          firebase.database().ref('/books/' + id).once('value').then(
            (data) => {
              resolve(data.val());
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
  }

  // création d'un livre

  createNewBook(newBook: Book) {
     this.books.push(newBook);
     this.saveBooks();
     this.emitBooks();
  }

  // suprimer un livre

  removeBook(book: Book) {

    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }

    const bookIndexToRemove = this.books.findIndex(
      (bookE1) => {
        if (bookE1 === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  // uploader un photo

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
}
}
