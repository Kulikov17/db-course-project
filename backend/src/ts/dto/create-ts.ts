export class CreateTsDtoClient {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registernumber: string;
    ownerpassport: string;
}

export class CreateTsDtoServer {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registernumber: string;
    owner: number;
}