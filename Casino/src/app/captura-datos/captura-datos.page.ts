import { Component } from '@angular/core';
import { InteractionService } from '../service/interaction.service';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-captura-datos',
  templateUrl: './captura-datos.page.html',
  styleUrls: ['./captura-datos.page.scss'],
})
export class CapturaDatosPage {
  nombre!: string;
  telefono!: string;
  correo!: string;
  rfc!: string;
  edad!: string;

  constructor(private interaction: InteractionService,
    private firebase: FirebaseService) {}

    ionViewWillEnter(){
      this.firebase.usuarioActivo().then((uid) => {
        this.firebase.saldoActual("User",String(uid)).then((campos) => {
          this.nombre = String(campos['nombre']);
          this.telefono = String(campos['telefono']);
          this.correo = String(campos['email']);
          this.rfc = String(campos['rfc']);
          this.edad = String(campos['edad']);
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

    cerrarSesion(){
      this.firebase.cerrarSesion();
    }

    restablecerContra(){
      this.firebase.usuarioActivo().then((uid) => {
        this.firebase.saldoActual("User",String(uid)).then((campos) => {
          this.firebase.restablecerContra(String(campos['email']));
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

    verificarCuenta(){
      this.firebase.correoVerificacion();
    }
}