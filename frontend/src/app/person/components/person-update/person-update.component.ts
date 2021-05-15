import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../../shared/models/person';
import { PersonService } from '../../services/person.service';

import * as moment from 'moment';



@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {

  public myForm : FormGroup;
  public findPassport: FormGroup;

  public maxDate = moment().format('YYYY-MM-DD');
  public userSex: 'муж' | 'жен' = 'муж';
  public canAdd = false;

  public canFindPerson = false;
  public canFindError = false;
  public isLoadData = false;

  public isChanged = false;

  public person: Person;


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.findPassport = new FormGroup({
      "passport": new FormControl("", [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')])
    });

    this.myForm = new FormGroup({
      "userSurname": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      "userName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      "userPatronymic": new FormControl("", [Validators.pattern('^[a-zA-Z ]*$')]),
      "userSex": new FormControl("муж"),
      "userBirthdate": new FormControl('', [Validators.required]),
      "userPassport": new FormControl('', [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
      "userDriverLicense": new FormControl('', [Validators.maxLength(10), Validators.pattern('^[0-9]+$')])
    });
  }

  public addPerson() : void {
    const surname = this.myForm.controls['userSurname'].value;
    const name = this.myForm.controls['userName'].value;
    const patronymic = this.myForm.controls['userPatronymic'].value;
    const sex = this.myForm.controls['userSex'].value;
    const birthdate = this.myForm.controls['userBirthdate'].value.format('YYYY-MM-DD');
    const passport = this.myForm.controls['userPassport'].value;
    const driverLicense = this.myForm.controls['userDriverLicense'].value;

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
  }

  public cancelChanges() {
    this.isChanged = false;
  }

  public beginChanges() {
    this.isChanged = true;
  }

  public findPerson() {
    this.isLoadData = true;
    this.canFindPerson = false;
    this.canFindError = false;
    this.personService.findPerson(this.findPassport.controls['passport'].value).subscribe((data:Person) =>  {
      this.person = data;
      this.fillFormPerson();
    });
  }

  private fillFormPerson() {
    this.isLoadData = false;
    if (!this.person) {
      this.canFindPerson = false;
      this.canFindError = true;
    } else {
      this.canFindPerson = true;
      this.canFindError = false;
      this.fillFieldPerson();
    }
  }

  private fillFieldPerson() {
    this.myForm.controls['userSurname'].setValue(this.person.surname);
    this.myForm.controls['userName'].setValue(this.person.name);
    this.myForm.controls['userPatronymic'].setValue(this.person.patronymic? this.person.patronymic : "");
    this.myForm.controls['userSex'].setValue(this.person.sex);
    this.myForm.controls['userBirthdate'].setValue(this.person.birthdate);
    this.myForm.controls['userPassport'].setValue(this.person.passport);
    this.myForm.controls['userDriverLicense'].setValue(this.person.driverLicense? this.person.driverLicense : "");
  }


}
