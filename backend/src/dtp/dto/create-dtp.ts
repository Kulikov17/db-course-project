import { Typedtp } from '../entities/typedtp.entity';

export interface CreateAffectedDtpDto {
    dtpId: number;
    passport: string;
    type: string;
    health: string;
    guilt: string;
    registernumber?: string;
}

export class CreateDtpDto {
    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    descriptionDtp?: string;
    dt: Typedtp[];
}