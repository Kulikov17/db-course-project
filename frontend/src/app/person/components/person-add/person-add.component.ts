import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../../shared/models/person';
import { PersonService } from '../../services/person.service';

import * as moment from 'moment';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  public personForm : FormGroup;

  public maxDate = moment().format('YYYY-MM-DD');
  public userSex: 'муж' | 'жен' = 'муж';
  public canAdd = false;


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personForm = new FormGroup({
      "userSurname": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userPatronymic": new FormControl("", [Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userSex": new FormControl("муж"),
      "userBirthdate": new FormControl('', [Validators.required]),
      "userPassport": new FormControl('', [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
      "userDriverLicense": new FormControl('', [Validators.maxLength(10)])
    });
  }

  public addPerson() : void {
    const surname = this.personForm.controls['userSurname'].value;
    const name = this.personForm.controls['userName'].value;
    const patronymic = this.personForm.controls['userPatronymic'].value == '' ? null : this.personForm.controls['userPatronymic'].value;
    const sex = this.personForm.controls['userSex'].value;
    const birthdate = this.personForm.controls['userBirthdate'].value.format('YYYY-MM-DD');
    const passport = this.personForm.controls['userPassport'].value;
    const driverlicense = this.personForm.controls['userDriverLicense'].value == '' ? null : this.personForm.controls['userDriverLicense'].value;

    const person: Person = {
      surname: surname,
      name: name,
      patronymic: patronymic,
      sex: sex,
      birthdate: birthdate,
      passport: passport,
      driverlicense: driverlicense  
    };

    this.personService.addPerson(person);
  }
}
