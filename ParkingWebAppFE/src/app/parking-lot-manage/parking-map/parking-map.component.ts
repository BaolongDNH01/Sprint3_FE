import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('canvas', {static: true})
  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private view;
  private parkingLotList: ParkingLot[] = [];
  private zoneInFloor: Zone[] = [];
  private parkingLotsEachZone: ParkingLot[] = [];
  private floorList: Floor[] = [];
  private contentSize = 50;
  private outlineSize = 20;
  private centerSize = 10;
  private parSizeW = 30;
  private parSizeH = 30;

  constructor(private parkingLotService: ParkingLotService) {
  }

  ngOnInit(): void {
    this.parkingLotService.getAllFloor().subscribe(
      // @ts-ignore
      list => this.floorList = list,
      e => console.log(e)
    );

    // lấy tất cả chỗ đậu xe
    this.parkingLotService.getAllParkingLot().subscribe(
      // @ts-ignore
      list => this.parkingLotList = list,
      e => console.log(e),
      () => {
        this.prepare(1);
      }
    );
  }

  prepare(floor: number): void {
    // lấy zone theo tầng
    this.parkingLotService.getAllZoneByFloor(floor).subscribe(
      // @ts-ignore
      list => this.zoneInFloor = list,
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
        if (par.zone === zone.id) {
          return par;
        }
      });
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
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.view = this.ctx.canvas;
    this.ctx.clearRect(0, 0, this.view.width, this.view.height);

    if (zone.direction === 0) {
      this.drawVertical(zone);
    } else {
      this.drawHorizontal(zone);
    }
  }

  drawVertical(zone: Zone): void {
    const height = this.contentSize + this.outlineSize + this.parSizeH * (Math.ceil(this.parkingLotsEachZone.length / 2));
    const width = this.parSizeW * 2 + this.outlineSize * 2 + this.centerSize;
    let count = 0;
    let parPositionX = zone.positionX;
    let parPositionY = zone.positionY;

    //  vẽ ra canvas
    this.ctx.rect(zone.positionX, zone.positionY, width, height);
    this.ctx.fillStyle = 'gray';

    //  vẽ tên khu
    this.ctx.textAlign = 'center';
    this.ctx.fillText(zone.name, zone.positionX, zone.positionY);

    //  vẽ chỗ đỗ xe
    parPositionY = parPositionY + this.contentSize;
    parPositionX = parPositionX + this.outlineSize;
    this.parkingLotsEachZone.forEach(par => {
      count++;
      if (Math.ceil(count / 2) > 0) {
        parPositionX -= this.centerSize + this.parSizeW;
        parPositionY += this.parSizeH;
      } else {
        parPositionX += this.centerSize + this.parSizeW;
      }
      this.ctx.fillRect(parPositionX, parPositionY, this.parSizeW, this.parSizeH);
      if (par.status === true) {
        this.ctx.fillStyle = 'green';
      } else {
        this.ctx.fillStyle = 'red';
      }
      this.ctx.stroke();
    });
  }

  drawHorizontal(zone: Zone): void {
    const height = this.parSizeW * 2 + this.outlineSize * 2 + this.centerSize + this.contentSize;
    const width = this.outlineSize * 2 + this.parSizeH * (Math.floor(this.parkingLotsEachZone.length / 2));
    let count = 0;
    let parPositionX = zone.positionX;
    let parPositionY = zone.positionY;

    //  vẽ ra canvas
    this.ctx.rect(zone.positionX, zone.positionY, width, height);
    this.ctx.fillStyle = 'gray';

    //  vẽ tên khu
    this.ctx.textAlign = 'center';
    this.ctx.fillText(zone.name, zone.positionX, zone.positionY);

    //  vẽ chỗ đỗ xe
    parPositionY = parPositionY + this.contentSize;
    parPositionX = parPositionX + this.outlineSize;
    this.parkingLotsEachZone.forEach(par => {
      count++;
      if (Math.ceil(count / 2) > 0) {
        parPositionY -= this.centerSize + this.parSizeW;
        parPositionX += this.parSizeH;
      } else {
        parPositionY += this.centerSize + this.parSizeW;
      }
      this.ctx.fillRect(parPositionX, parPositionY, this.parSizeW, this.parSizeH);
      if (par.status === true) {
        this.ctx.fillStyle = 'green';
      } else {
        this.ctx.fillStyle = 'red';
      }
      this.ctx.stroke();
    });
  }
}

