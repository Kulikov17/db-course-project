import { Typedtp } from '../entities/typedtp.entity';

export interface AffectedDTP {
    passport: string;
    type: string;
    health: string;
    guilt: string;
    tsRegisterNumber?: string;
}

export class CreateDtpDtoClient {
    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    descriptionDtp?: string;
    typeDtp: Typedtp[];
    affected: AffectedDTP[];
}

export class CreateDtpDtoServer {
    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    descriptionDtp?: string;
    dt: Typedtp[];
}