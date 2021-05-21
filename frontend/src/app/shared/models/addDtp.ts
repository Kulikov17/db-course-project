export interface Typedtp {
    id: number;
    description: string;
}

export interface AffectedDTP {
    passport: string;
    type: string;
    health: string;
    guilt: string;
    tsRegisterNumber?: string;
}

export class AddDtp {
    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    descriptionDtp?: string;
    typeDtp: Typedtp[];
    affected: AffectedDTP[];
}