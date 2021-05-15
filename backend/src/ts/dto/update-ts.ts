export class UpdateTsDtoClient {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registerNumber: string;
    ownerPassport: string;
}

export class UpdateTsDtoServer {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registerNumber: string;
    owner: number;
}