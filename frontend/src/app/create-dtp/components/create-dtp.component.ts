import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DadataConfig, DadataType, DadataParty, DadataSuggestion, DadataAddress } from '@kolkov/ngx-dadata';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDriverComponent } from './add-driver/add-driver.component'
import { Person } from 'src/app/shared/models/person';
import * as moment from 'moment';
import { Ts } from 'src/app/shared/models/ts';
import { MatStepper } from '@angular/material/stepper';
import { AddOthersComponent } from './add-others/add-others.component';

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
  public descriptionDTP: FormControl = new FormControl('');

  public addressInvalid = true;
  public disabledToFinalStep = true;
  
  drivers = [];
  passengers = [];
  walkers = [];
  couchers = [];
  cyclists = [];
  arrTs = [];
  arrPeople = [];


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
 
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  manageCountAffected(subtypeDtp: TypeDtp) {
    if (subtypeDtp.completed) {
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
        this.requiredCountDrivers = 1; 
      }
    }
  }
 
  public checkCanFinalStep() {
    if (this.drivers.length >= this.requiredCountDrivers 
      && this.passengers.length >= this.requiredCountPassengers
      && this.walkers.length >= this.requiredCountWalkers
      && this.cyclists.length >= this.requiredCountCyclists
      && this.couchers.length >= this.requiredCountCouchers) {
      this.disabledToFinalStep = false;
    } else {
      console.log('ss');
      this.disabledToFinalStep  = true;
    }
  }
  public addDriver(): void {
    const dialogRef = this.dialog.open(AddDriverComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople, ts: this.arrTs }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.drivers.push(result.person); this.arrPeople.push(result.person); this.arrTs.push(result.ts);this.checkCanFinalStep(); });
  }

  public addWalker(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.walkers.push(result.person); this.arrPeople.push(result.person); this.checkCanFinalStep();});
  }

  public addCoucher(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.couchers.push(result.person); this.arrPeople.push(result.person); this.checkCanFinalStep();});
    
  }

  public addCyclist(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.cyclists.push(result.person); this.arrPeople.push(result.person); this.checkCanFinalStep(); });
    
  }

  public addPassenger(): void {
    const dialogRef = this.dialog.open(AddOthersComponent, {
      width: '500px',
      height: '500px',
      data: { people: this.arrPeople }
    });

    dialogRef.afterClosed().subscribe((result: any) => {this.passengers.push(result.person); this.arrPeople.push(result.person); this.checkCanFinalStep();});
    
  }

  onAdressSelect(event: any) {
    const addressData = event.data as DadataAddress;
    console.log(addressData);
    this.addressInvalid = (addressData.city || addressData.settlement) ? false : true;
  }

  clearAll() {
    this.dateDTP.setValue('');
    this.timeDTP.setValue('');
    this.descriptionDTP.setValue('');
    this.addressInvalid = true;
    this.drivers = [];
    this.passengers = [];
    this.walkers = [];
    this.cyclists = [];
    this.couchers = [];
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
    alert('dtp добавлено!');
    this.clearAll();
  }

  removePerson(person: Person): void {
    const index = this.arrPeople.indexOf(person);

    if (index >= 0) {
      this.arrPeople.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  removeDriver(person: Person): void {
    this.removePerson(person);
    const index = this.drivers.indexOf(person);

    if (index >= 0) {
      this.drivers.splice(index, 1);
      this.arrTs.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  removePassenger(person: Person): void {
    this.removePerson(person);
    const index = this.passengers.indexOf(person);

    if (index >= 0) {
      this.passengers.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  removeWalker(person: Person): void {
    this.removePerson(person);
    const index = this.walkers.indexOf(person);

    if (index >= 0) {
      this.walkers.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  removeCyclist(person: Person): void {
    this.removePerson(person);
    const index = this.cyclists.indexOf(person);

    if (index >= 0) {
      this.cyclists.splice(index, 1);
    }
    this.checkCanFinalStep();
  }

  removeCoucher(person: Person): void {
    this.removePerson(person);
    const index = this.couchers.indexOf(person);

    if (index >= 0) {
      this.couchers.splice(index, 1);
    }
    this.checkCanFinalStep();
  }
}
