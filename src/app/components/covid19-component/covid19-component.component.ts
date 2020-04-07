import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-covid19-component',
  templateUrl: './covid19-component.component.html',
  styleUrls: ['./covid19-component.component.scss'],
})
export class Covid19ComponentComponent implements OnInit {

  @Input()
  countries:any[]=[];

  constructor() { }

  ngOnInit() {}

}
