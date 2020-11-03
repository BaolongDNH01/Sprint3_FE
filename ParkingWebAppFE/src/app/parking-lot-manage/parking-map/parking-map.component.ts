import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ParkingLotService} from '../service/parking-lot.service';
import {ParkingLot} from '../entity/parking-lot';
import {Floor} from '../entity/floor';
import {Zone} from '../entity/zone';

@Component({
  selector: 'app-parking-map',
  templateUrl: './parking-map.component.html',
  styleUrls: ['./parking-map.component.css']
})
export class ParkingMapComponent implements OnInit {

  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private view;
  private parkingLotList: ParkingLot[] = [];
  private zoneInFloor: Zone[] = [];
  private parkingLotsEachZone: ParkingLot[] = [];
  private floorList: Floor[] = [];
  private contentSize = 50;
  private outlineSize = 40;
  private centerSize = 20;
  private parSizeW = 120;
  private parSizeH = 60;
  scrWidth: number;
  zoneName: string;

  constructor(private parkingLotService: ParkingLotService) {
  }

  ngOnInit(): void {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
    this.scrWidth = window.innerWidth * 67 / 100;

    this.parkingLotService.getAllFloor().subscribe(
      list => this.floorList = list,
      e => console.log(e)
    );

    // lấy tất cả chỗ đậu xe
    this.parkingLotService.getAllParkingLot().subscribe(
      list => {
        this.parkingLotList = list;
      },
      e => console.log(e),
      () => {
        this.prepare(1);
      }
    );
  }

  prepare(floor: number): void {
    //  ve nen
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.view = this.ctx.canvas;
    this.ctx.clearRect(0, 0, this.view.width, this.view.height);
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(0, 0, this.view.width, this.view.height);

    // lấy zone theo tầng
    this.parkingLotService.getAllZoneByFloor(floor).subscribe(
      list => {
        this.zoneInFloor = list;
      },
      e => console.log(e),
      () => {
        this.getParkingLotByZone();
      }
    );
  }

  private getParkingLotByZone(): void {
    // lấy chỗ đổ từng zone rồi gọi vẽ
    this.zoneInFloor.forEach(zone => {
      this.parkingLotsEachZone = this.parkingLotList.filter(par => {
        if (par.idZone === zone.id) {
          return par;
        }
      });

      //  kiểm tra tên khu
      zone.name = zone.name.trim();
      if (zone.name.charAt(0).toLowerCase() === 'k'
        && zone.name.charAt(1).toLowerCase() === 'h'
        && zone.name.charAt(2).toLowerCase() === 'u'
        && zone.name.charAt(3) === ' ') {
        for (let i = 4; i < zone.name.length; i++) {
          this.zoneName = zone.name.charAt(i);
        }
        this.zoneName = this.zoneName.trim();
      }


      this.showAllComponent(zone);
    });
  }

  showAllComponent(zone: Zone): void {
    this.parkingLotsEachZone = this.parkingLotsEachZone.sort((par1, par2) => {
      if (par1.id > par2.id) {
        return 1;
      }
      if (par1.id < par2.id) {
        return -1;
      }
      return 0;
    });

    if (zone.direction === 0) {
      this.drawVertical(zone);
    } else {
      this.drawHorizontal(zone);
    }
  }

  drawVertical(zone: Zone): void {
    const height = (this.contentSize + this.outlineSize + this.parSizeH * (Math.ceil(this.parkingLotsEachZone.length / 2)));
    const width = (this.parSizeW * 2 + this.outlineSize * 2 + this.centerSize);
    let count = 0;
    let parPositionX = zone.positionX;
    let parPositionY = zone.positionY;

    //  vẽ ra khu
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(zone.positionX, zone.positionY, width, height);
    //  vẽ tên khu
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'red';
    this.ctx.font = '15px Arial';
    this.ctx.fillText(zone.name, zone.positionX + width / 2, zone.positionY + this.centerSize);

    //  vẽ chỗ đỗ xe
    parPositionY = parPositionY + this.contentSize;
    parPositionX = parPositionX + this.outlineSize;
    this.parkingLotsEachZone.forEach(par => {
      count++;
      if (count % 2 === 1 && count !== 1) {
        parPositionX -= this.centerSize + this.parSizeW;
        parPositionY += this.parSizeH;
      }
      if (count % 2 === 0 && count !== 1) {
        parPositionX += this.centerSize + this.parSizeW;
      }
      this.ctx.fillRect(parPositionX, parPositionY, this.parSizeW, this.parSizeH);
      if (par.status === true) {
        this.ctx.fillStyle = 'green';
      } else {
        this.ctx.fillStyle = 'red';
      }
      this.ctx.fillText(this.zoneName + ' - ' + par.id, parPositionX + this.parSizeW / 2, parPositionY + this.parSizeH / 2);
      this.ctx.stroke();
    });
  }

  drawHorizontal(zone: Zone): void {
    const height = this.parSizeW * 2 + this.outlineSize * 2 + this.centerSize + this.contentSize;
    const width = this.outlineSize * 2 + this.parSizeH * (Math.ceil(this.parkingLotsEachZone.length / 2));
    let count = 0;
    let parPositionX = zone.positionX;
    let parPositionY = zone.positionY;

    //  vẽ ra khu
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(zone.positionX, zone.positionY, width, height);

    //  vẽ tên khu
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'red';
    this.ctx.font = '15px Arial';
    this.ctx.fillText(zone.name, zone.positionX + width / 2, zone.positionY + this.centerSize);


    //  vẽ chỗ đỗ xe
    parPositionY = parPositionY + this.contentSize;
    parPositionX = parPositionX + this.outlineSize;
    this.parkingLotsEachZone.forEach(par => {
      count++;
      if (count % 2 === 1 && count !== 1) {
        parPositionY -= this.centerSize + this.parSizeW;
        parPositionX += this.parSizeH;
      }
      if (count % 2 === 0 && count !== 1) {
        parPositionY += this.centerSize + this.parSizeW;
      }
      this.ctx.fillRect(parPositionX, parPositionY, this.parSizeH, this.parSizeW);
      if (par.status === true) {
        this.ctx.fillStyle = 'green';
      } else {
        this.ctx.fillStyle = 'red';
      }
      this.ctx.fillText(this.zoneName + '-' + par.id + '', parPositionX + this.parSizeW / 4, parPositionY + this.parSizeW / 2);
      this.ctx.stroke();
    });
  }

  getHeightView(): void {}
}

