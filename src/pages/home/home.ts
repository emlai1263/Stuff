import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store'
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/rx';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: Observable<any[]>;
  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseStoreProvider,public alertCtrl: AlertController) {
    this.movies = firebaseProvider.VideoGames();
  }

  addMovie(){
    let prompt = this.alertCtrl.create({
      title: 'Add Game',
      message: "Add a new game",
      inputs: [
        {
          name: 'Title',
          placeholder: 'Title'
        },
        {
          name: 'Platform',
          placeholder: 'Platform'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.firebaseProvider.addGame(data);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteGame(Title, id){
    const confirm = this.alertCtrl.create({
      title: 'Delete this game?',
      message: 'Do you really want to delete "' + Title + '"?',
      buttons: [
        {
          text: 'Cancel', 
        },
        {
          text: 'Delete',
          handler: () => {
            this.firebaseProvider.deleteGame(id); 
          }
        }
      ]
    });
    confirm.present();
  }
  
  updateGame(item){
    let prompt = this.alertCtrl.create({
      title: 'Edit game',
      message: "Edit game data",
      inputs: [
        {
          name: 'Title',
          placeholder: 'Title',
          value: item.Title
        },
        {
          name: 'Platform',  
          placeholder: 'Platform',
          value: item.Platform
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.firebaseProvider.updateGame(item.id, data);
          }
        }
      ]
    });
    prompt.present();
  }

}