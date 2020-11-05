import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ParkingLotService} from '../service/parking-lot.service';
import {ParkingLot} from '../entity/parking-lot';
import {Floor} from '../entity/floor';
import {Zone} from '../entity/zone';
import {Ticket} from '../../ticket/models/Ticket';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

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
  zoneInFloor: Zone[] = [];
  private parkingLotsEachZone: ParkingLot[] = [];
  floorList: Floor[] = [];
  private contentSize = 50;
  private outlineSize = 40;
  private centerSize = 20;
  private parSizeW = 120;
  private parSizeH = 60;
  zoneName: string;
  arrParkingLotPosition = [];
  parkingLotView = new ParkingLot;
  zoneEdit: Zone;
  scrWidth: number;
  isInit = false;
  floorShow = 1;

  constructor(private parkingLotService: ParkingLotService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
    this.arrParkingLotPosition = [];
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
        this.prepare(this.floorShow);
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

    // tạo sự kiện click
    if (!this.isInit) {
      this.canvas.nativeElement.addEventListener('click', (evt) => {
        const rect = this.canvas.nativeElement.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        this.checkClick(x, y);
      });
    }
    this.isInit = true;
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

      //  lưu thông tin chỗ đỗ xe vào array riêng
      // tslint:disable-next-line:no-shadowed-variable
      const width = this.parSizeW;
      // tslint:disable-next-line:no-shadowed-variable
      const height = this.parSizeH;
      const a = {parPositionX, parPositionY, width, height, par};
      this.arrParkingLotPosition.push(a);

      if (par.status) {
        this.ctx.fillStyle = 'green';
      } else {
        this.ctx.fillStyle = 'red';
      }
      this.ctx.fillRect(parPositionX, parPositionY, this.parSizeW, this.parSizeH);
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.zoneName + ' - ' + par.id, parPositionX + this.parSizeW / 2, parPositionY + this.parSizeH / 2);
      this.ctx.stroke();
    });
  }

  drawHorizontal(zone: Zone): void {
    const height = this.parSizeW * 2 + this.outlineSize * 2 + this.centerSize;
    const width = this.outlineSize * 2 + this.parSizeH * (Math.ceil(this.parkingLotsEachZone.length / 2)) + this.contentSize * 2;
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
    this.ctx.fillText(zone.name, zone.positionX + this.centerSize * 2, zone.positionY + height / 2);


    //  vẽ chỗ đỗ xe
    parPositionY = parPositionY + this.outlineSize;
    parPositionX = parPositionX + this.outlineSize + this.contentSize;
    this.parkingLotsEachZone.forEach(par => {
      count++;
      if (count % 2 === 1 && count !== 1) {
        parPositionY -= this.centerSize + this.parSizeW;
        parPositionX += this.parSizeH;
      }
      if (count % 2 === 0 && count !== 1) {
        parPositionY += this.centerSize + this.parSizeW;
      }
      // tslint:disable-next-line:no-shadowed-variable
      const width = this.parSizeW;
      // tslint:disable-next-line:no-shadowed-variable
      const height = this.parSizeH;
      const a = {parPositionX, parPositionY, width, height, par};
      this.arrParkingLotPosition.push(a);
      if (par.status) {
        this.ctx.fillStyle = 'green';
      } else {
        this.ctx.fillStyle = 'red';
      }
      this.ctx.fillRect(parPositionX, parPositionY, this.parSizeH, this.parSizeW);

      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.zoneName + '-' + par.id, parPositionX + this.parSizeW / 4, parPositionY + this.parSizeW / 2);
      this.ctx.stroke();
    });
  }

  checkClick(mX, mY): void {
    this.arrParkingLotPosition.forEach(arr => {
      if (mX >= arr.parPositionX && mX <= arr.parPositionX + arr.width) {
        if (mY >= arr.parPositionY && mY <= arr.parPositionY + arr.height) {
          this.parkingLotView = arr.par;
          document.getElementById('view').click();
          return;
        }
      }
    });
  }

  changePositionX(id: number, pX: number): void {
    this.parkingLotService.editZonePositionX(id, pX).subscribe(
      () => null,
      () => null,
      () => window.location.reload()
    );
  }

  changePositionY(id: number, pY: number): void {
    this.parkingLotService.editZonePositionY(id, pY).subscribe(
      () => null,
      () => null,
      () => window.location.reload()
    );
  }

  saveParkingLotToCreateTicket(par: ParkingLot): void {
    sessionStorage.setItem('floor', par.nameFloor);
    sessionStorage.setItem('zone', par.nameZone);
    sessionStorage.setItem('idParkingLot', String(par.id));
    this.router.navigateByUrl('ticket/list').then();
  }
}

