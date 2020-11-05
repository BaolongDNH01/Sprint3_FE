import {Component, OnInit} from '@angular/core';
import {FormControl, FormControlName, FormGroup} from '@angular/forms';
import {StatisticService} from './statistic/statistic.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-statistics-by-date',
  templateUrl: './statistics-by-date.component.html',
  styleUrls: ['./statistics-by-date.component.css']
})
export class StatisticsByDateComponent implements OnInit {
  lengthTotalDate = 0;
  lengthArray2d = 0;
  arrDataClone = [[]];

  constructor(
    private statisticService: StatisticService,
    private routes: Router
  ) {
  }

  date = [['26/10', 3, 6], ['27/12', 5, 2]];

  checkDate: any;
  dateTotal = [];
  title: string;
  type: string;
  data = [[]];
  columnNames = [];
  width = 600;
  height = 500;
  options: any;

  ngOnInit(): void {
    this.checkDate = new FormGroup({
      dateStart: new FormControl(''),
      dateEnd: new FormControl('')
    });
  }

  canvas(): void {
    this.title = 'Bao cáo kết quả';
    this.type = 'ComboChart';
    this.data = this.arrDataClone;
    this.columnNames = ['Xe ra', 'Xe vao'];
    this.options = {
      hAxis: {
        title: 'Tổng số xe ra, xe vào theo ngày'
      },
      vAxis: {
        title: ''
      },
      seriesType: 'bars',
      series: {2: {type: 'line'}}
    };
    this.width = 600;
    this.height = 500;
  }


  onSubmit(): void {

    this.statisticService.getAllCarByDateInDateOut(this.checkDate.value.dateStart, this.checkDate.value.dateEnd).subscribe(
      list => {
        console.log(list);
        this.dateTotal = list;
        for (let i = 0; i < this.dateTotal.length; i++) {
          console.log(i);
          this.dateTotal[i][0] = this.dateTotal[i][0].slice(0, 10);
          this.dateTotal[i][1] = parseInt(this.dateTotal[i][1]);
          this.dateTotal[i][2] = parseInt(this.dateTotal[i][2]);
        }
      }, error => {
      },
      () => {
        this.arrDataClone = this.dateTotal;
        this.canvas();
      }
    );

  }

  exit(): void {
    this.routes.navigateByUrl('/');
  }
}
