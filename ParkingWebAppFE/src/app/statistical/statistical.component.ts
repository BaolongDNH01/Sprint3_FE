import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {CustomerService} from '../customer/customer.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})

export class StatisticalComponent implements OnInit {
  PieChart = [];
  a = 22;
  countCustomer: number;
  countCar: number

  constructor(
    private customerService: CustomerService
  ) {
  }

  findAllCustomer(): void {
    this.customerService.findAll().subscribe(
      list => {
        this.countCustomer = list.length;
      }
    );
  }

  ngOnInit(): void {
    this.findAllCustomer();
    // @ts-ignore
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Blue', 'Green', 'Pink'],
        datasets: [{
          label: 'Vote Now',
          data: [101, this.a, 103],
          backgroundColor: [
            'rgba(40,23,244,0.9)',
            'rgba(192,255,0,0.9)',
            'rgba(239,23,240,0.9)',
          ],
        }]
      },
      options: {
        title: {
          text: 'Bar Chart',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
