import { Injectable } from '@nestjs/common';
import { Dtp } from './entities/dtp.entity';
import {createConnection } from "typeorm";
import * as path from 'path';
import { AffectedDTP, CreateDtpDtoClient, CreateDtpDtoServer } from './dto/create-dtp';
import { CreateAffectedDriversDto } from './dto/create-affecteddrivers';
import { CreateAffectedOthersDto } from './dto/create-affectedothers';
import { ConfigService } from 'src/config.service';
import { PeopleService } from 'src/people/people.service';
import { TsService } from 'src/ts/ts.service';
import { AffectedDrivers } from './entities/affecteddrivers.entity';
import { AffectedOthers } from './entities/affectedothers.entity';
import { FindFullInfoDtpDto } from './dto/find-full-info-dtp';


@Injectable()
export class DtpService {

    constructor(private configs: ConfigService,
        private people: PeopleService,
        private ts: TsService) {}

    public CreateDtpDtoClientConvertToCreateDtpDtoServer(source: CreateDtpDtoClient): CreateDtpDtoServer {
        const target = new CreateDtpDtoServer();
        target.dateDtp = source.dateDtp;
        target.timeDtp = source.timeDtp;
        target.regionDtp = source.regionDtp;
        target.cityDtp = source.cityDtp;
        target.descriptionDtp = source.descriptionDtp;
        target.dt = source.typeDtp;
        return target;
    }

    public async CreateDtpDtoClientConvertToCreateAffectedDriversDto(source: AffectedDTP, role: string): Promise<CreateAffectedDriversDto>  {
        const findPerson = await this.people.findOne(source.passport, role);
        const findTs = await this.ts.findOne(source.tsRegisterNumber, role);
        const target = new CreateAffectedDriversDto();
        target.type = source.type;
        target.person = findPerson.id;
        target.ts = findTs.id;
        target.health = source.health;
        target.guilt = source.guilt
        return target;
    }

    public async CreateDtpDtoClientConvertToCreateAffectedOthersDto(source: AffectedDTP, role: string): Promise<CreateAffectedOthersDto>  {
        const findPerson = await this.people.findOne(source.passport, role);
        const target = new CreateAffectedDriversDto();
        target.type = source.type;
        target.person = findPerson.id;
        target.health = source.health;
        target.guilt = source.guilt
        return target;
    }

    async create(newDtpClient: CreateDtpDtoClient, role: string): Promise<Dtp> {
        const newDtpServer = this.CreateDtpDtoClientConvertToCreateDtpDtoServer(newDtpClient);
        let affectedDrivers = [];
        let affectedOthers = [];
        
        console.log(newDtpClient);
        for (let i = 0; i < newDtpClient.affected.length; i++) {
            if (newDtpClient.affected[i].type == 'пешеход' || newDtpClient.affected[i].type == 'пассажир') {
                affectedOthers.push(await this.CreateDtpDtoClientConvertToCreateAffectedOthersDto(newDtpClient.affected[i], role))
            } else {
                affectedDrivers.push(await this.CreateDtpDtoClientConvertToCreateAffectedDriversDto(newDtpClient.affected[i], role))
            }
        }

        console.log(newDtpServer);
        console.log(affectedOthers);

        const connection = await this.configs.getConnection(role);
        let res;
        try {
            const repositoryDtp = connection.getRepository(Dtp);
            const dtp = repositoryDtp.create(newDtpServer);
            res = await repositoryDtp.save(dtp);

            const repositoryAffectedDrivers = connection.getRepository(AffectedDrivers);
            affectedDrivers.forEach((item) => {
                item.dtp = res.dtpId;
            })
            let affDriver = repositoryAffectedDrivers.create(affectedDrivers);
            await repositoryAffectedDrivers.save(affDriver);

            const repositoryAffectedOthers = connection.getRepository(AffectedOthers);
            affectedOthers.forEach((item) => {
                item.dtp = res.dtpId;
            })
            let affOthers = repositoryAffectedOthers.create(affectedOthers);
            await repositoryAffectedOthers.save(affOthers);

            console.log(affOthers);
            
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findAllDtp(role: string): Promise<FindFullInfoDtpDto[]> {
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            res = await connection.getRepository(Dtp).createQueryBuilder("dtp")
            .innerJoinAndSelect("dtp.affecteddrivers", "affecteddrivers")
            .innerJoinAndSelect("dtp.affectedothers", "affectedothers")
            .innerJoinAndSelect("dtp.dt", "typedtp")
            .getMany()
        }
        finally {
            await connection.close();
        }

        return res;
    }
}