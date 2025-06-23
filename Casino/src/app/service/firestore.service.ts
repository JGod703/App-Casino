import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }
  
  createDoc<tipo>(data: tipo, enlace: string){
    const userCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(enlace);
    return userCollection.add(data);
  }

  createIdDoc(){
    return this.firestore.createId();
  }
}
