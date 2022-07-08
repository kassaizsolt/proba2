import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Email } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  collectionName = "Emails"

  constructor(private afs: AngularFirestore){}

  create(email: Email){
    email.id = this.afs.createId();
    return this.afs.collection<Email>(this.collectionName).doc(email.id).set(email);
  }

}
