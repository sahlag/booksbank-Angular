import { Injectable } from '@angular/core';
import * as firebase from 'firebase';




@Injectable()
export class AuthService {

  constructor() { }

// creation d'un nouvel utilisateur

  createNewUser(email: string, password: string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // Connextion d'un utilisateur existant

  signInUser(email: string, password: string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
            (error) => {
             reject(error);
          }
        );
      }
    );
  }

  // Déconnextion

  signOutUser() {
    firebase.auth().signOut();
  }
}
