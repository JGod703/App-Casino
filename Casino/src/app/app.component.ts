import { Component } from '@angular/core';
import { InteractionService } from './service/interaction.service';
import { FirebaseService } from './service/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'reorder-four' },
    { title: 'Casino', url: '/casino', icon: 'diamond' },
    { title: 'Deportes', url: '/deportes', icon: 'football' },
    { title: 'Cuenta', url: '/captura-datos', icon: 'finger-print' },
    { title: 'Cajero', url: '/cajero', icon: 'card' },
    { title: 'Logout', url: '/logout', icon: 'log-out' }

  ];

  constructor(private interaction: InteractionService,
    private firebase: FirebaseService) {
  }
  username!:string;
  saldo!:number;
  
  onMenuOpen(){
    this.firebase.usuarioActivo().then((uid) => {
      this.firebase.saldoActual("User",String(uid)).then((campos) => {
        let saldoAct = campos['saldo'];
        let username = campos['username'];
        this.username = String(username);
        this.saldo = Number(saldoAct);
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
}
