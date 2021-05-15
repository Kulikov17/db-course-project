import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { People } from './entities/people.entity';
import { CreatePersonDto } from './dto/create-person';
import { UpdatePersonDto } from './dto/update-person';

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


    async update(findPassport: string, updatePerson: UpdatePersonDto,  role: string): Promise<People> {
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryPeople = connection.getRepository(People);
            let findPerson = await repositoryPeople.findOne({passport: findPassport });
            findPerson.name = updatePerson.name;
            findPerson.birthdate = updatePerson.birthdate;
            findPerson.sex = updatePerson.sex;
            findPerson.passport = updatePerson.passport;
            findPerson.driverLicense = updatePerson.driverLicense;
            res = await repositoryPeople.save(findPerson); 
            
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
