import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../../shared/models/person';
import { Ts } from '../../../shared/models/ts';
import { PersonService } from '../../../person/services/person.service';
import { TsService } from '../../../ts/services/ts.service';
import * as moment from 'moment';

export interface DialogData {
  people: Person[];
  ts: Ts[];
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
  public stagePerson = true;
  public stageTS = false;
  public personViewValue;
  public personBirthdateViewValue;
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
        "registerNumber": new FormControl("", [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')])
      });

      this.personForm = new FormGroup({
        "userSurname": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
        "userName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
        "userPatronymic": new FormControl("", [Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
        "userSex": new FormControl("муж"),
        "userBirthdate": new FormControl('', [Validators.required]),
        "userDriverLicense": new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')])
      });
  }
  
  public onStagePerson() {
    this.stagePerson = true;
    this.stageTS = false;
  }

  public onStageTS() {
    this.stagePerson = false;
    this.stageTS = true;
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
    });
  }

  public findTS() {
    console.log(this.data);
    for (let i = 0; i < this.data.ts.length; i++) { 
      if (this.data.ts[i].registerNumber == this.findRegisterNumber.controls['registerNumber'].value) {
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

  public addPerson() : void {
    const surname = this.personForm.controls['userSurname'].value;
    const name = this.personForm.controls['userName'].value;
    const patronymic = this.personForm.controls['userPatronymic'].value == '' ? null : this.personForm.controls['userPatronymic'].value;
    const sex = this.personForm.controls['userSex'].value;
    const birthdate = this.personForm.controls['userBirthdate'].value.format('YYYY-MM-DD');
    const passport = this.findPassport.controls['passport'].value;
    const driverLicense = this.personForm.controls['userDriverLicense'].value == '' ? null : this.personForm.controls['userDriverLicense'].value;

    const person: Person = {
      surname: surname,
      name: name,
      patronymic: patronymic,
      sex: sex,
      birthdate: birthdate,
      passport: passport,
      driverLicense: driverLicense  
    };

    this.personService.addPerson(person);
    this.person = person;
  }

  onReturnResult(): void {
    if (this.canCreatePerson) {
      this.addPerson();
    }
    this.dialogRef.close({person: this.person, ts: this.ts});
  }

}
