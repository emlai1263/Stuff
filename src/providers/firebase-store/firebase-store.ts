import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }

  VideoGames(){
    return this.afs.collection('/Video Games').snapshotChanges().pipe( 
      map(actions => actions.map(item => {
        const id = item.payload.doc.id;
        const data = item.payload.doc.data();
        data['id'] = id;
        return data;
      }))
    );
  }
  
  deleteGame(id){
    this.afs.doc('/Video Games/' + id).delete();
  }

  addGame(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Video Games').add({
        Title: value.Title,
        Platform: value.Platform,
      })
      .then(
        (res) => {
          resolve(res)
        },
          err => reject(err)
      )
    })
  }

  updateGame(id, data){
    this.afs.doc('/Video Games/' + id).update(data);
  }

}