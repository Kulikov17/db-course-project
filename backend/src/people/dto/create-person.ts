export class CreatePersonDto {
    surname: string;
    name: string;
    patronymic?: string;
    sex: string;
    birthdate: string;
    passport: string;
    driverlicense?: string;
}