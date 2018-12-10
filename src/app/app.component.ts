import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {

    const config = {
      apiKey: 'AIzaSyAzir0PiQ4NMPnQEizCPePSybACItrlCGY',
      authDomain: 'booksbank-f7d06.firebaseapp.com',
      databaseURL: 'https://booksbank-f7d06.firebaseio.com',
      projectId: 'booksbank-f7d06',
      storageBucket: '',
      messagingSenderId: '160126415127'
    };
    firebase.initializeApp(config);
  }
}
