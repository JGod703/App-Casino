import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.firebase.cerrarSesion();
  }
}
