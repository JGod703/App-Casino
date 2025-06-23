import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interface/user'
import { InteractionService } from '../service/interaction.service';
import { FirebaseService } from '../service/firebase.service'
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  username: string = "";
  nombre: string = "";
  telefono: string = ""
  rfc: string= "";
  edad!: string;
  correo: string= "";
  password: string= "";
  showPassword: boolean = false;
  
  ionViewWillEnter(){
    this.username = "";
    this.nombre = "";
    this.telefono = "";
    this.rfc = "";
    this.edad= "";
    this.correo = "";
    this.password = "";
  }
  
  constructor(private interaction: InteractionService,
    private firebase: FirebaseService, private router: Router) {
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  
  registrar(){
    if(this.validaciones()){
    this.interaction.presentLoading('Registrando...');
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.correo, this.password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('uid = ',user.uid);
    const UID = String(user.uid);
    const user2 = this.firebase.registrarUsuario(this.username,this.nombre,this.telefono,this.rfc,Number(this.edad),this.correo,this.password,UID).then((user2) => {
      // Signed in
      this.interaction.closeLoading();
      this.interaction.presentToast('Registro con exito');
      this.router.navigate(['/login']);

      // ...
    }).catch((error) => {
      this.interaction.closeLoading();
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error',error);
      this.interaction.closeLoading();
      this.interaction.presentToast('Datos invalidos');
    });
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log('error',error);
    this.interaction.closeLoading();
    this.interaction.presentToast('Algo salio mal con el correo');
    });
    }else{
      
    }
  }

  ngOnInit() {
  }

  validaciones(){
    let valido = true;
    if(String(this.telefono).length < 10 || String(this.telefono).length > 10){
      valido = false;
      this.interaction.presentToast('Telefono incorrecto');
    }
    if(Number(this.edad) < 18){
      valido = false;
      this.interaction.presentToast('Edad invalida');
    }
    if(!this.username){
      this.interaction.presentToast('Datos incompletos');
      valido = false;
    }
    if(!this.nombre){
      this.interaction.presentToast('Datos incompletos');
      valido = false;
    }
    if(!this.rfc){
      this.interaction.presentToast('Datos incompletos');
      valido = false;
    }
    return valido;
  }
}
