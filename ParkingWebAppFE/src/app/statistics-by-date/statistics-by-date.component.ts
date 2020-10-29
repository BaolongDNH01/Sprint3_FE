import {Component, OnInit} from '@angular/core';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-statistics-by-date',
  templateUrl: './statistics-by-date.component.html',
  styleUrls: ['./statistics-by-date.component.css']
})
export class StatisticsByDateComponent implements OnInit {
  date = [['26/10', 3, 6], ['26/12', 5, 2]];
  test: string;
  i = 0;
  j: number;

  constructor() {
    for (this.i = 0; this.i < this.date.length; this.i++) {
      for (let j = 0; j <= this.i; j++) {
      }
    }
    console.log(this.i);

  }

  title = 'Company Hiring Report';
  type = 'ComboChart';
  data = [
    [this.date[0][0], this.date[0][1], this.date[0][2]]
];
  columnNames = ['Xe ra', 'Xe vao'];
  options = {
    hAxis: {
      title: 'Department'
    },
    vAxis: {
      title: 'Employee hired'
    },
    seriesType: 'bars',
    series: {2: {type: 'line'}}
  };
  width = 600;
  height = 500;

  ngOnInit(): void {
  }

}
