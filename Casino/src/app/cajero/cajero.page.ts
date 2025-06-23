import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service'
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-cajero',
  templateUrl: './cajero.page.html',
  styleUrls: ['./cajero.page.scss'],
})
export class CajeroPage implements OnInit {
  saldo: number = 0;
  saldoVisible: boolean = false;
  constructor(private router:Router,
    private firebase: FirebaseService, private interaction: InteractionService) { }

  ngOnInit() {
    

  }

  ionViewWillEnter(){
    this.firebase.usuarioActivo().then((uid) => {
      this.firebase.saldoActual("User",String(uid)).then((campos) => {
        let saldoAct = campos['saldo'];
        this.saldo = saldoAct;
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
  
  toggleSaldo() {
    this.saldoVisible = !this.saldoVisible;
  }

  mostrarSaldo() {
    return this.saldo.toString();
  }

  ocultarSaldo() {
    return '*'.repeat(this.saldo.toString().length);
  }
}
