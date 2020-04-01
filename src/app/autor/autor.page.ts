import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.page.html',
  styleUrls: ['./autor.page.scss'],
})
export class AutorPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  notBack(){
    //this.router.navigate(['/autor']);
  }

}
