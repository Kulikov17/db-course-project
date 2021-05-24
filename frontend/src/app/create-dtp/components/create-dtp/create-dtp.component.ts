import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DadataConfig, DadataType, DadataParty, DadataSuggestion, DadataAddress } from '@kolkov/ngx-dadata';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDriverComponent } from '../add-driver/add-driver.component'
import { Person } from 'src/app/shared/models/person';
import * as moment from 'moment';
import { AddDtp, Typedtp, AffectedDTP } from 'src/app/shared/models/addDtp';
import { AddOthersComponent } from '../add-others/add-others.component';
import { DtpService } from '../../../dtp/services/dtp.service';
import { ThrowStmt } from '@angular/compiler';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';

interface TypeTs {
  value: string;
}

export interface TypeDtp {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtypeDtp?: TypeDtp[];
}

@Component({
  selector: 'app-create-dtp',
  templateUrl: './create-dtp.component.html',
  styleUrls: ['./create-dtp.component.css']
})
export class CreateDtpComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  selectableChips = true;
  removableChips = true;
  

  configAddress: DadataConfig = {
    apiKey: '2e51c5fbc1a60bd48face95951108560bf03f7d9',
    type: DadataType.address,
  };

  public maxDate = moment().format('YYYY-MM-DD');
  public dateDTP: FormControl = new FormControl('', [Validators.required]);
  public timeDTP: FormControl = new FormControl('', [Validators.required]);
  public adressDTP: FormControl = new FormControl('', [Validators.required]);
  public descriptionDTP: FormControl = new FormControl('');
  public cityDTP;
  public regionDTP;
  public typesDtp: TypeDtp[] = [];

  public addressInvalid = true;
  public disabledToFinalStep = true;
  
  drivers = [];
  passengers = [];
  walkers = [];
  couchers = [];
  cyclists = [];
  arrTs = [];
  arrPeople = [];
  arrTypeDtp = [];


  selectedTypeTs = new FormControl('');

  typesTs: TypeTs[] = [
    {value: 'легковой автомобиль'},
    {value: 'грузовой автомобиль'},
    {value: 'мотоцикл'},
    {value: 'автобус'},
    {value: 'троллейбус'},
    {value: 'поезд'}
  ];

  public tsForm : FormGroup;
  
  typeDtp: TypeDtp = {
    name: 'Выберите категории ДТП',
    completed: false,
    color: 'primary',
    subtypeDtp: [
      {name: 'Столкновение', completed: false, color: 'primary'},
      {name: 'Опрокидывание', completed: false, color: 'primary'},
      {name: 'Наезд на стоящее транспортное средство', completed: false, color: 'primary'},
      {name: 'Наезд на препятствие', completed: false, color: 'primary'},
      {name: 'Наезд на пешехода', completed: false, color: 'primary'},
      {name: 'Наезд на велосипедиста', completed: false, color: 'primary'},
      {name: 'Наезд на гужевой транспорт', completed: false, color: 'primary'},
      {name: 'Падение пассажира', completed: false, color: 'primary'},
      {name: 'Падение перевозимого груза', completed: false, color: 'primary'},
      {name: 'Наезд на внезапно появившееся препятствие', completed: false, color: 'primary'}
    ]
  };

  requiredCountDrivers = 1;
  requiredCountPassengers = 0;
  requiredCountCouchers = 0;
  requiredCountWalkers = 0;
  requiredCountCyclists = 0

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.tsForm = new FormGroup({
      "tsBrand": new FormControl("", [Validators.required]),
      "tsModel": new FormControl(""),
      "tsColor": new FormControl(""),
      "userPassport": new FormControl('', [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
      "tsRegisterNumber": new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
  }
 
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private dtpService: DtpService) { }

  manageCountAffected(subtypeDtp: TypeDtp) {
    if (subtypeDtp.completed) {
      this.arrTypeDtp.splice(this.arrTypeDtp.indexOf(subtypeDtp.name), 1);
      if (subtypeDtp.name == 'Выберите категории ДТП') {
        this.requiredCountWalkers = 0;
        this.requiredCountCyclists = 0;
        this.requiredCountCouchers = 0;
        this.requiredCountPassengers = 0; 
        this.requiredCountDrivers = 1; 
        this.walkers.splice(0, this.walkers.length);
        this.cyclists.splice(0, this.cyclists.length);
        this.couchers.splice(0, this.couchers.length);
        this.typeDtp.completed = false;
        this.typeDtp.subtypeDtp.forEach(t => t.completed = false);
      } else if (subtypeDtp.name == 'Наезд на пешехода') {
        this.requiredCountWalkers = 0;
        this.walkers.splice(0, this.walkers.length);
      } else if (subtypeDtp.name == 'Наезд на велосипедиста') {
        this.requiredCountCyclists = 0;
        this.cyclists.splice(0, this.cyclists.length);
      } else if (subtypeDtp.name == 'Наезд на гужевой транспорт') {
        this.requiredCountCouchers = 0;
        this.couchers.splice(0, this.couchers.length);
      } else if (subtypeDtp.name == 'Падение пассажира') {
        this.requiredCountPassengers = 0; 
      } else if (subtypeDtp.name == 'Столкновение' || subtypeDtp.name == 'Наезд на стоящее транспортное средство') {
        this.requiredCountDrivers = 1; 
      }
    } else {
      this.arrTypeDtp.push(subtypeDtp.name)
      if (subtypeDtp.name == 'Выберите категории ДТП') {
        this.requiredCountWalkers = 1;
        this.requiredCountCyclists = 1;
        this.requiredCountCouchers = 1;
        this.requiredCountPassengers = 1; 
        this.requiredCountDrivers = 2; 
        this.typeDtp.completed = true;
        this.typeDtp.subtypeDtp.forEach(t => t.completed = true);
      } else if (subtypeDtp.name == 'Наезд на пешехода') {
        this.requiredCountWalkers = 1;
      } else if (subtypeDtp.name == 'Наезд на велосипедиста') {
        this.requiredCountCyclists = 1;
      } else if (subtypeDtp.name == 'Наезд на гужевой транспорт') {
        this.requiredCountCouchers = 1;
      } else if (subtypeDtp.name == 'Падение пассажира') {
        this.requiredCountPassengers = 1; 
      } else if (subtypeDtp.name == 'Столкновение' || subtypeDtp.name == 'Наезд на стоящее транспортное средство') {
        this.requiredCountDrivers = 2; 
      } else {
        if (this.requiredCountDrivers != 2)
          this.requiredCountDrivers = 1; 
      }
    }
    this.checkCanFinalStep()
  }
 
  public checkCanFinalStep() {
    
    if (this.arrTypeDtp.length > 0 && this.drivers.length >= this.requiredCountDrivers 
      && this.passengers.length >= this.requiredCountPassengers
      && this.walkers.length >= this.requiredCountWalkers
      && this.cyclists.length >= this.requiredCountCyclists
      && this.couchers.length >= this.requiredCountCouchers) {
      this.disabledToFinalStep = false;
    } else {
      this.disabledToFinalStep  = true;
    }
  }
  public addDriver(): void {
    const dialogRef = this.dialog.open(AddDriverComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople, ts: this.arrTs, date: this.dateDTP.value.format('YYYY-MM-DD') }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.drivers.push([result.person, false, false, result.datedeath, new FormControl('ранен')]); this.arrPeople.push(result.person); this.arrTs.push(result.ts);this.checkCanFinalStep(); });
  }

  public addWalker(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople, date: this.dateDTP.value.format('YYYY-MM-DD') }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.walkers.push([result.person, false, false, result.datedeath, new FormControl('ранен')]); this.arrPeople.push(result.person); this.checkCanFinalStep();});
  }

  public addCoucher(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople,  date: this.dateDTP.value.format('YYYY-MM-DD') }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.couchers.push([result.person, false, false, result.datedeath, new FormControl('ранен')]); this.arrPeople.push(result.person); this.checkCanFinalStep();});
    
  }

  public addCyclist(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople,  date: this.dateDTP.value.format('YYYY-MM-DD') }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.cyclists.push([result.person, false, false, result.datedeath, new FormControl('ранен')]); this.arrPeople.push(result.person); this.checkCanFinalStep(); });
    
  }

  public addPassenger(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople,  date: this.dateDTP.value.format('YYYY-MM-DD') }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.passengers.push([result.person, false, false, result.datedeath, new FormControl('ранен')]); this.arrPeople.push(result.person); this.checkCanFinalStep();});
    
  }

  onAdressSelect(event: any) {
    const addressData = event.data as DadataAddress;
    console.log(addressData);
    this.addressInvalid = (addressData.city || addressData.settlement) ? false : true;
    this.cityDTP = addressData.city? addressData.city: addressData.settlement;
    if (addressData.region == "Саха /Якутия/") {
      this.regionDTP = "Якутия";
    } else if (addressData.region == "Коми") {
      this.regionDTP = "Республика Коми";
    } else if (addressData.region == "Ханты-Мансийский Автономный округ - Югра" ) {
      this.regionDTP = "Ханты-Мансийский автономный округ";
    } else if (addressData.region == "Ханты-Мансийский Автономный округ - Югра" ) {
      this.regionDTP = "Ханты-Мансийский автономный округ";
    } else if (addressData.region == "Карелия" ) {
      this.regionDTP = "Республика Карелия";
    } else if (addressData.region == "Карелия" ) {
      this.regionDTP = "Республика Карелия";
    } else if (addressData.region == "Алтай") {
      this.regionDTP = "Республика Алтай";
    } else if (addressData.region_type_full == "автономный округ" || addressData.region_type_full == "край" || addressData.region_type_full == "автономная область" || addressData.region_type_full == "область" ) {
    this.regionDTP = addressData.region + " " + addressData.region_type_full;
    } else {
    this.regionDTP = addressData.region;
    }
  }

  clearAll() {
    this.dateDTP.setValue('');
    this.timeDTP.setValue('');
    this.adressDTP.setValue('');
    this.descriptionDTP.setValue('');
    this.addressInvalid = true;
    this.arrPeople = [];
    this.arrTs = [];
    this.drivers = [];
    this.passengers = [];
    this.walkers = [];
    this.cyclists = [];
    this.couchers = [];
    this.arrTypeDtp = [];
    this.requiredCountWalkers = 0;
    this.requiredCountCyclists = 0;
    this.requiredCountCouchers = 0;
    this.requiredCountPassengers = 0; 
    this.requiredCountDrivers = 1;
    this.typeDtp.completed = false;
    this.typeDtp.subtypeDtp.forEach(t => t.completed = false);
    this.disabledToFinalStep = true;
  }

  clearSecondStep() {
    this.drivers = [];
    this.passengers = [];
    this.walkers = [];
    this.cyclists = [];
    this.couchers = [];
    this.arrPeople = [];
    this.arrTs = [];
    this.arrTypeDtp = [];
    this.requiredCountWalkers = 0;
    this.requiredCountCyclists = 0;
    this.requiredCountCouchers = 0;
    this.requiredCountPassengers = 0; 
    this.requiredCountDrivers = 1;
    this.typeDtp.completed = false;
    this.typeDtp.subtypeDtp.forEach(t => t.completed = false);
    this.disabledToFinalStep = true;
  }

  addDTP() {
    const typesDtp: Typedtp[] = []
    const affectedDrivers: AffectedDTP[] = []
    const affectedOthers: AffectedDTP[] = []
    
    this.arrTypeDtp.forEach((item: any)=> {
      if (item == 'Столкновение') {
        const newType: Typedtp = {
          id: 1,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Опрокидывание') {
        const newType: Typedtp = {
          id: 2,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Наезд на стоящее транспортное средство') {
        const newType: Typedtp = {
          id: 3,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Наезд на препятствие') {
        const newType: Typedtp = {
          id: 4,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Наезд на пешехода') {
        const newType: Typedtp = {
          id: 5,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Наезд на велосипедиста') {
        const newType: Typedtp = {
          id: 6,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Наезд на гужевой транспорт') {
        const newType: Typedtp = {
          id: 7,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Падение пассажира') {
        const newType: Typedtp = {
          id: 8,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Падение перевозимого груза') {
        const newType: Typedtp = {
          id: 9,
          description: item
        };
        typesDtp.push(newType)
      } else if (item == 'Наезд на внезапно появившееся препятствие') {
        const newType: Typedtp = {
          id: 10,
          description: item
        };
        typesDtp.push(newType)
      }
    });

    this.drivers.forEach((item: any, index: number)=> {
    
      const curGuilt = item[2] ? 'виновен': 'невиновен'
      const newAffected: AffectedDTP = {
        passport: item[0].passport,
        type: 'водитель',
        health: item[4].value,
        guilt: curGuilt,
        registernumber: this.arrTs[index].registernumber
      };
      affectedDrivers.push(newAffected)
    });
    this.passengers.forEach((item: any)=> {
      const curGuilt = item[2] ? 'виновен': 'невиновен'
      const newAffected: AffectedDTP = {
        passport: item[0].passport,
        type: 'пассажир',
        health: item[4].value,
        guilt: curGuilt
      };
      affectedOthers.push(newAffected)
    });
    this.walkers.forEach((item: any)=> {
      const curGuilt = item[2]? 'виновен': 'невиновен'
      const newAffected: AffectedDTP = {
        passport: item[0].passport,
        type: 'пешеход',
        health: item[4].value,
        guilt: curGuilt
      };
      affectedOthers.push(newAffected)
    });
    this.couchers.forEach((item: any)=> {
      const curGuilt = item[2] ? 'виновен': 'невиновен'
      const newAffected: AffectedDTP = {
        passport: item[0].passport,
        type: 'кучер',
        health: item[4].value,
        guilt: curGuilt
      };
      affectedOthers.push(newAffected)
    });
    this.cyclists.forEach((item: any)=> {
      const curGuilt = item[2] ? 'виновен': 'невиновен'
      const newAffected: AffectedDTP = {
        passport: item[0].passport,
        type: 'велосипедист',
        health: item[4].value,
        guilt: curGuilt
      };
      affectedOthers.push(newAffected)
    });

    const newDtp: AddDtp = {
      dateDtp: this.dateDTP.value.format("YYYY-MM-DD"),
      timeDtp: this.timeDTP.value,
      regionDtp: this.regionDTP,
      cityDtp: this.cityDTP,
      descriptionDtp: this.descriptionDTP.value,
      dt: typesDtp
    };

    console.log(newDtp);

    this.dtpService.addDtp(newDtp).subscribe(
      (resp: any) => { 
         console.log(resp);
         affectedDrivers.forEach((item: any) => {item.dtpId = resp.dtpId});
         affectedOthers.forEach((item: any) => {item.dtpId = resp.dtpId});
         console.log(affectedDrivers);
         this.dtpService.addAffectedDrivers(affectedDrivers).subscribe(
           (resp: any) => {
             if (affectedOthers.length > 0) {
              this.dtpService.addAffectedOthers(affectedOthers).subscribe(
                (resp: any) => { this.openDialog('Операция выполнена', 'ДТП успешно добавлено!');}
              )
             } else {
              this.openDialog('Операция выполнена', 'ДТП успешно добавлено!');
             }
           }
         )
      }
    );
  }

  public openDialog(title: string, info: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        info: info
      }});

    dialogRef.afterClosed().subscribe(() => {this.clearAll()});
  }  
  
  public changeGuilt(person: any) {
    person[2] = person[2]? false: true;
  }

  public removePerson(person: Person): void {
    const index = this.arrPeople.indexOf(person);

    if (index >= 0) {
      this.arrPeople.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  public removeDriver(person: any): void {
    this.removePerson(person[0]);

    let index = this.drivers.indexOf(person);

    if (index >= 0) {
      this.drivers.splice(index, 1);
      this.arrTs.splice(index, 1);
    }

    this.checkCanFinalStep();
  }

  public removePassenger(person: any): void {
    this.removePerson(person[0]);

    const index = this.passengers.indexOf(person);

    if (index >= 0) {
      this.passengers.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  public removeWalker(person: any): void {
    this.removePerson(person[0]);

    const index = this.walkers.indexOf(person);

    if (index >= 0) {
      this.walkers.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  public removeCyclist(person: any): void {
    this.removePerson(person[0]);

    const index = this.cyclists.indexOf(person);

    if (index >= 0) {
      this.cyclists.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  public removeCoucher(person: any): void {
    this.removePerson(person[0]);

    const index = this.couchers.indexOf(person);

    if (index >= 0) {
      this.couchers.splice(index, 1);
    }
    this.checkCanFinalStep();
  }
}
