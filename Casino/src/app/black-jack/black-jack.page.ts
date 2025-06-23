import { Component, OnInit } from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { InteractionService } from '../service/interaction.service';
import { FirebaseService } from '../service/firebase.service';
import { doc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.page.html',
  styleUrls: ['./black-jack.page.scss'],
  
})
export class BlackJackPage implements OnInit {
  playerCards: string[] = [];
  dealerCards: string[] = [];
  hiddenCard!: string;
  playerScore: number = 0;
  dealerScore: number = 0;
  Score!: string;
  As: string = "";
  AsN: number = 11;
  playerAceCount: number = 0;
  resultado: string = "";
  gameOver:boolean=false;
  SeguroNoCount:number = 0;
  playing: boolean = false;
  apuesta:number = 0;
  saldo:number = 0;
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

  dealCards(){
    let controlAp = 0;
    controlAp = this.saldo-this.apuesta;
    console.log('controlap=',controlAp);
    if(this.apuesta < 10 || controlAp < 0){
      this.interaction.presentToast('Apuesta invalida');
    }else{
      this.saldo -= this.apuesta;
      this.gameOver = false;
      this.playing = true;
      this.resultado = "";
      const myButton = document.getElementById("seguro") as HTMLButtonElement;
        myButton.style.display = "none"; // Muestra el boton
        const myButton2 = document.getElementById("seguro2") as HTMLButtonElement;
        myButton2.style.display = "none"; // Muestra el boton
      this.playerCards = [];
      this.dealerCards = [];
      this.playerCards.push(this.generateCard());
      this.playerCards.push(this.generateCard());
      this.dealerCards.push(this.generateCard());
      this.hiddenCard=this.generateCard(); // Generar una carta aleatoria y asignarla a la hiddenCard
      this.dealerCards.push('assets/icon/cards/BACK.png');
      this.playerScore = this.calculateScore(this.playerCards);
      
      this.Score=this.dealerCards[0].slice(18,19);//obtiene el valor de la carta
      console.log('value=',this.Score);
      if (isNaN(Number(this.Score))){// si la carta no es numérica, tiene valor de 10
        if(this.Score!='A'){
          this.dealerScore=10;
        }else{
          this.dealerScore=0;
          this.As="1/11";
        }
          
      }else{
        if(Number(this.Score)==1){//si el valor es 1, el valor real es 10
          this.dealerScore=10;
        }else{
          this.dealerScore=Number(this.Score);
        }
      }
    }
  }

  generateCard(): string {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['C', 'D', 'H', 'S'];
    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return `assets/icon/cards/${value}-${suit}.png`;
  }

  hit() {
    if(this.gameOver){
      this.interaction.presentToast('La partida acabo, haga sus apuestas de nuevo');
    }else{
      if(this.playerScore>=21){
      
      }else{
      this.playerCards.push(this.generateCard());
      this.playerScore = this.calculateScore(this.playerCards);
      }
  }
  }

  stand(){
    if(this.gameOver){
      this.interaction.presentToast('La partida acabo, haga sus apuestas de nuevo');
    }else{
    this.As="";
    this.dealerCards.splice(1, 1, this.hiddenCard);
    this.dealerScore = this.calculateScore(this.dealerCards);
    while (this.dealerScore < 17) { // Continuar el juego hasta que la puntuación del dealer sea mayor o igual a 17
      this.dealerCards.push(this.generateCard());
      this.dealerScore = this.calculateScore(this.dealerCards);
    }
    const playerScore = this.calculateScore(this.playerCards);
    if (playerScore > 21 || (this.dealerScore <= 21 && this.dealerScore > playerScore)) {
      this.resultado = 'Perdiste';
      this.playing = false;
      this.gameOver=true;
      this.ApuestaPerdida();
      this.ionViewWillEnter();
    } else if (this.dealerScore > 21 || playerScore > this.dealerScore) {
      this.resultado = 'Ganaste!';
      this.playing = false;
      this.gameOver=true;
      this.ApuestaGanada();
      this.ionViewWillEnter();
    } else {
      this.resultado = 'Empate!';
      this.playing = false;
      this.gameOver=true;
      this.interaction.presentToast('Empate!');
      this.ionViewWillEnter();
    }
    } 
  }

  calculateScore(cards: string[]): number {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cards.length; i++) {
      const value = cards[i].slice(18, 19); // obtener el valor de la carta
      console.log('value=',value);
      if (isNaN(Number(value))) { // si la carta no es numérica, tiene valor de 10
        if (value=='A') { // si hay un As, marcarlo para ajustar su valor luego
          this.playerAceCount+=1;
          console.log('Aces',this.playerAceCount);
          score+=11;//El valor default de la A es 11
        }else{
          score+=10;//Si la letra es diferente de A, Suma 10
        }
      } else {
        if(Number(value)==1){
          score+=10; //Si el valor es 1, suma 10
        }else{
          score += Number(value);//Cualquier otro numero lo suma tal cual
        }
      }
      console.log('suma antes del while=',score);
      console.log('lugar',i,'valor',cards[i].slice(18, 19));
      while (score > 21 && cards[i].slice(18, 19)=='A' && this.playerAceCount>0) { //si la suma es mayor de 21 y la carta anterior es una A le resta 10, es decir la A vale 1
        console.log('hola');
        score -= 10;
        this.playerAceCount -= 1;
      }
      while (score > 21 && cards[i-1].slice(18, 19)=='A' && this.playerAceCount>0) { //si la suma es mayor de 21 y la carta anterior es una A le resta 10, es decir la A vale 1
        console.log('hola');
        score -= 10;
        this.playerAceCount -= 1;
      }
      while (i<=2 && score > 21 && cards[i-2].slice(18, 19)=='A' && this.playerAceCount>0) { //si la suma es mayor de 21 y la carta anterior es una A le resta 10, es decir la A vale 1
        console.log('hola');
        score -= 10;
        this.playerAceCount -= 1;
      }
    }
    console.log('suma=',score);
    return score;
  }

  seguro(){
    if(this.dealerCards[0].slice(18,19)=='A'){
      const myButton = document.getElementById("seguro") as HTMLButtonElement;
      myButton.style.display = "initial"; // Muestra el boton
      const myButton2 = document.getElementById("seguro2") as HTMLButtonElement;
      myButton2.style.display = "initial"; // Muestra el boton
    }else{
      this.interaction.presentToast('No es posible activar el seguro');
    }
  }


  SeguroSi(){
    this.dealerCards.splice(1, 1, this.hiddenCard);
    if(this.calculateScore(this.dealerCards)==21){
      this.dealerScore = this.calculateScore(this.dealerCards);
      this.resultado="Ganaste";
      this.apuesta += this.apuesta*2;
      this.playing = false;
      this.gameOver=true;
      this.ApuestaGanada();
    }else{
      this.dealerCards.splice(1, 1, 'assets/icon/cards/BACK.png');
      this.resultado="Sigue el juego";
      this.apuesta += this.apuesta/2;
    }
  
  }

  SeguroNo(){
      this.dealerCards.splice(1, 1, this.hiddenCard);
      if(this.calculateScore(this.dealerCards)!=21){
        this.dealerCards.splice(1, 1, 'assets/icon/cards/BACK.png');
        this.resultado="Sigue el juego"
        //sigue el juego
      }else{
        this.resultado="Perdiste"
        this.playing = false;
        this.gameOver=true;
        this.ApuestaPerdida();
      }
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


  diez(){
    this.apuesta += 10;
  }

  veinte(){
    this.apuesta += 20;
  }

  cien(){
    this.apuesta += 100;
  }

  quinientos(){
    this.apuesta += 500;
  }

  cancelar(){
    this.apuesta = 0;
  }


  ngOnInit() {
  }

}