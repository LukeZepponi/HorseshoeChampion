import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'
/*
  Generated class for the FirebaseDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDataProvider {

  constructor(private readonly afs: AngularFirestore) {
    console.log('Hello FirebaseDataProvider Provider');
  }
  CreateGame(user, data){
    console.log(data)
    console.log(user)
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Games').add({
        name: data.name,
        player1: user,
        state: "new"
      }).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
      })
    }
    listGames(  ){
      
      return this.afs.collection('/Games', ref => ref.where("state", "==", "new")
      ).snapshotChanges().map(actions => {
        return actions.map( item=> {
          const id = item.payload.doc.id;
            const data = item.payload.doc.data();
            data['id'] = id;
            return data;
        });
      });
    }
    getGame(GameId) : Promise<firebase.firestore.DocumentSnapshot>{
       var game = this.afs.firestore.doc('/Games/' + GameId).get().then(
         doc => {

           return doc;
         }      
       )
       return game;
     }
}


