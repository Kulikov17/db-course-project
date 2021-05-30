export class MapDataDto {
    countDtp: number; 
    affecteddie: number;
    affectedhurt: number;
    region: string;
    city?: string;
}

export class CountDataDto {
    mindate: string; 
    maxdate: string;
    categoryid?: number;
}

export class MinMaxDateDtp {
    mindate: string; 
    maxdate: string;
}

export class MapDataFindDto {
    region: string;
    city?: string;
    count: number;
}