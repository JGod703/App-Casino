import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../service/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detallespago',
  templateUrl: './detallespago.page.html',
  styleUrls: ['./detallespago.page.scss'],
})
export class DetallespagoPage implements OnInit {
  correo:string = "";
  mensaje:string = "";
  constructor(private interaction: InteractionService,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.correo = "";
    this.mensaje = "";
  }
  
  enviar(){
    let valido = true;
    if(!this.correo){
      valido = false;
    }
    if(!this.mensaje){
      valido = false;
    }
    if(valido){
      this.interaction.presentToast('Mensaje enviado, pronto nos contactaremos con usted');
      this.router.navigate(['/login']);
    }else{
      this.interaction.presentToast('Datos invalidos');
    }
    
  }
}
