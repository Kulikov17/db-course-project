import { Typedtp } from '../entities/typedtp.entity';
import { AffectedDrivers } from '../entities/affecteddrivers.entity';
import { AffectedOthers } from '../entities/affectedothers.entity';

export class FindFullInfoDtpDto {
    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    descriptionDtp?: string;
    dt: Typedtp[];
    affectedDrivers: AffectedDrivers[];
    affectedOthers: AffectedOthers[];
}