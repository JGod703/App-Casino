import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service'
import { InteractionService } from '../service/interaction.service';
import { Router } from '@angular/router';
import { doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { getFirestore } from "firebase/firestore";
import { skipLast } from 'rxjs';

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.page.html',
  styleUrls: ['./depositar.page.scss'],
})
export class DepositarPage implements OnInit {
  titular!: string;
  numTarjeta!: number;
  cvv!:number;
  fechaVencimiento!: Date;
  monto!:number;

  constructor(private interaction: InteractionService,
  private router: Router, private firebase: FirebaseService) { }

  async newSaldo(){
    if(this.validaciones()){
      this.interaction.presentLoading('Generando transaccion...');
      this.firebase.usuarioActivo().then((uid) => {
      this.firebase.saldoActual("User",String(uid)).then((campos) => {
      // Aquí puedes utilizar los campos del documento
      let saldoAct = campos['saldo'];
      let newSaldo = Number(saldoAct) + this.monto;
      this.firebase.CajeroDepositar(newSaldo,this.titular,this.numTarjeta,this.cvv,this.fechaVencimiento,String(uid)).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Deposito con exito');
        this.router.navigate(['/cajero']);
      })
      .catch((error) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Deposito sin exito');
        console.error('error',error);
      });
    })
    .catch((error) => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Deposito sin exito');
      this.interaction.presentToast('No existe el documento');
      // Aquí puedes manejar el caso de que el documento no exista
      console.error(error);
    });
    })
    .catch((error) => {
      this.interaction.presentToast('Deposito sin exito');
      this.interaction.presentToast('No hay usuario activo');
      this.interaction.closeLoading();
      // Aquí puedes manejar el caso de que no haya un usuario activo
      console.error(error);
    });
    }else{
      this.interaction.presentToast("Datos invalidos");
    }

  }

  ngOnInit() {
  }

  isInvalid: boolean = false;
  validaciones(){
    let valido = true;
    if(String(this.numTarjeta).length < 16 || String(this.numTarjeta).length > 16 ){
      this.isInvalid = true;
      valido = false;
    }
    else if(String(this.cvv).length < 3 || String(this.cvv).length > 3){
      this.isInvalid = true;
      valido = false;
    }
    else if(!this.titular){
      this.isInvalid = true;
      valido = false;
    }
    return valido;
  }
}
