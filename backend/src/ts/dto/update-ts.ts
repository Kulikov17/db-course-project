export class UpdateTsDtoClient {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registernumber: string;
    ownerpassport: string;
}

export class UpdateTsDtoServer {
    type: string;
    brand?: string;
    model?: string;
    color?: string;
    registernumber: string;
    owner: number;
}