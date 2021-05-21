export interface AffectedDrivers {
    id: number,
    type: string
    health: string,
    guilt: string
}

export interface AffectedOthers {
    id: number,
    type: string
    health: string,
    guilt: string
}


export class Typedtp {
    id: number;
    description: string;
}

export class Dtp {
    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    descriptionDtp?: string;
    dt: Typedtp[];
    affectedDrivers: AffectedDrivers[];
    affectedOthers: AffectedOthers[];
}