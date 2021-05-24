export interface Typedtp {
    id: number;
    description: string;
}

export interface AffectedDTP {
    dtpId?: number;
    passport: string;
    type: string;
    health: string;
    guilt: string;
    registernumber?: string;
}

export class AddDtp {
    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    descriptionDtp?: string;
    dt: Typedtp[];
}