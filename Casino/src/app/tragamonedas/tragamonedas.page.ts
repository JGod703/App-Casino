import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../service/interaction.service';
import { FirebaseService } from '../service/firebase.service';
import { doc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tragamonedas',
  templateUrl: './tragamonedas.page.html',
  styleUrls: ['./tragamonedas.page.scss'],
})
export class TragamonedasPage implements OnInit {

  slotImages: string[] = ['/images1.jpg', '/images2.jpg', '/images3.jpg', '/images4.jpg', '/images5.jpg', '/images6.jpg', '/images7.jpg', '/images8.jpg', '/images9.jpg', '/images10.jpg', '/images11.jpg', '/images12.jpg',];
  slot1: string = "assets/icon/tragamonedas_images/background.jpg";
  slot2: string = "assets/icon/tragamonedas_images/background.jpg";
  slot3: string = "assets/icon/tragamonedas_images/background.jpg";
  animateSlot1: boolean = false;
  animateSlot2: boolean = false;
  animateSlot3: boolean = false;
  spinning: boolean = false;
  message: String ="";
  isWinner: boolean = false;
  apuesta:number = 0;
  saldo:number = 1000;

  constructor(private interaction: InteractionService,
    private firebase: FirebaseService) {
  }

  ionViewWillEnter(){
    this.firebase.usuarioActivo().then((uid) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getFirestore(app);
      const unsub = onSnapshot(doc(db, "User", String(uid)), (doc) => {
        this.firebase.saldoActual("User",String(uid)).then((campos) => {
          let saldoAct = campos['saldo'];
          this.saldo = saldoAct;
        })
        .catch((error) => {
          console.error('error',error);
        });

      });
      })
      .catch((error) => {
        // Aquí puedes manejar el caso de que no haya un usuario activo
        this.interaction.presentToast("No hay usuario activo")
        console.error(error);
      });
  }

  spin() {
    if(this.apuesta == 0 || (this.saldo-this.apuesta)<0){
      this.interaction.presentToast("Apuesta invalida")
    }else{
    this.saldo -= this.apuesta;
    this.spinning = true;
    this.animateSlot1 = true;
    this.animateSlot2 = true;
    this.animateSlot3 = true;
    this.isWinner=false;
    this.slot1 = this.getRandomSlotImage();
    this.slot2 = this.getRandomSlotImage();
    this.slot3 = this.getRandomSlotImage();
    
    setTimeout(() => {
      this.slot1 = this.getRandomSlotImage();
    }, 500);

    setTimeout(() => {
      this.slot2 = this.getRandomSlotImage();
    }, 1000);

    setTimeout(() => {
      this.slot3 = this.getRandomSlotImage();

      this.animateSlot1 = false;
      this.animateSlot2 = false;
      this.animateSlot3 = false;

      setTimeout(() => {
        this.spinning = false;
      }, 500);
    }, 1500);
    console.log(this.slot1);
    console.log(this.slot2);
    console.log(this.slot3);
    if (this.slot1 == this.slot2 && this.slot2==this.slot3) {
      this.isWinner = true;
      this.getWinner();
    } else{
      this.getWinner();
    }
    }
  }

  getWinner() {
    setTimeout(() => {
      if(this.isWinner){
        this.message = "Felicidades, ¡ganaste!";
        this.ApuestaGanada();
        this.ionViewWillEnter();
      }else{
        this.message = "Perdiste, ¡intentalo de nuevo!";
        this.ApuestaPerdida();
        this.ionViewWillEnter();
      }
    }, 1500);
  }

  getRandomSlotImage() {
    const randomIndex = Math.floor(Math.random() * this.slotImages.length);
    console.log(randomIndex);
    return 'assets/icon/tragamonedas_images' + this.slotImages[randomIndex];
  }

  ngOnInit() {
  }

  dos(){
    this.apuesta +=2;
  }

  cinco(){
    this.apuesta +=5;
  }

  veinte(){
    this.apuesta +=20;
  }

  cincuenta(){
    this.apuesta +=50;
  }

  cancelar(){
    this.apuesta = 0;
  }

  ApuestaGanada(){
    this.firebase.usuarioActivo().then((uid) => {
    this.firebase.saldoActual("User",String(uid)).then((campos) => {
    // Aquí puedes utilizar los campos del documento
    let saldoAct = campos['saldo'];
    let newSaldo = Number(saldoAct) + (this.apuesta);
    this.firebase.ResApuesta(newSaldo,String(uid)).then(() => {
      this.interaction.presentToast('Ganaste!');
    })
    .catch((error) => {
      this.interaction.presentToast('Hubo un error');
      console.error('error',error);
    });
  })
  .catch((error) => {
    this.interaction.presentToast('No existe el documento');
    // Aquí puedes manejar el caso de que el documento no exista
    console.error(error);
  });
  })
  .catch((error) => {
    this.interaction.presentToast('No hay usuario activo');
    // Aquí puedes manejar el caso de que no haya un usuario activo
    console.error(error);
  });
  }

  ApuestaPerdida(){
      this.firebase.usuarioActivo().then((uid) => {
      this.firebase.saldoActual("User",String(uid)).then((campos) => {
      // Aquí puedes utilizar los campos del documento
      let saldoAct = campos['saldo'];
      let newSaldo = Number(saldoAct) - this.apuesta;
      this.firebase.ResApuesta(newSaldo,String(uid)).then(() => {
        this.interaction.presentToast('Perdiste!');
      })
      .catch((error) => {
        this.interaction.presentToast('Hubo un error');
        console.error('error',error);
      });
    })
    .catch((error) => {
      this.interaction.presentToast('No existe el documento');
      // Aquí puedes manejar el caso de que el documento no exista
      console.error(error);
    });
    })
    .catch((error) => {
      this.interaction.presentToast('No hay usuario activo');
      // Aquí puedes manejar el caso de que no haya un usuario activo
      console.error(error);
    });
  }

}
