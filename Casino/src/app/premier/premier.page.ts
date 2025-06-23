import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';


@Component({
  selector: 'app-premier',
  templateUrl: './premier.page.html',
  styleUrls: ['./premier.page.scss'],
})
export class PremierPage implements OnInit {

  constructor(private router:Router) { }
mx(){
      this.router.navigate(['/deportes'])
    }
     pl(){
      this.router.navigate(['/premier'])
    }
     bu(){
      this.router.navigate(['/bundesliga'])
    }
     sa(){
      this.router.navigate(['/serie'])
    }
     nb(){
      this.router.navigate(['/nba'])
    }
  ngOnInit() {
  }

}
