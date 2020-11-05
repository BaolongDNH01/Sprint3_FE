import {Component, OnInit} from '@angular/core';
import {FormControl, FormControlName, FormGroup} from '@angular/forms';
import {StatisticService} from './statistic/statistic.service';


@Component({
  selector: 'app-statistics-by-date',
  templateUrl: './statistics-by-date.component.html',
  styleUrls: ['./statistics-by-date.component.css']
})
export class StatisticsByDateComponent implements OnInit {
  lengthTotalDate = 0;

  constructor(
    private statisticService: StatisticService
  ) {
    for (this.i = 0; this.i < this.date.length; this.i++) {
      for (let j = 0; j <= this.i; j++) {
      }
    }
    console.log(this.i);

  }

  date = [['26/10', 3, 6], ['27/12', 5, 2]];
  test = [[this.date[0][0], this.date[0][1], this.date[0][2]], [this.date[1][0], this.date[1][1], this.date[1][2]]];
  i = 0;
  j: number;
  title = 'Company Hiring Report';
  type = 'ComboChart';
  data = this.test;
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
  checkDate: any;
  checkDateIn = [];
  checkDateOut = [];
  dateTotal = [];
  array2d = [[]];

  ngOnInit(): void {
    this.checkDate = new FormGroup({
      dateStart: new FormControl(''),
      dateEnd: new FormControl('')
    });
  }


  onSubmit(): void {
    this.statisticService.getAllCarByDateIn(this.checkDate.value.dateStart, this.checkDate.value.dateEnd).subscribe(
      list => {
        console.log(list);
        for (let k = 0; k < list.length; k++) {
          this.dateTotal.push(list[k][1].slice(0, 10));
        }
      }, error => {
      },
      () => {
        this.statisticService.getAllCarByDateOut(this.checkDate.value.dateStart, this.checkDate.value.dateEnd).subscribe(
          list => {
            console.log(list);
            for (let k = 0; k < list.length; k++) {
              if (this.dateTotal.includes(list[k][1].slice(0, 10))) {
              } else {
                this.dateTotal.push(list[k][1].slice(0, 10));
              }
            }
            console.log(this.dateTotal);
          }, error => {
          },
          () => {
            this.createArray2D();
          }
        );
      }
    );

  }

  createArray2D(): void {
    this.statisticService.getAllCarByDateIn(this.checkDate.value.dateStart, this.checkDate.value.dateEnd).subscribe(
      list => {
        this.lengthTotalDate = this.dateTotal.length;
        console.log(this.dateTotal.length);
        for (let k = 0; k < this.lengthTotalDate; k++) {
          if (k < list.length && this.dateTotal.includes(list[k][1].slice(0, 10)) && list[k][1] != null) {
            this.dateTotal.splice(this.dateTotal.indexOf(list[k][1].slice(0, 10)) + 1, 0, list[k][0]);
          } else {
            console.log(k);
            console.log(this.dateTotal.indexOf(list[this.dateTotal.length].slice(0, 10)));
            // this.dateTotal.splice(this.dateTotal.indexOf(list[this.dateTotal.length - 1].slice(0, 10)), 0, 0);
            // console.log(this.dateTotal.indexOf(list[this.dateTotal.length][1].slice(0, 10)));
          }
        }
        console.log(this.dateTotal);
        console.log(this.dateTotal.length);
      }, error => {
      },
      () => {

      }
    );
  }

}
