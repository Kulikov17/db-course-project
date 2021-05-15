import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../../shared/models/person';
import { PersonService } from '../../services/person.service';

import * as moment from 'moment';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {

  public myForm : FormGroup;

  public maxDate = moment().format('YYYY-MM-DD');
  public userSex: 'муж' | 'жен' = 'муж';
  public canAdd = false;


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      "userSurname": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userPatronymic": new FormControl("", [Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userSex": new FormControl("муж"),
      "userBirthdate": new FormControl('', [Validators.required]),
      "userPassport": new FormControl('', [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
      "userDriverLicense": new FormControl('', [Validators.maxLength(10), Validators.pattern('^[0-9]+$')])
    });
  }

  public addPerson() : void {
    const surname = this.myForm.controls['userSurname'].value;
    const name = this.myForm.controls['userName'].value;
    const patronymic = this.myForm.controls['userPatronymic'].value == '' ? null : this.myForm.controls['userPatronymic'].value;
    const sex = this.myForm.controls['userSex'].value;
    const birthdate = this.myForm.controls['userBirthdate'].value.format('YYYY-MM-DD');
    const passport = this.myForm.controls['userPassport'].value;
    const driverLicense = this.myForm.controls['userDriverLicense'].value == '' ? null : this.myForm.controls['userDriverLicense'].value;

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
}
