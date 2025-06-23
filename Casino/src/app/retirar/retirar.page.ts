import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../service/interaction.service';
import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.page.html',
  styleUrls: ['./retirar.page.scss'],
})
export class RetirarPage implements OnInit {
  monto: number = 0;
  saldo: number = 0;
  newSaldo = 0;
  cuentaDestinatario: string = "";
  titular!: string;
  constructor(private interaction: InteractionService,
    private firebase : FirebaseService, private router : Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.firebase.usuarioActivo().then((uid) => {
      this.firebase.saldoActual("User",String(uid)).then((campos) => {
        let saldoAct = campos['saldo'];
        let tarjeta = campos['tarjeta'];
        let cuentaDes = tarjeta['numTarjeta'];
        let titular = tarjeta['titular'];
        this.titular = String(titular);
        this.saldo = saldoAct;
        this.cuentaDestinatario = String(cuentaDes).slice(-4);;
      })
      .catch((error) => {
        console.error('error',error);
      });
      })
      .catch((error) => {
        // Aquí puedes manejar el caso de que no haya un usuario activo
        this.interaction.presentToast("No hay usuario activo")
        console.error(error);
      });
  }

  cien(){
    this.monto += 100;
  }
  
  quinientos(){
    this.monto += 500;
  }

  mil(){
    this.monto += 1000;
  }

  dosmil(){
    this.monto += 2000;
  }

  retirar(){
    if(this.monto < 100){
      this.interaction.presentToast('Monto invalido');
    }else{
      this.interaction.presentLoading('Generando transaccion...');
    this.firebase.usuarioActivo().then((uid) => {
      this.firebase.saldoActual("User",String(uid)).then((campos) => {
      // Aquí puedes utilizar los campos del documento
      let saldoAct = campos['saldo'];
      this.newSaldo = Number(saldoAct) - (this.monto + 15);
      if(this.newSaldo<0){
        this.interaction.closeLoading();
        this.interaction.presentToast('Saldo insuficiente')
        this.monto = 0;
      }else{
        this.firebase.CajeroRetirar(this.newSaldo,String(uid)).then(() => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Retiro con exito');
          this.router.navigate(['/cajero']);
        })
        .catch((error) => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Retiro sin exito');
          console.error('error',error);
        });
      }
    }).catch((error) => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Retiro sin exito');
      this.interaction.presentToast('No existe el documento');
      // Aquí puedes manejar el caso de que el documento no exista
      console.error(error);
    });
    }).catch((error) => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Retiro sin exito');
      this.interaction.presentToast('No hay usuario activo');
      // Aquí puedes manejar el caso de que no haya un usuario activo
      console.error(error);
    });
    }
  }

  
}
