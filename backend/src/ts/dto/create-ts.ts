export class CreateTsDtoClient {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registerNumber: string;
    ownerPassport: string;
}

export class CreateTsDtoServer {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registerNumber: string;
    owner: number;
}