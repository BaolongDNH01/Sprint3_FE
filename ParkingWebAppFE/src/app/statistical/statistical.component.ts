import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {CustomerService} from '../customer/customer.service';
import {CarService} from '../car/car.service';
import {TicketService} from '../ticket/services/ticket.service';
import {Car} from '../car/car';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})

export class StatisticalComponent implements OnInit {
  PieChart = [];
  a = 22;
  countCustomer: number;
  countCar: number;
  countTicket: number;
  carList: Car[];
  typeCar = [];
  color = [];
  countTypeCar = [];
  countTypeCar1: number;

  constructor(
    private customerService: CustomerService,
    private ticketService: TicketService,
    private carService: CarService
  ) {
  }

  ngOnInit(): void {
    this.findAllCustomer();
    this.findAllTicket();
    this.findAllCar();
    console.log(this.typeCar);
    console.log(this.countTypeCar);
  }

  findAllCustomer(): void {
    this.customerService.findAll().subscribe(
      list => {
        this.countCustomer = list.length;
      }
    );
  }

  findAllTicket(): void {
    this.ticketService.getAllTicket().subscribe(
      list => {
        this.countTicket = list.length;
      }
    );
  }

  findAllCar(): void {
    this.carService.findAllCar().subscribe(
      list => {
        this.countCar = list.length;
        this.carList = list;

        for (let i = 0; i < this.carList.length; i++) {
          if (this.typeCar.includes(list[i].type)) {
          } else {
            this.typeCar.push(list[i].type);
            this.carService.findAllCarByType(list[i].type).subscribe(
              carByType => {
                console.log(carByType.length);
                this.countTypeCar.push(carByType.length);
              }, error => {

              },
              () => {
              // @ts-ignore
                this.PieChart = new Chart('pieChart', {
                  type: 'pie',
                  data: {
                    labels: this.typeCar,
                    datasets: [{
                      label: 'Vote Now',
                      data: this.countTypeCar,
                      backgroundColor: this.color,
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
            );
          }

          this.color.push(this.getRandomColor());
        }


      }, error => {

      }, () => {
        console.log(this.countTypeCar);

      }
    );
  }


  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
