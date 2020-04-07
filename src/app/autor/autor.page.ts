import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-autor',
    templateUrl: './autor.page.html',
    styleUrls: ['./autor.page.scss']
})
export class AutorPage implements OnInit {

    isPhone:Boolean=false;

    constructor() { }

  ngOnInit() {
    
  }

  notBack(){
    //this.router.navigate(['/autor']);
  }

}
