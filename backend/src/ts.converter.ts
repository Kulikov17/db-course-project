import { Convert, Converter } from '@fabio.formosa/metamorphosis';
import { Injectable } from '@nestjs/common';
import { Ts } from './ts/entities/ts.entity';
import { TsDto } from './ts/dto/ts'

@Injectable()
@Convert(Ts, TsDto)
export default class TsToTsDtoConverter implements Converter<Ts, TsDto> {
  
  public convert(source: Ts): TsDto {
    const target = new TsDto();
    target.type = source.type.toString();
    target.brand = source.brand.toString();
    target.model = source.model.toString();
    target.color = source.model.toString();
    target.registerNumber = source.model.toString();
    return target;
  }

}