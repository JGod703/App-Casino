import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { User } from '../interface/user'
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged, sendEmailVerification,sendPasswordResetEmail} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { InteractionService } from './interaction.service';
import { onSnapshot } from "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  uid:string="";
  constructor(private interaction : InteractionService,private afAuth: AngularFireAuth,
    private router: Router) { 
    
  }

  async registrarUsuario(username:string,nombre: string,telefono: string, rfc: string,edad: number, email: string, password: string,uid:string){
  const app = initializeApp(environment.firebaseConfig);
  const db = getFirestore(app);
  const path = 'User/';
    const newUser: User = {
      username: username,
      nombre: nombre,
      telefono: telefono,
      rfc: rfc,
      edad: edad,
      email: email,
      password: password,
      saldo: 0
    };
    const docRef = await setDoc(doc(db, "User", uid), newUser);
  }

  usuarioActivo(){
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid);
        } else {
          reject(new Error('No hay usuario activo'));
        }
      });
    });
  }

    async saldoActual(coleccion:string, documentoId:string) {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const documentoRef = doc(db, coleccion, documentoId);
    const documentoSnap = await getDoc(documentoRef);
  
    if (documentoSnap.exists()) {
      const campos = documentoSnap.data();
      return campos;
    } else {
      throw new Error('El documento no existe');
    }
  }

  

  async CajeroDepositar(newSaldo: Number,titular:string,numTarjeta:number,cvv:number,FechaCad:Date,uid: string){
    const tarjeta = {
      titular: titular,
      numTarjeta: numTarjeta,
      cvv: cvv,
      FechaCad: FechaCad
    }
  const app = initializeApp(environment.firebaseConfig);
  const db = getFirestore(app);
  const user = doc(db, "User", uid);
  await updateDoc(user, {
  saldo: newSaldo,
  tarjeta: tarjeta
  });
  }

  async CajeroRetirar(newSaldo: Number, uid: string){
  const app = initializeApp(environment.firebaseConfig);
  const db = getFirestore(app);
  const user = doc(db, "User", uid);
  await updateDoc(user, {
  saldo: newSaldo
  });
  }

  async ResApuesta(newSaldo: number,uid: string){
  const app = initializeApp(environment.firebaseConfig);
  const db = getFirestore(app);
  const user = doc(db, "User", uid);
  await updateDoc(user, {
  saldo: newSaldo,
  });
  }

  apuestasTM(){

  }

  async ActualizarSaldo(uid:string){
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const unsub = await onSnapshot(doc(db, "cities", "SF"), (doc) => {
      console.log("Current data: ", doc.data());
  });
  }

  cerrarSesion() {
    this.afAuth.signOut()
      .then(() => {
        // Redireccionar a la página de inicio de sesión o a la página deseada después de cerrar sesión
        this.interaction.presentToast('Sesion cerrada con exito');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.interaction.presentToast('No hay usuario activo');
      });
  }

  correoVerificacion(){
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          // Email verification sent!
          // ...
          this.interaction.presentToast('Correo enviado a la direccion de correo asoiciada a esta cuenta');
        })
        .catch((error) => {
          // Handle error
          this.interaction.presentToast('Correo no enviado');
        });
    } else {
      // No user authenticated
      this.interaction.presentToast('No hay usuario activo');
    }
  }

  async restablecerContra(correo:string){
    const auth = getAuth();
  await sendPasswordResetEmail(auth, correo)
  .then(() => {
    // Password reset email sent!
    // ..
    this.interaction.presentToast('Correo enviado a la direccion de correo asoiciada a esta cuenta');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    this.interaction.presentToast('Correo no enviado');
  });
  }

}
