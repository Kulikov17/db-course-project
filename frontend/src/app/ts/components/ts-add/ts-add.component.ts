import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ts } from '../../../shared/models/ts';
import { TsService } from '../../services/ts.service';

interface TypeTs {
  value: string;
}

@Component({
  selector: 'app-ts-add',
  templateUrl: './ts-add.component.html',
  styleUrls: ['./ts-add.component.css']
})
export class TsAddComponent implements OnInit {

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
  public canAdd = false;

  constructor(private tsService: TsService) { }

  ngOnInit(): void {
    this.tsForm = new FormGroup({
      "tsBrand": new FormControl("", [Validators.required]),
      "tsModel": new FormControl(""),
      "tsColor": new FormControl(""),
      "userPassport": new FormControl('', [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
      "tsRegisterNumber": new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
  }

  public addTs() : void {
    const brand = this.tsForm.controls['tsBrand'].value;
    const model = this.tsForm.controls['tsModel'].value == '' ? null : this.tsForm.controls['tsModel'].value;
    const color = this.tsForm.controls['tsColor'].value == '' ? null : this.tsForm.controls['tsColor'].value;
    const ownerPassport = this.tsForm.controls['userPassport'].value;
    const registerNumber = this.tsForm.controls['tsRegisterNumber'].value;
    
    const ts: Ts = {
      type: this.selectedTypeTs.value,
      brand: brand,
      model: model,
      color: color,
      ownerPassport: ownerPassport,
      registerNumber: registerNumber
    };

    this.tsService.addTs(ts);
  }

}
