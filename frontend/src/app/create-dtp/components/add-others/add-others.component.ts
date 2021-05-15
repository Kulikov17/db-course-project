import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../../shared/models/person';
import { PersonService } from '../../../person/services/person.service';
import * as moment from 'moment';

export interface DialogData {
  people: Person[];
}

@Component({
  selector: 'app-add-others',
  templateUrl: './add-others.component.html',
  styleUrls: ['./add-others.component.css']
})
export class AddOthersComponent implements OnInit {

  public findPassport: FormGroup;
  public person: Person;
  public canFindPerson = false;
  public alreadyExistPerson = false;
  public canFindError = false;
  public canCreatePerson = false;
  public personViewValue;
  public personBirthdateViewValue;

  public personForm : FormGroup;

  public maxDate = moment().format('YYYY-MM-DD');
  public userSex: 'муж' | 'жен' = 'муж';

  constructor(
    public dialogRef: MatDialogRef<AddOthersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private personService: PersonService) {}

  ngOnInit(): void {
      console.log(this.data);
      this.findPassport = new FormGroup({
        "passport": new FormControl("", [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')])
      });
      
      this.personForm = new FormGroup({
        "userSurname": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
        "userName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
        "userPatronymic": new FormControl("", [Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]*$')]),
        "userSex": new FormControl("муж"),
        "userBirthdate": new FormControl('', [Validators.required]),
        "userPassport": new FormControl('', [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
        "userDriverLicense": new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')])
      });
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

  public createPerson(): void {
    this.canFindError = false;
    this.canCreatePerson = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReturnResult(): void {
    this.dialogRef.close({person: this.person});
  }

}
