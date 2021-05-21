export interface Person {
    surname: string,
    name: string,
    patronymic?: string,
    sex: string,
    birthdate: string,
    passport: string,
    driverlicense?: string
}

export interface PersonDie {
    surname: string,
    name: string,
    patronymic?: string,
    birthdate: string,
    deathdate: string,
    regionDtp: string,
    cityDtp: string
}