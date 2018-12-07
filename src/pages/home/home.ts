import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth'
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Games: Observable<any[]>;
  currentGame: firebase.firestore.DocumentSnapshot
  scores: any;
  enterscore: any;
  currentscore1: any;
  currentscore2: any;
  constructor(public navCtrl: NavController, public auth: FirebaseAuthProvider, public alertCtrl : AlertController, public database: FirebaseDataProvider) {
    this.currentGame=null;
    this.scores=[]
    // this.currentscore1: null;
    this.Games=database.listGames();
    console.log(this.auth.user);
  }

  login(){
      this.navCtrl.push("LoginPage");
  }
  
  logout(){
    this.auth.signOut();
  }
  CreateGame(){
    let prompt = this.alertCtrl.create({ 
      title: 'Create Game',
      inputs: [{
        name: 'name'
      }],
      buttons:[{                         
        text: "Cancel"
      },
      {
        text: "Add",
        handler: data => {
          console.log(data)
          this.database.CreateGame(this.auth.getUID(),data)
       }
      }
      ]
    });
  prompt.present();
  }
     JoinGame(gameid){  
       this.database.getGame(gameid).then(
         game => {
          let prompt = this.alertCtrl.create({ 
            title: 'Join Game',
            inputs: [{
              name: 'name',
              placeholder: "Player Name"
            }],
            buttons:[{                         
              text: "Cancel"
            },
            {
              text: "Join",
              handler: data => {
                this.currentGame=game;
              }
            }
            ]
          });
        
          prompt.present();                    
           
         }
       )
     }
LeaveGame(){this.currentGame=null}

Enterscore(score){
this.enterscore=score;
}

recordscore(){

this.scores.push(this.enterscore)
this.enterscore = null
}
}