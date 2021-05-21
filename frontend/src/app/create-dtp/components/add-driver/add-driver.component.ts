import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person, PersonDie } from '../../../shared/models/person';
import { Ts } from '../../../shared/models/ts';
import { PersonService } from '../../../person/services/person.service';
import { TsService } from '../../../ts/services/ts.service';
import * as moment from 'moment';

export interface DialogData {
  people: Person[];
  ts: Ts[];
  date: string;
}

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  public findPassport: FormGroup;
  public findRegisterNumber: FormGroup;
  public person: Person;
  public ts: Ts;
  public canFindPerson = false;
  public alreadyExistPerson = false;
  public canFindError = false;
  public canCreatePerson = false;
  public canFindTS = false;
  public canFindErrorTS = false;
  public canCreateTS = false;
  public alreadyExistTS = false;
  public canAddPerson = false;
  public stagePerson = true;
  public isPersonNotDie = true;
  public stageTS = false;
  public personViewValue;
  public personBirthdateViewValue;
  public personDieViewValue;
  public personDopViewValue;
  public datedeath = '';
  public tsViewValue;

  public personForm : FormGroup;

  public maxDate = moment().format('YYYY-MM-DD');
  public userSex: 'муж' | 'жен' = 'муж';
  public addDriver:DialogData;

  constructor(
    public dialogRef: MatDialogRef<AddDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private personService: PersonService,
    private tsService: TsService) {}

  ngOnInit(): void {
      console.log(this.data);
      this.findPassport = new FormGroup({
        "passport": new FormControl("", [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')])
      });
      this.findRegisterNumber = new FormGroup({
        "registerNumber": new FormControl("", [Validators.required,  Validators.minLength(10)])
      });
  }
  
  public onStagePerson() {
    this.stagePerson = true;
    this.stageTS = false;
  }

  public onStageTS() {
    this.stageTS = true;
    this.stagePerson = false;
  }

  public findPerson() {
    for (let i = 0; i < this.data.people.length; i++) { 
      if (this.data.people[i].passport == this.findPassport.controls['passport'].value) {
        this.alreadyExistPerson = true;
        this.canFindPerson = false;
        this.canFindError = false;
        return
      }
    }
    this.alreadyExistPerson = false;
   
    this.personService.findPerson(this.findPassport.controls['passport'].value).subscribe((data:Person) =>  {
      this.person = data;
      this.canCreatePerson = false;
      if (!this.person) {
        this.canFindPerson = false;
        this.canFindError = true;
      } else {
        this.canFindPerson = true;
        this.canFindError = false;
        this.personViewValue = this.person.surname + " " + this.person.name + " ";
        this.personViewValue += this.person.patronymic? this.person.patronymic : "";
        this.personBirthdateViewValue = this.person.birthdate;
      }
      this.isPersonNotDie = true;
      this.personDieViewValue = " ";
      this.personDopViewValue = " ";
      this.datedeath = '';
      this.personService.findPersonDie(this.findPassport.controls['passport'].value).subscribe((tmp: PersonDie) => {
        this.personDieViewValue="Погиб в ДТП ";
        this.personDieViewValue+=tmp.deathdate;
        this.personDieViewValue+=" " + tmp.cityDtp;
        if (tmp.deathdate.localeCompare(this.data.date) > 0) {
          this.personDopViewValue="Вы можете создать ДТП с этим человеком, до момента его гибели";
          this.datedeath = tmp.deathdate;
        } else {
          this.personDopViewValue="Вы не можете создать ДТП с этим человеком";
          this.isPersonNotDie = false;
        }
      });
    });

  }

  public findTS() {
    console.log(this.data);
    for (let i = 0; i < this.data.ts.length; i++) { 
      if (this.data.ts[i].registernumber == this.findRegisterNumber.controls['registerNumber'].value) {
        this.alreadyExistTS = true;
        this.canFindTS = false;
        this.canFindErrorTS = false;
        return
      }
    }
    this.alreadyExistTS = false;
    this.tsService.findTS(this.findRegisterNumber.controls['registerNumber'].value).subscribe((data:Ts) =>  {
      this.ts = data;
      this.canCreateTS = false;
      if (!this.ts) {
        this.canFindTS = false;
        this.canFindErrorTS = true;
      } else {
        this.canFindTS = true;
        this.canFindErrorTS = false;
        this.tsViewValue = this.ts.brand + " ";
        this.tsViewValue += this.ts.model? this.ts.model : "";
      }
    });
  }

  public createPerson(): void {
    this.canFindError = false;
    this.canCreatePerson = true;
  }

  public dropFindPerson() {
    this.canCreatePerson = false;
    this.canFindPerson = false;
    this.canFindError = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onReturnResult(): void {
    this.dialogRef.close({person: this.person, ts: this.ts, datedeath: this.datedeath});
  }

}
