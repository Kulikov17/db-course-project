import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TsService } from '../../services/ts.service';
import { Ts } from '../../../shared/models/ts';

interface TypeTs {
  value: string;
}

@Component({
  selector: 'app-ts-update',
  templateUrl: './ts-update.component.html',
  styleUrls: ['./ts-update.component.css']
})
export class TsUpdateComponent implements OnInit {

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
  public findRegisterNumber: FormGroup;

  public canFindTs = false;
  public canFindError = false;
  public isLoadData = false;
  public isChanged = false;

  public ts: Ts;

  constructor(private tsService: TsService) { }

  ngOnInit(): void {
    this.findRegisterNumber = new FormGroup({
      "registerNumber": new FormControl("", [Validators.required,  Validators.minLength(10)])
    });

    this.selectedTypeTs.disable();
    this.tsForm = new FormGroup({
      "tsBrand": new FormControl({value: "", disabled: true}, [Validators.required]),
      "tsModel": new FormControl({value: "", disabled: true}),
      "tsColor": new FormControl({value: "", disabled: true}),
      "userPassport": new FormControl({value: "", disabled: true}, [Validators.required,  Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
      "tsRegisterNumber": new FormControl({value: "", disabled: true}, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
  }

  public cancelChanges() {
    this.isChanged = false;
    this.fillFieldTs();
    this.selectedTypeTs.disable();
    this.tsForm.controls['tsBrand'].disable();
    this.tsForm.controls['tsModel'].disable();
    this.tsForm.controls['tsColor'].disable();
    this.tsForm.controls['userPassport'].disable();
    this.tsForm.controls['tsRegisterNumber'].disable();
  }

  public beginChanges() {
    this.isChanged = true;
    this.selectedTypeTs.enable();
    this.tsForm.controls['tsBrand'].enable();
    this.tsForm.controls['tsModel'].enable();
    this.tsForm.controls['tsColor'].enable();
    this.tsForm.controls['userPassport'].enable();
    this.tsForm.controls['tsRegisterNumber'].enable();
  }

  public findTs() {
    this.isLoadData = true;
    this.canFindTs = false;
    this.canFindError = false;
    this.tsService.findTS(this.findRegisterNumber.controls['registerNumber'].value).subscribe((data:Ts) =>  {
      this.ts = data;
      this.fillFormTs();
    });
  }


  private fillFormTs() {
    this.isLoadData = false;
    if (!this.ts) {
      this.canFindTs = false;
      this.canFindError = true;
    } else {
      this.canFindTs = true;
      this.canFindError = false;
      this.fillFieldTs();
    }
  }

  private fillFieldTs() {
    this.selectedTypeTs.setValue(this.ts.type);
    this.tsForm.controls['tsBrand'].setValue(this.ts.brand);
    this.tsForm.controls['tsModel'].setValue(this.ts.model);
    this.tsForm.controls['tsColor'].setValue(this.ts.color);
    this.tsForm.controls['userPassport'].setValue(this.ts.ownerpassport);
    this.tsForm.controls['tsRegisterNumber'].setValue(this.ts.registernumber);
  }

  public updateTs() {
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
      ownerpassport: ownerPassport,
      registernumber: registerNumber
    };

    this.tsService.updateTs(this.findRegisterNumber.controls['registerNumber'].value, ts).subscribe(
      (resp: any) => { 
        this.tsService.openDialog('Операция выполнена', 'Данные о ТС успешно обновлены!');
        this.findRegisterNumber.controls['registerNumber'].setValue(ts.registernumber);
        this.ts = ts;
        this.cancelChanges();
      },
      (error: any) => { 
        const message = (error.error.message == 'Internal server error') ? "Человека с таким паспортом нет в системе!" : error.error.message;
        this.tsService.openDialog('Ошибка', message);
      }
    );
  }

  public deleteTs() {
    const registerNumber = this.tsForm.controls['tsRegisterNumber'].value;
    this.tsService.deleteTs(this.findRegisterNumber.controls['registerNumber'].value).subscribe(
      (resp: any) => { 
        this.tsService.openDialog('Операция выполнена', 'ТС успешно удалено!');
        this.findRegisterNumber.controls['registerNumber'].setValue('');
        this.ts = null;
        this.fillFormTs();
        this.canFindError = false;
      },
      (error: any) => { 
        const message = (error.error.message == 'Internal server error') ? "ТС не может быть удалено, так как используется в ДТП!" : error.error.message;
        this.tsService.openDialog('Ошибка', message);
      }
    );
  }

}