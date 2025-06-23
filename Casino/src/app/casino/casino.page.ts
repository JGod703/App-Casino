import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.page.html',
  styleUrls: ['./casino.page.scss'],
})
export class CasinoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  bj(){
    this.router.navigate(['/black-jack']);
  }

  tm(){
    this.router.navigate(['/tragamonedas']);
  }

}
