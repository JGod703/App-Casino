import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  showPassword: boolean = false;
  constructor(private router : Router,
    private interaction: InteractionService) { }
  
  credenciales = {
    email:"",
    password:""
  }
  ngOnInit() {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(){
  this.interaction.presentLoading('Iniciado sesion...');
  const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth();
  signInWithEmailAndPassword(auth,this.credenciales.email, this.credenciales.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('tasbien',user);
      this.interaction.closeLoading();
      this.interaction.presentToast('Sesion iniciada con exito');
      this.router.navigate(['/inicio']);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.interaction.closeLoading();
      this.interaction.presentToast('Credenciales invalidas');
    });
  }
}
