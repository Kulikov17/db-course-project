import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { People } from './entities/people.entity';
import { CreatePersonDto } from './dto/create-person';
import { UpdatePersonDto } from './dto/update-person';
import { FindDiePersonDto } from './dto/find-die-person';
import e from 'express';

@Injectable()
export class PeopleService {

    constructor(private configs: ConfigService) {}

    async create(newPerson: CreatePersonDto, role: string): Promise<People> {
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            const repositoryPeople = connection.getRepository(People);
            const person = repositoryPeople.create(newPerson);
            res = await repositoryPeople.save(person); 
            if (res.id == null) {
                throw new HttpException('Человек с таким водительским удостоверением уже существует или человек не достиг 16 летнего возраста, чтобы иметь водительское удостоверение!', HttpStatus.FORBIDDEN);
            }
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findOne(findPassport: string, role: string): Promise<People> {
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryPeople = connection.getRepository(People);
            res = await repositoryPeople.findOne({passport: findPassport });
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findOneById(findId: number, role: string): Promise<People> {
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryPeople = connection.getRepository(People);
            res = await repositoryPeople.findOne({id: findId});
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findOneDied(findPassport: string, role: string): Promise<FindDiePersonDto> {
        const connection = await this.configs.getConnection(role);

        let res = new FindDiePersonDto();
        try {
            const stateHealth = 'погиб'
            let find = await connection.getRepository(People).createQueryBuilder("people")
            .innerJoinAndSelect("people.affectedothers", "affectedothers")
            .innerJoinAndSelect("affectedothers.dtp", "dtp")
            .where('people.passport = :findPassport', { findPassport })
            .andWhere('affectedothers.health = :stateHealth', { stateHealth })
            .getOne()

            if (find == undefined) {
                find = await connection.getRepository(People).createQueryBuilder("people")
                .innerJoinAndSelect("people.affecteddrivers", "affecteddrivers")
                .innerJoinAndSelect("affecteddrivers.dtp", "dtp")
                .where('people.passport = :findPassport', { findPassport })
                .andWhere('affecteddrivers.health = :stateHealth', { stateHealth })
                .getOne()
                
                res.surname = find.surname;
                res.name = find.name;
                res.birthdate = find.birthdate;
                res.deathdate = find.affecteddrivers[0].dtp.dateDtp;
                res.regionDtp = find.affecteddrivers[0].dtp.regionDtp;
                res.cityDtp = find.affecteddrivers[0].dtp.cityDtp;
            } else {
                res.surname = find.surname;
                res.name = find.name;
                res.birthdate = find.birthdate;
                res.deathdate = find.affectedothers[0].dtp.dateDtp;
                res.regionDtp = find.affectedothers[0].dtp.regionDtp;
                res.cityDtp = find.affectedothers[0].dtp.cityDtp;
            }
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async update(findPassport: string, updatePerson: UpdatePersonDto,  role: string): Promise<People> {
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            const repositoryPeople = connection.getRepository(People);
            let findPerson = await repositoryPeople.findOne({passport: findPassport });
            const checkId = findPerson.id;
            findPerson.surname = updatePerson.surname;
            findPerson.name = updatePerson.name;
            findPerson.birthdate = updatePerson.birthdate;
            findPerson.sex = updatePerson.sex;
            findPerson.passport = updatePerson.passport;
            findPerson.driverlicense = updatePerson.driverlicense;
            res = await repositoryPeople.save(findPerson); 
            res = await repositoryPeople.findOne({id: checkId });
            
            if (res.driverlicense != updatePerson.driverlicense) {
                throw new HttpException('Человек с таким водительским удостоверением уже существует или не достиг 16 летнего возраста, чтобы иметь водительское удостоверение!', HttpStatus.FORBIDDEN);
            } 

            if (res.birthdate != updatePerson.birthdate) {
                throw new HttpException('Человек не достиг 16 летнего возраста, чтобы иметь водительское удостоверение!', HttpStatus.FORBIDDEN);
            } 
            
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async remove(findPassport: string, role: string): Promise<People> {
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryPeople = connection.getRepository(People);
            let findPerson  = await repositoryPeople.findOne({passport: findPassport });
            res = await repositoryPeople.remove(findPerson);
        }
        finally {
            await connection.close();
        }

        return res;
    }
}
