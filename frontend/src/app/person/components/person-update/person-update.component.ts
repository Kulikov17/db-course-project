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

  public personForm : FormGroup;
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

    this.personForm = new FormGroup({
      "userSurname": new FormControl({value: "", disabled: true}, [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userName": new FormControl({value: "", disabled: true}, [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userPatronymic": new FormControl({value: "", disabled: true}, [Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
      "userSex": new FormControl({value: "муж", disabled: true}),
      "userBirthdate": new FormControl({value: "", disabled: true}, [Validators.required]),
      "userPassport": new FormControl({value: "", disabled: true}, [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
      "userDriverLicense": new FormControl({value: "", disabled: true}, [Validators.maxLength(10)])
    } );
  }

  public updatePerson() {
    const surname = this.personForm.controls['userSurname'].value;
    const name = this.personForm.controls['userName'].value;
    const patronymic = this.personForm.controls['userPatronymic'].value == '' ? null : this.personForm.controls['userPatronymic'].value;
    const sex = this.personForm.controls['userSex'].value;
    const passport = this.personForm.controls['userPassport'].value;
    const driverlicense = this.personForm.controls['userDriverLicense'].value == '' ? null : this.personForm.controls['userDriverLicense'].value;

    let birthdate;
    try {
      birthdate = this.personForm.controls['userBirthdate'].value.format('YYYY-MM-DD');
    } catch {
      birthdate = this.personForm.controls['userBirthdate'].value;
    }

    const person: Person = {
      surname: surname,
      name: name,
      patronymic: patronymic,
      sex: sex,
      birthdate: birthdate,
      passport: passport,
      driverlicense: driverlicense  
    };

    this.personService.updatePerson(this.findPassport.controls['passport'].value, person).subscribe(
      (resp: any) => { 
        this.personService.openDialog('Операция выполнена', 'Данные о человеке успешно обновлены!');
        this.findPassport.controls['passport'].setValue(passport);
        this.person = person;
        this.cancelChanges();
      },
      (error: any) => { 
        const message = (error.error.message == 'Internal server error') ? "Человек с таким паспортом уже есть в системе!" : error.error.message;
        this.personService.openDialog('Ошибка', message);
      }
    );
    
  }

  public deletePerson() {
    this.personService.deletePerson(this.findPassport.controls['passport'].value).subscribe(
      (resp: any) => { 
        this.personService.openDialog('Операция выполнена', 'Человек успешно удален!');
        this.findPassport.controls['passport'].setValue('');
        this.person = null;
        this.fillFormPerson();
        this.canFindError = false;
      },
      (error: any) => { 
        const message = (error.error.message == 'Internal server error') ? "Человек не может быть удален, так как учавствует в ДТП или владеет машиной!" : error.error.message;
        this.personService.openDialog('Ошибка', message);
      }
    );
  }

  public cancelChanges() {
    this.isChanged = false;
    this.fillFieldPerson();
    this.personForm.controls['userSurname'].disable();
    this.personForm.controls['userName'].disable();
    this.personForm.controls['userPatronymic'].disable();
    this.personForm.controls['userSex'].disable();
    this.personForm.controls['userBirthdate'].disable();
    this.personForm.controls['userPassport'].disable();
    this.personForm.controls['userDriverLicense'].disable();
  }

  public beginChanges() {
    this.isChanged = true;
    this.personForm.controls['userSurname'].enable();
    this.personForm.controls['userName'].enable();
    this.personForm.controls['userPatronymic'].enable();
    this.personForm.controls['userSex'].enable();
    this.personForm.controls['userBirthdate'].enable();
    this.personForm.controls['userPassport'].enable();
    this.personForm.controls['userDriverLicense'].enable();
  }

  public findPerson() {
    this.isChanged = false;
    this.personForm.controls['userSurname'].disable();
    this.personForm.controls['userName'].disable();
    this.personForm.controls['userPatronymic'].disable();
    this.personForm.controls['userSex'].disable();
    this.personForm.controls['userBirthdate'].disable();
    this.personForm.controls['userPassport'].disable();
    this.personForm.controls['userDriverLicense'].disable();
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
    this.personForm.controls['userSurname'].setValue(this.person.surname);
    this.personForm.controls['userName'].setValue(this.person.name);
    this.personForm.controls['userPatronymic'].setValue(this.person.patronymic? this.person.patronymic : "");
    this.personForm.controls['userSex'].setValue(this.person.sex);
    this.personForm.controls['userBirthdate'].setValue(this.person.birthdate);
    this.personForm.controls['userPassport'].setValue(this.person.passport);
    this.personForm.controls['userDriverLicense'].setValue(this.person.driverlicense? this.person.driverlicense : "");
  }


}
